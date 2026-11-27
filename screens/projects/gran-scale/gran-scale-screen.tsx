import { ProjectDetailGallery } from "./components/gran-scale-gallery";
import { ProjectDetailHero } from "./components/gran-scale-hero";
import { ExplorationSection } from "./components/gran-scale-introduction";
import { OtherProjectsSection } from "./components/other-projects-section";
import { granScaleContent } from "./content/gran-scale-content";
import { projectsContent } from "../content/projects-content";

export function GranScaleScreen() {
  return (
    <>
      <ProjectDetailHero content={granScaleContent} />
      <ExplorationSection
        content={granScaleContent.introduction}
        isInView={true}
        Counter={({ stat }) => (
          <>
            {stat.value}
            {stat.suffix ?? ""}
          </>
        )}
        projectAnchor={(label) =>
          label
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        }
      />
      <ProjectDetailGallery content={granScaleContent.gallery} />
      <OtherProjectsSection
        projects={projectsContent.areas.filter(
          (project) => project.id !== "gran-escala",
        )}
      />
    </>
  );
}
