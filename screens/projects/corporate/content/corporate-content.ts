import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";

export const corporateContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Corporativo"],
  hero: {
    eyebrow: "Corporativo",
    title: "Proyectos Corporativos",
    description: "Ambientes que inspiran rendimiento.",
    imageUrl: "/projects/corporate/hero/corporate-hero-01.jpg",
  },
  introduction: {
    eyebrow: "Acerca de este servicio",
    description: "Diseñamos y dotamos entornos de trabajo que elevan la cultura corporativa. Salas de reuniones, lobbies, áreas de descanso y zonas de colaboración, todo con la precisión de marcas europeas líderes en mobiliario contract.",
    ctaLabel: "Consultar proyecto",
    ctaHref: "/contacto",
    stats: [
      { value: 60, suffix: "+", label: "Empresas servidas" },
      { value: 5, suffix: " países", label: "De alcance regional" },
      { value: 0, prefix: "A+", label: "Certificación de calidad" },
    ],
  },
  gallery: {
    eyebrow: "Galería",
    images: [
      { src: "/projects/corporate/gallery/corporate-gallery-01.jpg", alt: "Proyecto corporativo Design HOF 1" },
      { src: "/projects/corporate/gallery/corporate-gallery-02.jpg", alt: "Proyecto corporativo Design HOF 2" },
      { src: "/projects/corporate/gallery/corporate-gallery-03.jpg", alt: "Proyecto corporativo Design HOF 3" },
      { src: "/projects/corporate/gallery/corporate-gallery-04.jpg", alt: "Proyecto corporativo Design HOF 4" },
      { src: "/projects/corporate/gallery/corporate-gallery-05.png", alt: "Proyecto corporativo Design HOF 5" },
    ],
  },
};

