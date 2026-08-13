"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "../../hooks/use-in-view";
import type { DesignSpacesContent } from "../../types/design-spaces";

export function DesignSpacesSection({ content }: { content: DesignSpacesContent }) {
  const { ref, isInView } = useInView<HTMLElement>(0.15);

  return (
    <section ref={ref} className="bg-[#f8f8f7] px-5 pb-[82px] max-[767px]:pb-14" aria-labelledby="design-spaces-title">
      <div className="mx-auto grid min-h-[680px] max-w-[1600px] grid-cols-2 overflow-hidden max-[900px]:grid-cols-1">
        <div className={`flex flex-col justify-center bg-[#090909] px-[clamp(42px,5vw,80px)] py-16 text-white transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[767px]:px-6 max-[767px]:py-12 ${isInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
          <p className="mb-12 text-[9px] font-medium tracking-[5px] text-white/38 uppercase max-[767px]:mb-8">{content.eyebrow}</p>
          <h2 id="design-spaces-title" className="max-w-[590px] text-[42px] leading-[1.08] font-bold tracking-[-1.8px] max-[1200px]:text-[36px] max-[767px]:text-[31px]">{content.title}</h2>
          <p className="mt-10 max-w-[440px] text-[14px] leading-[1.8] font-normal text-white/48 max-[767px]:mt-7 max-[767px]:text-[13px]">{content.description}</p>
          <Link className="group relative mt-14 inline-flex w-fit items-center gap-4 pb-2 text-[10px] font-medium tracking-[4px] text-white uppercase no-underline after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:bg-white/40 after:content-[''] after:transition-transform after:duration-500 hover:after:scale-x-[0.35] max-[767px]:mt-10" href={content.cta.href}><span>{content.cta.label}</span><span className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true">→</span></Link>
        </div>
        <div className={`relative min-h-[680px] overflow-hidden bg-[#ddd8d0] transition-[opacity,transform] delay-100 duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[900px]:min-h-0 max-[900px]:aspect-[4/3] ${isInView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
          <Image className={`object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isInView ? "scale-100" : "scale-[1.04]"}`} src={content.image.src} alt={content.image.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
