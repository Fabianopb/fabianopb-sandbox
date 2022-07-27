import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port = process.env.PORT || 9000;

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "^/api/.*": `http://localhost:${port}`,
    },
  }
})
