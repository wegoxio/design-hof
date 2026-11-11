"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectDetailContent } from "../types/gran-scale";

type SelectedProject = ProjectDetailContent["gallery"]["projects"][number];
type ImageGeometry = { aspectRatio: number; portrait: boolean };

function ProjectImage({ project }: { project: SelectedProject }) {
  const [index, setIndex] = useState(0);
  const [geometryBySource, setGeometryBySource] = useState<Record<string, ImageGeometry>>({});
  const image = project.images[index];
  const geometry = geometryBySource[image.src];
  const isPortrait = geometry?.portrait ?? false;
  const aspectRatio = geometry?.aspectRatio ?? 4 / 3;
  const move = (direction: -1 | 1) => setIndex((current) => (current + direction + project.images.length) % project.images.length);
  return (
    <div className="flex w-full justify-center overflow-hidden bg-white">
      <div
        className={`relative w-full transition-[max-width] duration-500 ${isPortrait ? "max-w-[620px]" : "max-w-none"}`}
        style={{ aspectRatio }}
      >
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          unoptimized
          sizes={isPortrait ? "(max-width: 900px) 100vw, 34vw" : "(max-width: 900px) 100vw, 55vw"}
          className="object-contain transition-opacity duration-500 starting:opacity-0"
          onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget;
            if (!naturalWidth || !naturalHeight) return;
            setGeometryBySource((current) => ({
              ...current,
              [image.src]: {
                aspectRatio: naturalWidth / naturalHeight,
                portrait: naturalHeight > naturalWidth,
              },
            }));
          }}
        />
        <div className="absolute right-0 bottom-0 flex bg-white">
          <button type="button" onClick={() => move(-1)} disabled={project.images.length < 2} className="grid size-12 place-items-center border border-black/8 text-lg transition hover:bg-black hover:text-white disabled:opacity-25" aria-label={`Imagen anterior de ${project.title}`}>‹</button>
          <button type="button" onClick={() => move(1)} disabled={project.images.length < 2} className="grid size-12 place-items-center border-y border-r border-black/8 text-lg transition hover:bg-black hover:text-white disabled:opacity-25" aria-label={`Imagen siguiente de ${project.title}`}>›</button>
        </div>
        <span className="absolute bottom-4 left-5 bg-white/85 px-2 py-1 text-[8px] tracking-[2px] text-black/65 backdrop-blur-sm">{String(index + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export function ProjectDetailGallery({ content }: { content: ProjectDetailContent["gallery"] }) {
  return (
    <section className="border-t border-black/8 bg-white py-[clamp(72px,8vw,120px)]">
      <div className="site-container">
        <p className="text-[9px] tracking-[5px] text-black/35 uppercase">{content.eyebrow}</p>
        <h2 className="mt-5 text-[clamp(30px,3.5vw,52px)] font-semibold tracking-[-1.5px]">{content.title}</h2>
        <p className="mt-4 max-w-[680px] text-[13px] leading-6 text-black/45">{content.description}</p>
        <div className="mt-[clamp(52px,7vw,90px)] space-y-[clamp(82px,10vw,150px)]">
          {content.projects.map((project) => (
            <article id={project.id} key={project.id} className="grid scroll-mt-28 grid-cols-[minmax(280px,.78fr)_minmax(0,1.35fr)] items-start gap-[clamp(42px,7vw,105px)] max-[900px]:grid-cols-1 max-[900px]:gap-8">
              <div>
                <p className="text-[8px] tracking-[3.2px] text-black/30 uppercase">{project.eyebrow}</p>
                <h3 className="mt-5 text-[clamp(28px,3vw,44px)] font-semibold tracking-[-1.2px]">{project.title}</h3>
                <dl className="mt-8 space-y-5 border border-black/10 p-5 text-[11px]">
                  <div><dt className="text-[8px] tracking-[2.2px] text-black/35 uppercase">{project.locationLabel ?? "Proyecto y ubicación"}</dt><dd className="mt-3">{project.location}</dd></div>
                  <div><dt className="text-[8px] tracking-[2.2px] text-black/35 uppercase">Alcance</dt><dd className="mt-3">{project.scope}</dd></div>
                </dl>
                <p className="mt-6 whitespace-pre-line text-[13px] leading-6 text-black/55">{project.description}</p>
                <a href="#project-detail-top" className="mt-6 inline-block text-[9px] text-black/35 transition hover:text-black">↑ Volver a los proyectos</a>
              </div>
              <ProjectImage project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
