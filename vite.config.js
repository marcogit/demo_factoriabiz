import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Define la carpeta "src" como raíz
  build: {
    outDir: '../dist', // Genera el resultado en la carpeta "dist"
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "./css/styles.css";', // Ruta relativa dentro de "src"
      },
    },
  },
});