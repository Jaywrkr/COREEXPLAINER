# Versionado y changelog

El producto muestra su versión actual en un control global, abajo a la
izquierda. Al hacer clic, el usuario puede abrir el changelog sin abandonar
la explicación que está viendo.

## Fuentes que se mantienen juntas

- `package.json` y `package-lock.json`: versión técnica del paquete.
- `src/content/changelog.ts`: versión y cambios que se muestran en la UI.
- `docs/CHANGELOG.md`: registro Markdown para revisión humana y GitHub.

La versión actual debe ser la misma en los tres lugares. No se lee
`package.json` desde el cliente para evitar mezclar el empaquetado con el
contenido visible de la aplicación.

## Proceso para una nueva versión

1. Decidir la siguiente versión semántica: `PATCH` para correcciones,
   `MINOR` para funcionalidades compatibles y `MAJOR` para cambios que
   rompan contratos o flujos existentes.
2. Actualizar la versión en `package.json` y `package-lock.json`.
3. Agregar la entrada más reciente a `src/content/changelog.ts` y actualizar
   `currentVersion`.
4. Registrar el mismo resumen en `docs/CHANGELOG.md`.
5. Actualizar `docs/ai-context/project-state.md` si la funcionalidad cambia
   el estado del producto o el modo de continuarlo con IA.
6. Ejecutar `npm run typecheck` y `npm run build` antes del commit.

El control de versión se monta una sola vez en `app/layout.tsx` mediante
`VersionChangelog.tsx`. Es un componente cliente porque gestiona la apertura
del panel y el cierre con la tecla Escape; los datos que muestra son estáticos.
