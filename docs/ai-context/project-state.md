# Estado del proyecto

**Actualizacion v0.192.0 (11-08-2026):** `technicalIntegrityAssuranceIssues` conecta el content gate con `assurance`: perfiles `source-backed`/`reviewed` requieren fuentes en reglas de evidencia; escenas con solo nodos declarativos siguen siendo válidas. La regresión `test:technical-integrity-gate` protege que la UI no muestre confianza superior al contrato.

**Actualizacion v0.191.0 (11-08-2026):** `SceneAssuranceBadge` muestra bajo demanda la cobertura declarada de la escena. Cliente ve una lectura conceptual; técnico puede consultar assurance, comprobaciones, hallazgos y fuentes declaradas. El texto evita confundir integridad del modelo con monitoreo o validación del entorno real.

**Actualizacion v0.190.0 (11-08-2026):** `NodeDetailCard` recibe la escena y deriva las conexiones del nodo seleccionado. En cliente resume hasta tres relaciones en lenguaje sencillo; en técnico muestra todas y su tipo (`data`, `control`, `storage`, `dependency`, `failure`). La lectura sigue siendo del diagrama autorado, no telemetría observada.

**Actualizacion v0.189.0 (11-08-2026):** `CanvasViewControls` reduce el ruido inicial del canvas en modo cliente con un control `details` para zoom/reset. El modo técnico conserva la barra completa. No cambia el motor de interacción: arrastre, selección, rueda, teclas `+/-/0` y reset siguen funcionando.

**Actualizacion v0.188.0 (11-08-2026):** el modo cliente usa `ClientStoryCard` como entrada narrativa compacta: idea, cambio esperado y pregunta de decision. La explicacion larga ya no se repite en la primera lectura; el detalle adicional queda bajo demanda. Modos conceptual/tecnico mantienen sus superficies completas.

**Actualizacion v0.187.0 (11-08-2026):** `PatternLibrary` permite buscar y filtrar patrones por texto y marca, y comparar como maximo dos lado a lado. `patternComparison.ts` mantiene la seleccion pura y sus regresiones. La comparacion organiza evidencia y riesgos; no afirma compatibilidad ni sustituye una validacion de arquitectura.

**Actualizacion v0.186.0 (11-08-2026):** `productTelemetry.ts` normaliza eventos locales, limita retención a 500 y agrega métricas de temas únicos, escenas, escenarios, presentaciones, Focus, workflows y exportaciones. `UsageMetricsPanel` permite exportar/borrar JSON local; no existe envío remoto.

**Actualizacion v0.185.0 (11-08-2026):** `AI_MAX_ESTIMATED_COST_USD` permite rechazar solicitudes cuyo coste estimado exceda un tope explícito, antes del proveedor. `CopilotPolicy` expone el cap; sin tarifas de entrada/salida no se inventa precio y siguen aplicando tokens/cuota.

**Actualizacion v0.184.0 (11-08-2026):** `/api/copilot` usa `readJsonBody` con límite de 18 KB y sanitiza pregunta/contexto mediante `sanitizeCopilotInput` antes de llamar al proveedor. Redacta Bearer tokens, claves, secretos, passwords y tokens comunes; no guarda prompts ni credenciales. Es defensa en profundidad, no DLP.

**Actualizacion v0.183.0 (11-08-2026):** `reviewCampaign.ts` genera snapshots Markdown/JSON de la campaña local. `ReviewCampaignSummary` permite descargarlos con versión y fecha; el contenido declara límites, faltantes y posible información interna, sin convertir el export en aprobación o sincronización remota.

**Actualizacion v0.182.0 (11-08-2026):** `ReviewCampaignSummary` agrega los seguimientos locales de la cola especialista y muestra sin asignar, en revisión, bloqueados, vencidos y listos para PR. Usa `assessTechnicalReviewAssignment`, no muta `reviewStatus` y no interpreta el estado local como aprobación.

**Actualizacion v0.181.0 (11-08-2026):** `reviewAssignment.ts` define el contrato puro del seguimiento especialista. “Listo para PR” requiere responsable, fecha, nota, evidencia de cierre y checklist de narrativa, diagrama, fuentes, escenarios y ledger; estados incompletos se degradan a `in-review`. `TechnicalReviewAssignment` conserva el alcance local y no sustituye aprobación formal.

**Actualizacion v0.180.0 (11-08-2026):** `EvidenceMapPanel` expone bajo demanda el ledger tipado de la escena: afirmación, evidencia solicitada, tipo, procedencia y enlaces fuente. Filtra la escena actual y el escenario seleccionado; deja claro que es un contrato autorado, no evidencia observada del cliente.

**Actualizacion v0.179.0 (11-08-2026):** `PresentationHud` lleva los controles de presentación al canvas, entra en Focus preservando el estado anterior y auto-oculta el chrome después de 3.2 s de inactividad. Movimiento del puntero lo revela; Escape y teclado siguen funcionando.

**Actualizacion v0.178.0 (11-08-2026):** `ToolDrawer` agrupa las herramientas opcionales del explainer (copiloto, evidencia, soporte, workflow y paquetes) bajo demanda. Cliente inicia limpio; técnico puede abrir el grupo por defecto. La explicación, navegación y diagrama permanecen visibles.

**Actualizacion v0.177.0 (11-08-2026):** `SceneTimeline` ofrece navegación contextual por escenas dentro del canvas, con `aria-current`, progreso y estado completado. Se mantiene compacta, desplazable horizontalmente y disponible en Focus/móvil.

**Actualizacion v0.176.0 (11-08-2026):** `ExplainerLayout` ofrece Focus canvas, HUD contextual y persistencia local de ancho/modo. La preferencia se normaliza en `src/lib/ui/preferences.ts`; `F` alterna el foco y el botón devuelve el panel sin perder la escena.

**Actualizacion v0.175.0 (11-08-2026):** `buildImplementationWorkPackage` incluye la revisión especialista como condición de readiness. Con `reviewStatus: pending`, el paquete declara el faltante y el informe no lo presenta como técnicamente listo; la estructura editorial se mantiene separada de la aprobación real.

**Actualizacion v0.174.0 (11-08-2026):** `implementation-readiness-report.ts` genera un índice JSON/Markdown de los 22 explainers con readiness, workstreams, impactos, alto riesgo, escenarios enlazados y faltantes. CI conserva el artefacto para priorizar trabajo técnico; no opera ni certifica entornos.

**Actualizacion v0.173.0 (11-08-2026):** `test:implementation-work-package` recorre los 22 explainers y exige marcas, workstreams, impactos con cardinalidad consistente, fuentes y evidencia/rollback. El paquete de implementación/mantenimiento queda protegido a nivel de catálogo, no solo en VCF.

**Actualizacion v0.172.0 (11-08-2026):** `usageTelemetry` separa uso de IA por superficie (`copilot|creator|unknown`), normaliza datos y descarta deltas negativos. El dashboard ofrece resumen JSON y borrado local; no hay envío de telemetría ni sustitución de la cuota/facturación del proveedor.

**Actualizacion v0.171.0 (11-08-2026):** `calculateTechnicalCoverage` y el informe técnico cuentan `impactCount`, `highRiskImpactCount` e `impactsWithScenarios`, derivados de `buildImplementationWorkPackage`. El dashboard los muestra como indicadores editoriales; el informe JSON usa `schemaVersion: 1.3`.

**Actualizacion v0.170.0 (11-08-2026):** `impactReview.ts` añade revisión local de `changeImpacts` con estados `pending|reviewed|blocked|accepted`, nota mínima para aceptar, resumen de avance y exportación Markdown/JSON. El estado vive en `localStorage`, no sincroniza ni autoriza cambios.

**Actualizacion v0.169.0 (11-08-2026):** el paquete técnico incluye `changeImpacts` (`schemaVersion: 1.1`) por workstream, con riesgo, dependencias de marcas, escenarios/nodos afectados, rollback conceptual y evidencia antes/después. Se deriva del contenido autorado y mantiene límites no operacionales.

