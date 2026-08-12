# Technical authority matrix context

`src/content/technical-authority.ts` is the internal authority contract for every explainer. Add a profile when adding a topic, and add each required product/vendor rule as a separately owned evidence entry. Do not change `reviewStatus` to `reviewed` solely to satisfy the gate: it represents qualified human sign-off after the source scope, product release, topology and limitations were checked.

The gate in `src/lib/content-validation/technicalAuthorityGate.ts` blocks technical readiness when evidence is stale, cross-vendor evidence has the wrong owner, the source metadata is incomplete, the diagram integrity is not reviewed, or expert review is pending.
