import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  root: "./src", // Define la carpeta "src" como raíz
  build: {
    outDir: "../dist", // Genera el resultado en la carpeta "dist"
    emptyOutDir: true,
    assetsInlineLimit: 0, // No transformar ningún archivo en URL de datos
    rollupOptions: {
      input: {
        main: "./src/index.html",
        documentos: "./src/documentos.html",
        actividades: "./src/actividades.html",
        itinerarios: "./src/itinerarios.html",
        noticias: "./src/noticias.html",
        express_trainings: "./src/express-trainings.html",
        busqueda: "./src/busqueda.html",
        chat: "./src/chat.html",
        user: "./src/user.html",
        ea: "./src/ea.html",
        stories: "./src/stories.html",
        evaulacion: "./src/evau.html",
        superaula: "./src/superaula.html",
        streaming: "./src/streaming.html",
        components: "./src/components.html",
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Coloca las imágenes en "assets/images/"
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          // Coloca otros assets en "assets/"
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: "assets/images",
          dest: "assets",
        },
      ],
    }),
    svgLoader(), // Plugin para manejar SVGs incrustados
  ],
  assetsInclude: ["**/*.svg"], // Incluir explícitamente los archivos .svg
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "./css/styles.css";', // Ruta relativa dentro de "src"
      },
    },
  },
});
