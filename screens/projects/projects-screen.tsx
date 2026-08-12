import { ProjectAreasSection } from "./components/project-areas-section";
import { ProjectCtaSection } from "./components/project-cta-section";
import { ProjectStatsSection } from "./components/project-stats-section";
import { ProjectsHero } from "./components/projects-hero";
import { ProjectsIntroduction } from "./components/projects-introduction";
import { projectsContent } from "./mocks/projects-content";

export function ProjectsScreen() { return <><ProjectsHero content={projectsContent.hero} /><ProjectsIntroduction content={projectsContent.introduction} /><ProjectAreasSection areas={projectsContent.areas} /><ProjectStatsSection stats={projectsContent.stats} /><ProjectCtaSection /></>; }
