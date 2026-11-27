"use client";

import { useEffect, useState } from "react";

import { useInView } from "@/screens/home/hooks/use-in-view";
import type {
  ProjectDetailContent,
  ProjectDetailStat,
} from "../types/gran-scale";
import { ExplorationSection } from "./gran-scale-introduction";

/**
 * Normalizes a label into the anchor that identifies it in the gallery.
 */
function projectAnchor(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Counts up to the figure of the statistic when the section comes into view.
 *
 * The animation respects the preference of reduced motion: when it is
 * enabled the final figure is shown right away.
 */
function Counter({
  stat,
  active,
  delay,
}: {
  stat: ProjectDetailStat;
  active: boolean;
  delay: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active || stat.prefix) return;

    let frame = 0;
    let startedAt: number | undefined;

    const tick = (time: number) => {
      startedAt ??= time;
      const elapsed = time - startedAt;

      if (elapsed < delay) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const reduced = window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      const progress = reduced ? 1 : Math.min((elapsed - delay) / 1200, 1);

      setCurrent(Math.round(stat.value * (1 - (1 - progress) ** 4)));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, delay, stat.prefix, stat.value]);

  return (
    <>
      {stat.prefix ?? current}
      {stat.suffix}
    </>
  );
}

/**
 * The section of exploration with its own visibility and counters.
 *
 * `ExplorationSection` only draws: the observer of the viewport, the
 * animation of the figures and the anchors of the gallery are supplied
 * from here. It is the composition that the pages of residential and
 * corporate use, where the section enters the screen with its animation.
 */
export function ProjectDetailIntroduction({
  content,
}: {
  content: ProjectDetailContent["introduction"];
}) {
  const { ref, isInView } = useInView<HTMLElement>(0.16);

  return (
    <ExplorationSection
      sectionRef={ref}
      content={content}
      isInView={isInView}
      Counter={Counter}
      projectAnchor={projectAnchor}
    />
  );
}
