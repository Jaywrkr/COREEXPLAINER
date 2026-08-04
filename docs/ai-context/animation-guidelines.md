# Guía del motor de animación y formato `animation-spec.json`

Este documento describe el contrato entre contenido (texto de los pasos) y
el motor de canvas, y las reglas para escribir o generar
`animation-spec.json`. Es el documento más importante para cualquier trabajo
futuro de generación automática (fase 1, ver `docs/product/mvp.md`).

## Regla de oro

**El motor (`SceneEngine`) es genérico y no cambia por tema.** Si para
representar un tema nuevo sientes que necesitas tocar
`src/components/explainer/engine/sceneEngine.ts`, la pregunta correcta es
"¿falta un campo en el esquema (`types.ts`)?", no "¿cómo hago un dibujo
especial para este caso?". Ver decisión D1 en `decisions.md`.

## Formato `animation-spec.json` v1.0

```jsonc
{
  "version": "1.0",
  "id": "kebab-case-id",
  "title": "Título humano del tema",
  "scenes": {
    "<sceneId>": {
      "nodes": [
        {
          "id": "string único dentro de la escena",
          "name": "Nombre visible en la tarjeta",
          "subtitle": "opcional, línea secundaria",
          "x": 0.5,               // 0–1, fracción del ancho del canvas
          "y": 0.5,               // 0–1, fracción del alto del canvas
          "kind": "control-plane" // ver 'kind' abajo
          // opcionales:
          "capacity": 100,        // si se define, la tarjeta muestra una barra rx/capacity
          "rps": 3,                // paquetes emitidos por segundo por este nodo
          "killable": true         // si true, muestra el control de matar/revivir
        }
      ],
      "edges": [
        { "from": "nodeIdA", "to": "nodeIdB" }
      ]
    }
  }
}
```

### `kind` (color/semántica de cada nodo)

| kind | Color | Uso típico |
|---|---|---|
| `control-plane` | navy | Orquestador, panel de administración (SDDC Manager, vCenter, controlador central) |
| `compute` | accent | Servidores, hosts, nodos de cómputo |
| `storage` | texto tenue | Capa de almacenamiento |
| `network` | texto secundario | Capa de red |
| `workload` | éxito (verde) | Apps, VMs, cargas de trabajo — lo que corre "encima" de la plataforma |
| `external` | accent | Actores fuera de la plataforma: usuarios, clientes, equipos externos |

No inventes un `kind` nuevo sin agregarlo primero a
`src/lib/animation-spec/types.ts` (tipo `NodeKind`), a
`src/components/explainer/engine/sceneEngine.ts` (`KIND_COLOR`) y a esta
tabla.

### Reglas de contenido de una escena

- Toda posición (`x`, `y`) es una fracción 0–1 del tamaño del canvas en ese
  momento — nunca píxeles absolutos. Esto es lo que permite que el canvas
  sea responsive sin recalcular la escena.
- Toda arista (`edges[].from`/`.to`) debe referenciar un `id` de nodo que
  exista **en esa misma escena**. `parseAnimationSpec()` lo valida y lanza
  un error específico si no.
- Un nodo con `rps` genera paquetes hacia sus aristas salientes a esa tasa,
  eligiendo un destino al azar entre ellas si hay más de una (fan-out).
- Un nodo con `capacity` pero sin `rps` **recibe** paquetes y acumula
  `rx`; si además tiene aristas salientes, reenvía automáticamente
  (propagación) — así es como, por ejemplo, un balanceador reparte tráfico
  entre varias VMs sin tener `rps` propio.
- `killable: true` solo tiene sentido en nodos que no son el origen del
  tráfico (no tiene sentido "matar" al usuario/cliente). El estado
  muerto/vivo es *runtime* (vive en `SceneEngine`, no en el JSON) — no
  agregues un campo `dead` al spec.

## Relación entre escenas y pasos de contenido

El spec solo define **escenas** (visuales). Qué escena se muestra en cada
paso, y qué dice el texto de ese paso, es responsabilidad del contenido
(`src/content/<tema>.ts`, tipo `ExplainerStep`, campo `sceneId`). Un
`animation-spec.json` no sabe nada de "pasos" — eso es intencional (ver D2
en `decisions.md`): permite reordenar o reutilizar escenas entre distintos
guiones de venta sin tocar el spec visual.

## Checklist para una escena nueva (manual o generada)

1. ¿Cada nodo tiene un `id` único dentro de la escena?
2. ¿Cada arista referencia nodos que existen?
3. ¿Los nodos con `capacity` tienen sentido narrativo (representan algo que
   realmente tiene un límite: hosts, storage, licencias)?
4. ¿Los nodos con `rps` representan algo que realmente genera tráfico
   (usuarios, un origen de datos), no un nodo intermedio?
5. ¿La escena se ve razonable con 3–7 nodos? El motor no hace layout
   automático — si hay demasiados nodos superpuestos, ajusta `x`/`y` a
   mano.
6. Corre `parseAnimationSpec()` (o simplemente carga la página en dev) para
   confirmar que valida antes de darla por terminada.

## Ejemplo de referencia

`docs/examples/vcf/animation-spec.json` + `docs/examples/vcf/storyboard.md`
son el ejemplo canónico — cuatro escenas (`silos`, `unify`, `cluster`,
`workloads`) que acompañan los cuatro pasos de
`src/content/vcf.ts`. Úsalo como plantilla para el próximo tema.
