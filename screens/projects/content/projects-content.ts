import type { ProjectsContent } from "../types/projects";

export const projectsContent: ProjectsContent = {
  hero: { eyebrow: "Design HOF", title: "Proyectos", description: "Más de dos décadas transformando espacios en Venezuela y la región con mobiliario europeo de alto diseño.", imageUrl: "/projects/hero/projects-hero-01.png" },
  introduction: { eyebrow: "Nuestro enfoque", title: "Cada espacio es una historia diferente.", description: "En Design HOF no vendemos muebles: componemos espacios. Trabajamos junto a arquitectos, constructoras y clientes finales para garantizar que cada pieza encuentre su lugar perfecto. Nuestro equipo de diseño acompaña cada proyecto desde la primera visita hasta la entrega final." },
  areas: [
    { id: "gran-escala", eyebrow: "Gran escala", title: "Proyectos de Gran Escala", description: "Intervenimos proyectos arquitectónicos de alta complejidad: centros comerciales, hoteles boutique, edificios de oficinas y espacios institucionales.", imageUrl: "/projects/areas/project-area-01.jpg", href: "/proyectos/gran-escala" },
    { id: "residencial", eyebrow: "Residencial", title: "Proyectos Residenciales", description: "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas privadas.", imageUrl: "/projects/areas/project-area-02.jpg", href: "/proyectos/residencial" },
    { id: "corporativo", eyebrow: "Corporativo", title: "Proyectos Corporativos", description: "Diseñamos y dotamos entornos de trabajo que elevan la cultura corporativa: salas de reuniones, lobbies, áreas de colaboración y oficinas.", imageUrl: "/projects/areas/project-area-03.jpg", href: "/proyectos/corporativo" },
  ],
  stats: [
    { value: 340, suffix: "+", label: "Proyectos entregados" },
    { value: 22, suffix: " años", label: "De trayectoria" },
    { value: 15, suffix: "+", label: "Marcas europeas" },
    { value: 100, suffix: "%", label: "Asesoría personalizada" },
  ],
};
