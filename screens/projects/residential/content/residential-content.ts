import type { ProjectDetailContent } from "../../gran-scale/types/gran-scale";
import assets from "../../content/project-assets.json";

const residentialAssets = assets.residential as Record<string, { images: string[]; logo?: string }>;

function images(project: string, slug: string) {
  return residentialAssets[slug].images.map((src, index) => ({ src, alt: `${project} — imagen ${index + 1}` }));
}

export const residentialContent: ProjectDetailContent = {
  breadcrumb: ["Inicio", "Proyectos", "Residencial"],
  hero: { eyebrow: "Residencial", title: "Proyectos Residenciales", description: "El hogar como obra de arte.", imageUrl: residentialAssets.quarzo.images[0] },
  introduction: {
    eyebrow: "Acerca de este servicio",
    explorationTitle: "Explora nuestros proyectos",
    explorationDescription: "Selecciona un logo para ir directamente al proyecto.",
    filters: ["Quarzo", "Botaniko", "Premier Terra", "Premier Las Lomas", "Premier 27", "Costamar", "Arubas Life", "Harbour House", "Azure", "Blue Residences", "Manantiales", "Vista Frontera"].map((label) => {
      const slug = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { label, imageUrl: residentialAssets[slug]?.logo };
    }),
    description: "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas de campo, cada proyecto parte de una escucha profunda para dar forma a espacios únicos, funcionales y atemporales.",
    ctaLabel: "Consultar proyecto", ctaHref: "/contacto",
    stats: [{ value: 200, suffix: "+", label: "Residencias amuebladas" }, { value: 100, suffix: "%", label: "Proyectos personalizados" }, { value: 8, suffix: " sem", label: "Tiempo promedio" }],
  },
  gallery: {
    eyebrow: "Portafolio", title: "Proyectos seleccionados", description: "Una selección de nuestros proyectos residenciales en Venezuela, Aruba y Nicaragua.",
    projects: [
      {
        id: "quarzo", eyebrow: "01 · Proyecto residencial", title: "Quarzo",
        location: "Condominio residencial de lujo. Caracas, Venezuela.",
        scope: "Vestiers · Clósets · Baños · Puertas internas · Puertas principales apt. · Cocina apt. modelo",
        description: "Diseño e instalación de Vestiers, clósets y baños.\n\nDiseño e instalación de puertas principales de apartamentos con cerradura digital.\n\nDiseño e instalación de puertas internas de habitación.\n\nDiseño e instalación de cocina para apartamento modelo.", images: images("Quarzo", "quarzo"),
      },
      {
        id: "botaniko", eyebrow: "02 · Proyecto residencial", title: "Botaniko",
        location: "Condominio residencial de lujo. Caracas, Venezuela.", scope: "Clósets · Baños · Puertas internas · Cocina área Lounge",
        description: "Diseño e instalación de mobiliario de clósets y baños.\n\nDiseño e instalación de puertas internas de habitación.", images: images("Botaniko", "botaniko"),
      },
      {
        id: "premier-terra", eyebrow: "03 · Proyecto residencial", title: "Premier Terra",
        location: "Condominio residencial. Caracas, Venezuela.", scope: "Cocinas · Clósets · Puertas internas",
        description: "Diseño e instalación de mobiliario de cocinas y clósets\n\nDiseño e instalación de puertas internas de habitación.", images: images("Premier Terra", "premier-terra"),
      },
      {
        id: "premier-las-lomas", eyebrow: "04 · Proyecto residencial", title: "Premier Las Lomas",
        location: "Condominio residencial. Caracas, Venezuela.", scope: "Cocinas · Topes",
        description: "Diseño e instalación de mobiliario de cocinas.\n\nSuministro e instalación de topes de acrílico mineral en cocinas.", images: images("Premier Las Lomas", "premier-las-lomas"),
      },
      {
        id: "premier-27", eyebrow: "05 · Proyecto residencial", title: "Premier 27",
        location: "Condominio residencial de lujo. Caracas, Venezuela.", scope: "Cocinas · Topes · Interiorismo · Mobiliario",
        description: "Diseño e instalación de mobiliario de cocinas.\n\nSuministro e instalación de topes de acrílico mineral en cocinas.\n\nInteriorismo y suministro de mobiliario de exteriores para áreas de piscinas y parrillera.", images: images("Premier 27", "premier-27"),
      },
      {
        id: "costamar", eyebrow: "06 · Proyecto residencial", title: "Costamar",
        location: "Condominio residencial Beach Front. Hacienda Iguana Golf and Beach Club, Nicaragua.", scope: "Cocinas · Clósets",
        description: "Diseño e instalación de mobiliario de cocinas y clósets.", images: images("Costamar", "costamar"),
      },
      {
        id: "arubas-life", eyebrow: "07 · Proyecto residencial", title: "Arubas Life",
        location: "Condominio residencial. Noord, Aruba.", scope: "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
        description: "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario en apartamento modelo.", images: images("Arubas Life", "arubas-life"),
      },
      {
        id: "harbour-house", eyebrow: "08 · Proyecto residencial", title: "Harbour House",
        location: "Condominio residencial y comercial de lujo. Oranjestad, Aruba.", scope: "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
        description: "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario para Sale’s office.", images: images("Harbour House", "harbour-house"),
      },
      {
        id: "azure", eyebrow: "09 · Proyecto residencial", title: "Azure",
        location: "Condominio residencial Beach Front. Eagle Beach, Aruba.", scope: "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
        description: "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario en Lobby y Owner’s Lounge.", images: images("Azure", "azure"),
      },
      {
        id: "blue-residences", eyebrow: "10 · Proyecto residencial", title: "Blue Residences",
        location: "Condominio residencial de lujo Beach Front. Eagle Beach, Aruba.", scope: "Cocinas · Baños · Clósets · Topes · Interiorismo · Mobiliario",
        description: "Diseño e instalación de mobiliario de cocinas, baños y clósets.\n\nSuministro e instalación de topes de cuarzo en cocinas.\n\nInteriorismo y suministro de mobiliario en apartamentos.", images: images("Blue Residences", "blue-residences"),
      },
      {
        id: "manantiales", eyebrow: "11 · Proyecto residencial", title: "Manantiales",
        location: "Edificio residencial de lujo. Caracas, Venezuela.", scope: "Baños · Clósets",
        description: "Diseño e instalación de mobiliario de baños y clósets.", images: images("Manantiales", "manantiales"),
      },
      {
        id: "vista-frontera", eyebrow: "12 · Proyecto residencial", title: "Vista Frontera", locationLabel: "Ubicación",
        location: "Caracas, Venezuela", scope: "Baños · Clósets",
        description: "Diseño e instalación de mobiliario de baños y clósets.", images: images("Vista Frontera", "vista-frontera"),
      },
    ],
  },
};