**Actualizacion v0.168.0 (11-08-2026):** `buildImplementationWorkPackage` convierte cada explainer en una ficha conceptual de implementación/mantenimiento con prerrequisitos, workstreams, evidencia de aceptación, controles y readiness. La UI ofrece Markdown/JSON bajo demanda; el artefacto no ejecuta acciones, no cambia infraestructura y requiere adaptación al runbook aprobado.

**Actualizacion v0.167.0 (11-08-2026):** el workflow de calidad ejecuta las regresiones de contratos del copiloto, catálogo de patrones, simulación de fallos, frescura de fuentes y consistencia de versión. `CONTRIBUTING.md` y la plantilla de PR reflejan el mismo gate para que cada rama preserve las garantías técnicas; no se despliega ni se ejecutan acciones operativas.

**Actualizacion v0.166.0 (11-08-2026):** `currentVersion`, `changelogEntries[0]`, `package.json`, lockfile e informes se validan como una sola versión; la regresión `test:version-consistency` evita volver a mostrar una release antigua.

**Actualizacion v0.165.0 (11-08-2026):** `buildSupportCaseJson` genera un handoff local versionado (`schemaVersion: 1.0`) con draft, readiness, triage y ledger de evidencia; la UI ofrece descarga JSON además de Markdown.

**Actualizacion v0.164.0 (11-08-2026):** `assessSupportCaseReadiness` calcula un porcentaje y faltantes para el handoff local; la UI los muestra y el Markdown los declara. No bloquea la descarga ni implica resolución del caso.

**Actualizacion v0.163.0 (11-08-2026):** `SupportCaseDraft` conserva `evidenceReceived`, `checkResult` y `escalationDecision` (`pending|continue|escalate`); la UI local y el Markdown de handoff los exponen sin conexión operacional.

**Actualizacion v0.162.0 (11-08-2026):** `AI_PERSISTENT_QUOTA_REQUIRED=true` hace que `/api/copilot` y `/api/creator` respondan `503` si la cuota Redis configurada no está disponible; por defecto continúa el fallback process-local. `/api/health` expone `shared-redis-required`.

**Actualizacion v0.161.0 (11-08-2026):** `deriveSourceValidity` recalcula la vigencia contra una ventana de 180 días; una fuente `current` antigua pasa a `review-needed` durante `enrichTechnicalReview` y alimenta el backlog. No se descargan URLs.

**Actualizacion v0.160.0 (11-08-2026):** `calculateTechnicalCoverage` expone `scenarioCoveragePercent`, `scenariosWithPartialCoverage` y `scenariosWithNoCoverage`; el panel muestra madurez agregada para priorizar soporte. El indicador es editorial y no mide producción.

**Actualizacion v0.159.0 (11-08-2026):** `validateFailureSimulationProfile` exige parámetros coherentes por modo de escenario y bloquea combinaciones ambiguas antes del registro. La simulación sigue siendo conceptual: no mide ni ejecuta cambios en producción.

**Actualizacion v0.158.0 (11-08-2026):** `validateSolutionPatterns` valida la biblioteca de patrones antes de construir el registro: IDs, campos, listas de evidencia/riesgos, fechas y slugs de explainers. Un patrón inválido bloquea el build; el catálogo continúa siendo conceptual y requiere evaluación del cliente.

**Actualizacion v0.157.0 (11-08-2026):** el endpoint del copiloto recibe `allowedActionIds` del explainer y usa `sanitizeCopilotActions` para aceptar únicamente IDs autorados de fuentes/escenarios, con etiquetas normalizadas y máximo tres acciones. La allowlist es defensiva; no confía en URLs del modelo ni ejecuta operaciones.

**Actualizacion v0.156.0 (11-08-2026):** las acciones de revisión tienen una decisión local (`status`, nota/evidencia y `updatedAt`). Resolver exige evidencia mínima; el exportador la incluye. Se mantiene compatibilidad con claves de estado previas y no existe sincronización ni aprobación automática.

**Actualizacion v0.155.0 (11-08-2026):** `buildReviewActions` deriva acciones `scenario-readiness` desde `buildScenarioReadinessQueue`; la cola técnica las muestra, permite seguimiento local y las exporta junto al backlog existente. Son acciones de contenido/revisión, no operativas.

**Actualizacion v0.154.0 (11-08-2026):** `ScenarioReadinessQueue` permite descargar el backlog editorial como Markdown mediante `buildScenarioReadinessMarkdown`, conservando porcentaje, faltantes y enlaces. La salida no aprueba contenido ni sincroniza estados externos.

**Actualizacion v0.153.0 (11-08-2026):** `ScenarioReadinessQueue` muestra por escenario el porcentaje de madurez y los faltantes concretos, con enlace al explainer. `buildScenarioReadinessQueue` reutiliza las mismas cuatro condiciones que la cobertura y solo orienta trabajo editorial; CI ejecuta `test:scenario-readiness`.

**Actualizacion v0.152.0 (11-08-2026):** `calculateTechnicalCoverage` mide madurez de escenarios mediante perfiles de simulación, flujo guiado, evidencia y fuentes vigentes. Dashboard e informe muestran escenarios listos para soporte; el cálculo sigue siendo determinista y no representa salud de producción.

**Actualizacion v0.151.0 (11-08-2026):** `validateExplainerContent` ejecuta `buildEvidenceLedger` y `validateEvidenceLedger` como regla de publicación. IDs duplicados, evidencia vacía o `sourceIds` desconocidos ahora son errores estructurales; la revisión humana pendiente permanece como warning. `validate:content` mantiene 22 explainers válidos.

**Actualizacion v0.150.0 (11-08-2026):** `buildEvidenceLedger` normaliza pasos, escenarios, roadmap y decisiones en registros tipados (`documentary`, `observed`, `hypothesis`, `acceptance`) con fuentes y procedencia. `validateEvidenceLedger` detecta vacios, duplicados y fuentes desconocidas; el handoff de soporte incluye el ledger y CI ejecuta `test:evidence-ledger`.

**Actualizacion v0.149.0 (11-08-2026):** `SupportCasePackPanel` permite construir localmente un handoff de soporte con contexto del caso y una ruta del brief de triage. `buildSupportCaseMarkdown` normaliza campos, incluye fuentes y limites, y no ejecuta acciones ni envia datos a un backend. CI ejecuta `test:support-case-pack`.

**Actualizacion v0.148.0 (11-08-2026):** el panel `SupportTriagePanel` convierte escenarios y escenas en un brief de soporte no operacional: síntoma, capa probable, evidencia a solicitar, comprobación segura y criterio de escalamiento. `buildSupportTriageBrief` es determinista, marca rutas `authored` o `derived` y permite descargar Markdown con límites explícitos. CI ejecuta `test:support-triage`.

**Actualizacion v0.147.0 (11-08-2026):** el generador de borradores IA devuelve `policy.mode: draft-only`, tokens estimados, maximo de salida y coste opcional. La UI deja claro que el resultado requiere validacion especialista y no se publica ni ejecuta automaticamente.

**Actualizacion v0.146.0 (11-08-2026):** el Copiloto expone una politica `read-only` con acciones allowlisted, tokens estimados, maximo de salida y coste estimado si el despliegue configura tarifas. La UI la muestra antes/despues de la consulta y no añade acciones operativas.

**Actualizacion v0.145.0 (11-08-2026):** el dashboard muestra cobertura tecnica del catalogo (revision humana, fuentes vigentes, escenarios de fallo, roadmap, assurance de integridad, warnings y acciones). `calculateTechnicalCoverage` es un calculo puro reutilizado por el informe JSON.

