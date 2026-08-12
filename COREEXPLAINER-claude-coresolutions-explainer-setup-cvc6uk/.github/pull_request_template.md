## Objetivo

<!-- ¿Qué problema de CORESOLUTIONS resuelve este cambio y para quién? -->

## Alcance

- [ ] La explicación, escena o UI afectada está indicada.
- [ ] El cambio no introduce claims de producto sin fuente oficial.
- [ ] Si cambia contenido técnico, se actualizó `reviewStatus`, fecha y auditoría correspondiente.

## Rigor técnico

- [ ] Fuentes oficiales y fecha de última revisión verificadas.
- [ ] Nodos, aristas, animación y texto describen el mismo flujo.
- [ ] Escenarios de fallo identifican impacto, límites y evidencia esperada.
- [ ] Se diferenciaron hechos, inferencias y validaciones pendientes.

## Seguridad y operación

- [ ] No se añadieron secretos, prompts de clientes ni datos de producción.
- [ ] Las acciones de IA siguen siendo allowlistadas y reversibles.
- [ ] Si se modificó consumo de IA, se revisaron tokens, coste y cuotas.
- [ ] No se habilitó un deployment automático de Vercel por accidente.

## Verificaciones

- [ ] `npm run validate:content`
- [ ] `npm run test:ai-guards`
- [ ] Regresiones técnicas específicas de la fase (incluyendo `npm run test:version-consistency` cuando aplique)
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm audit --omit=dev --audit-level=high`

## Revisión humana

- Responsable técnico: <!-- nombre o equipo -->
- Explain­er(s) revisado(s): <!-- slug(s) -->
- Resultado: <!-- aprobado / cambios solicitados / pendiente -->
- Evidencia o enlace al paquete de revisión: <!-- URL o ruta -->

## Notas para el merge

<!-- Riesgos, migraciones, variables de entorno y pasos posteriores. -->
