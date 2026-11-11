import type { ProjectDetailContent } from "../types/gran-scale";

export const granScaleContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Viviendas particulares"],
  hero: { eyebrow: "Viviendas particulares", title: "Viviendas particulares", description: "Espacios que reflejan una forma de vivir.", imageUrl: "/projects/gran-scale/hero/gran-scale-hero-01-v2.jpg" },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestras viviendas particulares",
    explorationDescription: "Proyectos personalizados que responden a la arquitectura y a la forma de vivir de cada cliente.",
    filters: ["Koncept", "Proyecto 81", "Apartamento 114", "Cocina Negra", "Casa Limón", "Apartamento Ávila"],
    description: "Diseñamos e instalamos cocinas, clósets, baños y mobiliario a medida. Una selección de interiores particulares con soluciones de interiorismo, materiales y equipamiento para cada espacio.",
    ctaLabel: "Consultar proyecto", ctaHref: "/contacto",
    stats: [{ value: 80, suffix: "+", label: "Proyectos completados" }, { value: 12, label: "Ciudades atendidas" }, { value: 15, suffix: " años", label: "De experiencia" }],
  },
  gallery: {
    eyebrow: "Portafolio", title: "Proyectos seleccionados", description: "Viviendas resueltas desde una mirada integral: distribución, materialidad, mobiliario e iluminación.",
    projects: [
      { id: "koncept", eyebrow: "01 · Vivienda particular", title: "Koncept", location: "Caracas, Venezuela", scope: "Interiorismo · Mobiliario", description: "Un proyecto de líneas serenas donde el mobiliario acompaña la arquitectura y potencia la relación con el exterior.", images: [{ src: "/projects/gran-scale/gallery/gran-scale-gallery-01-v2.jpg", alt: "Vivienda particular Koncept" }, { src: "/projects/gran-scale/gallery/gran-scale-gallery-02-v2.png", alt: "Interior del proyecto Koncept" }] },
      { id: "proyecto-81", eyebrow: "02 · Vivienda particular", title: "Proyecto 81", location: "Caracas, Venezuela", scope: "Diseño integral · Instalación", description: "Una vivienda de atmósfera natural desarrollada desde la selección de piezas hasta la instalación y supervisión final.", images: [{ src: "/projects/gran-scale/gallery/gran-scale-gallery-03-v2.jpg", alt: "Vivienda Proyecto 81" }, { src: "/projects/gran-scale/gallery/gran-scale-gallery-04-v2.jpg", alt: "Área social de Proyecto 81" }, { src: "/projects/gran-scale/gallery/gran-scale-gallery-05-v2.png", alt: "Detalle de Proyecto 81" }] },
    ],
  },
};
