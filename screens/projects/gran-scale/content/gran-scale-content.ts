import type { ProjectDetailContent } from "../types/gran-scale";
import assets from "../../content/project-assets.json";

type Project = ProjectDetailContent["gallery"]["projects"][number];

const allAssets = assets as Record<
  string,
  Record<string, { hero?: string; images: string[] }>
>;

const privateAssets = allAssets["private-homes"] ?? {};
// Si en project-assets.json estos 12 están bajo otra clave (ej. "projects" o "residential"), la toma automáticamente:
const residentialAssets =
  allAssets["projects"] ?? allAssets["residential"] ?? privateAssets;

function project(
  index: number,
  id: string,
  title: string,
  scope: string,
  description: string,
  thumbnailUrl: string,
  totalImages: number,
  category: string,
  location: string,
): Project {
  const fromJson = residentialAssets[id]?.images;

  const rawImages =
    fromJson && fromJson.length > 0
      ? fromJson
      : Array.from({ length: totalImages }, (_, i) => {
          const num = String(i + 1).padStart(2, "0");
          return i === 0 ? thumbnailUrl : `/projects/projects/${id}-${num}.png`;
        });

  return {
    id,
    eyebrow: `${String(index).padStart(2, "0")} · ${category}`,
    title,
    location,
    scope,
    description,
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
    "/projects/project/quarzo-01.png",
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
    "/projects/project/botaniko-01.png",
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
    "/projects/project/premier-terra-01.png",
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
    "/projects/project/premier-las-lomas-01.png",
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
    "/projects/project/premier-27-01.png",
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
    "/projects/project/costamar-01.png",
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
    "/projects/project/arubas-life-01.png",
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
    "/projects/project/harbour-house-01.png",
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
    "/projects/project/azure-01.png",
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
    "/projects/project/blue-residences-01.png",
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
    "/projects/project/manantial-01.png",
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
    "/projects/project/vista-frontera-01.png",
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
      selectedProjects[0]?.images[0]?.src ?? privateAssets.koncept?.hero ?? "",
  },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos",
    explorationDescription:
      "Explora las imágenes. Pasa el cursor para ampliar o selecciona un proyecto.",
    filters: selectedProjects.map(({ title, images }) => ({
      label: title,
      imageUrl: images[0]?.src,
    })),
    description:
      "Diseñamos e instalamos cocinas, clósets, baños y mobiliario a medida. Una selección de proyectos residenciales con soluciones de interiorismo, materiales y equipamiento para cada espacio.",
    ctaLabel: "Consultar proyecto",
    ctaHref: "/contacto",
    stats: [
      { value: 12, label: "Proyectos seleccionados" },
      { value: 90, label: "Imágenes de obra" },
      { value: 3, label: "Países: Venezuela, Aruba y Nicaragua" },
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
