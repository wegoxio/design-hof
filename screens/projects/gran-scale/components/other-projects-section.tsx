"use client";

import Image from "next/image";
import Link from "next/link";

import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectArea } from "../../types/projects";

export function OtherProjectsSection({ projects }: { projects: ProjectArea[] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.12);

  return (
    <section ref={ref} className="border-t border-black/5 py-[clamp(72px,7vw,104px)]">
      <div className="site-container">
        <p className="mb-[clamp(34px,4vw,54px)] text-[9px] tracking-[5px] text-black/35 uppercase">
          Otros proyectos
        </p>

        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              className={`group relative aspect-[2.6/1] overflow-hidden bg-[#d8d8d4] text-white transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-[900px]:aspect-[1.8/1] max-[700px]:aspect-[1.55/1] ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${index * 130}ms` : "0ms" }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                className="-z-20 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
              />
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_36%,rgba(4,4,4,.68))] transition-colors duration-700 group-hover:bg-[linear-gradient(180deg,rgba(0,0,0,.04)_25%,rgba(4,4,4,.76))]" />

              <span className="absolute right-7 bottom-7 left-7 flex items-end justify-between gap-5 max-[600px]:right-5 max-[600px]:bottom-5 max-[600px]:left-5">
                <strong className="text-[17px] leading-tight font-bold tracking-[-.45px] max-[900px]:text-[15px]">
                  {project.title}
                </strong>
                <span className="inline-flex shrink-0 items-center gap-3 text-[8px] font-medium tracking-[2px] text-white/65 uppercase transition-colors duration-500 group-hover:text-white">
                  Ver
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
