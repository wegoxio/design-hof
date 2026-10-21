import { ProjectDetailGallery } from "./components/gran-scale-gallery";
import { ProjectDetailHero } from "./components/gran-scale-hero";
import { ProjectDetailIntroduction } from "./components/gran-scale-introduction";
import { OtherProjectsSection } from "./components/other-projects-section";
import { granScaleContent } from "./content/gran-scale-content";
import { projectsContent } from "../content/projects-content";

export function GranScaleScreen() {
  return (
    <>
      <ProjectDetailHero content={granScaleContent} />
      <ProjectDetailIntroduction content={granScaleContent.introduction} />
      <ProjectDetailGallery content={granScaleContent.gallery} />
      <OtherProjectsSection projects={projectsContent.areas.filter((project) => project.id !== "gran-escala")} />
    </>
  );
}
