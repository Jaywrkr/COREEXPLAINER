# Storyboard — Backup y Disaster Recovery

**Revisión del storyboard:** 2026-08-04  
**Audiencia:** cliente primero; modo Técnico disponible para revisar dependencias.  
**Marcas del patrón:** VMware/Broadcom, Lenovo, Veeam e IBM. Aruba HPE y Check
Point aparecen como dependencias de red y seguridad durante la prueba de
recuperación.

## Alcance

Este ejemplo explica cómo pasar de objetivos de continuidad a una recuperación
comprobada. Es un patrón comercial ilustrativo, no un diseño final ni una
matriz de compatibilidad. Las versiones declaradas en la ficha técnica son las
consultadas el 2026-08-04; hay que confirmar release, HCL, licencias, soporte,
retención, capacidad y RPO/RTO del cliente antes de ofertar.

## Secuencia narrativa

1. **Objetivos:** el servicio y el análisis de impacto fijan RPO/RTO y el
   criterio de aceptación.
2. **Protección:** VMs sobre VMware vSphere/VCF y Lenovo ThinkSystem se
   protegen con Veeam Backup & Replication hacia un repositorio.
3. **Copias protegidas:** el diseño añade inmutabilidad y/o copias protegidas
   en IBM FlashSystem, separando dominios de fallo y credenciales.
4. **Recuperación:** un incidente activa una decisión, restore o replicación,
   y la puesta en marcha en un sitio alterno con sus dependencias.
5. **Prueba y límites:** se ensayan jobs, repositorio, enlace, capacidad,
   red, seguridad, consistencia de aplicación y evidencia del RTO.

## Qué no afirma

- Una snapshot o una réplica por sí sola no equivale a backup histórico ni a
  protección contra ransomware.
- Veeam, IBM, VMware, Lenovo, Aruba HPE y Check Point no forman una integración
  universal por el hecho de aparecer juntos; la compatibilidad se valida por
  versión, edición y diseño.
- La animación no calcula un RPO/RTO, SLA, sizing, licenciamiento ni éxito de
  restauración. Solo hace visibles los componentes y puntos de fallo.

## Fuentes

La matriz completa, con enlaces, fecha de consulta y límites de cada afirmación
está en [`docs/ai-context/backup-dr-technical-validation.md`](../../ai-context/backup-dr-technical-validation.md).
