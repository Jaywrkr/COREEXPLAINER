# IBM technical authority rules context

`src/content/ibm-technical-rules.ts` contains source-to-scene contracts for IBM-related explainers. Every rule must declare its control, official source IDs and the step IDs that communicate it. The authority gate rejects a rule whose source is absent or whose declared step does not cite at least one rule source.

Add customer-specific compatibility results only as reviewed evidence; do not encode assumed firmware, entitlement, hardware model or supportability in conceptual content.
