"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServiceItem } from "../content/services-content";

function ServicePanel({ service }: { service: ServiceItem }) {
  return (
    <div className="grid min-h-[520px] grid-cols-2 max-[800px]:grid-cols-1">
      <div className="relative min-h-[520px] overflow-hidden max-[800px]:min-h-[360px] max-[520px]:min-h-[280px]">
        <Image src={service.image} alt={`${service.name}: ${service.scope}`} fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" priority={service.number === "01"} />
      </div>
      <div className="flex min-h-[520px] flex-col justify-between bg-[#0d0d0b] p-14 text-white max-[800px]:min-h-[420px] max-[600px]:p-8">
        <div>
          <div className="relative h-[72px] w-[260px] max-w-full overflow-hidden bg-white">
            <Image src={service.logo} alt={service.name} fill sizes="260px" className="object-contain" />
          </div>
          <p className="mt-10 max-w-[400px] text-[16px] leading-[26px] text-white/75 max-[600px]:text-[14px] max-[600px]:leading-6">{service.description}</p>
        </div>
        <p className="mt-10 border-t border-white/10 pt-8 text-[11px] leading-[18px] tracking-[3.2px] text-white/30 uppercase">{service.scope}</p>
      </div>
    </div>
  );
}

export function ServicesAccordion({ items }: { items: ServiceItem[] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? "");
  return (
    <section className="border-t border-black/9" aria-label="Servicios y marcas">
      {items.map((service) => {
        const open = openId === service.id;
        const panelId = `service-panel-${service.id}`;
        return (
          <article className="border-b border-black/9" key={service.id}>
            <h2>
              <button type="button" className="grid min-h-[104px] w-full grid-cols-[40px_174px_minmax(0,1fr)_auto_32px] items-center gap-10 bg-transparent px-8 py-7 text-left transition-colors hover:bg-black/[.018] max-[900px]:grid-cols-[30px_130px_minmax(0,1fr)_32px] max-[900px]:gap-5 max-[600px]:grid-cols-[26px_100px_minmax(0,1fr)_32px] max-[600px]:gap-3 max-[600px]:px-5" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenId(open ? "" : service.id)}>
                <span className="text-[12px] font-normal text-[#888885]">{service.number}</span>
                <span className="relative block h-12 w-full bg-white"><Image src={service.logo} alt={service.name} fill sizes="174px" className="object-contain" /></span>
                <span className="truncate text-[12px] font-normal tracking-[3.1px] text-[#888885] uppercase max-[600px]:text-[9px] max-[600px]:tracking-[1.4px]">{service.scope}</span>
                <span className="text-[11px] font-normal tracking-[1.1px] text-[#888885] uppercase max-[900px]:hidden">{service.highlight}</span>
                <span className="grid size-8 place-items-center border border-black/9 text-[18px] font-light text-[#555]" aria-hidden="true">{open ? "−" : "+"}</span>
              </button>
            </h2>
            <div id={panelId} className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="min-h-0 overflow-hidden"><ServicePanel service={service} /></div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
