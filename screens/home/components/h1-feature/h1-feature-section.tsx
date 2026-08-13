"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView } from "../../hooks/use-in-view";
import type { H1FeatureContent } from "../../types/h1-feature";

type H1FeatureSectionProps = {
  content: H1FeatureContent;
};

export function H1FeatureSection({ content }: H1FeatureSectionProps) {
  const { ref, isInView } = useInView<HTMLElement>(0.18);

  return (
    <section ref={ref} className="w-full bg-[#f8f8f7] px-5 py-[68px] max-[767px]:py-10" aria-labelledby="h1-feature-title">
      <div className="mx-auto grid aspect-[1.84/1] w-full max-w-[1600px] grid-cols-[1.62fr_1fr] overflow-hidden max-[900px]:aspect-auto max-[900px]:grid-cols-1">
        <div className={`relative overflow-hidden bg-[#d4cec5] opacity-0 transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[900px]:aspect-[4/3] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isInView ? "translate-x-0 opacity-100" : "-translate-x-9"}`}>
          <Image
            className={`object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:scale-100 motion-reduce:transition-none ${isInView ? "scale-100" : "scale-[1.045]"}`}
            src={content.image.src}
            alt={content.image.alt}
            fill
            sizes="(max-width: 900px) 100vw, 62vw"
          />

          <div className="absolute bottom-7 left-7 flex gap-2" aria-hidden="true">
            <span className="h-px w-7 bg-white/85" />
            <span className="h-px w-7 bg-white/35" />
          </div>
        </div>

        <div className={`flex flex-col justify-center bg-h1 px-[clamp(48px,5vw,78px)] py-[clamp(54px,5vw,78px)] opacity-0 transition-[opacity,transform] delay-150 duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[900px]:px-8 max-[767px]:px-6 max-[767px]:py-10 motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isInView ? "translate-x-0 opacity-100" : "translate-x-9"}`}>
          <div className={`transition-[opacity,transform] delay-[400ms] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
            <p className="text-[56px] leading-[0.95] font-bold tracking-[-2.6px] max-[1300px]:text-[48px] max-[1100px]:text-[40px] max-[767px]:text-[36px]">{content.eyebrow}</p>
            <h2 id="h1-feature-title" className="mt-1 max-w-[480px] text-[56px] leading-[0.99] font-bold tracking-[-2.6px] max-[1300px]:text-[48px] max-[1100px]:text-[40px] max-[767px]:text-[36px]">
              {content.title}
            </h2>
          </div>

          <div className={`mt-10 max-w-[470px] space-y-7 text-[16px] leading-[1.62] font-normal text-black/58 transition-[opacity,transform] delay-[550ms] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] max-[1300px]:mt-7 max-[1300px]:space-y-5 max-[1300px]:text-[14px] max-[1100px]:text-[12px] max-[900px]:max-w-[620px] max-[767px]:text-[14px] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
            {content.paragraphs.map((paragraph, index) => (
              <p key={paragraph}>
                {index === 0 ? (
                  <>En <strong className="font-bold text-black">DESIGN HOF</strong> te presentamos la nueva <strong className="font-bold text-black">Línea H1</strong>, una selección de mobiliario que traslada nuestra identidad a una propuesta más cercana y competitiva.</>
                ) : paragraph}
              </p>
            ))}
          </div>

          <div className={`mt-10 border-t border-black/12 pt-10 transition-[opacity,transform] delay-700 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] max-[1300px]:mt-7 max-[1300px]:pt-7 max-[1100px]:mt-5 max-[1100px]:pt-5 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
            <Link className="group relative inline-flex items-center gap-4 pb-2 text-[12px] font-medium tracking-[4.2px] text-black uppercase no-underline after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:bg-black/45 after:content-[''] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-[0.35] max-[1100px]:text-[10px] max-[1100px]:tracking-[3.2px]" href={content.cta.href}>
              <span>{content.cta.label}</span>
              <span className="text-[16px] tracking-normal transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
