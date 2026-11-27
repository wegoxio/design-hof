"use client";
import { useState } from "react";
import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectItem, ProjectsContent } from "../types/projects";

function ProjectRow({
  project,
  index,
  backToTopLabel,
}: {
  project: ProjectItem;
  index: number;
  backToTopLabel: string;
}) {
  const { ref, isInView } = useInView<HTMLElement>();
  const [currentImage, setCurrentImage] = useState(0);

  const images = project.images ?? [];
  const totalImages = images.length;
  const projectNumber = project.number ?? String(index + 1).padStart(2, "0");
  const currentNumber = String(currentImage + 1).padStart(2, "0");
  const totalNumber = String(totalImages).padStart(2, "0");

  const handlePrev = () => {
    if (totalImages <= 1) return;
    setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    if (totalImages <= 1) return;
    setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <article
      id={`proyecto-${project.id}`}
      ref={ref}
      className={`scroll-mt-24 border-t border-black/8 py-16 transition-[opacity,transform] duration-[900ms] first:border-t-0 first:pt-0 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="grid grid-cols-[1fr_1.55fr] items-start gap-16 max-[960px]:grid-cols-1 max-[960px]:gap-10">
        <div className="max-w-[420px]">
          <p className="mb-3 text-[9px] tracking-[4.5px] text-black/35 uppercase">
            {projectNumber} · {project.category ?? "Proyecto Residencial"}
          </p>

          <h3 className="mb-7 text-[28px] leading-[1.15] font-bold tracking-[-0.8px] text-black/90 max-[700px]:text-[24px]">
            {project.title}
          </h3>

          <div className="mb-5">
            <p className="mb-1.5 text-[8.5px] tracking-[3.5px] text-black/32 uppercase">
              {project.locationLabel ?? "Proyecto y ubicación"}
            </p>
            <p className="text-[12.5px] leading-[1.6] font-normal text-black/75">
              {project.location}
            </p>
          </div>

          <div className="mb-6">
            <p className="mb-1.5 text-[8.5px] tracking-[3.5px] text-black/32 uppercase">
              Alcance
            </p>
            <p className="text-[12.5px] leading-[1.6] font-normal text-black/75">
              {project.scopeSummary}
            </p>
          </div>

          {project.details?.length > 0 && (
            <div className="space-y-3.5 text-[12px] leading-[1.65] text-black/45">
              {project.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              const grid = document.getElementById("proyectos-grid");
              if (grid) {
                grid.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="mt-7 inline-flex cursor-pointer items-center gap-1.5 border-b border-black/30 pb-0.5 text-[11px] font-normal text-black/60 transition-colors hover:border-black hover:text-black"
          >
            <span aria-hidden="true">↑</span>
            <span>{backToTopLabel}</span>
          </button>
        </div>

        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
            {totalImages > 0 ? (
              <img
                key={images[currentImage]?.src}
                src={images[currentImage]?.src}
                alt={
                  images[currentImage]?.alt ??
                  `${project.title} - imagen ${currentImage + 1}`
                }
                className="h-full w-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[12px] text-black/30">
                Sin imágenes disponibles
              </div>
            )}
          </div>

          {totalImages > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[11px] tracking-[2px] text-black/45">
                <span className="font-medium text-black/70">
                  {project.title}
                </span>{" "}
                · {currentNumber} / {totalNumber}
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={totalImages <= 1}
                  aria-label="Imagen anterior"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border border-black/12 bg-white text-[12px] text-black/70 transition-colors hover:border-black/40 hover:text-black disabled:cursor-not-allowed disabled:opacity-35"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={totalImages <= 1}
                  aria-label="Imagen siguiente"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border border-black/12 bg-white text-[12px] text-black/70 transition-colors hover:border-black/40 hover:text-black disabled:cursor-not-allowed disabled:opacity-35"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function SelectedProjects({
  content,
}: {
  content: ProjectsContent["selectedProjects"];
}) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const projects = content.projects ?? [];

  if (projects.length === 0) return null;

  return (
    <section className="border-b border-black/8 bg-[#f7f7f7] px-[clamp(28px,5vw,72px)] py-[82px]">
      <div className="mx-auto max-w-[1600px]">
        <div
          ref={ref}
          className={`mb-16 transition-[opacity,transform] duration-[900ms] ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {content.eyebrow && (
            <p className="mb-4 text-[9px] tracking-[5px] text-black/35 uppercase">
              {content.eyebrow}
            </p>
          )}
          {content.title && (
            <h2 className="mb-3 text-[34px] leading-[1.15] font-bold tracking-[-1.2px] text-black/90 max-[700px]:text-[28px]">
              {content.title}
            </h2>
          )}
          {(content.subtitle ?? content.description) && (
            <p className="text-[12.5px] font-normal text-black/42">
              {content.subtitle ?? content.description}
            </p>
          )}
        </div>

        <div>
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              backToTopLabel={
                content.backToTopLabel ?? "Volver a los proyectos"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
