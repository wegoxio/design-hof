"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectDetailContent } from "../types/gran-scale";

type SelectedProject = ProjectDetailContent["gallery"]["projects"][number];
type ImageGeometry = { aspectRatio: number; portrait: boolean };

function ProjectImage({ project }: { project: SelectedProject }) {
  const [index, setIndex] = useState(0);
  const [geometryBySource, setGeometryBySource] = useState<
    Record<string, ImageGeometry>
  >({});

  const image = project.images[index];
  const geometry = image ? geometryBySource[image.src] : undefined;
  const isPortrait = geometry?.portrait ?? false;
  const aspectRatio = geometry?.aspectRatio ?? 16 / 10;

  const move = (direction: -1 | 1) =>
    setIndex(
      (current) =>
        (current + direction + project.images.length) % project.images.length,
    );

  if (!image) return null;

  return (
    <div className="w-full">
      <div className="flex w-full justify-center overflow-hidden">
        <div
          className={`relative w-full transition-[max-width] duration-500 ${
            isPortrait ? "max-w-[620px]" : "max-w-none"
          }`}
          style={{ aspectRatio }}
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            unoptimized
            sizes={
              isPortrait
                ? "(max-width: 900px) 100vw, 34vw"
                : "(max-width: 900px) 100vw, 58vw"
            }
            className="object-cover transition-opacity duration-500 starting:opacity-0"
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
        </div>
      </div>

      {/* Pie inferior: título + contador centrado, flechas a la derecha */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="w-24 max-[600px]:hidden" />

        <p className="text-center text-[11px] tracking-[0.4px] text-black/50 tabular-nums">
          {project.title} · {String(index + 1).padStart(2, "0")} /{" "}
          {String(project.images.length).padStart(2, "0")}
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={project.images.length < 2}
            className="grid size-9 place-items-center border border-black/12 bg-white text-sm text-black/70 transition hover:border-black hover:bg-black hover:text-white disabled:opacity-25"
            aria-label={`Imagen anterior de ${project.title}`}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={project.images.length < 2}
            className="grid size-9 place-items-center border border-black/12 bg-white text-sm text-black/70 transition hover:border-black hover:bg-black hover:text-white disabled:opacity-25"
            aria-label={`Imagen siguiente de ${project.title}`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailGallery({
  content,
}: {
  content: ProjectDetailContent["gallery"];
}) {
  return (
    <section className="border-t border-black/8 bg-[#fbfbf9] py-[clamp(72px,8vw,120px)]">
      <div className="site-container">
        <p className="text-[9px] tracking-[5px] text-black/35 uppercase">
          {content.eyebrow}
        </p>
        <h2 className="mt-4 text-[clamp(30px,3.5vw,52px)] font-semibold tracking-[-1.5px] text-black">
          {content.title}
        </h2>
        <p className="mt-3 max-w-[680px] text-[13px] leading-6 text-black/45">
          {content.description}
        </p>

        <div className="mt-[clamp(52px,7vw,90px)] space-y-[clamp(82px,10vw,150px)]">
          {content.projects.map((project) => (
            <article
              id={project.id}
              key={project.id}
              className="grid scroll-mt-28 grid-cols-[minmax(280px,0.78fr)_minmax(0,1.35fr)] items-start gap-[clamp(42px,7vw,105px)] max-[900px]:grid-cols-1 max-[900px]:gap-8"
            >
              <div>
                <p className="text-[8px] tracking-[3.5px] text-black/35 uppercase">
                  {project.eyebrow}
                </p>
                <h3 className="mt-4 text-[clamp(28px,3vw,42px)] font-semibold tracking-[-1.2px] text-black">
                  {project.title}
                </h3>

                <dl className="mt-7 space-y-5 text-[12px]">
                  <div>
                    <dt className="text-[8px] tracking-[2.8px] text-black/35 uppercase">
                      {project.locationLabel ?? "Proyecto y ubicación"}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-black">
                      {project.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[8px] tracking-[2.8px] text-black/35 uppercase">
                      Alcance
                    </dt>
                    <dd className="mt-2 leading-relaxed text-black">
                      {project.scope}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 space-y-4 text-[12.5px] leading-[1.75] text-black/55">
                  {project.description
                    .split("\n\n")
                    .filter(Boolean)
                    .map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                </div>

                <a
                  href="#project-detail-top"
                  className="mt-7 inline-block text-[12px] text-black underline underline-offset-4 transition hover:text-black"
                >
                  ↑ Volver a los proyectos
                </a>
              </div>

              <ProjectImage project={project} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
