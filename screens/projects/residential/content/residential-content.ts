import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";

export const residentialContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Residencial"],
  hero: { eyebrow: "Residencial", title: "Proyectos Residenciales", description: "El hogar como obra de arte.", imageUrl: "/projects/residential/hero/residential-hero-01.jpg" },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos residenciales",
    explorationDescription: "Espacios residenciales desarrollados junto a arquitectos, promotores y propietarios.",
    filters: ["Quarzo", "Botaniko", "Tempo", "Premier Las Lomas", "Premier 27", "Costamar", "Aruba", "Harbour Park"],
    description: "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas de campo, cada proyecto parte de una escucha profunda para dar forma a espacios únicos, funcionales y atemporales.",
    ctaLabel: "Consultar proyecto", ctaHref: "/contacto",
    stats: [{ value: 200, suffix: "+", label: "Residencias amuebladas" }, { value: 100, suffix: "%", label: "Proyectos personalizados" }, { value: 8, suffix: " sem", label: "Tiempo promedio" }],
  },
  gallery: {
    eyebrow: "Portafolio", title: "Proyectos seleccionados", description: "Una selección de proyectos residenciales desarrollados en Venezuela y la región.",
    projects: [
      { id: "quarzo", eyebrow: "01 · Proyecto residencial", title: "Quarzo", location: "Lechería, Venezuela", scope: "Áreas comunes · Mobiliario", description: "Diseño y dotación de espacios sociales concebidos para una experiencia residencial contemporánea y cálida.", images: [{ src: "/projects/residential/gallery/residential-gallery-01.jpg", alt: "Proyecto residencial Quarzo" }, { src: "/projects/residential/gallery/residential-gallery-02.jpg", alt: "Interior del proyecto Quarzo" }] },
      { id: "botaniko", eyebrow: "02 · Proyecto residencial", title: "Botaniko", location: "Caracas, Venezuela", scope: "Interiorismo · Mobiliario", description: "Una propuesta que conecta materialidad, vegetación y mobiliario para crear espacios de uso cotidiano con identidad propia.", images: [{ src: "/projects/residential/gallery/residential-gallery-03.jpg", alt: "Proyecto residencial Botaniko" }, { src: "/projects/residential/gallery/residential-gallery-04.png", alt: "Área social del proyecto Botaniko" }, { src: "/projects/residential/gallery/residential-gallery-05.png", alt: "Detalle del proyecto Botaniko" }] },
    ],
  },
};
