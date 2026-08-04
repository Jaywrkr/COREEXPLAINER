# Storyboard — Resiliencia frente a ransomware

**Revisión:** 2026-08-04  
**Audiencia:** cliente primero; detalle técnico disponible en el modo Técnico.  
**Marcas del patrón:** Check Point, VMware/Broadcom, Aruba HPE, Veeam, IBM y
Lenovo.

## Diferencia frente a Backup/DR

Backup/DR explica cómo proteger y recuperar un servicio. Este tema explica el
ciclo de un incidente de ransomware: reducir oportunidades de entrada,
detectar señales, contener el movimiento lateral, proteger las copias y probar
una recuperación limpia. Tener ambos temas evita vender backup como si fuera un
control preventivo o de detección.

## Secuencia

1. **Prevención:** exposición, identidad, endpoint, red y workloads.
2. **Detección:** señales de endpoint, red e IBM FlashSystem llegan a un equipo
   que puede investigar y escalar.
3. **Contención:** se aíslan identidades, segmentos y administración de backup
   para reducir el radio de explosión.
4. **Recuperación:** Veeam y copias offline/inmutables permiten reconstruir en
   una sala limpia de Lenovo/VMware, si el diseño y las pruebas lo permiten.
5. **Validación:** un ejercicio produce evidencia, hallazgos y ajustes para la
   próxima prueba.

## Límites

- No se representa una campaña concreta, malware específico ni una promesa de
  detección automática.
- Las marcas aparecen como roles de un patrón comercial; la compatibilidad,
  licencia, cobertura, HCL y diseño deben validarse por cliente.
- La animación no ejecuta cuarentenas, no escanea imágenes y no certifica que
  un punto de restauración esté limpio.

La matriz de afirmaciones y fuentes está en
[`docs/ai-context/ransomware-resilience-technical-validation.md`](../../ai-context/ransomware-resilience-technical-validation.md).
