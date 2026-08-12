# Fase 37 — Content gate semántico

Fecha de revisión: 2026-08-09  
Versión: 0.91.0

## Objetivo

Detectar incoherencias que un contrato TypeScript no puede detectar: texto que no habla del diagrama, fuentes desconectadas, escenarios que nombran componentes inexistentes y fallos simulados sobre nodos no interactivos.

## Controles aplicados

- cobertura de fuentes usadas por pasos, escenarios, target y decisiones;
- nodos aislados de todas las relaciones;
- pasos que no mencionan ningún nombre visible de su escena;
- `deadNodeIds` que no son `killable`;
- `affectedNodes` que no identifican un componente visible;
- endpoints de relación desconocidos como error estructural.

## Resultado actual

La validación continúa pasando los 22 explainers, pero ahora imprime 84 advertencias editoriales existentes. Esto es intencional: la deuda queda visible sin bloquear todo el catálogo de una vez. Se resolverá por lotes y los controles críticos podrán promoverse a error después de corregir el contenido.

## Siguiente lote

Corregir primero escenarios con `affectedNodes` no alineados, fuentes desconectadas y nodos no `killable`; después revisar los pasos que no nombran nodos.
