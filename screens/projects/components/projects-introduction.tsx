"use client";
import { useState } from "react";
import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectItem, ProjectsContent } from "../types/projects";

type HoveredPreview = {
  project: ProjectItem;
  x: number;
  y: number;
};

export function ProjectsIntroduction({
  content,
  helperText = "Explora las imágenes. Pasa el cursor para ampliar o selecciona un proyecto.",
}: {
  content: ProjectsContent["introduction"];
  helperText?: string;
}) {
  const { ref, isInView } = useInView<HTMLElement>();
  const [preview, setPreview] = useState<HoveredPreview | null>(null);
  const projects = content.projects ?? [];

  const handleSelectProject = (projectId: string) => {
    setPreview(null);
    document
      .getElementById(`proyecto-${projectId}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const updatePosition = (
    project: ProjectItem,
    clientX: number,
    clientY: number,
  ) => {
    const previewWidth = 300;
    const previewHeight = 230;
    const offset = 18;

    const clampedX = Math.min(
      Math.max(16, clientX + offset),
      window.innerWidth - previewWidth - 16,
    );
    const clampedY = Math.min(
      Math.max(16, clientY + offset),
      window.innerHeight - previewHeight - 16,
    );

    setPreview({ project, x: clampedX, y: clampedY });
  };

  return (
    <section
      ref={ref}
      className="border-b border-black/8 px-[clamp(28px,5vw,72px)] py-[82px]"
    >
      <div
        className={`mx-auto max-w-[1600px] transition-[opacity,transform] duration-[900ms] ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-20 max-[760px]:grid-cols-1 max-[760px]:gap-8">
          <div>
            {content.eyebrow && (
              <p className="mb-6 text-[9px] tracking-[5px] text-black/30 uppercase">
                {content.eyebrow}
              </p>
            )}
            <h2 className="max-w-[560px] text-[38px] leading-[1.12] font-bold tracking-[-1.6px] max-[700px]:text-[31px]">
              {content.title}
            </h2>
          </div>
          {content.description && (
            <p className="self-end text-[14px] leading-[1.75] font-normal text-black/42">
              {content.description}
            </p>
          )}
        </div>

        {projects.length > 0 && (
          <div className="mt-14">
            <p className="mb-4 text-[13px] font-normal text-black/45">
              {helperText}
            </p>

            <div
              id="proyectos-grid"
              onMouseLeave={() => setPreview(null)}
              className="grid scroll-mt-24 grid-cols-4 gap-3.5 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1"
            >
              {projects.map((project) => {
                const thumbSrc =
                  project.thumbnailUrl ?? project.images[0]?.src ?? "";
                const thumbAlt = project.images[0]?.alt ?? project.title;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onMouseEnter={(e) =>
                      updatePosition(project, e.clientX, e.clientY)
                    }
                    onMouseMove={(e) =>
                      updatePosition(project, e.clientX, e.clientY)
                    }
                    onFocus={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      updatePosition(
                        project,
                        rect.left + rect.width / 2,
                        rect.top,
                      );
                    }}
                    onBlur={() => setPreview(null)}
                    onClick={() => handleSelectProject(project.id)}
                    className="group flex w-full cursor-pointer items-center gap-4 border border-black/10 bg-white p-2.5 text-left transition-colors duration-200 hover:border-black/30"
                  >
                    <div className="h-12 w-16 shrink-0 overflow-hidden bg-black/5">
                      {thumbSrc && (
                        <img
                          src={thumbSrc}
                          alt={thumbAlt}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-115"
                        />
                      )}
                    </div>
                    <span className="text-[13px] font-bold tracking-[-0.2px] text-black/85 transition-colors group-hover:text-black">
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Vista previa ampliada flotante al pasar el cursor */}
      {preview && (
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${preview.x}px, ${preview.y}px, 0)`,
          }}
          className="pointer-events-none fixed top-0 left-0 z-50 w-[300px] border border-black/15 bg-white p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.16)] transition-opacity duration-150 max-[760px]:hidden"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
            <img
              src={
                preview.project.thumbnailUrl ??
                preview.project.images[0]?.src ??
                ""
              }
              alt={preview.project.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between gap-2 px-0.5">
            <div>
              <p className="text-[13px] font-bold text-black/90">
                {preview.project.title}
              </p>
              <p className="line-clamp-1 text-[11px] text-black/50">
                {preview.project.location}
              </p>
            </div>
            {preview.project.number && (
              <span className="text-[10px] tracking-[2px] text-black/35">
                #{preview.project.number}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
