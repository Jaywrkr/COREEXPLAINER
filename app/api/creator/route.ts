import { NextResponse } from "next/server";
import { checkAiAccess, providerSignal, reserveAiTokens } from "@/lib/ai/endpointGuard";

interface CreatorRequest {
  topic?: string;
  audience?: string;
  brands?: string;
  goal?: string;
}

const limit = (value: string | undefined, max: number) => (value?.trim() ?? "").slice(0, max);

function json(message: string, status: number, fallback = true, retryAfter?: number) {
  const headers: Record<string, string> = { "Cache-Control": "no-store" };
  if (retryAfter) headers["Retry-After"] = String(retryAfter);
  return NextResponse.json({ message, fallback }, { status, headers });
}

export async function POST(request: Request) {
  const access = checkAiAccess(request);
  if (!access.allowed) return json(access.message, access.status);
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 4_000) return json("La solicitud es demasiado grande.", 413);
  let body: CreatorRequest;
  try {
    body = (await request.json()) as CreatorRequest;
  } catch {
    return NextResponse.json({ message: "La solicitud no tiene un formato válido." }, { status: 400 });
  }

  const topic = limit(body.topic, 160);
  const audience = limit(body.audience, 120);
  const brands = limit(body.brands, 240);
  const goal = limit(body.goal, 400);
  if (!topic || !audience || !goal) {
    return NextResponse.json({ message: "Tema, audiencia y objetivo son obligatorios." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "El generador IA no está configurado en este entorno.", fallback: true }, { status: 503 });
  }

  const configuredOutput = Number(process.env.AI_MAX_OUTPUT_TOKENS);
  const maxOutputTokens = Number.isFinite(configuredOutput) && configuredOutput > 0 ? Math.min(Math.floor(configuredOutput), 1_400) : 1_400;
  const estimatedInputTokens = Math.ceil(JSON.stringify({ topic, audience, brands, goal }).length / 4);
  const budget = reserveAiTokens(request, estimatedInputTokens + maxOutputTokens);
  if (!budget.allowed) return json(budget.message, budget.status, true, budget.retryAfter);

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: maxOutputTokens,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "Eres arquitecto de contenidos técnicos de CORESOLUTIONS.",
            "Genera un borrador estructurado, no contenido listo para publicar.",
            "No inventes capacidades de productos, versiones, métricas ni fuentes.",
            "Marca lo que requiere validación especialista.",
            "Devuelve JSON válido con exactamente estas claves: title, tagline, scenes, risks, evidenceQuestions, validationGaps, sourcesToConfirm.",
            "scenes debe tener exactamente 3 elementos, cada uno con id, title, paragraphs (2 textos) y businessImpact.",
            "Escribe en español claro y explica siglas cuando aparezcan.",
          ].join("\n"),
        },
        {
          role: "user",
          content: JSON.stringify({ topic, audience, brands, goal }),
        },
      ],
    }),
    cache: "no-store",
    signal: providerSignal(),
  });

  if (!upstream.ok) return NextResponse.json({ message: "El proveedor de IA no respondió.", fallback: true }, { status: 502 });
  const payload = (await upstream.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) return NextResponse.json({ message: "La IA no devolvió un borrador utilizable.", fallback: true }, { status: 502 });
  try {
    return NextResponse.json({ draft: JSON.parse(content), generatedBy: "ai" });
  } catch {
    return NextResponse.json({ message: "La respuesta de IA no era JSON válido.", fallback: true }, { status: 502 });
  }
}
