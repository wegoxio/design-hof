"use client";
import { useInView } from "@/screens/home/hooks/use-in-view";
import type { ProjectsContent } from "../types/projects";

export function ProjectsIntroduction({ content }: { content: ProjectsContent["introduction"] }) { const { ref, isInView } = useInView<HTMLElement>(); return <section ref={ref} className="border-b border-black/8 px-[clamp(28px,5vw,72px)] py-[82px]"><div className={`mx-auto grid max-w-[1460px] grid-cols-2 gap-20 transition-[opacity,transform] duration-[900ms] max-[760px]:grid-cols-1 max-[760px]:gap-8 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}><div><p className="mb-6 text-[9px] tracking-[5px] text-black/30 uppercase">{content.eyebrow}</p><h2 className="max-w-[560px] text-[38px] leading-[1.12] font-bold tracking-[-1.6px] max-[700px]:text-[31px]">{content.title}</h2></div><p className="self-end text-[14px] leading-[1.75] font-normal text-black/42">{content.description}</p></div></section>; }
