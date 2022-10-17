import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 9000;

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true, fileName: false }]],
      },
    }),
  ],
  server: {
    open: true,
    proxy: {
      '^/api/.*': `http://localhost:${port}`,
    },
  },
  build: {
    outDir: 'fpb-dist',
  },
});
