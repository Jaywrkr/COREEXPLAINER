# Fase 171 — Coherencia de nodos en escenarios de fallo

Fecha: 2026-08-11  
Versión: 0.225.0

## Objetivo

Evitar que una animación marque un nodo como caído mientras la narrativa del escenario describe otros nodos afectados. Esa divergencia confunde al cliente y puede ocultar una hipótesis técnicamente distinta.

## Cambios aplicados

- `validateFailureScenarioNodeConsistency` cruza cada `deadNodeId` con los nodos de la escena.
- El nodo caído debe aparecer en `affectedNodes` por su ID o por el nombre visible del diagrama.
- IDs de nodo duplicados generan un error de validación.
- Se corrigió el escenario Kubernetes `insufficient-resources`, que omitía `Nodo worker 1` en `affectedNodes` aunque declaraba `node1` como caído.
- La regresión unitaria cubre duplicados, coincidencia por nombre y ausencia del nodo afectado; la validación completa cubre los 22 explainers.

## Límites técnicos

El gate verifica consistencia entre datos autorados; no determina si una caída es posible en el entorno del cliente, ni calcula capacidad, quorum, RTO/RPO o recuperación real. Es una barrera de calidad narrativa y de integridad del diagrama.

## Verificación

```text
npm run test:failure-simulation-validation
npm run validate:content
npm run typecheck
npm run lint
npm run test:version-consistency
npm run build
```
