import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";
import assets from "../../content/project-assets.json";

type Project = ProjectDetailContent["gallery"]["projects"][number];

type AssetEntry = {
  hero?: string;
  logo?: string;
  thumbnail?: string;
  images?: string[];
};

const corporateAssets = assets.corporate as Record<string, AssetEntry>;
const heroes = assets.heroes as Record<string, string>;

function images(title: string, slug: string) {
  return (corporateAssets[slug]?.images ?? []).map((src, index) => ({
    src,
    alt: `${title} — imagen ${index + 1}`,
  }));
}

/**
 * Los seis proyectos corporativos. La lista alimenta tanto la galería del
 * portafolio como las tarjetas de la sección de exploración, de modo que cada
 * tarjeta muestra la portada de su proyecto.
 */
const corporateProjects: Project[] = [
  {
    id: "oficina-corporativa",
    eyebrow: "01 · Proyecto corporativo",
    title: "Oficina Corporativa",
    location: "Oficina Corporativa. Caracas, Venezuela.",
    scope: "Mobiliario · Interiorismo",
    description: "Interiorismo y suministro de mobiliario para proyecto de oficina",
    images: images("Oficina Corporativa", "oficina-corporativa"),
  },
  {
    id: "centro-medico",
    eyebrow: "02 · Proyecto corporativo",
    title: "Centro Médico",
    location: "Centro Médico. Caracas, Venezuela.",
    scope: "Revestimiento · Mobiliario",
    description:
      "Suministro e instalación de tope de piedra sinterizada y mobiliario a medida para counter médico.",
    images: images("Centro Médico", "centro-medico"),
  },
  {
    id: "co-working-space",
    eyebrow: "03 · Proyecto corporativo",
    title: "Co working space",
    location: "Co working space. Caracas, Venezuela.",
    scope: "Revestimiento",
    description: "Suministro e instalación de tope de piedra sinterizada.",
    images: images("Co working space", "co-working-space"),
  },
  {
    id: "centro-financiero",
    eyebrow: "04 · Proyecto corporativo",
    title: "Centro Financiero",
    location: "Centro Financiero. Caracas, Venezuela.",
    scope: "Revestimiento",
    description: "Suministro e instalación de tope de piedra sinterizada.",
    images: images("Centro Financiero", "centro-financiero"),
  },
  {
    id: "counter-torre-de-oficinas",
    eyebrow: "05 · Proyecto corporativo",
    title: "Counter torre de oficinas",
    location: "Counter torre de oficinas. Caracas, Venezuela.",
    scope: "Revestimiento",
    description: "Suministro e instalación de tope de piedra sinterizada.",
    images: images("Counter torre de oficinas", "counter-torre-de-oficinas"),
  },
  {
    id: "torre-comercial",
    eyebrow: "06 · Proyecto corporativo",
    title: "Torre comercial",
    location: "Torre comercial. Caracas, Venezuela.",
    scope: "Revestimiento",
    description:
      "Suministro e instalación de piedra sinterizada para fachada.",
    images: images("Torre comercial", "torre-comercial"),
  },
];

export const corporateContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Corporativo"],
  hero: {
    eyebrow: "Proyectos corporativos",
    title: "Proyectos corporativos",
    description: "Espacios que representan tu empresa.",
    imageUrl: heroes.corporativo,
  },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos corporativos",
    explorationDescription:
      "Explora las imágenes. Pasa el cursor para ampliar o selecciona un proyecto.",
    filters: corporateProjects.map(({ title, images }) => ({
      label: title,
      imageUrl: images[0]?.src,
    })),
    description:
      "Interiorismo, mobiliario a medida y revestimientos para oficinas, centros médicos, espacios de trabajo y torres comerciales. Proyectos corporativos realizados en Caracas, Venezuela.",
    ctaLabel: "Consultar proyecto",
    ctaHref: "/contacto",
    stats: [
      { value: 6, label: "Proyectos seleccionados" },
      { value: 6, label: "Portadas seleccionadas" },
      { value: 1, label: "Ciudad: Caracas" },
    ],
  },
  gallery: {
    eyebrow: "Portafolio",
    title: "Proyectos seleccionados",
    description:
      "Una selección de proyectos corporativos en Caracas, Venezuela.",
    projects: corporateProjects,
  },
};
