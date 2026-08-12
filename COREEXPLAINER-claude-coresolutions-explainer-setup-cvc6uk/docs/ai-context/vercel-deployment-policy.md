# Política de deployments de Vercel

**Estado:** deploy manual  
**Revisión:** 2026-08-05

## Objetivo

El repositorio desactiva los deployments automáticos de Git mediante
`vercel.json`. Los `push`, PRs y merges no deben consumir deployments de Vercel
por sí solos. Esto permite trabajar en batches grandes y publicar solo una
versión revisada.

La configuración sigue la propiedad oficial `git.deploymentEnabled` de Vercel.

## Flujo normal

1. Trabajar en una rama y hacer commits normalmente.
2. Validar localmente:

   ```bash
   npm run typecheck
   npm run lint
   npm run build
   ```

3. Hacer push, PR y merge sin esperar un Preview Deployment.
4. Cuando el batch esté listo, seleccionar el commit final de `main` en el
   dashboard de Vercel y crear un deployment manual, o ejecutar:

   ```bash
   npx vercel --prod
   ```

5. Verificar la URL de producción y conservar el commit publicado.

## Alcance y límites

- La política evita deployments automáticos; no elimina el consumo de cuota
  cuando se ejecuta un deployment manual.
- Si se necesita volver temporalmente a previews, hay que cambiar la política
  de forma intencional y revertirla después.
- El build local confirma TypeScript, lint, validación de contenido y
  generación de Next.js, pero no sustituye una verificación final en la URL de
  producción.
- No ejecutar `vercel` sin `--prod` como prueba casual: ese comando crea un
  Preview Deployment cuando se usa fuera de producción.

## Fuente

La referencia oficial es [Git Configuration de Vercel](https://vercel.com/docs/project-configuration/git-configuration),
que documenta `git.deploymentEnabled: false` para desactivar deployments
automáticos y la separación entre entornos Local, Preview y Production.
