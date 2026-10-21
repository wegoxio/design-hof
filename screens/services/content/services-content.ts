export type ServiceItem = {
  id: string;
  number: string;
  name: string;
  logo: string;
  image: string;
  scope: string;
  highlight: string;
  description: string;
};

export const services: ServiceItem[] = [
  {
    id: "inter-cuisine",
    number: "01",
    name: "Inter Cuisine",
    logo: "/services/inter-cuisine-logo.png",
    image: "/services/inter-cuisine.jpg",
    scope: "Cocinas · Baños · Clósets · Mobiliario",
    highlight: "Diseño personalizado",
    description: "Marca con más de 20 años de experiencia, dedicada al diseño personalizado y exclusivo e instalación de cocinas, baños, closets y muebles funcionales. Espacios inteligentes, hechos a medida.",
  },
  {
    id: "nolte-kuchen",
    number: "02",
    name: "Nolte Küchen",
    logo: "/services/nolte-logo.png",
    image: "/services/nolte.jpg",
    scope: "Cocinas · Made in Germany",
    highlight: "65+ años de experiencia",
    description: "Desde hace más de 65 años, Nolte Küchen se caracteriza por su experiencia en la fabricación de cocinas. Nolte Küchen es sinónimo de calidad excepcional, diseño y elementos de cocina de primera calidad. MADE IN GERMANY.",
  },
  {
    id: "raumplus",
    number: "03",
    name: "Raumplus",
    logo: "/services/raumplus-logo.png",
    image: "/services/raumplus.jpg",
    scope: "Clósets · Vestidores · Guardarropas",
    highlight: "Bremen, Alemania",
    description: "Raumplus con sede en Bremen, Alemania, lleva el diseño de clósets, vestidores y sistemas de guardarropas a un nuevo nivel de funcionalidad y estilo que combina calidad y tecnología de vanguardia. Custom Made Furniture.",
  },
  {
    id: "neolith",
    number: "04",
    name: "Neolith",
    logo: "/services/neolith-logo.png",
    image: "/services/neolith.jpg",
    scope: "Encimeras · Fachadas · Revestimientos",
    highlight: "Piedra sinterizada",
    description: "Una superficie arquitectónica innovadora, fabricada con materias primas naturales. Pionera y líder mundial en la creación de piedra sinterizada para encimeras de cocina, baños, fachadas, suelos y mobiliario. touch.feel.live",
  },
  {
    id: "xl-slabs",
    number: "05",
    name: "XL Slabs",
    logo: "/services/xl-slabs-logo.png",
    image: "/services/xl-slabs.jpg",
    scope: "Revestimientos · Encimeras · Fachadas",
    highlight: "Maxiformato",
    description: "Piedra sinterizada en láminas maxiformato de alto rendimiento para revestimientos: Encimeras, fachadas, pisos, paredes y mucho más. Calidad sin límites para proyectos comerciales y residenciales. Lujo y durabilidad asequible.",
  },
];
