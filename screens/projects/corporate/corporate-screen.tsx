import { ProjectDetailGallery } from "../gran-scale/components/gran-scale-gallery";
import { ProjectDetailHero } from "../gran-scale/components/gran-scale-hero";
import { ProjectDetailIntroduction } from "../gran-scale/components/gran-scale-introduction";
import { OtherProjectsSection } from "../gran-scale/components/other-projects-section";
import { projectsContent } from "../content/projects-content";
import { corporateContent } from "./content/corporate-content";

export function CorporateScreen() {
  return (
    <>
      <ProjectDetailHero content={corporateContent} />
      <ProjectDetailIntroduction content={corporateContent.introduction} />
      <ProjectDetailGallery content={corporateContent.gallery} />
      <OtherProjectsSection projects={projectsContent.areas.filter((project) => project.id !== "corporativo")} />
    </>
  );
}
