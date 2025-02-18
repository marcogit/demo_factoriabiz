import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path"; // Necesario para rutas absolutas

export default defineConfig({
  root: "./src", // Define la carpeta "src" como raíz
  build: {
    outDir: "../dist", // Genera el resultado en la carpeta "dist"
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        documentos: path.resolve(__dirname, "src/documentos.html"),
        actividades: path.resolve(__dirname, "src/actividades.html"),
        noticias: path.resolve(__dirname, "src/noticias.html"),
        express_trainings: path.resolve(
          __dirname,
          "src/express-trainings.html"
        ),
        busqueda: path.resolve(__dirname, "src/busqueda.html"),
        chat: path.resolve(__dirname, "src/chat.html"),
        components: path.resolve(__dirname, "src/components.html"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/css/[name][extname]"; // ✅ Ahora los CSS van a "assets/css/"
          }
          return "assets/images/[name][extname]"; // ✅ Las imágenes se quedan en "assets/images/"
        },
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
