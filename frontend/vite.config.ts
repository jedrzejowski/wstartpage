import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        editor: resolve(__dirname, 'editor.html'),
        viewer: resolve(__dirname, 'viewer.html'),
      },
    },
  },
});
