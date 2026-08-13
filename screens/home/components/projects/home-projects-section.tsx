"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "../../hooks/use-in-view";
import type { ProjectArea } from "@/screens/projects/types/projects";

export function HomeProjectsSection({ projects }: { projects: ProjectArea[] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.12);
  const [primary, ...secondary] = projects;

  return (
    <section ref={ref} className="bg-[#f8f8f7] px-5 py-[90px] max-[767px]:py-14" aria-labelledby="home-projects-title">
      <div className="mx-auto max-w-[1600px]">
        <div className={`mb-16 flex items-end justify-between transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[767px]:mb-10 ${isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <div>
            <p className="mb-5 text-[9px] font-medium tracking-[5px] text-black/32 uppercase">Portfolio</p>
            <h2 id="home-projects-title" className="text-[48px] leading-none font-bold tracking-[-2px] max-[767px]:text-[36px]">Proyectos</h2>
          </div>
          <Link className="group inline-flex items-center gap-3 text-[9px] font-medium tracking-[1.5px] text-black/40 uppercase transition-colors duration-500 hover:text-black" href="/proyectos">Ver todos <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span></Link>
        </div>

        <div className="grid min-h-[650px] grid-cols-[2.05fr_1fr] gap-4 max-[900px]:min-h-0 max-[900px]:grid-cols-1">
          {primary && <ProjectTile project={primary} isInView={isInView} className="min-h-[650px] max-[900px]:min-h-0 max-[900px]:aspect-[4/3]" delay={100} />}
          <div className="grid grid-rows-2 gap-4 max-[900px]:grid-cols-2 max-[900px]:grid-rows-1 max-[600px]:grid-cols-1">
            {secondary.map((project, index) => <ProjectTile project={project} isInView={isInView} className="min-h-0 max-[900px]:aspect-[4/3]" delay={220 + index * 120} key={project.id} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectTile({ project, isInView, className, delay }: { project: ProjectArea; isInView: boolean; className: string; delay: number }) {
  return (
    <Link
      className={`group relative isolate block overflow-hidden bg-[#262626] text-white opacity-0 transition-[opacity,transform] duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${className} ${isInView ? "translate-y-0 opacity-100" : "translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
      href={project.href}
    >
      <Image className="-z-20 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]" src={project.imageUrl} alt={project.title} fill sizes="(max-width:900px) 100vw, 67vw" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_42%,rgba(3,3,3,.68)_100%)] transition-colors duration-700 group-hover:bg-[linear-gradient(180deg,rgba(0,0,0,.04)_30%,rgba(3,3,3,.76)_100%)]" />
      <div className="absolute right-7 bottom-7 left-7 translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
        <p className="mb-3 text-[9px] font-medium tracking-[5px] text-white/45 uppercase">Design Hof</p>
        <h3 className="text-[17px] font-bold tracking-[-.4px]">{project.title}</h3>
      </div>
    </Link>
  );
}