**Actualizacion v0.144.0 (11-08-2026):** la cola de revision exporta un Markdown por explainer con acciones, prioridad, evidencia, fuentes y el estado local de cada accion. El contrato puro `buildReviewActionMarkdown` filtra URLs inseguras y deja esos IDs como texto.

**Actualizacion v0.143.0 (11-08-2026):** cada accion del backlog visible en el dashboard tiene seguimiento local por accion (`pending`, `in-progress`, `resolved`). La clave incluye explainer y actionId; los valores desconocidos vuelven a `pending`. Es solo este navegador y no altera el estado editorial.

**Actualizacion v0.142.0 (11-08-2026):** el dashboard muestra el backlog tecnico sugerido en un bloque colapsado por explainer. La UI, el informe JSON y el Markdown reutilizan `buildReviewActions`; CI valida que las acciones tengan evidencia y sourceIds existentes.

**Actualizacion v0.141.0 (11-08-2026):** el informe JSON y el paquete de auditoria exponen `actions[]` por explainer. El backlog deriva acciones no operativas de revision pendiente, fuentes `review-needed`, advertencias semanticas y perfiles de integridad cuya assurance aun no es `reviewed`; cada accion conserva motivo, evidencia y sourceIds.

**Actualizacion v0.140.0 (10-08-2026):** el informe de revision tecnica expone la matriz completa de fuentes por explainer (ID, titulo, URL segura, fecha, publisher, producto, version, referencia y vigencia). El Markdown del paquete incluye la misma evidencia para que soporte pueda localizar exactamente que referencia debe actualizarse.

**Actualizacion v0.139.0 (10-08-2026):** `report:technical-review:package` genera un paquete para soporte/auditoria con Markdown, JSON y `manifest.json`. El manifiesto conserva version, resumen y hashes SHA-256; CI publica el directorio completo y ejecuta su regresion offline.

**Actualizacion v0.138.0 (10-08-2026):** el informe JSON de revision tecnica declara `schemaVersion: 1.0` y la version de aplicacion (`appVersion`). La regresion protege estos metadatos para que futuros consumidores automatizados puedan detectar cambios de contrato.

**Actualizacion v0.137.0 (10-08-2026):** `npm run test:technical-review-report` ejecuta el informe JSON y valida parseo, resumen de 22 explainers, regla de prioridad, campos esenciales y orden descendente. CI lo ejecuta en cada PR.

**Actualizacion v0.136.0 (10-08-2026):** `report:technical-review:json` expone el resumen, filas y regla de prioridad en JSON. CI publica Markdown y JSON en el mismo artefacto para consumo humano y automatizado.

**Actualizacion v0.135.0 (10-08-2026):** `npm run test:review-priority` cubre la regla compartida por la cola y el informe de revisión. CI y el runbook local ejecutan el test para evitar divergencias de score.

**Actualizacion v0.134.0 (10-08-2026):** la cola `TechnicalReviewQueue` reutiliza `getReviewPriority`, el mismo score del informe CLI, y muestra prioridad/fuentes por confirmar por explainer. El orden es informativo y no aprueba contenido.

**Actualizacion v0.133.0 (10-08-2026):** GitHub Actions guarda `technical-review-report.md` como artefacto identificable por `run_id`, con retención de 14 días. Así el especialista puede descargar el mismo informe generado por el PR.

**Actualizacion v0.132.0 (10-08-2026):** `npm run report:technical-review` produce una tabla reproducible de prioridad para los explainers, combinando estado editorial, fuentes `review-needed`, advertencias, escenarios, integridad y roadmap. CI la genera como orientación; no aprueba contenido.

**Actualizacion v0.131.0 (10-08-2026):** las exportaciones del Workbench incluyen versión de aplicación y fecha ISO de generación, permitiendo identificar el release usado en un ticket o handoff.

**Actualizacion v0.130.0 (10-08-2026):** `isSafeHttpUrl` limita los enlaces de fuente del Workbench y sus exportaciones a `http`/`https`. Una URL insegura o malformada no se vuelve enlace; la regresión offline cubre `javascript:`.

**Actualizacion v0.129.0 (10-08-2026):** el exportador Markdown incluye las URLs del catálogo para cada `sourceId` con coincidencia exacta. Las referencias desconocidas siguen sin URL inventada y se mantienen como pendientes.

**Actualizacion v0.128.0 (10-08-2026):** los IDs de fuente de cada tarea del Workbench enlazan a la URL del catálogo cuando existe una coincidencia exacta; los IDs desconocidos permanecen como texto para no inventar referencias.

**Actualizacion v0.127.0 (10-08-2026):** cada tarea del Workbench expone sus IDs de fuente en la UI y el resumen usa el lenguaje `tareas con fuentes por confirmar`, evitando confundir tareas pendientes con fuentes únicas.

**Actualizacion v0.126.0 (10-08-2026):** el workflow `.github/workflows/quality.yml` y el runbook local ejecutan `npm run test:workbench-export`, protegiendo el contrato de exportación Markdown en cada PR y push a `main`.

**Actualizacion v0.125.0 (10-08-2026):** la exportación Markdown del Workbench se genera mediante `src/lib/workbench/exportMarkdown.ts`, compartida por las salidas focalizada y completa. `npm run test:workbench-export` cubre estados, fuentes pendientes y normalización de saltos de línea sin depender del navegador.

**Actualizacion v0.124.0 (10-08-2026):** el Workbench ofrece dos salidas: la vista actual para compartir un hallazgo focalizado y el paquete completo con las cuatro vistas. Ambas conservan estados, fuentes y límites; ninguna ejecuta acciones.

**Actualizacion v0.123.0 (10-08-2026):** el Technical Workbench añade la vista `Validar`. Resume el estado de revisión humana, vigencia de fuentes y contratos de integridad declarados para las escenas como checklist exportable; no ejecuta validaciones ni convierte el estado local en aprobación.

**Actualizacion v0.122.0 (10-08-2026):** el Workbench resume el progreso local entre Implementar, Soportar y Mantener. Su descarga genera un paquete completo con estado por tarea y una sección de fuentes por confirmar, incluyendo tareas sin fuente o fuentes `review-needed`; sigue siendo conceptual y no ejecuta cambios.

**Actualizacion v0.121.0 (10-08-2026):** el Workbench muestra `brandContext` con nombre y rol, y aplana los `guidedSteps` de cada escenario en tareas de soporte con tipo, instrucción, esperado, evidencia y fuentes. La exportación Markdown mantiene ese alcance de portafolio.

**Actualizacion v0.120.0 (10-08-2026):** `TechnicalWorkbenchPanel` reutiliza `targetArchitecture.roadmap`, pasos, escenarios y fuentes para ofrecer vistas conceptuales de Implementar, Soportar y Mantener. El progreso se guarda localmente por explainer y el usuario puede descargar Markdown con evidencia y límites; no ejecuta cambios ni certifica producción.

**Actualizacion v0.119.0 (10-08-2026):** `CONTRIBUTING.md` centraliza el flujo de ramas `codex/`, PR, documentación/versionado, quality gate, revisión técnica, secretos de IA y política de Vercel. Reitera que `reviewStatus: pending` no se cambia mediante automatización.

**Actualizacion v0.118.0 (10-08-2026):** `.github/pull_request_template.md` convierte el checklist técnico en parte del flujo de merge: exige fuentes y fecha, coherencia de nodos/aristas/animación/texto, escenarios con límites y evidencia, controles de IA, validaciones locales y responsable humano.

**Actualizacion v0.117.0 (10-08-2026):** Dependabot queda configurado semanalmente para npm y GitHub Actions con grupos separados de producción/desarrollo. `SECURITY.md` dirige los reportes por GitHub Security Advisories y prohíbe compartir claves, tokens, prompts o datos de clientes en issues públicos.

**Actualizacion v0.116.0 (10-08-2026):** `.github/workflows/quality.yml` protege cada PR y push a `main` con `npm ci`, `npm audit --omit=dev --audit-level=high`, validación de 22 explainers, `test:ai-guards`, typecheck, lint y build. El job usa Node 20, permisos `contents: read`, timeout de 10 minutos y cancelación por rama.

