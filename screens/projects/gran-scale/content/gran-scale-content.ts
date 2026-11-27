import type { ProjectDetailContent } from "../types/gran-scale";
import assets from "../../content/project-assets.json";

type Project = ProjectDetailContent["gallery"]["projects"][number];

type AssetEntry = {
  hero?: string;
  logo?: string;
  thumbnail?: string;
  images?: string[];
};

const allAssets = assets as {
  heroes?: Record<string, string>;
  residential?: Record<string, AssetEntry>;
};

const heroes = allAssets.heroes ?? {};
const residentialAssets = allAssets["residential"] ?? {};

function project(
  index: number,
  id: string,
  title: string,
  scope: string,
  description: string,
  totalImages: number,
  category: string,
  location: string,
): Project {
  const entry = residentialAssets[id];
  const fromJson = entry?.images;

  const rawImages =
    fromJson && fromJson.length > 0
      ? fromJson
      : Array.from({ length: totalImages }, (_, i) => {
          const num = String(i + 1).padStart(3, "0");
          return `/projects/residential/projects/${id}/images/image-${num}.jpg`;
        });

  return {
    id,
    eyebrow: `${String(index).padStart(2, "0")} · ${category}`,
    title,
    location,
    scope,
    description,
    thumbnailUrl: entry?.thumbnail,
    images: rawImages.map((src, imageIndex) => ({
      src,
      alt: `${title} — imagen ${imageIndex + 1}`,
    })),
  };
}

export const selectedProjects: Project[] = [
  project(
    1,
    "quarzo",
    "Quarzo",
    "Vestiers · Clósets · Baños · Puertas internas · Puertas principales apt. · Cocina apt. modelo",
    "Diseño e instalación de Vestiers, clósets y baños.\n\nDiseño e instalación de puertas principales de apartamentos con cerradura digital.\n\nDiseño e instalación de puertas internas de habitación.\n\nDiseño e instalación de cocina para apartamento modelo.",
    11,
    "Proyecto Residencial",
    "Condominio residencial de lujo. Caracas, Venezuela.",
  ),
  project(
    2,
    "botaniko",
    "Botaniko",
    "Clósets · Baños · Puertas internas · Cocina área Lounge",
    "Diseño e instalación de mobiliario de clósets y baños.\n\nDiseño e instalación de puertas internas de habitación.",
    15,
    "Proyecto Residencial",
    "Condominio residencial de lujo. Caracas, Venezuela.",
  ),
  project(
    3,
    "premier-terra",
    "Premier Terra",
    "Cocinas · Clósets · Puertas internas",
    "Diseño e instalación de mobiliario de cocinas y clósets\n\nDiseño e instalación de puertas internas de habitación.",
    6,
    "Proyecto Residencial",
    "Condominio residencial. Caracas, Venezuela.",
  ),
  project(
    4,
    "premier-las-lomas",
    "Premier Las Lomas",
    "Cocinas · Topes",
    "Diseño e instalación de mobiliario de cocinas.\n\nSuministro e instalación de topes de acrílico mineral en cocinas.",
    3,
    "Proyecto Residencial",
    "Condominio residencial. Caracas, Venezuela.",
  ),
  project(
    5,
    "premier-27",
    "Premier 27",
    "Cocinas · Topes · Interiorismo · Mobiliario",
    "Diseño e instalación de mobiliario de cocinas.\n\nSuministro e instalación de topes de acrílico mineral en cocinas.\n\nInteriorismo y suministro de mobiliario de exteriores para áreas de piscinas y parrillera.",
    14,
    "Proyecto Residencial",
    "Condominio residencial de lujo. Caracas, Venezuela.",
  ),
  project(
    6,
    "costamar",
    "Costamar",
    "Cocinas · Clósets",
    "Diseño e instalación de mobiliario de cocinas y clósets.",
    5,
    "Proyecto Residencial",
    "Condominio residencial Beach Front. Hacienda Iguana Golf and Beach Club, Nicaragua.",
  ),
  project(
    7,
    "arubas-life",
    "Arubas Life",
    "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
    "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario en apartamento modelo.",
    6,
    "Proyecto Residencial",
    "Condominio residencial. Noord, Aruba.",
  ),
  project(
    8,
    "harbour-house",
    "Harbour House",
    "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
    "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario para Sale's office.",
    9,
    "Proyecto Residencial",
    "Condominio residencial y comercial de lujo. Oranjestad, Aruba.",
  ),
  project(
    9,
    "azure",
    "Azure",
    "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
    "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario en Lobby y Owner's Lounge.",
    4,
    "Proyecto Residencial",
    "Condominio residencial Beach Front. Eagle Beach, Aruba.",
  ),
  project(
    10,
    "blue-residences",
    "Blue Residences",
    "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
    "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario en apartamentos.",
    11,
    "Proyecto Residencial",
    "Condominio residencial de lujo Beach Front. Eagle Beach, Aruba.",
  ),
  project(
    11,
    "manantiales",
    "Manantiales",
    "Baños · Clósets",
    "Diseño e instalación de mobiliario de baños y clósets.",
    3,
    "Proyecto Residencial",
    "Edificio residencial de lujo. Caracas, Venezuela.",
  ),
  project(
    12,
    "vista-frontera",
    "Vista Frontera",
    "Baños · Clósets",
    "Diseño e instalación de mobiliario de baños y clósets.",
    3,
    "Proyecto Residencial",
    "Caracas, Venezuela",
  ),
];

export const granScaleContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Proyectos de gran escala"],
  hero: {
    eyebrow: "Residencial",
    title: "Proyectos de gran escala",
    description: "El hogar como obra de arte.",
    imageUrl:
      heroes["gran-escala"] ?? selectedProjects[0]?.images[0]?.src ?? "",
  },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos",
    explorationDescription:
      "Explora las imágenes. Pasa el cursor para ampliar o selecciona un proyecto.",
    filters: selectedProjects.map(({ title, images, thumbnailUrl }) => ({
      label: title,
      imageUrl: thumbnailUrl ?? images[0]?.src,
    })),
    description:
      "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas de campo, cada proyecto parte de una escucha profunda para dar forma a espacios únicos, funcionales y atemporales.",
    ctaLabel: "Consultar proyecto",
    ctaHref: "/contacto",
    stats: [
      { value: 200, suffix: "+", label: "Residencias amuebladas" },
      { value: 100, suffix: "%", label: "Proyectos Personalizados" },
      { value: 8, suffix: " sem", label: "Tiempo Promedio" },
    ],
  },
  gallery: {
    eyebrow: "Portafolio",
    title: "Proyectos seleccionados",
    description:
      "Una selección de proyectos residenciales en Venezuela, Aruba y Nicaragua.",
    projects: selectedProjects,
  },
};
