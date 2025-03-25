import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import testing from 'vite-plugin-testing'

export default defineConfig({
  plugins: [
    react(),
    testing()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.js'
  }
})
