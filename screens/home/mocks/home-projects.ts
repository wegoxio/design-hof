import type { ProjectArea } from "@/screens/projects/types/projects";

export const homeProjects: ProjectArea[] = [
  {
    id: "gran-escala",
    eyebrow: "Gran escala",
    title: "Proyectos de Gran Escala",
    description: "Proyectos arquitectónicos de alta complejidad.",
    imageUrl: "/home/projects/home-project-01.jpg",
    href: "/proyectos?area=gran-escala",
  },
  {
    id: "residencial",
    eyebrow: "Residencial",
    title: "Proyectos Residenciales",
    description: "Residencias transformadas en experiencias.",
    imageUrl: "/home/projects/home-project-02.jpg",
    href: "/proyectos?area=residencial",
  },
  {
    id: "corporativo",
    eyebrow: "Corporativo",
    title: "Proyectos Corporativos",
    description: "Entornos de trabajo que elevan la cultura corporativa.",
    imageUrl: "/home/projects/home-project-03.jpg",
    href: "/proyectos?area=corporativo",
  },
];
