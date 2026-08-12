import type { ProjectsContent } from "../types/projects";

export const projectsContent: ProjectsContent = {
  hero: { eyebrow: "Design Hof", title: "Proyectos", description: "Más de dos décadas transformando espacios en Venezuela y la región con mobiliario europeo de alto diseño.", imageUrl: "/projects/projects-hero-01.png" },
  introduction: { eyebrow: "Nuestro enfoque", title: "Cada espacio es una historia diferente.", description: "En Design HOF no vendemos muebles: componemos espacios. Trabajamos junto a arquitectos, constructoras y clientes finales para garantizar que cada pieza encontrará su lugar perfecto. Nuestro equipo de diseño acompaña cada proyecto desde la primera visita hasta la entrega final." },
  areas: [
    { id: "gran-escala", eyebrow: "Gran escala", title: "Proyectos de Gran Escala", description: "Intervenimos proyectos arquitectónicos de alta complejidad — centros comerciales, hoteles boutique, edificios de oficinas y espacios institucionales.", imageUrl: "/projects/project-area-01.png", href: "/proyectos?area=gran-escala" },
    { id: "residencial", eyebrow: "Residencial", title: "Proyectos Residenciales", description: "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas privadas.", imageUrl: "/projects/project-area-02.webp", href: "/proyectos?area=residencial" },
    { id: "corporativo", eyebrow: "Corporativo", title: "Proyectos Corporativos", description: "Diseñamos y dotamos entornos de trabajo que elevan la cultura corporativa. Salas de reuniones, lobbies, áreas de colaboración y oficinas.", imageUrl: "/projects/project-area-03.webp", href: "/proyectos?area=corporativo" },
  ],
  stats: [{ value: "340+", label: "Proyectos entregados" }, { value: "22 años", label: "De trayectoria" }, { value: "15+", label: "Marcas europeas" }, { value: "100%", label: "Asesoría personalizada" }],
};
