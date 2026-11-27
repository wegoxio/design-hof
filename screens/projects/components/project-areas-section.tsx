"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectArea } from "../types/projects";

export function ProjectAreasSection({
  areas,
  eyebrow = "Otros proyectos",
}: {
  areas: ProjectArea[];
  eyebrow?: string;
}) {
  const { ref, isInView } = useInView<HTMLElement>(0.12);
  const [perPage, setPerPage] = useState(2);
  const [pageIndex, setPageIndex] = useState(0);

  const filteredAreas = useMemo(
    () =>
      areas.filter((area) => {
        const id = area.id.toLowerCase();
        const href = area.href.toLowerCase();
        return (
          id !== "residencial" &&
          id !== "residenciales" &&
          !href.endsWith("/residencial") &&
          !href.endsWith("/residenciales")
        );
      }),
    [areas],
  );

  // En móvil (<= 850px) se muestra 1 tarjeta por vista; en escritorio, 2
  useEffect(() => {
    const updatePerPage = () => {
      setPerPage(window.innerWidth <= 850 ? 1 : 2);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredAreas.length / perPage));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);

  const visibleAreas = filteredAreas.slice(
    safePageIndex * perPage,
    safePageIndex * perPage + perPage,
  );

  const handlePrev = () => {
    setPageIndex((prev) => {
      const current = Math.min(prev, totalPages - 1);
      return current === 0 ? totalPages - 1 : current - 1;
    });
  };

  const handleNext = () => {
    setPageIndex((prev) => {
      const current = Math.min(prev, totalPages - 1);
      return current === totalPages - 1 ? 0 : current + 1;
    });
  };

  if (filteredAreas.length === 0) return null;

  return (
    <section
      ref={ref}
      className="border-t border-black/8 bg-[#f7f7f7] px-[clamp(28px,5vw,72px)] py-[80px]"
    >
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-10 text-[9px] tracking-[5px] text-black/35 uppercase">
          {eyebrow}
        </p>

        <div className="grid grid-cols-2 gap-4 max-[850px]:grid-cols-1">
          {visibleAreas.map((area, index) => (
            <article
              key={area.id}
              className={`group transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Link
                href={area.href}
                className="relative block aspect-[2.45/1] w-full overflow-hidden bg-[#222] text-white no-underline max-[600px]:aspect-[16/9]"
              >
                <Image
                  src={area.imageUrl}
                  alt={area.title}
                  fill
                  sizes="(max-width:850px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/85"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 max-[600px]:p-5">
                  <h2 className="text-[18px] leading-[1.2] font-bold tracking-[-0.3px] text-white max-[600px]:text-[16px]">
                    {area.title}
                  </h2>

                  <span className="inline-flex shrink-0 items-center gap-2 text-[9px] font-medium tracking-[3.5px] text-white/75 uppercase transition-colors group-hover:text-white">
                    Ver{" "}
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Barra inferior de control manual (sin autoplay) */}
        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const isActive = idx === safePageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPageIndex(idx)}
                    aria-label={`Ir al grupo ${idx + 1}`}
                    className={`h-1.5 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "w-6 bg-black/75"
                        : "w-2 bg-black/20 hover:bg-black/40"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="mr-2 text-[10px] tracking-[2.5px] text-black/45">
                {String(safePageIndex + 1).padStart(2, "0")} /{" "}
                {String(totalPages).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Proyectos anteriores"
                className="flex h-8 w-8 cursor-pointer items-center justify-center border border-black/12 bg-white text-[13px] text-black/75 transition-colors hover:border-black/40 hover:text-black"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Siguientes proyectos"
                className="flex h-8 w-8 cursor-pointer items-center justify-center border border-black/12 bg-white text-[13px] text-black/75 transition-colors hover:border-black/40 hover:text-black"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
