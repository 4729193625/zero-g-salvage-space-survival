import { defineConfig } from 'vite';

// Vite config MUST export an object. This avoids the "config must export or return an object" error.
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
