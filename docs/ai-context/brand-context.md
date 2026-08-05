# Contexto de marcas por explicación

## Propósito

Cada `ExplainerMeta` declara `brandContext`: una lista de marcas del
portafolio CORESOLUTIONS, el papel que cumplen en el patrón y el límite de lo
que el diagrama está afirmando. La interfaz lo muestra en el panel izquierdo
como **Marcas del patrón**.

El registro canónico de marcas, la evidencia pública y las reglas comerciales
están en [`docs/product/portfolio.md`](../product/portfolio.md).

## Contrato

```ts
brandContext: [
  {
    name: "Veeam",
    role: "Backup y recuperación",
    scope: "Validar versión, licencia, repositorio y workload.",
  },
]
```

- `name`: nombre comercial que el cliente reconoce.
- `role`: función que cumple en la conversación.
- `scope`: límite técnico/comercial que evita convertir el patrón en una
  promesa de compatibilidad o sizing.

## Reglas para nuevos temas

1. Leer `docs/product/portfolio.md` antes de diseñar el storyboard.
2. Elegir solo las marcas que realmente intervienen en el tema; no añadirlas
   como decoración.
3. Describir siempre el límite: versión, edición, HCL, licencia, topología,
   soporte o sizing según corresponda.
4. Mantener la evidencia técnica en `technicalReview.sources` y la evidencia
   comercial en el documento de portafolio.
5. No presentar una combinación de marcas como integración certificada sin una
   fuente primaria y una validación del entorno del cliente.

El quality gate exige al menos una entrada, nombres únicos y los tres campos no
vacíos. La revisión humana sigue siendo obligatoria (`reviewStatus: pending`)
hasta confirmar el alcance.
