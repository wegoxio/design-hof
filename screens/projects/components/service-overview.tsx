"use client";
import { useInView } from "@/screens/home/hooks/use-in-view";

export type ServiceMetric = {
  value: string;
  label: string;
};

export type ServiceOverviewContent = {
  eyebrow: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  metrics: ServiceMetric[];
};

const DEFAULT_SERVICE_CONTENT: ServiceOverviewContent = {
  eyebrow: "Acerca de este servicio",
  description:
    "Trabajamos junto a arquitectos y familias para transformar residencias en experiencias. Desde apartamentos de autor hasta casas de campo, cada proyecto parte de una escucha profunda para dar forma a espacios únicos, funcionales y atemporales.",
  ctaLabel: "Consultar proyecto",
  ctaHref: "#contacto",
  metrics: [
    { value: "200+", label: "Residencias amuebladas" },
    { value: "100%", label: "Proyectos personalizados" },
    { value: "8 sem", label: "Tiempo promedio" },
  ],
};

export function ServiceOverview({
  content,
  onCtaClick,
}: {
  content?: Partial<ServiceOverviewContent>;
  onCtaClick?: () => void;
}) {
  const { ref, isInView } = useInView<HTMLElement>();

  const eyebrow = content?.eyebrow ?? DEFAULT_SERVICE_CONTENT.eyebrow;
  const description =
    content?.description ?? DEFAULT_SERVICE_CONTENT.description;
  const ctaLabel = content?.ctaLabel ?? DEFAULT_SERVICE_CONTENT.ctaLabel;
  const ctaHref = content?.ctaHref ?? DEFAULT_SERVICE_CONTENT.ctaHref;
  const metrics = content?.metrics ?? DEFAULT_SERVICE_CONTENT.metrics;

  const ctaClasses =
    "mt-8 inline-flex items-center gap-3 bg-[#141414] px-7 py-4 text-[10px] font-medium tracking-[3.5px] text-white uppercase transition-colors duration-200 hover:bg-black/80";

  return (
    <section
      ref={ref}
      className="border-b border-black/8 bg-[#f7f7f7] px-[clamp(28px,5vw,72px)] py-[82px]"
    >
      <div
        className={`mx-auto grid max-w-[1600px] grid-cols-[1.55fr_1fr] items-center gap-16 transition-[opacity,transform] duration-[900ms] max-[900px]:grid-cols-1 max-[900px]:gap-12 ${
          isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Columna izquierda: eyebrow, descripción y botón */}
        <div className="max-w-[540px]">
          <p className="mb-5 text-[9px] tracking-[5px] text-black/35 uppercase">
            {eyebrow}
          </p>

          <p className="text-[16px] leading-[1.7] font-normal text-black/80 max-[700px]:text-[15px]">
            {description}
          </p>

          {onCtaClick ? (
            <button
              type="button"
              onClick={onCtaClick}
              className={`${ctaClasses} cursor-pointer`}
            >
              <span>{ctaLabel}</span>
              <span aria-hidden="true" className="text-[12px] tracking-normal">
                →
              </span>
            </button>
          ) : (
            <a href={ctaHref ?? "#contacto"} className={ctaClasses}>
              <span>{ctaLabel}</span>
              <span aria-hidden="true" className="text-[12px] tracking-normal">
                →
              </span>
            </a>
          )}
        </div>

        {/* Columna derecha: métricas con línea divisoria vertical */}
        {metrics.length > 0 && (
          <div className="flex flex-col justify-center gap-8 border-l border-black/10 pl-14 max-[900px]:border-t max-[900px]:border-l-0 max-[900px]:pt-10 max-[900px]:pl-0">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1.5">
                <span className="text-[32px] leading-[1.1] font-bold tracking-[-1px] text-black/90 max-[700px]:text-[28px]">
                  {metric.value}
                </span>
                <span className="text-[9px] tracking-[4px] text-black/38 uppercase">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
