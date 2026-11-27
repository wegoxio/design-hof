import Image from "next/image";
import Link from "next/link";
import type { ProjectDetailContent } from "../types/gran-scale"; // ajusta si tu tipo está en otra ruta

type IntroductionContent = ProjectDetailContent["introduction"];

export function ExplorationSection({
  sectionRef,
  content,
  isInView,
  Counter,
  projectAnchor,
}: {
  sectionRef?: React.RefObject<HTMLElement | null>;
  content: IntroductionContent;
  isInView: boolean;
  Counter: React.ComponentType<{
    stat: IntroductionContent["stats"][number];
    active: boolean;
    delay: number;
  }>;
  projectAnchor: (label: string) => string;
}) {
  return (
    <section ref={sectionRef} className="bg-[#fbfbf9]">
      <div className="site-container border-b border-black/8 py-[clamp(54px,6vw,86px)]">
        <h2 className="text-[clamp(22px,2.3vw,32px)] font-semibold tracking-[-.8px]">
          {content.explorationTitle}
        </h2>
        <p className="mt-3 max-w-[720px] text-[13px] leading-6 text-black/45">
          {content.explorationDescription}
        </p>

        <ul
          className="mt-8 grid grid-cols-4 gap-4 max-[1024px]:grid-cols-2 max-[560px]:grid-cols-1"
          aria-label="Tipos de proyecto"
        >
          {content.filters.map((filter) => {
            const item =
              typeof filter === "string" ? { label: filter } : filter;

            return (
              <li key={item.label} className="relative">
                <a
                  href={`#${projectAnchor(item.label)}`}
                  className="group flex h-24 items-center gap-4 border border-black/10 bg-white p-3 transition duration-300 hover:-translate-y-0.5 hover:border-black/30"
                >
                  {item.imageUrl && (
                    <div className="relative h-full w-28 shrink-0 overflow-hidden bg-black/5">
                      <Image
                        src={item.imageUrl}
                        alt={item.label}
                        fill
                        sizes="112px"
                        className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  )}
                  <span className="text-[13px] font-semibold tracking-[-0.2px] text-black">
                    {item.label}
                  </span>

                  {/* Vista previa ampliada al pasar el cursor (oculto en táctil/móvil) */}
                  {item.imageUrl && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 hidden w-64 -translate-x-1/2 translate-y-1 border border-black/15 bg-white p-2 opacity-0 shadow-xl transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                        <Image
                          src={item.imageUrl}
                          alt={`Vista ampliada de ${item.label}`}
                          fill
                          sizes="256px"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-2 truncate text-[11px] font-medium text-black/80">
                        {item.label}
                      </p>
                    </div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="site-container grid grid-cols-[minmax(0,1fr)_330px] gap-[clamp(60px,9vw,145px)] py-[clamp(70px,8vw,112px)] max-[850px]:grid-cols-1 max-[850px]:gap-16">
        <div
          className={`transition-[opacity,transform] duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-[9px] tracking-[5px] text-black/35 uppercase">
            {content.eyebrow}
          </p>
          <p className="mt-7 max-w-[760px] text-[16px] leading-[1.85] text-black/70 max-[600px]:text-[14px]">
            {content.description}
          </p>
          <Link
            href={content.ctaHref}
            className="group mt-9 inline-flex min-h-12 items-center gap-5 bg-black px-8 text-[9px] font-medium tracking-[3px] text-white uppercase transition duration-500 hover:-translate-y-0.5 hover:bg-[#222]"
          >
            {content.ctaLabel}
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>

        <div className="border-l border-black/10 pl-[clamp(36px,5vw,68px)] max-[850px]:border-t max-[850px]:border-l-0 max-[850px]:pt-12 max-[850px]:pl-0">
          <div className="grid gap-8 max-[850px]:grid-cols-3 max-[550px]:grid-cols-1">
            {content.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`transition-[opacity,transform] duration-1000 ${
                  isInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: isInView ? `${index * 130}ms` : "0ms",
                }}
              >
                <p className="text-[38px] leading-none font-bold tracking-[-1.5px] tabular-nums">
                  <Counter stat={stat} active={isInView} delay={index * 130} />
                </p>
                <p className="mt-3 text-[8px] tracking-[3.5px] text-black/30 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
