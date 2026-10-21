"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CatalogCategory } from "../types/catalog";

export function CatalogCategories({ categories, activeId, onSelect }: { categories: CatalogCategory[]; activeId: string; onSelect: (id: string) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => railRef.current?.scrollBy({ left: direction * Math.min(720, railRef.current.clientWidth * .75), behavior: "smooth" });

  return (
    <section className="overflow-hidden border-b border-black/8 bg-[#f5f5f2] px-[clamp(22px,4vw,56px)] py-[clamp(34px,4vw,54px)]" aria-labelledby="catalog-categories-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div><p className="text-[8px] font-semibold tracking-[4px] text-black/35 uppercase">Colecciones</p><h2 id="catalog-categories-title" className="mt-2 text-[clamp(20px,2vw,28px)] font-semibold tracking-[-.7px]">Explorar por categoría</h2></div>
          <div className="flex gap-2" aria-label="Controles de categorías"><button type="button" onClick={() => move(-1)} className="grid size-11 place-items-center border border-black/12 bg-transparent text-xl transition-colors hover:border-black hover:bg-black hover:text-white" aria-label="Categorías anteriores">‹</button><button type="button" onClick={() => move(1)} className="grid size-11 place-items-center border border-black/12 bg-transparent text-xl transition-colors hover:border-black hover:bg-black hover:text-white" aria-label="Categorías siguientes">›</button></div>
        </div>
        <div ref={railRef} className="flex min-w-0 max-w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button type="button" aria-pressed={activeId === "todas"} onClick={() => onSelect("todas")} className={`group w-[150px] shrink-0 snap-start text-left transition-opacity ${activeId === "todas" ? "opacity-100" : "opacity-55 hover:opacity-100"}`}><span className={`grid aspect-[1.18] place-items-center border text-[10px] font-semibold tracking-[2px] uppercase transition-colors ${activeId === "todas" ? "border-black bg-black text-white" : "border-black/8 bg-white group-hover:border-black/25"}`}>Ver todo</span><span className="mt-3 block text-[9px] font-semibold tracking-[1.5px] uppercase">Todas las piezas</span></button>
          {categories.map((category) => {
            const active = activeId === category.id;
            return <button className={`group w-[150px] shrink-0 snap-start text-left transition-opacity duration-300 ${active ? "opacity-100" : "opacity-65 hover:opacity-100"}`} type="button" key={category.id} aria-pressed={active} onClick={() => onSelect(category.id)}><span className={`relative block aspect-[1.18] overflow-hidden border bg-white transition-[border-color,box-shadow] duration-500 ${active ? "border-black shadow-[inset_0_-3px_0_#111]" : "border-black/8 group-hover:border-black/25"}`}><Image unoptimized className="object-contain p-[10%] transition-transform duration-700 group-hover:scale-[1.035]" src={category.imageUrl} alt={category.name} fill sizes="150px" /></span><span className="mt-3 block line-clamp-2 min-h-7 text-[9px] leading-[1.5] font-semibold tracking-[1.4px] uppercase">{category.name}</span></button>;
          })}
        </div>
      </div>
    </section>
  );
}
