# Favoritos y progreso local

Cada explicación ofrece dos acciones de seguimiento:

- `Favorito`: guarda el tema para volver a él.
- `Revisado`: marca que el tema ya fue recorrido o presentado.

El estado se guarda únicamente en `localStorage` del navegador bajo la clave
`core-explainer-feedback-v1`. No hay cuentas, llamadas a backend, datos de
clientes ni sincronización entre dispositivos. Si el navegador bloquea el
almacenamiento, las acciones siguen siendo seguras y la explicación continúa
funcionando.

El contrato vive en `src/components/explainer/ExplainerFeedback.tsx`. El
identificador estable es el `slug` del registro, por lo que cambiar de escena
no altera el estado del tema. Los controles usan `aria-pressed` y etiquetas
explicativas para que la acción sea entendible con teclado y lector de pantalla.
