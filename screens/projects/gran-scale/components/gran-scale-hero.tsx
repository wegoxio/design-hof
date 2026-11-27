import Image from "next/image";
import Link from "next/link";

import type { ProjectDetailContent } from "../types/gran-scale";

export function ProjectDetailHero({
  content,
}: {
  content: ProjectDetailContent;
}) {
  return (
    <>
      {/* Navegación de regreso */}
      <div
        id="project-detail-top"
        className="h-16 scroll-mt-24 border-b border-black/[.055] bg-white max-[700px]:h-[58px]"
      >
        <nav
          aria-label="Migas de pan"
          className="site-container flex h-full items-center gap-[11px] overflow-x-auto text-[9px] font-medium tracking-[1.35px] whitespace-nowrap uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/proyectos"
            className="text-black/35 transition-colors duration-500 hover:text-black/70"
          >
            ← Volver a proyectos
          </Link>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative isolate min-h-[500px] overflow-hidden bg-[#1b1b1a] text-white max-[700px]:min-h-[420px]">
        <Image
          className="-z-20 scale-100 transition-transform duration-[1500ms] starting:scale-[1.045]"
          src={content.hero.imageUrl}
          alt={`${content.hero.title} de Design HOF`}
          fill
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 -z-10 bg-[linear-gradient(89deg,#070707f0,#08080845),linear-gradient(#00000003_40%,#05050599)]" />

        <div className="absolute right-[clamp(28px,5vw,72px)] bottom-16 left-[clamp(28px,5vw,72px)]">
          <p className="mb-5 text-[9px] tracking-[5px] text-white/42 uppercase">
            {content.hero.eyebrow}
          </p>

          <h1 className="text-[58px] leading-none font-bold tracking-[-2.5px] max-[700px]:text-[44px]">
            {content.hero.title}
          </h1>

          <p className="mt-5 max-w-[520px] text-[13px] leading-[1.7] font-normal text-white/50">
            {content.hero.description}
          </p>
        </div>
      </section>
    </>
  );
}