**Actualizacion v0.115.0 (10-08-2026):** `npm run test:ai-guards` ejecuta regresiones offline para asegurar que no se invente un coste sin tarifas, que el fallback de Redis funcione sin variables y que `/api/health` no-cachee ni exponga secretos. Las variables de entorno se restauran al terminar.

**Actualizacion v0.114.0 (10-08-2026):** `/api/health` devuelve una señal operativa sin secretos: versión, IA habilitada/configurada, modo de cuota (`shared-redis` o `process-local`) e identidad HMAC configurada. Es dinámico y usa `no-store`, por lo que sirve para comprobar un despliegue de Vercel sin mostrar tokens ni prompts.

**Actualizacion v0.113.0 (10-08-2026):** `package.json` limita los overrides de `postcss@8.5.26` y `sharp@0.35.3` al árbol transitivo de `next@15.5.22`. `npm audit --omit=dev --audit-level=high` no reporta vulnerabilidades de producción y el build se mantiene verde. Next.js 16 no se introduce automáticamente; requiere una migración separada.

**Actualizacion v0.112.0 (10-08-2026):** `persistentQuota` usa `@upstash/redis` cuando existen `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`. Las ventanas de diez minutos comparten solicitudes y tokens entre instancias serverless; sin esas variables se mantiene el fallback en memoria. La clave combina la identidad HMAC validada o la IP y no almacena prompts.

**Actualizacion v0.111.0 (10-08-2026):** `endpointGuard` puede derivar una clave de cuota por usuario a partir de `x-coresolutions-user` y `x-coresolutions-user-signature`, verificadas con HMAC-SHA256 usando `AI_IDENTITY_SIGNING_SECRET`. Sin firma válida usa el fallback por IP. El gateway debe eliminar cualquier header recibido del navegador e inyectar los suyos; la app no confía en un identificador libre.

**Actualizacion v0.110.0 (10-08-2026):** el generador de explainers (`/api/creator` y `ExplainerDraftCreator`) devuelve y registra el uso del proveedor, incluyendo tokens y coste estimado cuando hay tarifas configuradas. La telemetría se comparte con Copilot en `localStorage`; los fallos incrementan el contador y la plantilla local sigue diferenciada de una generación IA.

**Actualizacion v0.109.0 (10-08-2026):** Copilot calcula un coste estimado solo cuando el despliegue configura `AI_INPUT_COST_PER_MILLION_USD` y `AI_OUTPUT_COST_PER_MILLION_USD`. Las tarifas no se hardcodean para evitar precios obsoletos; el total se devuelve con la respuesta, se acumula en la telemetría local y se muestra en el panel. Es una estimación orientativa, no facturación ni cuota persistente multiusuario.

**Actualizacion v0.108.0 (10-08-2026):** `TechnicalReviewPacketDownload` incluye el seguimiento local guardado por `TechnicalReviewAssignment` en el Markdown exportado. Se lee al hacer click, no se transmite y mantiene el carácter no aprobatorio del paquete.

**Actualizacion v0.107.0 (10-08-2026):** `TechnicalReviewAssignment` permite registrar localmente responsable, fecha objetivo, notas y estado de seguimiento por explainer. Se guarda solo en `localStorage`; “listo para PR” no cambia `reviewStatus` ni publica contenido.

**Actualizacion v0.106.0 (10-08-2026):** la cola de revisión enlaza al explainer real; las fichas `docs/...` se muestran como rutas de repositorio porque no son rutas públicas de Next/Vercel. El paquete exportado usa la misma referencia sin afirmar que exista una URL desplegada.

**Actualizacion v0.105.0 (10-08-2026):** la cola técnica ofrece `TechnicalReviewPacketDownload`, que genera un Markdown con alcance, fuentes, advertencias, checklist y campos de resultado. Es una salida editable para el especialista y no modifica `reviewStatus`.

**Actualizacion v0.104.0 (10-08-2026):** `TechnicalReviewQueue` muestra en el dashboard los explainers con `reviewStatus: pending`, ordenados por fecha declarada, con alcance, fuentes, advertencias del gate y enlaces a su ficha técnica. Es una cola informativa; la aprobación sigue requiriendo revisión humana y cambio explícito de contenido.

**Actualizacion v0.103.0 (10-08-2026):** las fuentes `k8s-ingress`, `coresolutions-profile`, `ibm-partner`, `veeam-storage`, `lenovo-veeam` e `ibm-lpm-concept` quedaron conectadas a pasos u objetivos que las usan. `npm run validate:content` mantiene solo advertencias de revisión técnica pendiente.

**Actualizacion v0.102.0 (10-08-2026):** el escenario `directory-unavailable` de NAS/private cloud ahora apunta a un nodo `Active Directory` marcado como `killable`, haciendo coherentes la simulación y la topología visual.

**Actualizacion v0.101.0 (10-08-2026):** `Scene.allowIsolatedNodes` documenta topologías desconectadas intencionales, como los silos iniciales de VCF. El content gate sigue validando endpoints y referencias; la excepción solo evita tratar una escena conceptual de “antes” como un nodo olvidado.

**Actualizacion v0.100.0 (10-08-2026):** el content gate semántico acepta referencias de texto a nodos por nombre o ID, y valida `affectedNodes` contra ambos campos. Esto reduce falsos positivos sin relajar los errores de endpoints desconocidos.

**Actualizacion v0.99.0 (09-08-2026):** `endpointGuard` reserva el coste estimado de cada consulta del copiloto por IP y ventana antes de llamar al proveedor. `AI_TOKEN_BUDGET_PER_WINDOW` (por defecto 12.000) y `AI_MAX_OUTPUT_TOKENS` (por defecto 700, máximo 1.200) son límites de seguridad de instancia; el exceso devuelve `429` con `Retry-After`. Para cuotas multiusuario se requiere identidad y almacenamiento persistente.

**Actualizacion v0.98.0 (09-08-2026):** `productTelemetry` registra localmente eventos de navegación, escenarios, workflow, briefs y borradores. `UsageMetricsPanel` muestra un resumen en el dashboard y permite borrar los datos; no hay envío externo.

**Actualizacion v0.97.0 (09-08-2026):** `solutionPatterns` y `PatternLibrary` incorporan patrones reutilizables de CORESOLUTIONS con problema, resultado, marcas, señales, evidencia, riesgos, explainers y fecha de revisión.

**Actualizacion v0.96.0 (09-08-2026):** `usageTelemetry` registra localmente consultas, fallos y tokens del copiloto. `/api/copilot` devuelve uso agregado del proveedor; la UI no persiste prompts ni respuestas fuera del navegador.

**Actualizacion v0.95.0 (09-08-2026):** el copiloto devuelve `CopilotAction` filtradas (`open-source` o `activate-scenario`). `CopilotPanel` solo muestra botones si el ID existe en las fuentes o escenarios actuales; la acción requiere click explícito y no ejecuta cambios remotos.

**Actualizacion v0.94.0 (09-08-2026):** `ContentWorkflowPanel` muestra y persiste localmente el estado de cada explainer: borrador, revisión técnica, fuentes, comercial, aprobado, publicado o revisión vencida. El avance queda bloqueado cuando la revisión editorial está pendiente o hay fuentes `review-needed`.

**Actualizacion v0.93.0 (09-08-2026):** `FailureScenario.simulation` permite perfiles `hard-down`, `degraded`, `latency`, `capacity`, `dependency` y `observability`. `evaluateWhatIfImpact` conserva reachability y añade impacto, capacidad, latencia y dependencia; los escenarios antiguos usan `hard-down` por defecto.

**Actualizacion v0.92.0 (09-08-2026):** `EvidenceTrackerPanel` materializa evidencia de pasos guiados y fases de roadmap como registros con tipo, detalle, fuentes y estado pendiente/validada/bloqueada. Se persiste localmente por explainer y escenario.

