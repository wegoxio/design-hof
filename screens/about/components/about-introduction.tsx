"use client";

import { useInView } from "@/screens/home/hooks/use-in-view";

import type { AboutContent } from "../types/about";

export function AboutIntroduction({ content }: { content: AboutContent["introduction"] }) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} className="px-8 py-[clamp(72px,7vw,104px)] max-[700px]:px-5">
      <div
        className={`mx-auto grid max-w-[1500px] grid-cols-[.8fr_1.2fr] gap-[clamp(70px,9vw,140px)] transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] max-[800px]:grid-cols-1 max-[800px]:gap-12 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div>
          <h2 className="max-w-[510px] text-[23px] leading-[1.42] font-bold tracking-[-.75px] max-[600px]:text-[20px]">
            {content.lead}
          </h2>
          <a
            className="mt-9 inline-flex min-h-[43px] items-center border border-black/65 px-7 text-[9px] font-medium tracking-[3.5px] uppercase transition-[background-color,color,transform] duration-500 hover:-translate-y-0.5 hover:bg-black hover:text-white"
            href={content.brochureHref}
          >
            Brochure Design HOF
          </a>
        </div>
        <div className="max-w-[690px] space-y-6 text-[13px] leading-[1.7] font-normal text-black/40">
          {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
