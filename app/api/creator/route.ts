import { NextResponse } from "next/server";
import { checkAiAccess, providerSignal, reserveAiTokens } from "@/lib/ai/endpointGuard";
import { estimateAiCost } from "@/lib/ai/costEstimate";
import type { CreatorPolicy } from "@/lib/ai/creatorPolicy";
import { buildCreatorPolicy } from "@/lib/ai/creatorPolicy";
import { validateCreatorDraft } from "@/lib/ai/creatorContract";

interface CreatorRequest { topic?: string; audience?: string; brands?: string; goal?: string }
interface CreatorUsage { inputTokens?: number; outputTokens?: number; totalTokens?: number; model?: string; estimatedCostUsd?: number; costSource?: "environment" }
const limit = (value: string | undefined, max: number) => (value?.trim() ?? "").slice(0, max);

function json(message: string, status: number, fallback = true, retryAfter?: number, policy?: CreatorPolicy) {
  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (retryAfter) headers["Retry-After"] = String(retryAfter);
  return NextResponse.json({ message, fallback, policy }, { status, headers });
}

export async function POST(request: Request) {
  const access = await checkAiAccess(request);
  if (!access.allowed) return json(access.message, access.status, true, access.retryAfter);
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 4_000) return json("La solicitud es demasiado grande.", 413);
  let body: CreatorRequest;
  try { body = (await request.json()) as CreatorRequest; } catch { return json("La solicitud no tiene un formato valido.", 400); }

  const topic = limit(body.topic, 160);
  const audience = limit(body.audience, 120);
  const brands = limit(body.brands, 240);
  const goal = limit(body.goal, 400);
  if (!topic || !audience || !goal) return json("Tema, audiencia y objetivo son obligatorios.", 400);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return json("El generador IA no esta configurado en este entorno.", 503);

  const configuredOutput = Number(process.env.AI_MAX_OUTPUT_TOKENS);
  const maxOutputTokens = Number.isFinite(configuredOutput) && configuredOutput > 0 ? Math.min(Math.floor(configuredOutput), 1_400) : 1_400;
  const estimatedInputTokens = Math.ceil(JSON.stringify({ topic, audience, brands, goal }).length / 4);
  const estimatedCost = estimateAiCost(estimatedInputTokens, maxOutputTokens);
  const policy = buildCreatorPolicy(estimatedInputTokens, maxOutputTokens, estimatedCost?.costUsd, estimatedCost?.source);
  const budget = await reserveAiTokens(request, estimatedInputTokens + maxOutputTokens);
  if (!budget.allowed) return json(budget.message, budget.status, true, budget.retryAfter, policy);

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: maxOutputTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: [
          "Eres arquitecto de contenidos tecnicos de CORESOLUTIONS.",
          "Genera un borrador estructurado, no contenido listo para publicar.",
          "No inventes capacidades de productos, versiones, metricas ni fuentes.",
          "Marca lo que requiere validacion especialista.",
          "Devuelve JSON valido con exactamente estas claves: title, tagline, scenes, risks, evidenceQuestions, validationGaps, sourcesToConfirm.",
          "scenes debe tener exactamente 3 elementos, cada uno con id, title, paragraphs (2 textos) y businessImpact.",
          "Escribe en espanol claro y explica siglas cuando aparezcan.",
        ].join("\n") },
        { role: "user", content: JSON.stringify({ topic, audience, brands, goal }) },
      ],
    }),
    cache: "no-store",
    signal: providerSignal(),
  });
  if (!upstream.ok) return json("El proveedor de IA no respondio.", 502, true, undefined, policy);
  const payload = (await upstream.json()) as { choices?: Array<{ message?: { content?: string } }>; usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number } };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) return json("La IA no devolvio un borrador utilizable.", 502, true, undefined, policy);
  const usage: CreatorUsage = { inputTokens: payload.usage?.prompt_tokens, outputTokens: payload.usage?.completion_tokens, totalTokens: payload.usage?.total_tokens, model: process.env.OPENAI_MODEL ?? "gpt-4o-mini" };
  const cost = estimateAiCost(usage.inputTokens, usage.outputTokens);
  if (cost) { usage.estimatedCostUsd = cost.costUsd; usage.costSource = cost.source; }
  try {
    const validation = validateCreatorDraft(JSON.parse(content));
    if (!validation.draft) return json("La IA devolvió un borrador con estructura incompleta; se usará una plantilla local editable.", 502, true, undefined, policy);
    return NextResponse.json({ draft: validation.draft, generatedBy: "ai", usage, policy }, { headers: { "Cache-Control": "no-store" } });
  }
  catch { return json("La respuesta de IA no era JSON valido.", 502, true, undefined, policy); }
}
