"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CatalogProduct, CatalogVariant, ProductDetail } from "../types/catalog";
import { ProductCard } from "./product-card";

const money = new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
type Panel = "description" | "features" | "dimensions";

export function ProductDetailView({ product, related, variant }: { product: ProductDetail; related: CatalogProduct[]; variant: CatalogVariant }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [selectedVariationId, setSelectedVariationId] = useState(
    product.variations.find((variation) => variation.available)?.id ?? product.variations[0]?.id ?? "",
  );
  const [openPanel, setOpenPanel] = useState<Panel | null>("description");

  const panels: Array<{ id: Panel; label: string; content: React.ReactNode }> = [];
  if (product.description) panels.push({ id: "description", label: "Descripción", content: <p>{product.description}</p> });
  if (product.features.length) panels.push({ id: "features", label: "Características", content: <ul className="space-y-2">{product.features.map((item) => <li key={item}>— {item}</li>)}</ul> });
  if (product.dimensions.length) panels.push({ id: "dimensions", label: "Dimensiones", content: <ul className="grid grid-cols-2 gap-2 max-[500px]:grid-cols-1">{product.dimensions.map((item) => <li key={item}>{item}</li>)}</ul> });
  const selectedVariation = product.variations.find((variation) => variation.id === selectedVariationId);
  const displayedPrice = selectedVariation?.price ?? product.price;
  const displayedPreviousPrice = selectedVariation?.previousPrice ?? product.previousPrice;
  const gallery = selectedVariation?.imageUrl
    ? [
        { src: selectedVariation.imageUrl, alt: `${product.name} — ${selectedVariation.label}`, displayMode: selectedVariation.imageDisplayMode ?? "contain" },
        ...product.gallery.filter((image) => image.src !== selectedVariation.imageUrl),
      ]
    : product.gallery;
  const hasVariations = product.variations.length > 0;

  return (
    <div className="bg-[#f8f8f6] text-[#111]">
      <nav className="site-container flex min-h-[74px] items-center gap-3 border-b border-black/[.07] text-[9px] font-medium tracking-[1.5px] text-black/35 uppercase" aria-label="Migas de pan">
        <Link className="transition-colors duration-300 hover:text-black" href="/">Inicio</Link><span>/</span>
        <Link className="transition-colors duration-300 hover:text-black" href={variant === "h1" ? "/mobiliario-h1" : "/mobiliario"}>{variant === "h1" ? "Mobiliario H1" : variant === "merchandising" ? "Catálogo" : "Mobiliario"}</Link><span>/</span>
        <span className="text-black/65">{product.name}</span>
      </nav>

      <section className="site-container grid grid-cols-[minmax(0,1.35fr)_minmax(360px,.65fr)] gap-[clamp(34px,5vw,90px)] py-[clamp(44px,6vw,88px)] max-[900px]:grid-cols-1">
        <div className="grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-4 max-[600px]:grid-cols-1">
          <div className="flex flex-col gap-3 max-[600px]:order-2 max-[600px]:flex-row">
            {gallery.map((image, index) => <button key={`${image.src}-${index}`} type="button" onClick={() => setActiveImage(index)} aria-label={`Ver imagen ${index + 1}`} className={`relative aspect-square w-full overflow-hidden border bg-[#f3f3f0] transition-[border-color,transform,opacity] duration-500 hover:-translate-y-0.5 max-[600px]:w-16 ${activeImage === index ? "border-black opacity-100" : "border-black/10 opacity-55"}`}><Image unoptimized src={image.src} alt="" fill sizes="72px" className={image.displayMode === "cover" ? "object-cover" : "object-contain p-1.5"} /></button>)}
          </div>
          <div className="relative aspect-[.79] min-h-[520px] overflow-hidden bg-[#ececea] max-[600px]:min-h-[420px]">
            {gallery.map((image, index) => <Image unoptimized key={`${image.src}-main-${index}`} src={image.src} alt={image.alt} fill priority={index === 0} sizes="(max-width:900px) 100vw,60vw" className={`${image.displayMode === "cover" ? "object-cover" : "object-contain p-[5%]"} transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${activeImage === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.015] opacity-0"}`} />)}
            {product.tags.includes("new") && <span className="absolute top-4 left-4 z-10 bg-[#111] px-3 py-2 text-[8px] font-bold tracking-[1px] text-white uppercase shadow-[0_4px_14px_rgba(0,0,0,.08)]">New In</span>}
          </div>
        </div>

        <div className="self-start max-[900px]:max-w-[680px]">
          {product.brand && <p className="text-[9px] font-medium tracking-[4px] text-black/35 uppercase">{product.brand}</p>}
          <h1 className={`${product.brand ? "mt-3" : ""} text-[clamp(30px,3vw,46px)] leading-[1.02] font-bold tracking-[-1.8px]`}>{product.name}</h1>
          {product.collection && <p className="mt-2 text-[9px] font-medium tracking-[3px] text-black/30 uppercase">{product.collection}</p>}
          <p className="mt-7 flex items-baseline gap-3 text-[22px] font-bold"><span>{displayedPrice === null ? "Consultar precio" : money.format(displayedPrice)}</span>{displayedPreviousPrice && displayedPrice !== null && displayedPreviousPrice > displayedPrice && <span className="text-sm font-normal text-black/35 line-through">{money.format(displayedPreviousPrice)}</span>}</p>

          {hasVariations && <fieldset className="mt-8"><legend className="mb-3 text-[8px] font-medium tracking-[3px] text-black/35 uppercase">Variación</legend><div className="flex flex-wrap gap-2">{product.variations.map((variation) => <button key={variation.id} type="button" disabled={!variation.available} aria-pressed={selectedVariationId === variation.id} onClick={() => { setSelectedVariationId(variation.id); setActiveImage(0); }} className={`min-h-10 border px-5 text-[8px] font-medium tracking-[1px] uppercase transition-[background,color,border-color,transform,opacity] duration-400 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 ${selectedVariationId === variation.id ? "border-black bg-black text-white" : "border-black/12 bg-transparent text-black"}`}>{variation.label}</button>)}</div></fieldset>}

          {!hasVariations && product.colors.length > 0 && <fieldset className="mt-8"><legend className="mb-3 text-[8px] font-medium tracking-[3px] text-black/35 uppercase">Color</legend><div className="flex flex-wrap gap-2.5">{product.colors.map((color) => <button key={color.id} type="button" aria-pressed={selectedColor === color.id} onClick={() => setSelectedColor(color.id)} className={`min-h-10 border px-4 text-[8px] font-medium tracking-[1px] uppercase ${selectedColor === color.id ? "border-black bg-black text-white" : "border-black/12"}`}>{color.label}</button>)}</div></fieldset>}

          {!hasVariations && product.sizes.length > 0 && <fieldset className="mt-7"><legend className="mb-3 text-[8px] font-medium tracking-[3px] text-black/35 uppercase">Medida</legend><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} className={`min-h-10 border px-5 text-[8px] font-medium tracking-[1px] uppercase transition-[background,color,border-color,transform] duration-400 hover:-translate-y-0.5 ${selectedSize === size ? "border-black bg-black text-white" : "border-black/12 bg-transparent text-black"}`}>{size}</button>)}</div></fieldset>}

          <Link href="/contacto" className="group mt-8 flex min-h-[54px] items-center justify-center gap-4 bg-[#0b0b0a] px-6 text-[9px] font-medium tracking-[3px] text-white uppercase transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,.16)]">Consultar producto <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span></Link>

          <div className="mt-9 border-t border-black/[.08]">{panels.map((panel) => { const open = openPanel === panel.id; return <div className="border-b border-black/[.08]" key={panel.id}><button type="button" onClick={() => setOpenPanel(open ? null : panel.id)} aria-expanded={open} className="flex w-full items-center justify-between py-5 text-left text-[9px] font-medium tracking-[3px] uppercase"><span>{panel.label}</span><span className={`text-base font-light transition-transform duration-500 ${open ? "rotate-45" : "rotate-0"}`}>+</span></button><div className={`grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="pb-6 text-[12px] leading-[1.8] text-black/52">{panel.content}</div></div></div></div>; })}</div>
        </div>
      </section>

      <section className="site-container border-t border-black/[.08] py-[clamp(64px,7vw,100px)]" aria-labelledby="related-title">
        <p id="related-title" className="mb-10 text-[9px] font-medium tracking-[4px] text-black/35 uppercase">También te puede interesar</p>
        <div className="grid grid-cols-5 gap-5 max-[1000px]:grid-cols-3 max-[650px]:grid-cols-2">{related.map((item) => <ProductCard product={item} variant={variant} key={item.id} />)}</div>
      </section>
    </div>
  );
}

