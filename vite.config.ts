import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages repository: /Shivganga-website/
export default defineConfig({
  base: '/Shivganga-website/',
  plugins: [react(), tailwindcss()],
})
