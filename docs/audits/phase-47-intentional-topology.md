# Fase 47 — Topología intencional en el content gate

Fecha de revisión: 2026-08-10  
Versión: 0.101.0

## Hallazgo

La primera escena de VCF muestra cómputo, storage, red y equipo TI como silos sin relaciones. El gate la reportaba igual que un nodo olvidado, aunque la desconexión es el punto narrativo que la escena debe comunicar.

## Cambio

`Scene.allowIsolatedNodes` permite declarar esa intención en el contrato de animación. VCF lo activa únicamente en `silos`; las escenas posteriores siguen sujetas a la comprobación de grado y relaciones.

## Límites

La marca no permite endpoints desconocidos, nodos duplicados ni escenarios incoherentes. Tampoco certifica que la arquitectura sea correcta: solo separa una topología pedagógica “antes” de un defecto accidental.

## Verificación

- `npm run validate:content`
- `npm run typecheck`
- `npm run build`
- Revisar manualmente que `allowIsolatedNodes` no aparezca en escenas que pretendan representar una ruta operativa conectada.
