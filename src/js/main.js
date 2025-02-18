import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import Splide from "@splidejs/splide";
import flatpickr from "flatpickr";

window.Alpine = Alpine;
window.Splide = Splide;
window.flatpickr = flatpickr;

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
        if (img.src.startsWith("data:image/svg+xml")) continue; // Evitar imágenes inlineadas

        try {
          const response = await fetch(img.src);
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
          console.log("SVG reemplazado exitosamente:", img.src);
        } catch (error) {
          console.error(`Error al procesar SVG: ${img.src}`, error);
        }
      }
    },
  }));

  Alpine.data("dropdown", (label, options) => ({
    open: false,
    selected: label,
    options: options,
    toggle(option) {
      this.selected = option;
      this.open = false;
    },
  }));

  Alpine.data("multiSelect", (label, options) => ({
    open: false,
    selected: [],
    options: options,
    toggle(option) {
      if (this.selected.includes(option)) {
        this.selected = this.selected.filter((o) => o !== option);
      } else {
        this.selected.push(option);
      }
    },
    displaySelected() {
      return this.selected.length ? this.selected.join(", ") : label;
    },
  }));

  Alpine.data("datePicker", () => ({
    initFlatpickr() {
      flatpickr(this.$refs.datepicker, {
        mode: "range",
        dateFormat: "d/m/Y",
        locale: "es",
        allowInput: true,
      });
    },
  }));

  Alpine.data("modalComponent", () => ({
    openModal: false,
    closeModal() {
      this.openModal = false;
      this.pauseVideo();
    },
    pauseVideo() {
      const iframe = this.$refs.videoIframe;
      if (iframe) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    },
  }));

  Alpine.data("accordion_filter", () => ({
    expanded: window.innerWidth >= 976, // Abierto en escritorio, cerrado en móvil
    toggleAccordion() {
      this.expanded = !this.expanded;
    },
    updateState() {
      this.expanded = window.innerWidth >= 976;
    },
    init() {
      this.updateState(); // Estado inicial según la pantalla

      window.addEventListener("resize", () => {
        this.updateState();
      });
    },
  }));

  Alpine.data("chatApp", () => ({
    newMessage: "",
    messages: [],
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          text: this.newMessage,
          sender: "user",
          senderName: "Tú",
        });
        this.newMessage = "";

        // Simular un mensaje de respuesta después de 1 segundo
        setTimeout(() => {
          this.messages.push({
            text: "Este es un mensaje de prueba",
            sender: "bot",
            senderName: "Bot",
          });
        }, 1000);
      }
    },
  }));

  // Inicializar Splide
  Alpine.data("splideCarousel", () => ({
    init() {
      new Splide(".splide", {
        perPage: 4,
        breakpoints: {
          975: {
            perPage: 3,
          },
          767: {
            perPage: 2,
          },
          500: {
            perPage: 1,
          },
        },
      }).mount();
    },
  }));
});

Alpine.plugin(focus);
Alpine.start();
