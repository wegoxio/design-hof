import type { ProjectDetailContent } from "../types/gran-scale";

const gallery = [
  "/projects/gran-scale/gallery/gran-scale-gallery-01-v2.jpg",
  "/projects/gran-scale/gallery/gran-scale-gallery-02-v2.png",
  "/projects/gran-scale/gallery/gran-scale-gallery-03-v2.jpg",
  "/projects/gran-scale/gallery/gran-scale-gallery-04-v2.jpg",
  "/projects/gran-scale/gallery/gran-scale-gallery-05-v2.png",
];

type Project = ProjectDetailContent["gallery"]["projects"][number];

function project(index: number, title: string, scope: string, description: string, location = "Vivienda Residencial. Caracas – Venezuela."): Project {
  const id = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    id,
    eyebrow: `${String(index).padStart(2, "0")} · Vivienda particular`,
    title,
    location,
    scope,
    description,
    images: [0, 1, 2].map((step) => ({
      src: gallery[(index - 1 + step) % gallery.length],
      alt: `${title} — imagen ${step + 1}`,
    })),
  };
}

const selectedProjects: Project[] = [
  project(1, "Koncept", "Cocina · Tope · Clóset · Interiorismo · Mobiliario · Cuarto de juegos", "Diseño e instalación de mobiliario de cocina, clóset auxiliar y cuarto de juegos.\n\nSuministro e instalación de tope de piedra sinterizada.\n\nInteriorismo y suministro de mobiliario para interiores y exteriores."),
  project(2, "Proyecto 81", "Cocina · Coffee Bar · Despensa · Área de servicio · Interiorismo", "Diseño e instalación de mobiliario de cocina, coffee bar, despensa y área de servicio.\n\nInteriorismo y suministro de luminaria para comedor."),
  project(3, "Proyecto H 4", "Cocina · Tope · Área parrillera · Área de lavandería", "Diseño e instalación de mobiliario de cocina, área de parrillera y área de lavandería.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(4, "Cocina Negra", "Cocina", "Diseño e instalación de mobiliario de cocina."),
  project(5, "Proyecto AVA", "Cocina · Tope · Baño de visita · Revestimiento de paredes", "Diseño e instalación de mobiliario de cocina y área de lavandería.\n\nSuministro e instalación de tope de piedra sinterizada.\n\nSuministro e instalación de revestimiento de piedra para baño de visita.", "Apartamento residencial. Caracas – Venezuela"),
  project(6, "Cocina Casa Natural", "Cocina · Tope · Baño de visita · Área de lavandería", "Diseño e instalación de mobiliario de cocina y área de lavandería.\n\nSuministro e instalación de tope de piedra sinterizada.\n\nSuministro e instalación de revestimiento de piedra para baño de visita."),
  project(7, "Cocina Greige", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(8, "Casa Verde", "Interiorismo · Mobiliario", "Interiorismo y suministro de mobiliario para sala, comedor y área de terraza y deck en jardín."),
  project(9, "Casa Campo", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina. -Suministro e instalación de tope de piedra sinterizada."),
  project(10, "Proyecto Alta", "Cocina · Interiorismo · Mobiliario", "Diseño e instalación de mobiliario de cocina.\n\nInteriorismo y suministro de mobiliario para interiores."),
  project(11, "Kids Playroom", "HomeBar · Interiorismo · Mobiliario", "Diseño e instalación de mobiliario a medida para cuarto de juegos.\n\nInteriorismo y suministro de mobiliario para interiores."),
  project(12, "Proyecto Talblick", "HomeBar · Interiorismo · Mobiliario", "Diseño e instalación de mobiliario para HomeBar.\n\nInteriorismo y suministro de mobiliario para interiores."),
  project(13, "Proyecto Nature", "Interiorismo · Mobiliario", "Interiorismo y suministro de mobiliario para interiores."),
  project(14, "Proyecto Freien", "Cocina · Tope · Walk in Clóset · Clósets", "Diseño e instalación de mobiliario de cocina, walk in clóset y clósets.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(15, "Cocina Azul", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(16, "Proyecto Hübsch", "Walk in Clóset · Vestier Interno · Walk in Shower · Baño · Clóset auxiliar · Office Room · Estudio de TV", "Diseño e instalación de mobiliario para Walk in clóset, Vestier Interno, Baño principal, Clóset auxiliar, Office room y estudio de TV.\n\nSuministro e instalación de piedra sinterizada para Walk in shower y área de lavamanos baño principal."),
  project(17, "Terraza Amarillo", "Interiorismo · Mobiliario de exteriores", "Interiorismo y suministro de mobiliario de exteriores para terraza."),
  project(18, "Cocina Latte", "Cocina · Tope · Mobiliario", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada.\n\nSelección y suministro de sillas de pantry."),
  project(19, "Aurea", "Cocina principal · Cocina de Huéspedes", "Diseño e instalación de mobiliario de cocinas personalizado en color y textura.", "Casa Residencial de playa. Hacienda Iguana, Nicaragua."),
  project(20, "Biblioteca", "Mobiliario", "Diseño e instalación de mobiliario personalizado para biblioteca."),
  project(21, "Marmor Haus", "Interiorismo · Mobiliario", "Interiorismo y suministro de mobiliario."),
  project(22, "Cocina Sebucán", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(23, "Apartamento Lomas", "Interiorismo · Mobiliario", "Interiorismo y suministro de mobiliario."),
  project(24, "Cocina Gris Claro", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(25, "Proyecto Grün", "Cocina · Cocina área de parrillera · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(26, "Apartamento Blick", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(27, "Cocina Lineal", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(28, "Proyecto B&W", "Walk in Clóset · Vestier Interno · Baños · Clóset auxiliar · Revestimiento", "Diseño e instalación de mobiliario para Walk in clóset, Vestier Interno, Baños, Clóset auxiliar.\n\nSuministro e instalación de piedra sinterizada."),
  project(29, "Grau Küche", "Cocina · Tope", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada."),
  project(30, "Cocina Gris", "Cocina · Tope · Interiorismo · Mobiliario", "Diseño e instalación de mobiliario de cocina.\n\nSuministro e instalación de tope de piedra sinterizada.\n\nInteriorismo y suministro de mobiliario para comedor."),
  project(31, "Apartamento Camurí", "Cocina · Mueble de TV · Bar", "Diseño e instalación de mobiliario de cocina, mueble de TV y mueble de Bar.", "Apartamento de playa. La Guaira – Venezuela."),
];

export const granScaleContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Viviendas particulares"],
  hero: { eyebrow: "Viviendas particulares", title: "Viviendas particulares", description: "Diseño a medida para cada hogar.", imageUrl: "/projects/gran-scale/hero/gran-scale-hero-01-v2.jpg" },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestras viviendas",
    explorationDescription: "Selecciona un proyecto para ir directamente a su información.",
    filters: selectedProjects.map(({ title }) => title),
    description: "Diseñamos e instalamos cocinas, clósets, baños y mobiliario a medida. Una selección de viviendas particulares con soluciones de interiorismo, materiales y equipamiento para cada espacio.",
    ctaLabel: "Consultar proyecto", ctaHref: "/contacto",
    stats: [{ value: 31, label: "Proyectos seleccionados" }, { value: 31, label: "Viviendas particulares" }, { value: 2, label: "Países: Venezuela y Nicaragua" }],
  },
  gallery: {
    eyebrow: "Portafolio", title: "Proyectos seleccionados", description: "Una selección de viviendas particulares en Venezuela y Nicaragua.", projects: selectedProjects,
  },
};
