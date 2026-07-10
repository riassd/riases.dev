# riassd — Portafolio

Portafolio personal de Jhunier Hernandez Calderon ([@riassd](https://github.com/riassd)),
construido con React + Vite y publicado en GitHub Pages.

🔗 **https://riassd.github.io/rias_readme/**

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

Este repo se llama `rias_readme` en lugar de `riassd.github.io`, así que el
sitio se publica en una subruta (`/rias_readme/`) en vez de en la raíz del
dominio. Si más adelante renombras el repo a `riassd.github.io`, cambia
`base` a `'/'` en `vite.config.js`.
