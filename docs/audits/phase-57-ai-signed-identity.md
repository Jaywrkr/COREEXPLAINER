# Fase 57 — Identidad firmada para cuotas de IA

Fecha: 2026-08-10  
Versión: 0.111.0

## Resultado

El límite temporal de `/api/copilot` y `/api/creator` puede asociarse a una identidad autenticada por un gateway externo. `endpointGuard` acepta dos headers: `x-coresolutions-user` y `x-coresolutions-user-signature`. La firma es HMAC-SHA256 sobre el identificador y se verifica con `AI_IDENTITY_SIGNING_SECRET`.

## Modelo de confianza

- El gateway debe autenticar al usuario, eliminar los headers homónimos enviados por el cliente e inyectar el identificador y la firma propios.
- La app rechaza firmas ausentes, malformadas o inválidas y vuelve a la cuota por IP.
- El identificador personal no se usa como clave de memoria: se guarda solo un hash truncado.
- El secreto debe tener al menos 16 caracteres y permanecer únicamente en el entorno server-side.
- Esto prepara el contrato de identidad; la persistencia multiinstancia requiere añadir un almacén compartido en una fase posterior.

## Verificación

Pasaron `npm run validate:content`, `npm run typecheck`, `npm run lint` y `npm run build`.
