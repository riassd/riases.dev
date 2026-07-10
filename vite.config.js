import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project site (repo name != riassd.github.io), so assets are served from
// https://riassd.github.io/rias_readme/. If you ever rename this repo to
// riassd.github.io, change base back to '/'.
export default defineConfig({
  base: '/rias_readme/',
  plugins: [react()],
})
