import Image from "next/image";
import Link from "next/link";

import type { ProjectDetailContent } from "../types/gran-scale";

export function ProjectDetailHero({ content }: { content: ProjectDetailContent }) {
  return (
    <>
      <div className="h-16 border-b border-black/[.055] bg-white max-[700px]:h-[58px]">
        <nav
          aria-label="Migas de pan"
          className="site-container flex h-full items-center gap-[11px] overflow-x-auto text-[9px] font-medium tracking-[1.35px] whitespace-nowrap uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.breadcrumb.map((item, index) => {
            const isCurrent = index === content.breadcrumb.length - 1;
            const href = index === 0 ? "/" : "/proyectos";

            return (
              <span key={item} className="inline-flex items-center gap-[11px]">
                {index > 0 && <span aria-hidden="true" className="text-black/18">/</span>}
                {isCurrent ? (
                  <span aria-current="page" className="text-black/75">{item}</span>
                ) : (
                  <Link
                    href={href}
                    className="text-black/30 transition-colors duration-500 hover:text-black/70"
                  >
                    {item}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <section className="relative isolate h-[clamp(390px,42vw,620px)] overflow-hidden bg-[#24211e] text-white max-[700px]:h-[clamp(440px,125vw,600px)]">
        <Image
          src={content.hero.imageUrl}
          alt={`${content.hero.title} de Design HOF`}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] starting:scale-[1.055]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,6,6,.66),rgba(8,8,8,.2)),linear-gradient(180deg,rgba(4,4,4,.12)_35%,rgba(4,4,4,.7))]" />

        <div className="site-container absolute inset-x-0 bottom-[clamp(48px,6vw,78px)] transition-[opacity,transform] delay-150 duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-8 starting:opacity-0">
          <p className="mb-4 text-[9px] tracking-[5px] text-white/45 uppercase">{content.hero.eyebrow}</p>
          <h1 className="max-w-[1050px] text-[clamp(40px,5vw,68px)] leading-[.98] font-bold tracking-[-2.8px]">
            {content.hero.title}
          </h1>
          <p className="mt-4 text-[13px] font-normal italic text-white/55">{content.hero.description}</p>
        </div>
      </section>
    </>
  );
}
