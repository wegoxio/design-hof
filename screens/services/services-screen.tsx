import { ServicesAccordion } from "./components/services-accordion";
import { services } from "./content/services-content";

export function ServicesScreen() {
  return (
    <div className="bg-[#f7f7f5] text-[#0d0d0b]">
      <section className="px-8 pb-20 pt-28 max-[700px]:px-6 max-[700px]:pb-14 max-[700px]:pt-20" aria-labelledby="services-title">
        <div className="mx-auto max-w-[1376px]">
          <p className="text-[12px] font-medium tracking-[5.4px] text-[#888885] uppercase">Nuestros Servicios</p>
          <h1 id="services-title" className="mt-6 max-w-[900px] text-[clamp(42px,6vw,74px)] leading-[.95] font-bold tracking-[-1.86px]">Cocinas · Baños · Clósets · Mobiliario · Revestimientos</h1>
          <p className="mt-8 max-w-[640px] text-[16px] leading-[26px] text-[#888885] max-[600px]:text-[14px] max-[600px]:leading-6">Creamos espacios de diseño personalizado y funcional, de estilo atemporal capaces de sobrepasar las expectativas de nuestros clientes. Desde la planificación hasta la instalación, ofrecemos soluciones para diversos espacios, incluyendo cocinas, baños, clósets, vestiers, salas, comedores y áreas auxiliares, entre otros.</p>
        </div>
      </section>
      <ServicesAccordion items={services} />
    </div>
  );
}
