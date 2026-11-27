import { ProjectAreasSection } from "./components/project-areas-section";
import { ProjectsHero } from "./components/projects-hero";
import { ProjectsIntroduction } from "./components/projects-introduction";
import { projectsContent } from "./content/projects-content";
import { ServiceOverview } from "./components/service-overview";
import { SelectedProjects } from "./components/selected-projects";

export function ProjectsScreen() {
  return (
    <>
      <ProjectsHero content={projectsContent.hero} />
      <ProjectsIntroduction content={projectsContent.introduction} />
      <ServiceOverview content={projectsContent.serviceOverview} />
      <SelectedProjects content={projectsContent.selectedProjects} />
      <ProjectAreasSection areas={projectsContent.areas} />
    </>
  );
}
