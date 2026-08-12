"use client";

import { useMemo, useState } from "react";
import type { CatalogProduct } from "../types/catalog";
import { ProductCard } from "./product-card";

type Filter = "all" | "stock" | "new" | "collection" | "special";

const filters: Array<{ id: Filter; label: string }> = [
  { id: "stock", label: "Stock disponible" },
  { id: "new", label: "New In" },
  { id: "collection", label: "Colección" },
  { id: "special", label: "Special Prices" },
];

export function ProductsCatalog({ products, categoryId }: { products: CatalogProduct[]; categoryId: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => (categoryId === "todas" || product.categoryId === categoryId) && (filter === "all" || product.tags.includes(filter)));
    return [...filtered].sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : Number(a.id) - Number(b.id));
  }, [categoryId, filter, products, sort]);

  return (
    <section className="border-t border-black/8 bg-white" aria-label="Productos">
      <div className="sticky top-[100px] z-20 flex min-h-[58px] items-center justify-between gap-6 border-b border-black/8 bg-white/95 px-[clamp(24px,3vw,44px)] backdrop-blur-xl max-[930px]:top-[76px] max-[700px]:items-start max-[700px]:py-4">
        <div className="flex flex-wrap gap-x-9 gap-y-3">{filters.map((item) => <button className={`cursor-pointer border-0 bg-transparent p-0 text-[8px] font-medium tracking-[1.4px] uppercase transition-colors duration-400 hover:text-black ${filter === item.id ? "text-black" : "text-black/35"}`} type="button" key={item.id} onClick={() => setFilter((current) => current === item.id ? "all" : item.id)}>{item.label}</button>)}</div>
        <div className="flex shrink-0 items-center gap-5"><span className="text-[8px] font-normal text-black/35">{visibleProducts.length} piezas</span><select className="cursor-pointer border-0 bg-transparent text-[8px] font-medium tracking-[1px] uppercase outline-none" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar productos"><option value="featured">Destacados</option><option value="price-asc">Precio: menor</option><option value="price-desc">Precio: mayor</option></select></div>
      </div>
      <div className="px-[clamp(22px,3vw,42px)] py-[60px]">
        <div key={`${categoryId}-${filter}-${sort}`} className="mx-auto grid max-w-[1460px] grid-cols-4 gap-x-7 gap-y-14 max-[1000px]:grid-cols-3 max-[650px]:grid-cols-2 max-[450px]:grid-cols-1">
          {visibleProducts.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
        {visibleProducts.length === 0 && <p className="py-24 text-center text-[13px] font-normal text-black/40">No hay productos disponibles para este filtro.</p>}
      </div>
    </section>
  );
}
