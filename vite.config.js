import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  root: "./src", // Define la carpeta "src" como raíz
  build: {
    outDir: "../dist", // Genera el resultado en la carpeta "dist"
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./src/index.html",
        documentos: "./src/documentos.html",
        actividades: "./src/actividades.html",
        noticias: "./src/noticias.html",
        express_trainings: "./src/express-trainings.html",
        components: "./src/components.html",
      },
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "./css/styles.css";', // Ruta relativa dentro de "src"
      },
    },
  },
});
