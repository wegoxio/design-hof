"use client";

import { useEffect, useRef, useState } from "react";

import type { ProjectStat } from "../types/projects";

const COUNTER_DURATION = 1800;

function easeOutQuart(progress: number) {
  return 1 - (1 - progress) ** 4;
}

function AnimatedCounter({
  stat,
  isVisible,
  delay,
}: {
  stat: ProjectStat;
  isVisible: boolean;
  delay: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrame = 0;
    let startTime: number | undefined;

    const animate = (timestamp: number) => {
      startTime ??= timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < delay) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reducedMotion
        ? 1
        : Math.min((elapsed - delay) / COUNTER_DURATION, 1);

      setDisplayValue(Math.round(stat.value * easeOutQuart(progress)));

      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [delay, isVisible, stat.value]);

  return (
    <span aria-label={`${stat.value}${stat.suffix ?? ""}`}>
      {displayValue}
      {stat.suffix}
    </span>
  );
}

export function ProjectStatsSection({ stats }: { stats: ProjectStat[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#090909] px-[clamp(28px,5vw,72px)] py-[62px] text-white"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-4 gap-10 max-[700px]:grid-cols-2">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
          >
            <p className="text-[34px] font-bold tracking-[-1px] tabular-nums">
              <AnimatedCounter stat={stat} isVisible={isVisible} delay={index * 130} />
            </p>
            <p className="mt-2 text-[8px] tracking-[3px] text-white/35 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
