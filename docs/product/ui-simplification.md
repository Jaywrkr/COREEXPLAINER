# UI simplification — Calm Interface

## Objective

Reduce cognitive load inside each CORESOLUTIONS explainer. The first reading must show one explanation and a clear diagram; advanced capabilities remain available on demand.

## Decisions

- Client mode does not duplicate scene context over the canvas.
- The primary narrative is one idea and its impact, rather than several competing cards.
- Viewport, animation, inspector, layer and failure controls stay closed by default.
- The technical inspector is available only in technical mode and never opens automatically.
- Advanced tools and evidence are not part of the client first-read path.
- The dashboard retains its visual topic catalog; simplification is concentrated inside every explainer.

## Evolution criterion

Do not add a first-level visible capability without removing or grouping another. Client mode prioritizes understanding; technical mode prioritizes explicit diagnosis.
