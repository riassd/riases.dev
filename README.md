# riassd — Portafolio

Portafolio personal de Jhunier Hernandez Calderon ([@riassd](https://github.com/riassd)),
construido con React + Vite y publicado en GitHub Pages.

🔗 **https://riassd.github.io/riases.dev/**

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

El workflow en `.github/workflows/deploy.yml` construye y publica el sitio en
GitHub Pages automáticamente en cada push a `main`. Solo hace falta activar
Pages una vez en el repo: **Settings → Pages → Source → GitHub Actions**.

## Editar contenido

- `src/data/profile.js` — nombre, rol, bio, skills y enlaces de contacto.
- `src/data/projects.js` — proyecto destacado (ControllerNAV) y tarjetas de
  próximos proyectos.

## Notas

Este repo se llama `riases.dev` en lugar de `riassd.github.io`, así que el
sitio se publica en una subruta (`/riases.dev/`) en vez de en la raíz del
dominio. Si renombras el repo de nuevo, actualiza `base` en `vite.config.js`
para que coincida exactamente con el nuevo nombre — si no, los assets dan
404 y la página se ve en blanco. Si más adelante renombras el repo a
`riassd.github.io`, cambia `base` a `'/'`.