**Actualizacion v0.91.0 (09-08-2026):** `validateExplainerContent` añade checks semánticos: cobertura de fuentes, nodos aislados, alineación de pasos con nombres del diagrama y coherencia entre escenarios y nodos interactivos. `npm run validate:content` imprime las advertencias por explainer para resolverlas por lotes.

**Actualizacion v0.90.0 (09-08-2026):** `/api/copilot` y `/api/creator` usan `endpointGuard`: límite de tamaño declarado, rate limit temporal por IP, activación opcional con `AI_ENDPOINT_ENABLED` y timeout de 25 s hacia el proveedor. Los errores se presentan de forma segura.

**Actualizacion v0.89.0 (09-08-2026):** los escenarios what-if muestran una lectura asistida calculada desde el grafo: significado para el cliente, evidencia a revisar y decisiones/roadmap relacionados. `whatIfImpactAssistant` no ejecuta pruebas ni consulta plataformas.

**Actualizacion v0.88.0 (09-08-2026):** el dashboard incluye `ExplainerDraftCreator`. Recibe tema, audiencia, marcas y objetivo; genera tres escenas, riesgos, preguntas, gaps y fuentes a confirmar mediante `/api/creator` o plantilla local. Descarga JSON editable y no publica contenido automáticamente.

**Actualizacion v0.87.0 (09-08-2026):** `AssessmentBriefControl` genera localmente un brief Markdown por explainer con preguntas, escenas, evidencia, fases, riesgos, decisiones, fuentes y límites. Es una salida editable para workshops/propuestas y no sube datos del cliente.

**Actualizacion v0.86.0 (09-08-2026):** cada explicación tiene un copiloto grounded bajo demanda. `CopilotPanel` envía pregunta y contexto autorado a `/api/copilot`; el servidor exige `OPENAI_API_KEY`, limita tamaños y ordena responder con fuentes, límites y evidencia. Sin clave, la app sigue funcionando y muestra un mensaje de configuración.

**Actualizacion v0.85.0 (09-08-2026):** cada explainer tiene una revisión técnica asistida bajo demanda. El motor local inspecciona integridad, arquitectura objetivo, roadmap, decisiones, escenarios y vigencia de fuentes; devuelve hallazgos con severidad, evidencia y acción. Es una base determinista y grounded para futuras capacidades de IA.

**Actualizacion v0.84.0 (09-08-2026):** el laboratorio de decisiones muestra las fases de roadmap enlazadas como controles accionables. Desde una opción seleccionada se puede marcar cada fase como revisada, no aplica o pendiente; el estado se conserva localmente.

**Actualizacion v0.83.0 (09-08-2026):** las opciones de decisión de Instana, Turbonomic y webMethods enlazan `roadmapPhaseIds` además de sus escenarios. El laboratorio puede llevar al usuario desde una alternativa hasta la fase y evidencia que debe comprobar.

**Actualizacion v0.82.0 (09-08-2026):** Instana, Turbonomic y webMethods declaran roadmaps de assessment por dominio. Cada uno ordena la evaluacion en tres fases con objetivo, evidencia, criterio de salida y fuentes; se muestran bajo demanda en la comparacion de arquitectura.

**Actualizacion v0.81.0 (09-08-2026):** Instana, Turbonomic y webMethods usan laboratorios de decisiones autorados con escenarios de validación. El usuario puede navegar de la opción elegida al fallo que debe comprobar.

**Actualizacion v0.80.0 (09-08-2026):** las opciones de decisión pueden enlazar `roadmapPhaseIds` y `scenarioIds`. La UI muestra esas relaciones y permite abrir escenarios; el content gate valida referencias.

**Actualizacion v0.79.0 (09-08-2026):** `targetArchitecture.decisionOptions` alimenta un laboratorio de decisiones bajo demanda. VCF ofrece opciones autoradas con beneficios, trade-offs y evidencia; no hay puntuación automática.

**Actualizacion v0.78.0 (09-08-2026):** el progreso de `targetArchitecture.roadmap` se incluye en la ficha HTML y el resumen de sesión, junto con el estado, evidencia y salida de cada fase.

**Actualizacion v0.77.0 (09-08-2026):** las fases de `targetArchitecture.roadmap` tienen estado local pendiente/revisada/no aplica por explicación y escenario. El avance se muestra bajo demanda.

**Actualizacion v0.76.0 (09-08-2026):** `targetArchitecture.roadmap` permite declarar fases de assessment con objetivo, evidencia, criterio de salida y fuentes. La comparación de VCF muestra el primer roadmap autorado bajo demanda.

**Actualizacion v0.75.0 (09-08-2026):** existe `npm run validate:content`, un comando independiente que importa el registro, ejecuta el content gate y las regresiones, y confirma el número de explainers sin levantar Next.js.

**Actualizacion v0.74.0 (09-08-2026):** el registro ejecuta `assertTargetArchitectureRegression` junto con las regresiones de integridad. Se cubren objetivos válidos, fuentes desconocidas y contratos incompletos.

**Actualizacion v0.73.0 (09-08-2026):** `validateExplainerContent` valida `targetArchitecture`: campos obligatorios, cambios esperados, IDs duplicados y fuentes existentes. Un objetivo roto bloquea el build.

**Actualizacion v0.72.0 (09-08-2026):** backup/DR, ransomware, SAN y Kubernetes declaran `targetArchitecture`. La comparación editorial cubre continuidad, ciberresiliencia, storage y plataforma cloud-native.

**Actualizacion v0.71.0 (09-08-2026):** Instana, Turbonomic y webMethods usan `targetArchitecture` con objetivos autorados, cambios esperados, límites y fuentes. La comparación sigue siendo conceptual y bajo demanda.

**Actualizacion v0.70.0 (09-08-2026):** `ExplainerMeta.targetArchitecture` permite declarar objetivos autorados con resumen, cambios esperados, limites y fuentes. VCF es el primer explainer que lo usa; la UI lo muestra solo dentro de la comparacion actual/objetivo.

**Actualizacion v0.69.0 (09-08-2026):** los escenarios tienen una comparacion actual/objetivo bajo demanda. Objetivo es la escena base documentada; actual es el grafo tras retirar los nodos del escenario. No se inventa un target de diseño.

**Actualizacion v0.68.0 (09-08-2026):** el resumen de escenario ofrece `Descargar ficha HTML`, un archivo autonomo generado en el navegador con checklist, hallazgos, fuentes y limites. No hay subida ni persistencia remota.

**Actualizacion v0.67.0 (09-08-2026):** cada escenario activo incluye un resumen de sesion bajo demanda: pasos revisados, hallazgos abiertos, criticos y fuentes enlazadas. Se mantiene local y conceptual.

**Actualizacion v0.66.0 (09-08-2026):** los escenarios guiados incluyen un checklist local de verificacion. Cada paso puede quedar pendiente, revisado o no aplica; el estado se guarda por `slug` y escenario en `localStorage`, sin backend.

**Actualizacion v0.65.0 (09-08-2026):** los hallazgos del contrato tecnico conservan `sourceIds` y `nodeIds`. El panel de escenarios muestra los enlaces de fuente bajo demanda, manteniendo la interfaz compacta.

**Actualizacion v0.64.0 (09-08-2026):** los escenarios combinan las reglas generales de `evaluateTechnicalRules.ts` con los diagnosticos del contrato tecnico por escena (`evaluateTopologyIntegrity`). Las relaciones y caminos requeridos por dominio se muestran como evidencia accionable sin convertir el diagrama en una validacion de produccion.

**Actualización v0.63.0 (09-08-2026):** los impactos what-if generan reglas técnicas accionables en `src/lib/semantic-model/evaluateTechnicalRules.ts`: severidad, detalle, evidencia y recomendación. El panel las muestra bajo demanda y mantiene los límites de simulación conceptual.

