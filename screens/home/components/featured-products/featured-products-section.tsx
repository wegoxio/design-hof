"use client";

import Link from "next/link";
import { useRef } from "react";
import { useInView } from "../../hooks/use-in-view";
import type { FeaturedProduct } from "../../types/featured-product";
import { FeaturedProductCard } from "./featured-product-card";

export function FeaturedProductsSection({ products }: { products: FeaturedProduct[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView<HTMLElement>(0.12);
  const move = (direction: -1 | 1) => carouselRef.current?.scrollBy({ left: direction * carouselRef.current.clientWidth * 0.75, behavior: "smooth" });

  return (
    <section ref={ref} className="bg-[#f8f8f7] px-5 py-[82px] max-[767px]:py-14" aria-labelledby="featured-title">
      <div className="mx-auto max-w-[1600px]">
        <div className={`mb-12 flex items-end justify-between transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <div><p className="mb-3 text-[9px] font-medium tracking-[4px] text-black/38 uppercase">Selección</p><h2 id="featured-title" className="text-[34px] leading-none font-bold tracking-[-1.4px] max-[767px]:text-[28px]">Destacados</h2></div>
          <div className="flex items-center gap-3"><Link className="mr-2 text-[9px] font-medium tracking-[1px] text-black/45 uppercase transition-colors hover:text-black" href="/mobiliario">Ver todo →</Link><button className="grid size-9 place-items-center border border-black/10 bg-transparent text-black/40 transition hover:border-black hover:bg-black hover:text-white max-[600px]:hidden" onClick={() => move(-1)} aria-label="Anteriores">‹</button><button className="grid size-9 place-items-center border border-black/10 bg-transparent text-black/40 transition hover:border-black hover:bg-black hover:text-white max-[600px]:hidden" onClick={() => move(1)} aria-label="Siguientes">›</button></div>
        </div>
        <div ref={carouselRef} className={`flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 transition-[opacity,transform] delay-150 duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [scrollbar-width:none] [&>*]:snap-start [&::-webkit-scrollbar]:hidden ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>{products.map((product) => <FeaturedProductCard product={product} key={product.id} />)}</div>
      </div>
    </section>
  );
}
