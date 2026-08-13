# Architecture Studio · generación conceptual con IA

La ruta `/architecture` parte de un canvas vacío. El usuario describe el entorno y la necesidad del cliente; una API de IA del lado del servidor genera un borrador visual exclusivamente con el catálogo lógico autorizado de CORESOLUTIONS.

El usuario puede arrastrar nodos, editar su nombre, reemplazarlos por otro bloque autorizado y crear/editar conexiones. Cada conexión vuelve a validarse: sus extremos deben existir y los puertos deben usar el mismo medio/protocolo (salvo gestión sobre Ethernet). Una salida de IA que no respete estas reglas se bloquea antes de llegar al canvas.

## Configuración

En Vercel, agregar `OPENAI_API_KEY` como variable de entorno de **Production** y **Preview**. No usar `NEXT_PUBLIC_`: la clave se lee solamente desde `app/api/architecture/generate/route.ts`. `OPENAI_ARCHITECTURE_MODEL` es opcional y permite elegir un modelo aprobado por la cuenta.

Si la generación falla, el Studio muestra una causa segura y accionable: `401` señala clave inválida, `403` permisos insuficientes, `404` modelo no disponible y `429` facturación o límite de uso. El detalle operativo sin secretos queda en los Runtime Logs de Vercel.

El catálogo en `src/lib/architecture/studio.ts` es la autoridad del Studio. Para sumar un producto, un ingeniero debe definir su vendor, rol, puertos lógicos permitidos, fuentes oficiales/HCL y pruebas de validación antes de habilitarlo a la IA.

No selecciona modelos físicos, licencias, releases, firmware, HCL, IPs, reglas, sizing ni topologías de producción. La compatibilidad exacta (modelo, firmware, ópticas, cableado, longitudes, release y HCL) continúa sujeta a diseño y validación humana con evidencia oficial.
