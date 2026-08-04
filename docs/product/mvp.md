# MVP y fases

## Fase 0 — Base (ESTA FASE, completada)

Objetivo: una base robusta, documentada y escalable, con un prototipo visual
funcionando de punta a punta usando contenido de ejemplo escrito a mano.

Incluye:

- App Next.js + TypeScript + Tailwind, lista para Vercel.
- Layout de dos columnas (`ExplainerLayout`) reutilizable para cualquier
  tema, no solo VCF.
- Motor de canvas genérico (`SceneEngine`) que interpreta escenas
  (nodos/conexiones/paquetes) sin saber nada de VCF ni de ningún tema
  específico.
- Formato `animation-spec.json` documentado y versionado (`version: "1.0"`).
- Un ejemplo completo y funcional: VMware Cloud Foundation, en
  `/explainer/vcf`, con 4 pasos y simulación de fallas interactiva
  (clic en el botón rojo de un host para simular su caída).
- Estructura documental para que cualquier IA continúe sin perder contexto.

No incluye (fuera de alcance deliberadamente):

- Generador de contenido con IA (OpenAI/Claude API).
- Editor de contenido desde la UI.
- Persistencia (base de datos) — el contenido vive en código/JSON versionado.
- Autenticación o multi-tenant.
- Más de un tema de ejemplo.

## Fase 1 — Generador IA (futura, no iniciada)

Objetivo: que un usuario escriba un tema ("Explícame Zero Trust") y la app
genere un `animation-spec.json` + contenido de pasos válidos, usando un LLM.

Prerrequisitos que esta fase 0 ya deja resueltos:
- El contrato de salida (`animation-spec.json`) ya existe y está validado
  (`src/lib/animation-spec/loadSpec.ts`).
- El "prompt contract" ya está esbozado en
  `docs/ai-context/prompt-contracts.md` — falta implementarlo contra un
  proveedor real.

Cuando se inicie esta fase, agregar aquí: qué proveedor (Claude/OpenAI), cómo
se valida la salida antes de renderizar, y cómo se manejan specs inválidas o
temas fuera de dominio.

## Fase 2 — Librería de temas (futura, no iniciada)

Guardar y listar explicaciones generadas (galería), posiblemente con
persistencia. No diseñar todavía — mantener el alcance de esta fase 0
pequeño, según instrucción explícita del producto.
