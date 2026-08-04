# Guía de marca — CoreSolutions Technical Explainer

Fuente: paleta y lineamientos provistos por el usuario para este proyecto.
Esta es la única fuente de verdad para color/tipografía/forma; los valores
están duplicados físicamente en tres lugares por razones técnicas — si
cambias uno, cambia los tres:

1. `tailwind.config.ts` (`theme.extend.colors.core`)
2. `src/components/explainer/engine/palette.ts` (el canvas no puede leer
   clases de Tailwind)
3. Este documento

## Paleta

| Token | Hex | Uso |
|---|---|---|
| Navy (ancla) | `#01095C` | Marca, elementos de control-plane en el canvas, CTA principal |
| Accent | `#3B4CCE` | Elementos interactivos sobre fondo oscuro, links, chip activo, hosts/cómputo |
| Fondo | `#0A0B14` | Fondo de página y canvas |
| Panel / card | `#10111C` | Tarjetas, paneles, nodos del diagrama |
| Texto principal | `#F5F6FA` | Texto de alto contraste |
| Texto secundario | `#A9AEC2` | Cuerpo de texto, subtítulos, capa de red en el canvas |
| Texto tenue | `#6B7086` | Metadatos, capa de storage en el canvas |
| Éxito | `#1F9D55` | Estados OK, nodos de workload/apps, botón de "revivir" |
| Advertencia | `#D6A419` | Uso de capacidad alto (>85%) |
| Error | `#C23B3B` | Uso de capacidad sobrepasada, botón de "matar" nodo |

## Tipografía

- **IBM Plex Sans** — UI, títulos, cuerpo de texto. Cargada vía
  `next/font/google` en `app/layout.tsx` como variable CSS
  `--font-ibm-plex-sans`.
- **IBM Plex Mono** — datos, métricas, IDs, tags de paso, captions del
  canvas. Variable CSS `--font-ibm-plex-mono`. Se usa también dentro del
  `<canvas>` (los estilos CSS no heredan ahí — cada `ctx.font` se fija a
  mano en `sceneEngine.ts`).

## Forma

- **Esquinas rectas por defecto.** `tailwind.config.ts` pone todo el radio
  de Tailwind en `0px`.
- **Única excepción**: elementos circulares con función de estado/control —
  los dots de progreso (`rounded-full`, son barras de 2px de alto, no
  círculos, así que ni siquiera aplica) y el botón circular de
  matar/revivir nodo dentro del canvas (`ctx.arc`). No introducir más
  excepciones sin actualizar este documento.
- **Bordes hairline** (1px, `rgba(255,255,255,0.09)` aprox.) en vez de
  sombras. No usar `box-shadow` para dar profundidad.

## Tono de voz

- Formal, **"usted"**, dirigido a un cliente en una conversación de venta
  consultiva — no a un desarrollador.
- Preferir cifras concretas sobre afirmaciones vagas ("99.97% de
  disponibilidad objetivo" en vez de "muy disponible").
- Sin signos de exclamación. Sin lenguaje de marketing genérico ("¡la mejor
  solución del mercado!").
- Cada paso debe cerrar, cuando aplique, con una frase de "impacto de
  negocio" explícita (ver `businessImpact` en `src/content/types.ts`),
  distinguida visualmente con un borde izquierdo de acento.

## Branding

- Isotipo provisional: bloque `COI` en `IBM Plex Mono`, fondo navy, usado en
  `src/components/explainer/BrandMark.tsx`. Reemplazar por el logo real de
  CoreSolutions cuando esté disponible como asset (SVG), sin cambiar la
  estructura del componente.