**Actualización v0.51.0 (06-08-2026):** el selector de audiencia ofrece Cliente, Conceptual y Técnico. Cliente prioriza impacto, Conceptual explica relaciones principales y Técnico muestra auditoría, evidencia y límites. El mismo nivel viaja en `mode=` dentro de los enlaces directos.

**Actualización v0.50.0 (05-08-2026):** la marca visible se normalizó a `CORESOLUTIONS` en interfaz, metadatos, contenidos y documentación. Se mantienen en minúsculas los identificadores técnicos, rutas, URLs y nombres de paquete para no romper referencias.

**Actualización v0.49.0 (05-08-2026):** cada explicación ofrece `Favorito` y `Revisado`. El estado se conserva localmente por `slug` en el navegador; no hay autenticación, backend ni sincronización entre dispositivos. El contrato está documentado en `docs/ai-context/feedback-and-progress.md`.

**Actualización v0.48.0 (05-08-2026):** en modo Cliente el canvas prioriza zoom, paneo y reproducción. Leyenda, capas, escenarios de fallo e integridad técnica se agrupan en `Más herramientas`; el contexto se revela automáticamente cuando existe un escenario activo o una alerta del modelo.

**Actualización v0.47.0 (05-08-2026):** el modo Cliente muestra primero una idea clave y el valor para el cliente, dejando el detalle adicional bajo demanda. Trazabilidad se abre dentro del flujo de la columna, con scroll y ajuste de texto para no quedar cortada. `SceneEngine` calcula el tamaño de cada nodo a partir de sus líneas de texto y reutiliza esa geometría para aristas, clics y controles de fallo.

**Actualización v0.46.0 (05-08-2026):** el catálogo documental normaliza publisher, producto, versión o referencia, fecha de consulta y vigencia para cada fuente. La UI expone esos datos en Trazabilidad y marca `review-needed` cuando una fuente queda fuera de la ventana de revisión.

**Actualización v0.45.0 (05-08-2026):** vSphere HA, Kubernetes, Migración e Implementation Lifecycle pasan a `source-backed`, con fuentes técnicas específicas por escena. El sistema cubre ahora observabilidad, storage, continuidad, red, seguridad, plataforma y ciclo de entrega con el mismo contrato de trazabilidad.

**Actualización v0.44.0 (05-08-2026):** LAN/SAN, SD-WAN, Zero Trust, Ransomware Resilience y Check Point HA pasan a `source-backed`, con fuentes técnicas específicas por escena. La cobertura documental no se presenta como certificación del entorno real.

El batch v0.43.0 también cubre Backup/DR con fuentes técnicas específicas por escena.

**Actualización v0.43.0 (05-08-2026):** vSAN, SAN Storage, Veeam Protection, Active-Active DC, NAS/Private Cloud e IBM Power/AIX pasan a `source-backed`, con fuentes técnicas específicas por escena. El panel sigue diferenciando evidencia documental de una revisión especialista.

**Actualización v0.42.0 (05-08-2026):** Observability, Instana, Turbonomic y webMethods pasan a `source-backed`, con reglas por escena vinculadas a fuentes técnicas existentes. `baseline` sigue reservado para temas que aún necesitan una revisión documental específica.

**Actualización v0.41.0 (05-08-2026):** el registro ejecuta fixtures de regresión del evaluador técnico durante el build. Se cubren caso válido, relación incorrecta, nodo faltante, camino roto por falla, nodo aislado y arista colgante.

**Actualización v0.40.0 (05-08-2026):** el panel de integridad se revela automáticamente al activar fallos simulados, mostrando nodos inactivos, caminos afectados y siguiente paso. Se compacta al limpiar el impacto.

**Actualización v0.39.0 (05-08-2026):** cada diagnóstico técnico muestra un siguiente paso conceptual. Las recomendaciones no ejecutan cambios y orientan hacia la validación o el runbook correspondiente.

**Actualización v0.38.0 (05-08-2026):** la integridad técnica recibe los nodos inactivos de escenarios y fallas manuales, recalcula caminos y muestra el impacto simulado en el panel. No se presenta como monitorización real.

**Actualización v0.37.0 (05-08-2026):** los diagnósticos técnicos con `sourceIds` muestran enlaces directos a su evidencia. Los enlaces se abren en otra pestaña y no interfieren con el foco de nodos del canvas.

**Actualización v0.36.0 (05-08-2026):** cada perfil de integridad declara su profundidad (`baseline` o `reviewed`) y el panel la muestra junto al dominio y el estado. Esto evita presentar la línea base de los temas nuevos como una auditoría especialista.

**Actualización v0.35.0 (05-08-2026):** el evaluador del canvas detecta componentes aislados y relaciones colgantes. Los aislados son advertencias y solo se exceptúan cuando la escena declara que está explicando aislamiento; las aristas inválidas son errores.

**Actualización v0.34.0 (05-08-2026):** el quality gate de integridad técnica ahora exige cobertura por escena, valida que nodos y reglas existan en el animation spec y bloquea explainers sin perfil. El catálogo completo pasa typecheck, lint y build.

**Actualización v0.33.0 (05-08-2026):** el motor de integridad técnica se extendió a los 22 explainers del catálogo. Cada escena tiene una línea base de componentes, relaciones y caminos esperados; VCF y NSX mantienen contratos más profundos de red. El panel etiqueta el dominio técnico correspondiente y la documentación está en `docs/ai-context/technical-integrity.md`.

**Actualización v0.32.0 (05-08-2026):** se incorporó un motor de integridad
técnica del modelo de red. VCF y NSX declaran contratos por escena con nodos,
relaciones y caminos esperados; el canvas muestra el resultado y puede enfocar
los nodos de un diagnóstico. Esta capa valida el diagrama representado, no una
red real ni telemetría en vivo.

**Actualización v0.31.0 (05-08-2026):** los overlays de leyenda/capas y
escenarios de fallo se pueden arrastrar dentro del espacio del diagrama, con
lÃ­mites al canvas y un asa de arrastre separada de sus botones. La columna
izquierda se compactÃ³ visualmente para priorizar escena, narrativa e impacto
sin eliminar la evidencia ni los controles existentes.

**Actualización v0.30.0 (05-08-2026):** la cabecera de cada explainer agrupa en
una sola línea el enlace de escena, las marcas y la trazabilidad; el selector
Cliente/Técnico y el modo presentación son más compactos. Cada tema ofrece un
botón para volver al dashboard `/explainer`, la leyenda del canvas inicia
minimizada y el control global de versión ocupa menos espacio.

**Actualización v0.29.0 (05-08-2026):** VCF es el primer explainer con fases
authored de diagnóstico. Sus escenarios de fallo incluyen checkpoints de
hipótesis, feedback, foco alternativo del diagrama y fuentes técnicas por fase.
El contrato de decisiones y sus reglas está en
`docs/ai-context/guided-scenarios.md`.

**Actualización v0.28.0 (05-08-2026):** el motor de escenarios guiados añade
fases de observación, diagnóstico, recuperación y validación. El panel muestra
evidencia, resultado esperado y limitaciones, mientras el canvas enfoca los
nodos relevantes. Los escenarios existentes usan un fallback de cuatro pasos;
los nuevos pueden declarar `guidedSteps` específicos. El contrato está en
`docs/ai-context/guided-scenarios.md`.

**Actualización v0.27.0 (05-08-2026):** se añadieron los explainers
`/explainer/instana`, `/explainer/turbonomic` y `/explainer/webmethods`.
Cada uno documenta cinco escenas, cuatro fallos interactivos, fuentes IBM
revisadas el 2026-08-05 y límites de edición, release, cobertura y ejecución.

