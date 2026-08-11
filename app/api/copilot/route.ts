import { NextResponse } from "next/server";
import { checkAiAccess, providerSignal, readJsonBody, reserveAiTokens } from "@/lib/ai/endpointGuard";
import { estimateAiCost, exceedsAiCostCap } from "@/lib/ai/costEstimate";
import { isSafeCopilotActionId, reviewCopilotMessage, sanitizeCopilotActions, type CopilotAction, type CopilotPolicy, type CopilotMessageReview } from "@/lib/ai/copilotContract";
import { buildCopilotPolicy } from "@/lib/ai/copilotPolicy";
import { sanitizeCopilotInput } from "@/lib/ai/inputSanitization";

const MAX_QUESTION_LENGTH = 600;
const MAX_CONTEXT_LENGTH = 14000;

interface CopilotRequest { question?: string; context?: string; allowedActionIds?: { sourceIds?: unknown; scenarioIds?: unknown } }
interface AiUsage { inputTokens?: number; outputTokens?: number; totalTokens?: number; model?: string; estimatedCostUsd?: number; costSource?: "environment" }

function response(message: string, status = 200, actions: CopilotAction[] = [], usage?: AiUsage, retryAfter?: number, policy?: CopilotPolicy, review?: CopilotMessageReview) {
  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (retryAfter) headers["Retry-After"] = String(retryAfter);
  return NextResponse.json({ message, actions, usage, policy, review }, { status, headers });
}

export async function POST(request: Request) {
  const access = await checkAiAccess(request);
  if (!access.allowed) return response(access.message, access.status, [], undefined, access.retryAfter);
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 18_000) return response("La solicitud es demasiado grande.", 413);
  const body = await readJsonBody<CopilotRequest>(request, 18_000);
  if (!body) return response("La solicitud no tiene un formato valido o es demasiado grande.", 400);

  const rawQuestion = body.question?.trim();
  const rawContext = body.context?.trim();
  if (!rawQuestion || rawQuestion.length > MAX_QUESTION_LENGTH) return response("Escribe una pregunta de hasta 600 caracteres.", 400);
  if (!rawContext || rawContext.length > MAX_CONTEXT_LENGTH) return response("El contexto de la explicacion no esta disponible o es demasiado grande.", 400);
  const sanitized = sanitizeCopilotInput(rawQuestion, rawContext);
  const question = sanitized.question.value;
  const context = sanitized.context.value;
  const allowedActionIds = body.allowedActionIds ?? {};
  const sourceIds = new Set(Array.isArray(allowedActionIds.sourceIds) ? allowedActionIds.sourceIds.filter(isSafeCopilotActionId).map((id) => id.trim()).slice(0, 100) : []);
  const scenarioIds = new Set(Array.isArray(allowedActionIds.scenarioIds) ? allowedActionIds.scenarioIds.filter(isSafeCopilotActionId).map((id) => id.trim()).slice(0, 100) : []);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return response("El copiloto esta preparado, pero CORESOLUTIONS todavia no ha configurado OPENAI_API_KEY en este entorno.", 503);
  const configuredOutput = Number(process.env.AI_MAX_OUTPUT_TOKENS);
  const maxOutputTokens = Number.isFinite(configuredOutput) && configuredOutput > 0 ? Math.min(Math.floor(configuredOutput), 1_200) : 700;
  const estimatedInputTokens = Math.ceil((question.length + context.length) / 4);
  const estimatedCost = estimateAiCost(estimatedInputTokens, maxOutputTokens);
  const policy = buildCopilotPolicy(estimatedInputTokens, maxOutputTokens, estimatedCost?.costUsd, estimatedCost?.source);
  if (exceedsAiCostCap(estimatedCost)) return response("La solicitud supera el tope de coste configurado para IA; reduce el contexto o usa una revisión manual.", 429, [], undefined, 60, policy);
  const budget = await reserveAiTokens(request, estimatedInputTokens + maxOutputTokens);
  if (!budget.allowed) return response(budget.message, budget.status, [], undefined, budget.retryAfter, policy);

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: maxOutputTokens,
      messages: [
        { role: "system", content: [
          "Devuelve JSON valido con las claves message y actions. actions solo puede usar open-source o activate-scenario con IDs existentes en el contexto; si no hay una accion segura, devuelve [].",
          "Eres el copiloto tecnico de CORESOLUTIONS.",
          "Responde unicamente con el contexto autorado que recibes.",
          "Si el contexto no permite responder, dilo claramente y pide la evidencia faltante.",
          "No inventes configuraciones, metricas, versiones ni capacidades de productos.",
          "Diferencia hechos, inferencias y preguntas pendientes.",
          "Responde en espanol claro. Para clientes, evita jerga o explica cada sigla.",
          "Cuando uses una fuente autorada, citala exactamente con el formato [fuente:id] usando un ID del contexto.",
          "Termina con una linea breve de 'Evidencia a revisar' y no afirmes que un entorno real esta validado.",
        ].join("\n") },
        { role: "user", content: `CONTEXTO AUTORADO:\n${context}\n\nPREGUNTA:\n${question}` },
      ],
      response_format: { type: "json_object" },
    }),
    cache: "no-store",
    signal: providerSignal(),
  });
  if (!upstream.ok) return response("El servicio de IA no respondio. La explicacion sigue disponible sin el copiloto; revisa la configuracion y vuelve a intentarlo.", 502, [], undefined, undefined, policy);

  const payload = (await upstream.json()) as { choices?: Array<{ message?: { content?: string } }>; usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number } };
  const usage: AiUsage = { inputTokens: payload.usage?.prompt_tokens, outputTokens: payload.usage?.completion_tokens, totalTokens: payload.usage?.total_tokens, model };
  const cost = estimateAiCost(usage.inputTokens, usage.outputTokens);
  if (cost) { usage.estimatedCostUsd = cost.costUsd; usage.costSource = cost.source; }
  if (exceedsAiCostCap(cost)) return response("El consumo real estimado de esta respuesta supera el tope de coste configurado; se conserva el límite y no se entrega como respuesta aprobada.", 429, [], usage, 60, policy);
  const message = payload.choices?.[0]?.message?.content?.trim();
  if (message) {
    try {
      const parsed = JSON.parse(message) as { message?: unknown; actions?: unknown };
      const actions = sanitizeCopilotActions(parsed.actions, { sourceIds, scenarioIds });
      const reviewed = reviewCopilotMessage(parsed.message, sourceIds);
      return response(reviewed.message, 200, actions, usage, undefined, policy, reviewed);
    } catch {
      const reviewed = reviewCopilotMessage(message, sourceIds);
      return response(reviewed.message, 200, [], usage, undefined, policy, reviewed);
    }
  }
  return response("El copiloto no devolvio una respuesta utilizable.", 502, [], undefined, undefined, policy);
}
