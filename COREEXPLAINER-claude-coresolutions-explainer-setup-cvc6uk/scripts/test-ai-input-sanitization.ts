import assert from "node:assert/strict";
import { sanitizeAiText, sanitizeCopilotInput } from "../src/lib/ai/inputSanitization";

const sample = 'Authorization: Bearer abcdefghijklmnop secret="top-secret" api_key=sk-test_123456789012 password: hunter2';
const sanitized = sanitizeAiText(sample, 500);
assert.ok(sanitized.redactions >= 4);
assert.ok(!sanitized.value.includes("abcdefghijklmnop"));
assert.ok(!sanitized.value.includes("top-secret"));
assert.ok(!sanitized.value.includes("sk-test_123456789012"));
assert.ok(!sanitized.value.includes("hunter2"));

const input = sanitizeCopilotInput("Pregunta token=abc", '{"password":"abc","claim":"normal"}');
assert.equal(input.redactions, 2);
assert.ok(input.question.value.includes("[redacted]"));
assert.ok(input.context.value.includes('"claim":"normal"'));
assert.equal(sanitizeAiText("123456", 3).value, "123");
console.log("AI input sanitization regression checks passed.");
