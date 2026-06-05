import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/assets/',
  build: {
    outDir: 'dist/public',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'main.js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
});
