import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("toggleActive", () => ({
    isActive: false,
    toggle() {
      this.isActive = !this.isActive;
    },
  }));

  Alpine.data("svgInliner", () => ({
    async init() {
      console.log("Iniciando SVG Inliner");
      const images = document.querySelectorAll('img[src$=".svg"]');

      console.log("SVGs encontrados:", images.length);
      for (const img of images) {
        try {
          const absoluteUrl = new URL(img.src, window.location.href).href;
          console.log("Cargando SVG:", absoluteUrl);

          const response = await fetch(absoluteUrl);
          if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

          const svgText = await response.text();
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
          const svgElement = svgDoc.documentElement;

          [...img.attributes].forEach((attr) => {
            if (!svgElement.hasAttribute(attr.name)) {
              svgElement.setAttribute(attr.name, attr.value);
            }
          });

          img.replaceWith(svgElement);
          console.log("SVG reemplazado exitosamente:", absoluteUrl);
        } catch (error) {
          console.error(`Error al procesar SVG: ${img.src}`, error);
        }
      }
    },
  }));

  // ✅ Registrar correctamente chatApp en Alpine
  Alpine.data("chatApp", () => ({
    newMessage: "",
    messages: [],
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ text: this.newMessage, sender: "user" });
        this.newMessage = "";

        // Esperar un momento y agregar un mensaje simulado de respuesta
        setTimeout(() => {
          this.messages.push({
            text: "Este es un mensaje de prueba",
            sender: "bot",
          });
        }, 1000);
      }
    },
  }));
});

Alpine.start();

