import type { BrandsSummaryContent } from "../types/brands";

export function BrandsSummary({ content }: { content: BrandsSummaryContent }) {
  return (
    <section aria-label="Resumen de marcas" className="site-container border-b border-black/[.08] bg-[#f7f7f5]">
      <div className="mx-auto flex min-h-[118px] max-w-[1780px] items-center justify-between gap-12 border-t border-black/[.065] py-8 max-[800px]:flex-col max-[800px]:items-start max-[800px]:gap-6">
        <div className="flex shrink-0 items-baseline gap-4">
          <strong className="text-[clamp(30px,2.3vw,42px)] leading-none font-bold tracking-[-0.04em] text-black">{content.total}</strong>
          <span className="text-[clamp(12px,1vw,16px)] font-normal text-black/42">{content.label}</span>
        </div>

        <p className="text-right text-[clamp(9px,.8vw,13px)] leading-6 font-medium tracking-[0.34em] text-black/38 uppercase max-[800px]:text-left">
          {content.countries.map((country, index) => (
            <span key={country}>
              {index > 0 && <span aria-hidden="true"> · </span>}
              {country}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
