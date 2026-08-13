import { NextResponse } from "next/server";
import { normalizeGeneratedDiagram, studioCatalog, validateStudioDiagram } from "@/lib/architecture/studio";

export const runtime = "nodejs";

function openAiFailureMessage(status: number, code?: string) {
  if (status === 401) return "OpenAI rechazó la clave. Confirma que OPENAI_API_KEY se copió completa y pertenece al proyecto correcto.";
  if (status === 403) return "La clave no tiene permiso para usar este modelo. Revisa sus permisos y el proyecto de OpenAI.";
  if (status === 429) return "OpenAI alcanzó un límite de uso o de facturación. Revisa Billing y Limits en la plataforma de OpenAI.";
  if (status === 404) return "El modelo configurado no está disponible para esta clave. Usa gpt-4.1-mini o elimina OPENAI_ARCHITECTURE_MODEL.";
  return `OpenAI no pudo generar el diagrama (${status}${code ? ` · ${code}` : ""}). Revisa los logs de Vercel para el detalle operativo.`;
}

const schema = {
  type: "object", additionalProperties: false,
  required: ["title", "summary", "assumptions", "nodes", "connections"],
  properties: {
    title: { type: "string" }, summary: { type: "string" }, assumptions: { type: "array", items: { type: "string" } },
    nodes: { type: "array", items: { type: "object", additionalProperties: false, required: ["id", "componentId", "label", "x", "y"], properties: { id: { type: "string" }, componentId: { type: "string" }, label: { type: "string" }, x: { type: "number" }, y: { type: "number" } } } },
    connections: { type: "array", items: { type: "object", additionalProperties: false, required: ["id", "from", "fromPort", "to", "toPort", "label"], properties: { id: { type: "string" }, from: { type: "string" }, fromPort: { type: "string" }, to: { type: "string" }, toPort: { type: "string" }, label: { type: "string" } } } },
  },
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { prompt?: unknown } | null;
  const prompt = typeof body?.prompt === "string" ? body.prompt.replace(/[\u0000-\u001F]/g, " ").trim().slice(0, 5000) : "";
  if (prompt.length < 20) return NextResponse.json({ error: "Describe el entorno, objetivo y restricciones del cliente con un poco más de detalle." }, { status: 400 });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Falta OPENAI_API_KEY en las variables de entorno del servidor. La clave nunca debe ir en el navegador." }, { status: 503 });
  const catalog = studioCatalog.map(({ id, vendor, name, description, ports }) => ({ id, vendor, name, description, ports }));
  const system = `Eres un arquitecto preventa de CORESOLUTIONS. Genera SOLO JSON que cumpla el esquema. El diagrama es conceptual, no una BOM, HCL ni configuración. Usa exclusivamente componentId y puertos del catálogo. No inventes productos, fabricantes, modelos, cables, puertos, VLAN, IPs, licencias o compatibilidades. Solo conecta puertos del mismo type; management puede conectarse a ethernet. x debe estar entre 2 y 98 e y entre 4 y 94 (porcentajes del canvas, no fracciones). Las relaciones API, telemetría y backup son vínculos lógicos; Ethernet, FC e iSCSI representan los medios de datos correspondientes. Si falta información, declárala en assumptions y omite la conexión. Catálogo autorizado: ${JSON.stringify(catalog)}`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: process.env.OPENAI_ARCHITECTURE_MODEL || "gpt-4.1-mini", temperature: 0.2, response_format: { type: "json_schema", json_schema: { name: "architecture_diagram", strict: true, schema } }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }),
    });
    if (!response.ok) {
      const upstream = await response.json().catch(() => null) as { error?: { code?: unknown } } | null;
      const code = typeof upstream?.error?.code === "string" ? upstream.error.code : undefined;
      console.error("Architecture Studio OpenAI request failed", { status: response.status, code });
      return NextResponse.json({ error: openAiFailureMessage(response.status, code), upstreamStatus: response.status }, { status: 502 });
    }
    const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const diagram = normalizeGeneratedDiagram(JSON.parse(payload.choices?.[0]?.message?.content ?? "null"));
    if (!diagram) return NextResponse.json({ error: "La IA devolvió una arquitectura no reconocible." }, { status: 422 });
    const validation = validateStudioDiagram(diagram);
    if (!validation.valid) return NextResponse.json({ error: "La propuesta fue bloqueada por las reglas técnicas del Studio.", issues: validation.issues }, { status: 422 });
    return NextResponse.json({ diagram, validation });
  } catch {
    return NextResponse.json({ error: "No se pudo generar el diagrama. Ningún cambio fue aplicado." }, { status: 500 });
  }
}
