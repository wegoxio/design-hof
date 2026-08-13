import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";

export const residentialContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Residencial"],
  hero: {
    eyebrow: "Residencial",
    title: "Proyectos Residenciales",
    description: "El hogar como obra de arte.",
    imageUrl: "/projects/residential/hero/residential-hero-01.jpg",
  },
  introduction: {
    eyebrow: "Acerca de este servicio",
    description: "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas de campo, cada proyecto parte de una escucha profunda para dar forma a espacios únicos, funcionales y atemporales.",
    ctaLabel: "Consultar proyecto",
    ctaHref: "/contacto",
    stats: [
      { value: 200, suffix: "+", label: "Residencias amuebladas" },
      { value: 100, suffix: "%", label: "Proyectos personalizados" },
      { value: 8, suffix: " sem", label: "Tiempo promedio" },
    ],
  },
  gallery: {
    eyebrow: "Galería",
    images: [
      { src: "/projects/residential/gallery/residential-gallery-01.jpg", alt: "Proyecto residencial Design HOF 1" },
      { src: "/projects/residential/gallery/residential-gallery-02.jpg", alt: "Proyecto residencial Design HOF 2" },
      { src: "/projects/residential/gallery/residential-gallery-03.jpg", alt: "Proyecto residencial Design HOF 3" },
      { src: "/projects/residential/gallery/residential-gallery-04.png", alt: "Proyecto residencial Design HOF 4" },
      { src: "/projects/residential/gallery/residential-gallery-05.png", alt: "Proyecto residencial Design HOF 5" },
    ],
  },
};
