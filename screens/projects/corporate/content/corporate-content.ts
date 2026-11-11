import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";

export const corporateContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Corporativo"],
  hero: { eyebrow: "Corporativo", title: "Proyectos Corporativos", description: "Ambientes que inspiran rendimiento.", imageUrl: "/projects/corporate/hero/corporate-hero-01.jpg" },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos corporativos",
    explorationDescription: "Soluciones a medida para espacios de trabajo, atención y encuentro.",
    filters: ["Oficina corporativa", "Centro médico", "Co-working", "Oficina financiera", "Atención al cliente", "Área comercial"],
    description: "Diseñamos y dotamos entornos de trabajo que elevan la cultura corporativa. Salas de reuniones, lobbies, áreas de descanso y zonas de colaboración, todo con la precisión de marcas europeas líderes en mobiliario contract.",
    ctaLabel: "Consultar proyecto", ctaHref: "/contacto",
    stats: [{ value: 60, suffix: "+", label: "Empresas servidas" }, { value: 5, suffix: " países", label: "De alcance regional" }, { value: 0, prefix: "A+", label: "Certificación de calidad" }],
  },
  gallery: {
    eyebrow: "Portafolio", title: "Proyectos seleccionados", description: "Una selección de proyectos corporativos desarrollados con precisión, funcionalidad y carácter.",
    projects: [
      { id: "oficina-corporativa", eyebrow: "01 · Proyecto corporativo", title: "Oficina Corporativa", location: "Caracas, Venezuela", scope: "Mobiliario · Interiorismo", description: "Intervenimos y suministramos mobiliario para un entorno de trabajo contemporáneo, flexible y representativo.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-01.jpg", alt: "Oficina corporativa Design HOF" }, { src: "/projects/corporate/gallery/corporate-gallery-02.jpg", alt: "Área de reunión de oficina corporativa" }] },
      { id: "centro-medico", eyebrow: "02 · Proyecto corporativo", title: "Centro Médico", location: "Caracas, Venezuela", scope: "Recepción · Mobiliario", description: "Diseño y dotación de áreas de espera, recepción y consulta con materiales durables y una atmósfera serena.", images: [{ src: "/projects/corporate/gallery/corporate-gallery-03.jpg", alt: "Recepción de centro médico" }, { src: "/projects/corporate/gallery/corporate-gallery-04.jpg", alt: "Área de espera de centro médico" }, { src: "/projects/corporate/gallery/corporate-gallery-05.png", alt: "Detalle de proyecto corporativo" }] },
    ],
  },
};
