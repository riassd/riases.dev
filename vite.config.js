import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Project site (repo name != riassd.github.io), so assets are served from
// https://riassd.github.io/riases.dev/. If you ever rename this repo to
// riassd.github.io, change base back to '/'. This MUST match the current
// repo name exactly, or assets 404 and the page renders blank.
export default defineConfig({
  base: '/riases.dev/',
  plugins: [
    react(),
    VitePWA({
      manifest: false, // manifest.webmanifest is hand-authored in public/
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallbackDenylist: [/^\/?og-image\.png$/],
      },
    }),
  ],
})
