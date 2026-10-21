import { ProjectDetailGallery } from "../gran-scale/components/gran-scale-gallery";
import { ProjectDetailHero } from "../gran-scale/components/gran-scale-hero";
import { ProjectDetailIntroduction } from "../gran-scale/components/gran-scale-introduction";
import { OtherProjectsSection } from "../gran-scale/components/other-projects-section";
import { projectsContent } from "../content/projects-content";
import { residentialContent } from "./content/residential-content";

export function ResidentialScreen() {
  return (
    <>
      <ProjectDetailHero content={residentialContent} />
      <ProjectDetailIntroduction content={residentialContent.introduction} />
      <ProjectDetailGallery content={residentialContent.gallery} />
      <OtherProjectsSection projects={projectsContent.areas.filter((project) => project.id !== "residencial")} />
    </>
  );
}
