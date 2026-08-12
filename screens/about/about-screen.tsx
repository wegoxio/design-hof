import { AboutHero } from "./components/about-hero";
import { AboutIntroduction } from "./components/about-introduction";
import { FoundersSection } from "./components/founders-section";
import { InterviewsSection } from "./components/interviews-section";
import { LegacySection } from "./components/legacy-section";
import { VisitSection } from "./components/visit-section";
import { aboutContent } from "./mocks/about-content";

export function AboutScreen() { return <><AboutHero content={aboutContent.hero} /><AboutIntroduction content={aboutContent.introduction} /><FoundersSection content={aboutContent.founders} /><InterviewsSection interviews={aboutContent.interviews} /><LegacySection content={aboutContent.legacy} /><VisitSection /></>; }
