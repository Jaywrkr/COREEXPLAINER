import { NextResponse } from "next/server";

interface CreatorRequest {
  topic?: string;
  audience?: string;
  brands?: string;
  goal?: string;
}

const limit = (value: string | undefined, max: number) => (value?.trim() ?? "").slice(0, max);

export async function POST(request: Request) {
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

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 1400,
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
