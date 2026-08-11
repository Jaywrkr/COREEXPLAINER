# Fase 112 — Consistencia de versión y changelog visible

Estado: implementado en rama `codex/version-consistency`.

## Hallazgo

La aplicación mostraba `0.137.0` mientras el paquete y los informes habían avanzado. Eso hacía que un cliente o revisor no pudiera saber qué release estaba viendo.

## Corrección

`currentVersion` y la primera entrada visible del changelog quedan en `0.166.0`, alineadas con `package.json` y `package-lock.json`. `test:version-consistency` comprueba igualdad de versión, formato semver interno y existencia de cambios.

## Límites

La consistencia identifica la release del código; no prueba que Vercel haya desplegado esa release. El despliegue sigue siendo una decisión manual y debe verificarse con el commit promovido.

## Verificación

- `npm run test:version-consistency`
- `npm run test:technical-review-report`
- `npm run test:technical-review-package`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
