import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project site (repo name != riassd.github.io), so assets are served from
// https://riassd.github.io/riases.dev/. If you ever rename this repo to
// riassd.github.io, change base back to '/'. This MUST match the current
// repo name exactly, or assets 404 and the page renders blank.
export default defineConfig({
  base: '/riases.dev/',
  plugins: [react()],
})