**Actualización v0.26.0 (05-08-2026):** batch de cinco explainers orientados a
cliente: migración sin interrupción, Check Point HA, SD-WAN, IBM Power/AIX y
ciclo de implementación. Cada uno mantiene cinco escenas, cuatro fallos
interactivos, contexto de marcas y trazabilidad técnica revisada el 2026-08-05.

**Estado v0.25.0 (05-08-2026)**: cada explicación puede alternar entre modo
Cliente y Técnico y compartir enlaces directos a escenas y escenarios. Se mantiene
el séptimo tema independiente
`/explainer/observability` sobre recorrido de peticiones, señales,
OpenTelemetry Collector y diagnóstico. Cada explicación muestra trazabilidad técnica
con fecha de revisión, alcance y fuentes consultadas. Se mantiene el tema independiente
`/explainer/kubernetes` con cinco escenas, cuatro escenarios de límites y
documentación técnica en `docs/ai-context/kubernetes-technical-validation.md`.

El octavo tema `/explainer/backup-dr` explica continuidad, backup y
recuperación con VMware/Broadcom, Lenovo, Veeam e IBM, y documenta Aruba HPE y
Check Point como dependencias de red/seguridad. El portafolio canónico está en
`docs/product/portfolio.md`; toda nueva sesión debe leerlo antes de crear un
tema.

Todos los explainers declaran ahora `brandContext` y muestran la ficha “Marcas
del patrón”. El contrato está en `docs/ai-context/brand-context.md` y el
registro comercial en `docs/product/portfolio.md`.

El noveno tema `/explainer/ransomware-resilience` explica prevención, detección,
contención, recuperación limpia y validación frente a ransomware. Se mantiene
separado de Backup/DR para no presentar una copia como prevención o detección.

Se incorporó el resumen sanitizado de proyectos reales en
`docs/product/coresolutions-project-patterns.md`, con capacidades observadas y
backlog de explainers derivados del CSV de planificación.

El décimo tema `/explainer/san-storage` explica las capas de una SAN, el
provisionamiento de volúmenes, mapping, multipath, migración y replicación con
IBM, Lenovo y VMware/Broadcom como contexto de marca.

Se añadió un batch de cuatro explainers: `/explainer/veeam-protection`,
`/explainer/active-active-dc`, `/explainer/lan-san` y
`/explainer/nas-private-cloud`.

Los deployments automáticos de Vercel quedaron desactivados mediante
`vercel.json`; la publicación se hará manualmente por batch. El flujo está en
`docs/ai-context/vercel-deployment-policy.md`.

> Actualiza este archivo cada vez que termines una tarea significativa. Es
> lo primero que debe leer la siguiente sesión de IA (ver `AI_WORKFLOW.md`).

**Última actualización**: 2026-08-04 — v0.15.0: modos de audiencia Cliente/Técnico y enlaces directos a escenas y escenarios + explainer independiente de Observabilidad basado en OpenTelemetry y Prometheus + evidencia técnica por escena mediante referencias a fuentes concretas + trazabilidad técnica visible por explicación, con fecha de revisión, alcance y fuentes enlazadas + explainers independientes de Zero Trust y Kubernetes + panel de escenarios minimizable y navegación sin CTAs comerciales + explainers independientes de vSphere HA, vSAN y NSX + lenguaje visual de diagramas + control de calidad de contenido + modo presentación + escenarios interactivos de fallo + hover de relaciones + precisión técnica de VCF +
changelog visible y versionado documentado.
Actualización adicional 2026-08-04 — v0.17.0: contexto de marcas declarado y visible por explicación.
Actualización adicional 2026-08-04 — v0.18.0: nuevo explainer de resiliencia frente a ransomware.
Actualización adicional 2026-08-04 — v0.19.0: patrones reales de proyectos y backlog comercial-técnico.
Actualización adicional 2026-08-04 — v0.20.0: nuevo explainer de Storage SAN empresarial.
Actualización adicional 2026-08-04 — v0.24.0: batch de cuatro explainers de infraestructura.
Actualización adicional 2026-08-05 — v0.25.0: política de deploy manual para proteger la cuota de Vercel.
**Actualización adicional 2026-08-04 — v0.16.0:** se añadió el explainer de Backup/DR y el registro canónico del portafolio de marcas CORESOLUTIONS.

## Qué está hecho

- **App Next.js 15 + TypeScript (strict) + Tailwind**, App Router, sin
  backend ni base de datos. Build (`npm run build`), typecheck
  (`npm run typecheck`) y lint (`npm run lint`) pasan limpios.
- **Paleta y tipografía de marca** aplicadas de forma consistente en
  Tailwind (`tailwind.config.ts`), CSS global (`app/globals.css`) y canvas
  (`src/components/explainer/engine/palette.ts`) — ver
  `docs/product/brand.md`.
- **Layout de dos columnas** (`ExplainerLayout` + `LeftPanel` +
  `VisualCanvas`) con branding, chip de categoría, título, contenido por
  paso, navegación anterior/siguiente y dots de progreso.
- **Motor de canvas genérico** (`SceneEngine`,
  `src/components/explainer/engine/sceneEngine.ts`): dibuja nodos y
  aristas, simula paquetes viajando con tasa de emisión (`rps`), fan-out,
  barras de capacidad/uso (`capacity`/`rx`), y soporta "matar"/"revivir"
  nodos con clic (simulación de fallas) — verificado interactivamente en
  navegador (Playwright), incluyendo el toggle de falla.
- **`animation-spec.json` v1.0**: esquema definido
  (`src/lib/animation-spec/types.ts`), validado en runtime
  (`src/lib/animation-spec/loadSpec.ts`), documentado
  (`docs/ai-context/animation-guidelines.md`).
- **Ejemplo completo funcionando**: VMware Cloud Foundation, ruta
  `/explainer/vcf`. Contenido en `src/content/vcf.ts`, spec visual en
  `docs/examples/vcf/animation-spec.json`, storyboard narrativo en
  `docs/examples/vcf/storyboard.md`. 4 pasos: problema → solución →
  arquitectura (con simulación de falla de host) → resultado.
- **Estructura documental completa** (`AI_WORKFLOW.md` + `docs/product/*` +
  `docs/ai-context/*` + `docs/examples/vcf/*`), incluida la decisión
  arquitectónica clave (D1 en `decisions.md`): la IA generará
  `animation-spec.json`, nunca HTML/JS libre.
- Landing (`/`) simple con link al ejemplo.
- **Íconos por `kind` de nodo** (`src/components/explainer/engine/icons.ts`):
  un glifo vectorial dibujado en canvas por cada `NodeKind` (hub para
  control-plane, rack para compute, platters para storage, mini-topología
  para network, play-frame para workload, flecha-boundary para external).
  No hay íconos por nodo individual ni assets externos — un tema nuevo los
  hereda automáticamente al usar los `kind` existentes.
- **Catálogo de temas con categorías**: `src/content/registry.ts` centraliza
  todos los temas (`ExplainerDefinition[]`: slug, category, meta, steps,
  spec ya validado). `/explainer` es un dashboard que agrupa por categoría
  (`ExplainerCategory` en `src/content/types.ts`) y enlaza a
  `/explainer/[slug]` (ruta dinámica única, con `generateStaticParams` —
  reemplazó la carpeta `app/explainer/vcf/`). Agregar un tema nuevo ya no
  requiere crear una ruta: solo una entrada en el registro (ver
  `docs/ai-context/architecture.md`).
- **Modo claro/oscuro**: toggle global (esquina superior derecha, en todas
  las páginas), sin flash del tema incorrecto al cargar, persistido en
  `localStorage`. Paleta como variables CSS por tema
  (`app/globals.css`) + `src/components/explainer/engine/palette.ts` para
  el canvas (que no puede leer CSS). Navy/accent/éxito/advertencia/error
  son iguales en ambos temas — solo fondo/panel/texto se invierten. Ver
  `docs/product/brand.md` ("Modo claro/oscuro") antes de tocar cualquier
  color.
