# CoreSolutions Technical Explainer

Explicaciones visuales interactivas de conceptos técnicos complejos, para
conversaciones de venta consultiva de CoreSolutions. Next.js + TypeScript,
desplegable en Vercel.

- **¿Vas a desarrollar esto con ayuda de una IA (Claude, ChatGPT, etc.)?**
  Empieza por [`AI_WORKFLOW.md`](./AI_WORKFLOW.md).
- **¿Buscas contexto de producto?** [`docs/product/vision.md`](./docs/product/vision.md).
- **¿Qué marcas deben guiar los ejemplos?** [`docs/product/portfolio.md`](./docs/product/portfolio.md).
- **¿Cómo se declaran las marcas por tema?** [`docs/ai-context/brand-context.md`](./docs/ai-context/brand-context.md).
- **¿Estado actual del proyecto?** [`docs/ai-context/project-state.md`](./docs/ai-context/project-state.md).
- **¿Qué cambios tiene cada versión?** [`docs/CHANGELOG.md`](./docs/CHANGELOG.md).
- **¿Vas a revisar el ejemplo VCF?** [`docs/ai-context/vcf-technical-validation.md`](./docs/ai-context/vcf-technical-validation.md).
- **¿Vas a revisar vSphere HA?** [`docs/ai-context/vsphere-ha-technical-validation.md`](./docs/ai-context/vsphere-ha-technical-validation.md).
- **¿Vas a añadir fallos interactivos?** [`docs/ai-context/failure-scenarios.md`](./docs/ai-context/failure-scenarios.md).
- **¿Vas a presentar una explicación?** [`docs/ai-context/presentation-mode.md`](./docs/ai-context/presentation-mode.md).
- **¿Vas a crear un tema nuevo?** [`docs/ai-context/content-quality-gate.md`](./docs/ai-context/content-quality-gate.md).
- **¿Vas a revisar la vigencia y las fuentes de un tema?** [`docs/ai-context/technical-traceability.md`](./docs/ai-context/technical-traceability.md).
- **¿Vas a revisar Observabilidad?** [`docs/ai-context/observability-technical-validation.md`](./docs/ai-context/observability-technical-validation.md).
- **¿Vas a revisar Backup/DR?** [`docs/ai-context/backup-dr-technical-validation.md`](./docs/ai-context/backup-dr-technical-validation.md).
- **¿Vas a revisar ransomware?** [`docs/ai-context/ransomware-resilience-technical-validation.md`](./docs/ai-context/ransomware-resilience-technical-validation.md).
- **¿Vas a preparar una demo para cliente o técnico?** [`docs/ai-context/audience-modes-and-deep-links.md`](./docs/ai-context/audience-modes-and-deep-links.md).
- **¿Vas a diseñar un diagrama?** [`docs/ai-context/visual-language.md`](./docs/ai-context/visual-language.md).

## Correr localmente

Temas disponibles: `/explainer/vcf`, `/explainer/vsphere-ha`, `/explainer/vsan`,
`/explainer/nsx`, `/explainer/zero-trust`, `/explainer/kubernetes` y
`/explainer/observability`, `/explainer/backup-dr` y
`/explainer/ransomware-resilience`.
La validación técnica de vSphere HA está en
[`docs/ai-context/vsphere-ha-technical-validation.md`](./docs/ai-context/vsphere-ha-technical-validation.md).
La validación técnica de vSAN está en
[`docs/ai-context/vsan-technical-validation.md`](./docs/ai-context/vsan-technical-validation.md).
La validación técnica de NSX está en
[`docs/ai-context/nsx-technical-validation.md`](./docs/ai-context/nsx-technical-validation.md).
La validación técnica de Zero Trust está en
[`docs/ai-context/zero-trust-technical-validation.md`](./docs/ai-context/zero-trust-technical-validation.md).
La validación técnica de Kubernetes está en
[`docs/ai-context/kubernetes-technical-validation.md`](./docs/ai-context/kubernetes-technical-validation.md).
La validación técnica de Observabilidad está en
[`docs/ai-context/observability-technical-validation.md`](./docs/ai-context/observability-technical-validation.md).
La validación técnica de Backup/DR está en
[`docs/ai-context/backup-dr-technical-validation.md`](./docs/ai-context/backup-dr-technical-validation.md).
La validación técnica de ransomware está en
[`docs/ai-context/ransomware-resilience-technical-validation.md`](./docs/ai-context/ransomware-resilience-technical-validation.md).
En cada explicación, abre “Trazabilidad técnica” para ver la fecha de última
revisión, el alcance comprobado y las fuentes primarias con su fecha de consulta.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — landing con link al
prototipo de ejemplo en `/explainer/vcf`.

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run build      # build de producción
npm run start      # sirve el build de producción
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
```

## Desplegar en Vercel

1. Importa este repositorio en [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (autodetectado). No requiere variables de
   entorno en esta fase.
3. Deploy — sin configuración adicional.

## Estructura

Ver [`docs/ai-context/architecture.md`](./docs/ai-context/architecture.md)
para el detalle completo. Resumen:

```
app/                      rutas (App Router)
src/content/               contenido/copy por tema
src/components/explainer/  layout + motor visual del canvas
src/lib/animation-spec/    esquema y validación de animation-spec.json
docs/                      documentación de producto y para IA
docs/examples/vcf/         ejemplo de referencia completo
docs/examples/vsphere-ha/  segundo tema: recuperación ante fallos con HA
docs/examples/vsan/        tercer tema: objetos y protección de storage
docs/examples/nsx/         cuarto tema: tráfico y microsegmentación
docs/examples/zero-trust/  quinto tema: decisiones de acceso
docs/examples/kubernetes/   sexto tema: viaje de una aplicación
docs/examples/observability/ séptimo tema: de la petición a la evidencia
docs/examples/backup-dr/       octavo tema: de una copia a una recuperación comprobable
docs/examples/ransomware-resilience/ noveno tema: resiliencia frente a ransomware
```
