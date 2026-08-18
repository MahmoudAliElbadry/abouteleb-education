import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { copyFile } from 'node:fs/promises';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-github-pages-cname',
      async writeBundle(outputOptions) {
        const outputDirectory = outputOptions.dir ?? 'dist';
        await copyFile(
          fileURLToPath(new URL('./public/CNAME', import.meta.url)),
          `${outputDirectory}/CNAME`,
        );
      },
    },
  ],
  base: process.env.VITE_BASE_PATH ?? '/',
  publicDir: fileURLToPath(new URL('../../images', import.meta.url)),
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
