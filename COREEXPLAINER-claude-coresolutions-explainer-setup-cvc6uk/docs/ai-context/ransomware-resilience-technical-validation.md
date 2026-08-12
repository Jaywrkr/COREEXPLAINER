# Validación técnica — Resiliencia frente a ransomware

**Última revisión:** 2026-08-04  
**Estado:** `pending` — requiere revisión del especialista y del plan de
respuesta del cliente.

## Matriz de afirmaciones

| Afirmación | Fuente primaria | Límite |
|---|---|---|
| La reducción de riesgo combina prevención, mitigación y respuesta, no un solo producto | [CISA StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide), [Check Point Anti-Ransomware](https://www.checkpoint.com/solutions/ransomware-protection/anti-ransomware/) | El modelo no mide cobertura ni eficacia del entorno. |
| CISA recomienda copias offline o inmutables y probar restauraciones regularmente | [CISA Guide](https://www.cisa.gov/stopransomware/ransomware-guide), [CISA advisory](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-352a) | No sustituye políticas de credenciales, retención ni un ejercicio de DR. |
| Veeam puede hacer temporalmente inmutables archivos de backup en repositorios compatibles | [Veeam immutability](https://helpcenter.veeam.com/docs/vbr/userguide/immutability_hv.html?ver=13), [Veeam repositories](https://helpcenter.veeam.com/docs/vbr/userguide/backup_repository.html) | Depende de configuración, repositorio, licencia y versión. |
| IBM FlashSystem 9.1.1 incluye capacidades de detección de amenazas de ransomware | [IBM What's new in 9.1.1](https://www.ibm.com/docs/en/flashsystem-5x00/9.1.1?topic=guide-whats-new-in-911) | Validar familia, código, modelo y cómo se integra la señal en la operación. |
| Safeguarded Copy crea copias puntuales protegidas contra cambios o borrado malicioso | [IBM security overview](https://www.ibm.com/docs/en/flashsystem-9x00/9.1.2?topic=security-overview) | Una copia protegida no demuestra consistencia ni recuperación de aplicación. |
| Segmentación y Zero Trust ayudan a limitar movimiento lateral | [Check Point Anti-Ransomware](https://www.checkpoint.com/solutions/ransomware-protection/anti-ransomware/), [CISA Guide](https://www.cisa.gov/stopransomware/ransomware-guide) | Las reglas, rutas, identidades y dependencias deben probarse con tráfico real. |

## Reglas de precisión

- **Backup no es prevención:** una copia ayuda a recuperar, pero no impide la
  entrada ni contiene el atacante.
- **Inmutabilidad no es limpieza:** impide ciertos cambios o borrados durante
  una retención; aún hay que elegir y verificar un punto confiable.
- **Detección no es respuesta:** una señal necesita responsable, procedimiento,
  permisos y tiempo de reacción.
- **Segmentación no es aislamiento absoluto:** una regla amplia, credencial
  privilegiada o dependencia no inventariada puede reabrir el camino.
- No se afirma que la combinación de marcas sea una integración certificada.

La alineación comercial está en [`docs/product/portfolio.md`](../product/portfolio.md)
y el contrato común de marcas en [`docs/ai-context/brand-context.md`](brand-context.md).
