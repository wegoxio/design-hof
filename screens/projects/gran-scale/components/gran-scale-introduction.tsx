"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useInView } from "@/screens/home/hooks/use-in-view";

import type { ProjectDetailContent, ProjectDetailStat } from "../types/gran-scale";

function Counter({ stat, active, delay }: { stat: ProjectDetailStat; active: boolean; delay: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let startedAt: number | undefined;

    const tick = (time: number) => {
      startedAt ??= time;
      const elapsed = time - startedAt;
      if (elapsed < delay) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reduced ? 1 : Math.min((elapsed - delay) / 1500, 1);
      const eased = 1 - (1 - progress) ** 4;
      setCurrent(Math.round(stat.value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, stat.value]);

  if (stat.prefix) return <>{stat.prefix}</>;
  return <>{current}{stat.suffix}</>;
}

export function ProjectDetailIntroduction({ content }: { content: ProjectDetailContent["introduction"] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.25);

  return (
    <section ref={ref} className="py-[clamp(70px,8vw,112px)]">
      <div className="site-container grid grid-cols-[minmax(0,1fr)_330px] gap-[clamp(60px,9vw,145px)] max-[850px]:grid-cols-1 max-[850px]:gap-16">
        <div className={`transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="text-[9px] tracking-[5px] text-black/35 uppercase">{content.eyebrow}</p>
          <p className="mt-7 max-w-[760px] text-[16px] leading-[1.85] font-normal text-black/75 max-[600px]:text-[14px]">
            {content.description}
          </p>
          <Link
            href={content.ctaHref}
            className="group mt-9 inline-flex min-h-12 items-center gap-5 bg-[#0a0a0a] px-8 text-[9px] font-medium tracking-[3px] text-white uppercase transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#202020] hover:shadow-[0_14px_30px_rgba(0,0,0,.18)]"
          >
            {content.ctaLabel}
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </Link>
        </div>

        <div className="border-l border-black/10 pl-[clamp(36px,5vw,68px)] max-[850px]:border-t max-[850px]:border-l-0 max-[850px]:pt-12 max-[850px]:pl-0">
          <div className="grid gap-8 max-[850px]:grid-cols-3 max-[550px]:grid-cols-1">
            {content.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none ${isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: isInView ? `${index * 130}ms` : "0ms" }}
              >
                <p className="text-[38px] leading-none font-bold tracking-[-1.5px] tabular-nums">
                  <Counter stat={stat} active={isInView} delay={index * 130} />
                </p>
                <p className="mt-3 text-[8px] tracking-[3.5px] text-black/30 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