- **Versión y changelog (v0.13.1)**: control flotante global abajo a la
  izquierda. Abre un panel con historial, se cierra con Escape y toma sus
  datos de `src/content/changelog.ts`. La versión técnica del paquete, la UI
  y el registro Markdown se actualizan de forma coordinada; ver
  `docs/ai-context/release-versioning.md`.
- **Trazabilidad técnica (v0.15.0)**: cada tema declara `lastReviewedAt`, un
  alcance explícito y una lista de fuentes HTTPS con su fecha de consulta. La
  ficha desplegable “Trazabilidad técnica” lo muestra junto al guion y el gate
  de contenido valida que no falte ni tenga fechas o enlaces inválidos.
- **Evidencia por escena (v0.15.0)**: cada paso declara `sourceIds` y la ficha
  muestra primero las fuentes que respaldan la escena activa.
- **Audiencias y enlaces profundos (v0.15.0)**: el selector Cliente/Técnico
  cambia el nivel de detalle y la URL conserva `scene`, `scenario` y `mode`.
  Ver `docs/ai-context/audience-modes-and-deep-links.md`.
- **Auditoría técnica de VCF**: el ejemplo ahora se presenta explícitamente
  como modelo conceptual. Se corrigieron afirmaciones absolutas sobre consola
  única, failover, SLA y camino de datos; se separó el clúster de cómputo del
  plano de gestión y se documentó la matriz de fuentes en
  `docs/ai-context/vcf-technical-validation.md`.
- **Hover de relaciones**: al mover el cursor sobre un nodo, sus aristas y
  vecinos directos se resaltan y los elementos no relacionados se atenúan.
  Funciona con pan/zoom y se limpia al salir o cambiar de escena. Ver
  `docs/ai-context/hover-highlighting.md`.
- **Escenarios interactivos de fallo**: el contenido puede declarar escenarios
  guiados por escena, con nodos afectados, explicación y limitaciones. VCF
  incluye fallas de uno o varios hosts y pérdida del plano de gestión. Ver
  `docs/ai-context/failure-scenarios.md`. El panel puede minimizarse sin
  restaurar el escenario activo.
- **Navegación sin CTA comercial**: los ejemplos solo muestran navegación por
  pasos y presentación; no renderizan botones de agenda o evaluación.
- **Modo presentación guiada**: permite activar autoplay, pausar, reiniciar y
  recorrer los pasos con teclado (`←/→`, `Home`, `End`, `Space`, `Escape`). La
  reproducción se detiene al cambiar manualmente de paso o llegar al final.
  Ver `docs/ai-context/presentation-mode.md`.
- **Control de calidad de contenido**: el registro valida profundidad mínima,
  referencias a escenas, IDs, escenarios de fallo y documentación técnica.
  Los errores bloquean el build; `reviewStatus` distingue estructura completa
  de revisión especialista pendiente. Ver
  `docs/ai-context/content-quality-gate.md`. Cada tema también declara la
  fecha de revisión, alcance y fuentes consultadas, visibles en su ficha.
- **Lenguaje visual de diagramas**: cada relación declara si representa datos,
  control, storage, dependencia o fallo. La leyenda permite filtrar capas y
  relaciones sin cambiar la simulación interna. Ver
  `docs/ai-context/visual-language.md`.
- **Segundo tema**: vSphere HA y recuperación ante fallos está disponible en
  `/explainer/vsphere-ha`, con storyboard y matriz técnica propios.
- **Tercer tema**: vSAN y protección de objetos está disponible en `/explainer/vsan`,
  con cinco escenas, escenarios de fallo y matriz técnica propios.
- **Cuarto tema**: NSX y tráfico/microsegmentación está disponible en `/explainer/nsx`,
  con cinco escenas, escenarios de fallo y matriz técnica propios.
- **Quinto tema**: Zero Trust y decisiones de acceso está disponible en
  `/explainer/zero-trust`, con cinco escenas, escenarios de fallo y matriz
  técnica basados en NIST/CISA.
- **Sexto tema**: Kubernetes y el viaje de una aplicación está disponible en
  `/explainer/kubernetes`, con cinco escenas, escenarios de fallo y matriz
  técnica basada en documentación oficial de Kubernetes.
- **Séptimo tema**: Observabilidad y el camino de la petición a la evidencia
  está disponible en `/explainer/observability`, con cinco escenas,
  escenarios de fallo y matriz técnica basada en OpenTelemetry y Prometheus.
- **Detalle de nodos**: al hacer clic en una tarjeta del canvas aparece una
  ficha contextual con su `kind`, función genérica, `subtitle`, capacidad,
  tasa de emisión y posibilidad de simular falla. Clic fuera cierra la ficha;
  cambiar de escena reinicia la selección. Ver
  `docs/ai-context/node-details.md` antes de modificar esta interacción.

## Navegación de canvas recién incorporada

- **Pan/zoom del diagrama**: el ejemplo VCF ya permite arrastrar para mover,
  usar rueda/trackpad o controles `−`/`+` para zoom (65%–250%) y restablecer
  el encuadre. Cambiar de escena reinicia el viewport. Un clic sin arrastre
  conserva la simulación de matar/revivir nodos. Ver
  `docs/ai-context/canvas-navigation.md` antes de tocar esta capa.

## Qué falta (fuera de alcance de esta fase, deliberadamente)

- **Generador con IA** (fase 1): no hay API de OpenAI/Claude conectada, no
  hay UI para escribir un tema y generarlo. Ver
  `docs/product/mvp.md` y `docs/ai-context/prompt-contracts.md` (borrador
  sin implementar).
- Hay siete temas conceptuales (VCF, vSphere HA, vSAN, NSX, Zero Trust,
  Kubernetes y Observabilidad). No hay galería ni persistencia.
- Logo real de CORESOLUTIONS (hoy es un bloque de texto "COI" provisional,
  ver `src/components/explainer/BrandMark.tsx`).
- El layout de dos columnas oculta el canvas en pantallas angostas
  (`md:` breakpoint) — no hay una versión mobile del diagrama; aceptable
  para esta fase (uso previsto es laptop/proyector en reunión).
- No se ha desplegado a Vercel todavía desde este repo (código listo, sin
  probar el deploy real).
- **Pulido pendiente de los ejemplos**: cerrar la selección de versión objetivo
  de VCF y revisar ambas matrices técnicas con especialistas del entorno del
  cliente. Después conviene elegir el siguiente satélite (vSAN, NSX o ciclo de
  vida) sin mezclarlo dentro del diagrama principal de VCF.

## Cómo continuar (siguiente sesión)

La base ya contiene siete temas conceptuales (VCF, vSphere HA, vSAN, NSX, Zero Trust, Kubernetes y Observabilidad). El siguiente
tema debe reutilizar el registro, el quality gate y la gramática visual; no
debe mezclar detalles especializados dentro del grafo principal de VCF.

1. Si el pedido es "agregar un tema nuevo" (ej. SD-WAN, Zero Trust): seguir
   la guía en `docs/ai-context/architecture.md` ("Cómo agregar un tema
   nuevo manualmente"). No se necesita generador IA para esto — se puede
   escribir a mano igual que VCF.
2. Si el pedido es "conectar el generador IA": empezar por
   `docs/ai-context/prompt-contracts.md`, definir el proveedor, e
   implementar una función `parseExplainerContent()` análoga a
   `parseAnimationSpec()` antes de aceptar cualquier salida de un LLM.
3. Si el pedido es "desplegar en Vercel": seguir `README.md` → "Desplegar
   en Vercel". No requiere variables de entorno en esta fase.
4. Antes de escribir código nuevo, releer `docs/ai-context/decisions.md` —
   en particular D1 y D2 — para no reintroducir HTML/JS libre por tema ni
   volver a un modelo de "un solo grafo con estados".

## Comandos de verificación

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev   # http://localhost:3000/explainer/vcf
```
