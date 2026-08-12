# Revisión UI — Glosario contextual

**Fecha:** 2026-08-06  
**Producto:** CORESOLUTIONS Technical Explainer  
**Estado:** aplicada en v0.60.0

## Objetivo

Permitir que una persona no experta entienda una sigla o término sin abandonar la escena ni abrir un documento separado.

## Resultado aplicado

El catálogo común `src/components/explainer/GlossaryText.tsx` reconoce términos frecuentes como VM, VCF, HA, RPO, RTO, SAN, NAS, VLAN, API, SLO, APM, OTLP, HCL, LUN, VIP, failover y runbook. Cada coincidencia se presenta como `<abbr>` con definición sencilla, tooltip nativo y foco de teclado.

La anotación se reutiliza en:

- título, tagline, pasos y valor de negocio;
- escenarios de fallo y sus cuatro fases;
- fichas de nodo y resumen técnico;
- diagnósticos de integridad del diagrama.

## Criterio de diseño

No se agregan párrafos ni paneles permanentes: la definición aparece solo cuando la persona la solicita con hover o foco. El catálogo es explícito y extensible; un término no incluido conserva su texto original para evitar definiciones automáticas imprecisas.

## Límite

El glosario explica el concepto general, no promete una implementación concreta ni reemplaza la fuente técnica del tema. Las definiciones de productos, versiones o licencias deben seguir en la trazabilidad de cada explicación.

## Validación ejecutada

- `npm run typecheck`
- `npm run lint`
- `npm run build`
