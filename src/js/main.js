import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import Splide from "@splidejs/splide";
import flatpickr from "flatpickr";
import collapse from "@alpinejs/collapse";

window.Alpine = Alpine;
window.Splide = Splide;
window.flatpickr = flatpickr;

document.addEventListener("alpine:init", () => {
  Alpine.data("dragDrop", () => ({
    initialBrands: [
      { name: "Hyundai", models: [] },
      { name: "Kia", models: [] },
      { name: "Mercedes", models: [] },
      { name: "Audi", models: [] },
    ],
    initialModels: [
      { id: 1, name: "Sportage" },
      { id: 2, name: "Clase A" },
      { id: 3, name: "Q3 Sportback" },
      { id: 4, name: "Ioniq 5" },
    ],
    brands: [],
    models: [],
    init() {
      this.reset();
    },
    drag(model, event) {
      event.dataTransfer.setData("modelId", model.id);
    },
    drop(brand, event) {
      const modelId = event.dataTransfer.getData("modelId");
      const model = this.models.find((m) => m.id == modelId);
      if (model && !brand.models.includes(model.name)) {
        brand.models.push(model.name);
        this.models = this.models.filter((m) => m.id != modelId);
      }
    },
    hasRelations() {
      return this.brands.some((brand) => brand.models.length > 0);
    },
    reset() {
      this.brands = JSON.parse(JSON.stringify(this.initialBrands));
      this.models = JSON.parse(JSON.stringify(this.initialModels));

      // 🔹 Esperar actualización del DOM y ejecutar `svgInliner()`
      this.$nextTick(() => {
        console.log("Ejecutando svgInliner después de reset...");
        setTimeout(() => {
          if (typeof window.svgInliner === "function") {
            window.svgInliner();
            console.log("svgInliner ejecutado correctamente.");
          } else {
            console.log("svgInliner no está definido.");
          }
        }, 50); // Ajusta el tiempo si es necesario
      });
    },
  }));

  Alpine.data("toggleActive", () => ({
    isActive: false,
    toggle() {
      this.isActive = !this.isActive;
    },
  }));

  Alpine.data("countdownTimer", () => ({
    duration: 30 * 60 * 60, // 30 horas en segundos
    timer: null,
    hours: "00",
    minutes: "00",
    seconds: "00",
    isPaused: localStorage.getItem("testPaused") === "true",
    startCountdown() {
      this.updateTime();
      this.timer = setInterval(() => {
        if (!this.isPaused) {
          this.duration--;
          this.updateTime();
        }
      }, 1000);

      document.addEventListener("toggle-pause", () => {
        this.isPaused = localStorage.getItem("testPaused") === "true";
      });
    },
    updateTime() {
      let hours = parseInt(this.duration / 3600, 10);
      let minutes = parseInt((this.duration % 3600) / 60, 10);
      let seconds = parseInt(this.duration % 60, 10);

      this.hours = hours < 10 ? "0" + hours : hours;
      this.minutes = minutes < 10 ? "0" + minutes : minutes;
      this.seconds = seconds < 10 ? "0" + seconds : seconds;
    },
  }));

  Alpine.data("svgInliner", () => ({
    async init() {
      console.log("Esperando a que Alpine renderice los elementos...");

      // Esperar a que x-for renderice
      await this.$nextTick();

      console.log("Iniciando SVG Inliner");

      const images = document.querySelectorAll('img[src$=".svg"]');
      console.log("SVGs encontrados:", images.length);

      for (const img of images) {
        if (img.src.startsWith("data:image/svg+xml")) continue; // Evitar imágenes ya inlineadas

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

  // Exponer la función en `window`
  document.addEventListener("alpine:init", () => {
    window.svgInliner = () => {
      Alpine.store("svgInliner").init();
    };
  });

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

  Alpine.data("timeline", () => ({
    tooltipIndex: null,
    users: [
      {
        name: "Ana López",
        company: "AutoMadrid S.L.",
        points: 400,
        avatar: "https://i.pravatar.cc/60?img=38",
        highlight: false,
      },
      {
        name: "Carlos Pérez",
        company: "AutoBarna",
        points: 225,
        avatar: "https://i.pravatar.cc/60?img=11",
        highlight: true,
      },
      {
        name: "Laura García",
        company: "Concesionarios Sur",
        points: 130,
        avatar: "https://i.pravatar.cc/60?img=21",
        highlight: false,
      },
    ],
  }));

  // Definir la función radioGroup
  Alpine.data("radioGroup", (initialState) => ({
    selected: initialState.model,
    init() {
      this.selected = initialState.model;
    },
  }));

  // Inicializar Splide
  Alpine.data("splideCarousel", () => ({
    init() {
      // Inicializar el primer slider con el selector .splide
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

  Alpine.data("chatScroll", () => ({
    isScrolling(event) {
      const chat = event.target;
      const atTop = chat.scrollTop === 0;
      const atBottom = chat.scrollTop + chat.clientHeight >= chat.scrollHeight;

      // Solo bloquear el swipe si el usuario está haciendo scroll
      if (!atTop && !atBottom) {
        event.stopPropagation();
      }
    },
  }));

  Alpine.data("viewportHeight", () => ({
    height: window.innerHeight,
    init() {
      this.updateHeight(); // Ajusta la altura al iniciar
      window.addEventListener("resize", () => this.updateHeight());
      window.addEventListener("orientationchange", () => this.updateHeight());
    },
    updateHeight() {
      this.height = window.innerHeight;
    },
  }));
  Alpine.data("multiImageSelector", () => ({
    items: [
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-01.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-02.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-03.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-04.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-05.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-01.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-02.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-03.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-04.png` },
      { img: `${import.meta.env.BASE_URL}assets/images/cms-images/logo-user-05.png` }
    ],
    selected: [],
    get allSelected() {
      return this.selected.length === this.items.length;
    },
    toggleSelect(index) {
      if (this.selected.includes(index)) {
        this.selected = this.selected.filter((i) => i !== index);
      } else {
        this.selected.push(index);
      }
    },
    toggleAll() {
      if (this.allSelected) {
        this.selected = [];
      } else {
        this.selected = this.items.map((_, index) => index);
      }
    },
  }));
});

Alpine.plugin(focus);
Alpine.plugin(collapse);
Alpine.start();
