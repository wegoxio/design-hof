import Image from "next/image";
import type { CatalogCategory } from "../mocks/catalog-data";

export function CatalogCategories({ categories, activeId, onSelect }: { categories: CatalogCategory[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <section className="px-[clamp(24px,4vw,58px)] py-[68px] max-[767px]:py-11" aria-labelledby="catalog-categories-title">
      <div className="mx-auto max-w-[1600px]">
        <p id="catalog-categories-title" className="mb-11 text-[9px] font-medium tracking-[5px] text-black/34 uppercase">Explorar por categoría</p>
        <div className="grid grid-cols-5 gap-x-6 gap-y-12 max-[1000px]:grid-cols-4 max-[767px]:grid-cols-3 max-[520px]:grid-cols-2">
          {categories.map((category) => {
            const isActive = activeId === "todas" || activeId === category.id;
            return (
              <button className={`group cursor-pointer border-0 bg-transparent p-0 text-center transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? "opacity-100" : "opacity-45 hover:opacity-80"}`} type="button" key={category.id} onClick={() => onSelect(category.id)}>
                <span className="relative mx-auto block aspect-square w-full max-w-[180px] overflow-hidden bg-transparent transition-[background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-black/[0.018] group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.035)]">
                  <Image className="object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]" src={category.imageUrl} alt={category.name} fill sizes="180px" unoptimized />
                </span>
                <span className="relative mt-4 inline-block pb-2 text-[9px] font-medium tracking-[2.5px] uppercase after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-right after:scale-x-0 after:bg-black/50 after:content-[''] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:origin-left group-hover:after:scale-x-100">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
