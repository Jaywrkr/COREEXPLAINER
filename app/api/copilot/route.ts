import { NextResponse } from "next/server";

const MAX_QUESTION_LENGTH = 600;
const MAX_CONTEXT_LENGTH = 14000;

interface CopilotRequest {
  question?: string;
  context?: string;
}

function response(message: string, status = 200) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: Request) {
  let body: CopilotRequest;
  try {
    body = (await request.json()) as CopilotRequest;
  } catch {
    return response("La pregunta no tiene un formato válido.", 400);
  }

  const question = body.question?.trim();
  const context = body.context?.trim();
  if (!question || question.length > MAX_QUESTION_LENGTH) {
    return response("Escribe una pregunta de hasta 600 caracteres.", 400);
  }
  if (!context || context.length > MAX_CONTEXT_LENGTH) {
    return response("El contexto de la explicación no está disponible o es demasiado grande.", 400);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return response("El copiloto está preparado, pero CORESOLUTIONS todavía no ha configurado OPENAI_API_KEY en este entorno.", 503);
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: [
            "Eres el copiloto técnico de CORESOLUTIONS.",
            "Responde únicamente con el contexto autorado que recibes.",
            "Si el contexto no permite responder, dilo claramente y pide la evidencia faltante.",
            "No inventes configuraciones, métricas, versiones ni capacidades de productos.",
            "Diferencia hechos, inferencias y preguntas pendientes.",
            "Responde en español claro. Para clientes, evita jerga o explica cada sigla.",
            "Termina con una línea breve de 'Evidencia a revisar' y no afirmes que un entorno real está validado.",
          ].join("\n"),
        },
        {
          role: "user",
          content: `CONTEXTO AUTORADO:\n${context}\n\nPREGUNTA:\n${question}`,
        },
      ],
    }),
    cache: "no-store",
  });

  if (!upstream.ok) {
    return response("El servicio de IA no respondió. La explicación sigue disponible sin el copiloto; revisa la configuración y vuelve a intentarlo.", 502);
  }

  const payload = (await upstream.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const message = payload.choices?.[0]?.message?.content?.trim();
  return message ? response(message) : response("El copiloto no devolvió una respuesta utilizable.", 502);
}
