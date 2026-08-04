# Trazabilidad técnica por explicación

## Propósito

La información de una explicación puede quedar obsoleta cuando cambian una
versión, una arquitectura recomendada o una guía del fabricante. Para que una
sesión futura de IA pueda comprobar la vigencia sin adivinar, cada tema declara
su contexto de revisión en `meta.technicalReview`.

La ficha desplegable **Trazabilidad técnica**, visible debajo del subtítulo de
cada explicación, muestra exactamente esos datos al cliente o al equipo
interno.

## Contrato de datos

Cada tema debe incluir:

```ts
technicalReview: {
  lastReviewedAt: "YYYY-MM-DD",
  scope: "Producto, versión o alcance conceptual revisado",
  sources: [
    {
      id: "fuente-estable",
      title: "Nombre legible de la fuente primaria",
      url: "https://...",
      accessedAt: "YYYY-MM-DD",
    },
  ],
}
```

- `lastReviewedAt` es la fecha en que se volvió a revisar el guion, el
  diagrama y la matriz técnica.
- `scope` evita que una fecha parezca una afirmación universal: debe indicar
  la versión, release family o alcance conceptual que se comprobó.
- `sources` contiene enlaces HTTPS directos a documentación primaria o
  normativa. Cada fuente tiene un `id` estable para que las escenas puedan
  citarla. `accessedAt` es la fecha en que se consultó cada enlace; no se
  inventan fechas de publicación o actualización que la fuente no exponga.

Cada `ExplainerStep` debe citar las fuentes que respaldan su narrativa y
diagrama:

```ts
sourceIds: ["fuente-estable"]
```

La interfaz muestra primero las fuentes de la escena activa y después el
catálogo general del tema. Así el cliente puede seguir la evidencia de una
afirmación concreta sin perder el contexto completo de la revisión.

## Cuándo actualizarlo

Actualiza el registro cuando se publique una nueva versión del producto, la
fuente cambie su recomendación, se modifique el diagrama o se incorpore una
afirmación nueva. Revisa también que el enlace siga siendo accesible y que la
matriz técnica del tema explique cualquier límite o excepción relevante.

El registro no reemplaza la revisión de un especialista: documenta qué se
comprobó y permite detectar rápidamente qué necesita una nueva revisión.

## Validación y documentación

`validateExplainerContent()` exige fecha ISO, alcance no vacío, IDs únicos,
al menos una fuente HTTPS, URLs únicas y fecha ISO por fuente. También exige
que cada escena cite al menos una fuente existente en su catálogo. Los documentos
`docs/ai-context/*-technical-validation.md` conservan el detalle de las
afirmaciones y enlazan las mismas fuentes con la fecha de consulta.

Al agregar un tema nuevo, sigue [`content-quality-gate.md`](./content-quality-gate.md)
y añade su ficha de validación técnica antes de abrir el PR.
