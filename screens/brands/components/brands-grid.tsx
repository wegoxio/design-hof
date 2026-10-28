"use client";

import Image from "next/image";
import Link from "next/link";

import { useInView } from "@/screens/home/hooks/use-in-view";

import type { Brand } from "../types/brands";

export function BrandsGrid({ brands }: { brands: Brand[] }) {
  const { ref, isInView } = useInView<HTMLElement>(0.04);

  return (
    <section ref={ref} aria-label="Marcas representadas" className="bg-[#f7f7f5] px-8 max-[600px]:px-5">
      <div className="mx-auto grid max-w-[1780px] grid-cols-5 border-t border-l border-black/[.065] max-[1100px]:grid-cols-4 max-[850px]:grid-cols-3 max-[600px]:grid-cols-2">
        {brands.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            aria-label={`${item.name}, ${item.country}`}
            className={`group relative flex aspect-[1.12/1] items-center justify-center overflow-hidden border-r border-b border-black/[.065] bg-[#f7f7f5] transition-[opacity,transform,] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white max-[600px]:aspect-square ${isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: isInView ? `${Math.min(index * 35, 420)}ms` : "0ms" }}
          >
            <span className="relative block h-[clamp(62px,6.6vw,104px)] w-[clamp(112px,11vw,172px)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-[1.035]">
              <Image src={item.logoUrl} alt={item.name} fill sizes="(min-width: 1100px) 172px, 150px" className="mix-blend-multiply object-contain grayscale contrast-[250%] transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:contrast-[320%]" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
