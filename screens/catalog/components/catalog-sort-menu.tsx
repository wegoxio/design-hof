"use client";

import { useEffect, useRef, useState } from "react";
import type { CatalogSort } from "../types/catalog";

const options: Array<{ value: CatalogSort; label: string }> = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
];

export function CatalogSortMenu({ value, onChange }: { value: CatalogSort; onChange: (value: CatalogSort) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromKeyboard);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromKeyboard);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)} className="flex min-h-12 min-w-[220px] items-center justify-between gap-8 border border-black/12 bg-white px-5 text-left transition-[border-color,background-color] duration-300 hover:border-black/35 hover:bg-[#fafaf8] max-[520px]:min-w-0 max-[520px]:w-full">
        <span><span className="block text-[8px] font-medium tracking-[2px] text-black/35 uppercase">Ordenar por</span><span className="mt-1 block text-[11px] font-semibold tracking-[.8px] uppercase">{selected.label}</span></span>
        <svg aria-hidden="true" className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none"><path d="m2.5 4.5 3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.2" /></svg>
      </button>
      {open && <div role="listbox" aria-label="Ordenar productos" className="absolute right-0 z-40 mt-2 min-w-full border border-black/10 bg-white p-1.5 shadow-[0_18px_55px_rgba(0,0,0,.12)] max-[520px]:right-auto max-[520px]:left-0 max-[520px]:w-full">{options.map((option) => <button type="button" role="option" aria-selected={option.value === value} key={option.value} onClick={() => { onChange(option.value); setOpen(false); }} className={`block w-full px-4 py-3 text-left text-[10px] font-medium tracking-[1px] uppercase transition-colors duration-200 ${option.value === value ? "bg-black text-white" : "hover:bg-[#f3f3ef]"}`}>{option.label}</button>)}</div>}
    </div>
  );
}
