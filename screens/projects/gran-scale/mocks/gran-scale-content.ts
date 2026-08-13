import type { ProjectDetailContent } from "../types/gran-scale";

export const granScaleContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Gran escala"],
  hero: {
    eyebrow: "Gran escala",
    title: "Proyectos de Gran Escala",
    description: "Espacios que definen el estándar.",
    imageUrl: "/projects/gran-scale/hero/gran-scale-hero-01-v2.jpg",
  },
  introduction: {
    eyebrow: "Acerca de este servicio",
    description:
      "Intervenimos proyectos arquitectónicos de alta complejidad —centros comerciales, hoteles boutique, edificios de oficinas y desarrollos mixtos—. Cada espacio es tratado como una oportunidad para elevar el entorno con mobiliario europeo de alto diseño.",
    ctaLabel: "Consultar proyecto",
    ctaHref: "/contacto",
    stats: [
      { value: 80, suffix: "+", label: "Proyectos completados" },
      { value: 12, label: "Países de origen" },
      { value: 15, suffix: " años", label: "De experiencia" },
    ],
  },
  gallery: {
    eyebrow: "Galería",
    images: [
      { src: "/projects/gran-scale/gallery/gran-scale-gallery-01-v2.jpg", alt: "Área corporativa de gran escala" },
      { src: "/projects/gran-scale/gallery/gran-scale-gallery-02-v2.png", alt: "Oficina contemporánea equipada" },
      { src: "/projects/gran-scale/gallery/gran-scale-gallery-03-v2.jpg", alt: "Espacio colaborativo con iluminación natural" },
      { src: "/projects/gran-scale/gallery/gran-scale-gallery-04-v2.jpg", alt: "Sala de reuniones y descanso corporativa" },
      { src: "/projects/gran-scale/gallery/gran-scale-gallery-05-v2.png", alt: "Estación de trabajo ejecutiva" },
    ],
  },
};
