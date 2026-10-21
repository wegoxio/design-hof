"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogCategory, CatalogCopy, CatalogPageState, CatalogProduct, CatalogVariant } from "./types/catalog";
import { CatalogCategories } from "./components/catalog-categories";
import { CatalogHero } from "./components/catalog-hero";
import { ProductsCatalog } from "./components/products-catalog";

export function CatalogScreen({ copy, categories, products, state, variant, unavailable = false }: { copy: CatalogCopy; categories: CatalogCategory[]; products: CatalogProduct[]; state: CatalogPageState; variant: CatalogVariant; unavailable?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectCategory = (categoryId: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (categoryId === "todas") next.delete("categoria");
    else next.set("categoria", categoryId);
    next.delete("pagina");
    router.push(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  return <><CatalogHero copy={copy} /><CatalogCategories categories={categories} activeId={state.categoryId} onSelect={selectCategory} /><ProductsCatalog products={products} state={state} variant={variant} unavailable={unavailable} /></>;
}
