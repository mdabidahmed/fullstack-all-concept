import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Only needed so built assets resolve under the GitHub Pages subpath;
  // the dev server should stay at "/" so localhost URLs work without
  // requiring an exact trailing-slash match.
  base: command === 'build' ? '/React-All-Concept/' : '/',
  plugins: [react()],
}))
