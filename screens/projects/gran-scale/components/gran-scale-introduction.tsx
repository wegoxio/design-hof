"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectDetailContent, ProjectDetailStat } from "../types/gran-scale";

function projectAnchor(label: string) {
  return label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Counter({ stat, active, delay }: { stat: ProjectDetailStat; active: boolean; delay: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!active || stat.prefix) return;
    let frame = 0;
    let startedAt: number | undefined;
    const tick = (time: number) => {
      startedAt ??= time;
      const elapsed = time - startedAt;
      if (elapsed < delay) { frame = requestAnimationFrame(tick); return; }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reduced ? 1 : Math.min((elapsed - delay) / 1200, 1);
      setCurrent(Math.round(stat.value * (1 - (1 - progress) ** 4)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, stat.prefix, stat.value]);
  return <>{stat.prefix ?? current}{stat.suffix}</>;
}

export function ProjectDetailIntroduction({ content }: { content: ProjectDetailContent["introduction"] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.16);
  return (
    <section ref={ref} className="bg-[#fbfbf9]">
      <div className="site-container border-b border-black/8 py-[clamp(54px,6vw,86px)]">
        <h2 className="text-[clamp(22px,2.3vw,32px)] font-semibold tracking-[-.8px]">{content.explorationTitle}</h2>
        <p className="mt-3 max-w-[720px] text-[13px] leading-6 text-black/45">{content.explorationDescription}</p>
        <ul className="mt-8 grid grid-cols-3 gap-2 max-[850px]:grid-cols-2 max-[520px]:grid-cols-1" aria-label="Tipos de proyecto">
          {content.filters.map((filter) => {
            const item = typeof filter === "string" ? { label: filter } : filter;
            return (
              <li key={item.label}>
                <a href={`#${projectAnchor(item.label)}`} className="flex min-h-12 items-center justify-center border border-black/10 bg-white px-4 text-center text-[9px] font-medium tracking-[.2px] text-black/62 transition hover:border-black hover:bg-black hover:text-white">
                  {item.imageUrl ? <Image src={item.imageUrl} alt={item.label} width={190} height={54} className="h-9 max-w-[82%] object-contain" /> : item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="site-container grid grid-cols-[minmax(0,1fr)_330px] gap-[clamp(60px,9vw,145px)] py-[clamp(70px,8vw,112px)] max-[850px]:grid-cols-1 max-[850px]:gap-16">
        <div className={`transition-[opacity,transform] duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="text-[9px] tracking-[5px] text-black/35 uppercase">{content.eyebrow}</p>
          <p className="mt-7 max-w-[760px] text-[16px] leading-[1.85] text-black/70 max-[600px]:text-[14px]">{content.description}</p>
          <Link href={content.ctaHref} className="group mt-9 inline-flex min-h-12 items-center gap-5 bg-black px-8 text-[9px] font-medium tracking-[3px] text-white uppercase transition duration-500 hover:-translate-y-0.5 hover:bg-[#222]">
            {content.ctaLabel}<span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
        <div className="border-l border-black/10 pl-[clamp(36px,5vw,68px)] max-[850px]:border-t max-[850px]:border-l-0 max-[850px]:pt-12 max-[850px]:pl-0">
          <div className="grid gap-8 max-[850px]:grid-cols-3 max-[550px]:grid-cols-1">
            {content.stats.map((stat, index) => <div key={stat.label} className={`transition-[opacity,transform] duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: isInView ? `${index * 130}ms` : "0ms" }}>
              <p className="text-[38px] leading-none font-bold tracking-[-1.5px] tabular-nums"><Counter stat={stat} active={isInView} delay={index * 130} /></p>
              <p className="mt-3 text-[8px] tracking-[3.5px] text-black/30 uppercase">{stat.label}</p>
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
