import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";

export const corporateContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Corporativo"],
  hero: { eyebrow: "Proyectos corporativos", title: "Proyectos corporativos", description: "Espacios que representan tu empresa.", imageUrl: "/projects/corporate/hero/corporate-hero-01.jpg" },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos corporativos",
    explorationDescription: "Selecciona un proyecto para ir directamente a su información.",
    filters: ["Oficina Corporativa", "Centro Médico", "Co working space", "Centro Financiero", "Counter torre de oficinas", "Torre comercial"],
    description: "Interiorismo, mobiliario a medida y revestimientos para oficinas, centros médicos, espacios de trabajo y torres comerciales. Proyectos corporativos realizados en Caracas, Venezuela.",
    ctaLabel: "Consultar proyecto", ctaHref: "/contacto",
    stats: [{ value: 6, label: "Proyectos seleccionados" }, { value: 6, label: "Portadas seleccionadas" }, { value: 1, label: "Ciudad: Caracas" }],
  },
  gallery: {
    eyebrow: "Portafolio", title: "Proyectos seleccionados", description: "Una selección de proyectos corporativos en Caracas, Venezuela.",
    projects: [
      { id: "oficina-corporativa", eyebrow: "01 · Proyecto corporativo", title: "Oficina Corporativa", location: "Oficina Corporativa. Caracas, Venezuela.", scope: "Mobiliario · Interiorismo", description: "Interiorismo y suministro de mobiliario para proyecto de oficina", images: [{ src: "/projects/corporate/gallery/corporate-gallery-01.jpg", alt: "Oficina corporativa Design HOF" }, { src: "/projects/corporate/gallery/corporate-gallery-02.jpg", alt: "Área de reunión de oficina corporativa" }] },
      { id: "centro-medico", eyebrow: "02 · Proyecto corporativo", title: "Centro Médico", location: "Centro Médico. Caracas, Venezuela.", scope: "Revestimiento · Mobiliario", description: "Suministro e instalación de tope de piedra sinterizada y mobiliario a medida para counter médico.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-03.jpg", alt: "Recepción de centro médico" }, { src: "/projects/corporate/gallery/corporate-gallery-04.jpg", alt: "Área de espera de centro médico" }] },
      { id: "co-working-space", eyebrow: "03 · Proyecto corporativo", title: "Co working space", location: "Co working space. Caracas, Venezuela.", scope: "Revestimiento", description: "Suministro e instalación de tope de piedra sinterizada.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-05.png", alt: "Co working space" }, { src: "/projects/corporate/gallery/corporate-gallery-01.jpg", alt: "Detalle de co working space" }] },
      { id: "centro-financiero", eyebrow: "04 · Proyecto corporativo", title: "Centro Financiero", location: "Centro Financiero. Caracas, Venezuela.", scope: "Revestimiento", description: "Suministro e instalación de tope de piedra sinterizada.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-02.jpg", alt: "Centro Financiero" }, { src: "/projects/corporate/gallery/corporate-gallery-03.jpg", alt: "Detalle de Centro Financiero" }] },
      { id: "counter-torre-de-oficinas", eyebrow: "05 · Proyecto corporativo", title: "Counter torre de oficinas", location: "Counter torre de oficinas. Caracas, Venezuela.", scope: "Revestimiento", description: "Suministro e instalación de tope de piedra sinterizada.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-04.jpg", alt: "Counter torre de oficinas" }, { src: "/projects/corporate/gallery/corporate-gallery-05.png", alt: "Detalle del counter de torre de oficinas" }] },
      { id: "torre-comercial", eyebrow: "06 · Proyecto corporativo", title: "Torre comercial", location: "Torre comercial. Caracas, Venezuela.", scope: "Revestimiento", description: "Suministro e instalación de piedra sinterizada para fachada.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-01.jpg", alt: "Torre comercial" }, { src: "/projects/corporate/gallery/corporate-gallery-02.jpg", alt: "Fachada de torre comercial" }] },
    ],
  },
};
