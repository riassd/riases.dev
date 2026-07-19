# riassd — Portafolio

Portafolio personal de Jhunier Hernandez Calderon ([@riassd](https://github.com/riassd)),
construido con React + Vite y publicado en GitHub Pages.

🔗 **https://rlases.dev/**

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

El sitio se publica en el dominio propio `rlases.dev` (configurado vía el
archivo `CNAME` en `public/` + los registros DNS en el proveedor del
dominio), así que se sirve desde la raíz y `base` en `vite.config.js` es
`'/'`. Si alguna vez se quita el dominio propio, `base` debe volver a
`'/<nombre-del-repo>/'` para que coincida con la subruta por defecto de
GitHub Pages — si no, los assets dan 404 y la página se ve en blanco.
