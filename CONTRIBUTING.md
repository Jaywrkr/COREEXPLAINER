# Contribuir a CORESOLUTIONS Technical Explainer

## Flujo de cambios

1. Parte de la rama que contiene el último merge aprobado.
2. Crea una rama nueva con prefijo `codex/` y un nombre corto de la fase.
3. Haz un cambio acotado; no mezcles contenido técnico, UI y despliegue sin una razón documentada.
4. Actualiza `package.json`, `src/content/changelog.ts`, `docs/CHANGELOG.md` y `docs/ai-context/project-state.md` cuando el cambio sea visible o de arquitectura.
5. Añade una auditoría en `docs/audits/phase-<n>-<slug>.md`.
6. Ejecuta los comandos del quality gate y revisa sus advertencias.
7. Haz commit, push y abre un PR. El merge lo realiza el responsable del repositorio.
8. Después del merge, elimina la rama y crea otra para la siguiente fase.

## Quality gate local

```bash
npm ci
npm audit --omit=dev --audit-level=high
npm run validate:content
npm run report:technical-review
npm run report:technical-review:json
npm run report:technical-review:package -- --output-dir technical-review-package
npm run test:review-priority
npm run test:review-actions
npm run test:technical-review-report
npm run test:technical-review-package
npm run test:ai-guards
npm run test:workbench-export
npm run typecheck
npm run lint
npm run build
```

El workflow `.github/workflows/quality.yml` repite estos controles en GitHub Actions. Una advertencia de revisión técnica pendiente no se debe ocultar: `reviewStatus: "pending"` solo cambia después de una revisión especialista real.

## Contenido técnico

- Cada afirmación de producto debe tener fuente, fecha de consulta, alcance y límites.
- Mantén coherentes texto, escenas, nodos, aristas, animación y escenarios de fallo.
- No presentes una topología conceptual como packet walk, HLD validado ni prueba de un entorno real.
- Para versiones o capacidades cambiantes, usa documentación oficial y registra la versión o el estado conceptual.
- No marques `reviewStatus: "reviewed"` por haber pasado TypeScript, lint, build o una revisión de IA.

## IA y secretos

- Las claves de proveedor son server-side; nunca uses `NEXT_PUBLIC_*` para secretos.
- Las acciones de Copilot deben seguir el contrato allowlistado y ser reversibles o explícitamente educativas.
- Revisa tokens, coste estimado y cuotas cuando cambies `/api/copilot`, `/api/creator` o el guard.
- No incluyas prompts, respuestas, tokens, datos de clientes o credenciales en commits, issues o logs.

## Vercel

La política del repositorio mantiene `git.deploymentEnabled: false` para evitar despliegues por cada commit. No cambies esa opción como parte de una feature normal. El despliegue a Production se hace manualmente desde Vercel después de merges revisados; consulta `docs/ai-context/vercel-deployment-policy.md`.
