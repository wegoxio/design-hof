"use client";

import Image from "next/image";
import { useState } from "react";
import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectDetailContent } from "../types/gran-scale";

type SelectedProject = ProjectDetailContent["gallery"]["projects"][number];

function ProjectImage({ project }: { project: SelectedProject }) {
  const [index, setIndex] = useState(0);
  const image = project.images[index];
  const move = (direction: -1 | 1) => setIndex((current) => (current + direction + project.images.length) % project.images.length);
  return (
    <div className="relative min-h-[440px] overflow-hidden bg-[#ecece8] max-[900px]:min-h-0 max-[900px]:aspect-[4/3]">
      <Image key={image.src} src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 55vw" className="object-cover transition-[opacity,transform] duration-700 starting:scale-[1.02] starting:opacity-0" />
      <div className="absolute right-0 bottom-0 flex bg-white">
        <button type="button" onClick={() => move(-1)} disabled={project.images.length < 2} className="grid size-12 place-items-center border border-black/8 text-lg transition hover:bg-black hover:text-white disabled:opacity-25" aria-label={`Imagen anterior de ${project.title}`}>‹</button>
        <button type="button" onClick={() => move(1)} disabled={project.images.length < 2} className="grid size-12 place-items-center border-y border-r border-black/8 text-lg transition hover:bg-black hover:text-white disabled:opacity-25" aria-label={`Imagen siguiente de ${project.title}`}>›</button>
      </div>
      <span className="absolute bottom-4 left-5 text-[8px] tracking-[2px] text-white drop-shadow-md">{String(index + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
    </div>
  );
}

export function ProjectDetailGallery({ content }: { content: ProjectDetailContent["gallery"] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.06);
  return (
    <section ref={ref} className="border-t border-black/8 bg-white py-[clamp(72px,8vw,120px)]">
      <div className="site-container">
        <p className="text-[9px] tracking-[5px] text-black/35 uppercase">{content.eyebrow}</p>
        <h2 className="mt-5 text-[clamp(30px,3.5vw,52px)] font-semibold tracking-[-1.5px]">{content.title}</h2>
        <p className="mt-4 max-w-[680px] text-[13px] leading-6 text-black/45">{content.description}</p>
        <div className="mt-[clamp(52px,7vw,90px)] space-y-[clamp(82px,10vw,150px)]">
          {content.projects.map((project, index) => (
            <article key={project.id} className={`grid grid-cols-[minmax(280px,.78fr)_minmax(0,1.35fr)] items-center gap-[clamp(42px,7vw,105px)] max-[900px]:grid-cols-1 max-[900px]:gap-8 ${index % 2 ? "[&>*:first-child]:order-2 max-[900px]:[&>*:first-child]:order-1" : ""}`}>
              <div className={`transition-[opacity,transform] duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`} style={{ transitionDelay: `${index * 120}ms` }}>
                <p className="text-[8px] tracking-[3.2px] text-black/30 uppercase">{project.eyebrow}</p>
                <h3 className="mt-5 text-[clamp(28px,3vw,44px)] font-semibold tracking-[-1.2px]">{project.title}</h3>
                <dl className="mt-8 space-y-3 border-y border-black/8 py-6 text-[11px]">
                  <div className="grid grid-cols-[90px_1fr] gap-4"><dt className="text-black/35 uppercase">Proyecto</dt><dd>{project.title}</dd></div>
                  <div className="grid grid-cols-[90px_1fr] gap-4"><dt className="text-black/35 uppercase">Ubicación</dt><dd>{project.location}</dd></div>
                  <div className="grid grid-cols-[90px_1fr] gap-4"><dt className="text-black/35 uppercase">Alcance</dt><dd>{project.scope}</dd></div>
                </dl>
                <p className="mt-6 text-[13px] leading-6 text-black/55">{project.description}</p>
              </div>
              <ProjectImage project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
