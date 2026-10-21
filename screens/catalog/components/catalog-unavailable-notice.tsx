export function CatalogUnavailableNotice({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? "my-8" : "border-y border-black/8"} bg-[#f3f1eb] px-[clamp(22px,4vw,56px)] py-7`} role="status">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-[9px] font-semibold tracking-[2px] text-black/45 uppercase">Catálogo temporalmente no disponible</p>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-black/58">No pudimos cargar los productos en este momento. El resto del sitio sigue disponible; intenta nuevamente en unos minutos.</p>
      </div>
    </section>
  );
}
