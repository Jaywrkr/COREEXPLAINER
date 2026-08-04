# Control de calidad del contenido

## Propósito

El registro de temas es la frontera de publicación. Antes de que un ejemplo
entre en `explainerRegistry`, `validateExplainerContent()` comprueba que la
narrativa y su diagrama tengan la profundidad mínima y que sus referencias
sean coherentes.

La validación es estructural y pedagógica; no reemplaza una revisión de un
especialista del producto. Por eso cada tema declara `reviewStatus`:

- `pending`: la estructura está completa, pero falta la revisión especialista.
- `reviewed`: el contenido fue revisado para el alcance y la versión declarados.

## Requisitos mínimos

Cada `ExplainerMeta` debe declarar:

- copy base (`chip`, `title`, `tagline`, `ctaLabel`);
- `storyboardDoc` bajo `docs/`;
- `technicalValidationDoc` bajo `docs/`;
- estado `reviewStatus`.

Cada tema debe tener al menos cuatro pasos. Cada paso necesita dos párrafos,
impacto de negocio, caption, etiqueta y una escena existente.

El validador también comprueba:

- IDs de pasos y nodos sin duplicados;
- nodos con nombres, tipos y coordenadas válidas;
- escenarios de fallo con escena, nodos afectados, explicación y limitación;
- referencias de escenarios a nodos que sí existen;
- escenas definidas pero no narradas (como advertencia).

## Cómo agregar un tema

1. Crear `src/content/<tema>.ts` con `meta`, `steps` y escenarios opcionales.
2. Crear storyboard y matriz técnica en `docs/`.
3. Declarar las rutas de esos documentos en `ExplainerMeta`.
4. Agregar la definición a `src/content/registry.ts`.
5. Ejecutar `npm run typecheck`, `npm run lint` y `npm run build`.
6. Resolver todos los errores de validación antes de abrir el PR.
7. Mantener `reviewStatus: "pending"` hasta que un especialista confirme las
   afirmaciones; cambiarlo a `"reviewed"` solo con ese alcance documentado.

## Alcance y límites

El gate no afirma que una plataforma sea técnicamente correcta por el solo
hecho de compilar. No verifica fuentes externas, SLAs, licencias, sizing ni
compatibilidad entre versiones. Esas decisiones deben permanecer en la
matriz técnica y en la revisión humana.
