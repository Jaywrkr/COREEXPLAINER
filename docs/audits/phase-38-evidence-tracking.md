# Fase 38 — Evidencia como objeto rastreable

Fecha de revisión: 2026-08-09  
Versión: 0.92.0

## Objetivo

Dejar de tratar la evidencia como una frase informativa y convertirla en algo que el consultor pueda revisar, bloquear y relacionar con fuentes.

## Resultado aplicado

`EvidenceTrackerPanel` crea registros por escenario para:

- cada paso guiado;
- cada fase del roadmap.

Cada registro tiene identificador estable, tipo, detalle, fuentes relacionadas y estado `Pendiente`, `Validada` o `Bloqueada`. El estado se conserva en `localStorage` por explicación y escenario.

## Límite

El estado es un registro de trabajo local, no una prueba automática ni una aprobación formal. La siguiente evolución será añadir responsable, fecha y tipo de evidencia recibida.
