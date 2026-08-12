# Fase 140 — Frescura de fuentes en assurance

Fecha de revisión: 2026-08-11
Versión: 0.194.0

## Objetivo

Conectar la etiqueta `reviewed` con la vigencia declarada de las fuentes que respaldan sus reglas técnicas.

## Implementado

- El gate recibe un mapa de validez de fuentes por ID.
- `reviewed` exige que cada fuente enlazada sea `current`.
- IDs ausentes y fuentes `review-needed` generan error de contenido.
- La regresión cubre el caso de fuente vencida.

## Límites

`current` es una declaración editorial basada en fecha y catálogo; no garantiza que la fuente sea suficiente para cada cliente ni sustituye una revisión especialista.

## Verificación

Regresión de gate, validación de contenido, typecheck, lint y build.
