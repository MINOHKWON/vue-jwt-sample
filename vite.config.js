import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    cors: true,
    proxy: {
      '/members': {
        target: 'http://localhost:8001/members/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/members/, ''),
        secure: false
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})