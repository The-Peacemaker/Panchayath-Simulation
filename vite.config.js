import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base: audio + assets resolve over file://, dev, preview and subpath deploys
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false
  }
});
