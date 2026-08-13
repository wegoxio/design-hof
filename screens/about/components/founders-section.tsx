"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useInView } from "@/screens/home/hooks/use-in-view";

import type { AboutContent } from "../types/about";

function AnimatedStat({ value, active, delay }: { value: string; active: boolean; delay: number }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(String(target), "");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active || Number.isNaN(target)) return;
    let frame = 0;
    let startedAt: number | undefined;

    const tick = (time: number) => {
      startedAt ??= time;
      const elapsed = time - startedAt;
      if (elapsed < delay) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reducedMotion ? 1 : Math.min((elapsed - delay) / 1500, 1);
      const eased = 1 - (1 - progress) ** 4;
      setCurrent(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, target]);

  return <>{Number.isNaN(target) ? value : `${current}${suffix}`}</>;
}

export function FoundersSection({ content }: { content: AboutContent["founders"] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.25);

  return (
    <section ref={ref} className="px-5 py-8">
      <div className="mx-auto grid min-h-[700px] max-w-[1600px] grid-cols-2 overflow-hidden max-[850px]:grid-cols-1">
        <div className={`relative min-h-[700px] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-[850px]:min-h-0 max-[850px]:aspect-[4/3] ${isInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
          <Image className="object-cover" src={content.imageUrl} alt="Fundadores de Design HOF" fill sizes="(max-width:850px) 100vw,50vw" />
        </div>
        <div className={`flex flex-col justify-center bg-[#090909] px-[clamp(42px,5vw,84px)] py-16 text-white transition-[opacity,transform] delay-100 duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-[600px]:px-6 ${isInView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <p className="mb-10 text-[9px] tracking-[5px] text-white/24">02</p>
          <div className="grid grid-cols-2 gap-8">
            {content.people.map((person, index) => (
              <div key={person.name} className={`transition-[opacity,transform] duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} style={{ transitionDelay: `${250 + index * 100}ms` }}>
                <h2 className="text-[17px] font-bold">{person.name}</h2>
                <p className="mt-2 text-[8px] tracking-[4px] text-white/28 uppercase">{person.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 border-b border-white/10 pb-10">
            {content.stats.map((stat, index) => (
              <div key={stat.label} className={`transition-[opacity,transform] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: `${350 + index * 130}ms` }}>
                <p className="text-[42px] font-bold tabular-nums"><AnimatedStat value={stat.value} active={isInView} delay={350 + index * 130} /></p>
                <p className="mt-2 text-[8px] tracking-[3px] text-white/28 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className={`mt-10 space-y-6 text-[13px] leading-[1.75] font-normal text-white/42 transition-[opacity,transform] delay-700 duration-1000 ${isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
