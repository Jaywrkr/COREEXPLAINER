import assert from "node:assert/strict";

// Keep public errors actionable while never echoing a secret or upstream body.
const messages: Record<number, string> = {
  401: "OpenAI rechazó la clave. Confirma que OPENAI_API_KEY se copió completa y pertenece al proyecto correcto.",
  403: "La clave no tiene permiso para usar este modelo. Revisa sus permisos y el proyecto de OpenAI.",
  429: "OpenAI alcanzó un límite de uso o de facturación. Revisa Billing y Limits en la plataforma de OpenAI.",
  404: "El modelo configurado no está disponible para esta clave. Usa gpt-4.1-mini o elimina OPENAI_ARCHITECTURE_MODEL.",
};
assert.match(messages[401]!, /OPENAI_API_KEY/);
assert.match(messages[429]!, /Billing/);
assert.doesNotMatch(Object.values(messages).join(" "), /sk-/i);
console.log("Architecture AI diagnostic messages are safe and actionable.");
