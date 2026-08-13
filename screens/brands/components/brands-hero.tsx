import type { BrandsHeroContent } from "../types/brands";

const reveal = "translate-y-0 opacity-100 transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-8 starting:opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none";

export function BrandsHero({ content }: { content: BrandsHeroContent }) {
  return (
    <section className="flex min-h-[calc(100svh-80px)] items-center border-b border-black/8 bg-[#f7f7f5] py-[clamp(76px,9vw,132px)]">
      <div className="site-container">
        <div className="max-w-[1080px]">
          <p className={`${reveal} mb-[clamp(30px,4vw,48px)] text-[9px] font-medium tracking-[5px] text-black/38 uppercase`}>
            {content.eyebrow}
          </p>
          <h1 className="text-[clamp(38px,4.45vw,67px)] leading-[1.06] tracking-[-2.4px] max-[600px]:tracking-[-1.5px]">
            <span className={`${reveal} block font-bold delay-100`}>{content.lead}</span>
            <span className={`${reveal} block font-normal text-[#969693] uppercase delay-200`}>{content.accent}</span>
            <span className={`${reveal} block font-bold delay-300`}>{content.continuation}</span>
            <span className={`${reveal} mt-1 block font-normal italic text-[#969693] delay-[400ms]`}>{content.closing}</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
