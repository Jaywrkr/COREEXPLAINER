# Fase 141 — Señal visible de frescura de fuentes

Fecha de revisión: 2026-08-11
Versión: 0.195.0

## Objetivo

Hacer visible el estado de las fuentes enlazadas sin cargar la interfaz con el workbench técnico.

## Implementado

- El badge del canvas considera fuentes `review-needed` como señal de atención.
- Técnico puede abrirlo y ver el número de referencias que requieren actualización.
- Cliente conserva una señal compacta sin exponer detalles técnicos innecesarios.
- La copy mantiene el límite: frescura editorial no es salud de infraestructura.

## Verificación

Typecheck, lint, build y consistencia de versión.
