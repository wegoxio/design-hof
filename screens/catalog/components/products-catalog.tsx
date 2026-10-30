"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  CatalogFilter,
  CatalogPageState,
  CatalogProduct,
  CatalogSort,
  CatalogVariant,
} from "../types/catalog";
import { ProductCard } from "./product-card";
import { CatalogSortMenu } from "./catalog-sort-menu";
import { CatalogUnavailableNotice } from "./catalog-unavailable-notice";

export function ProductsCatalog({
  products,
  state,
  variant,
  unavailable = false,
}: {
  products: CatalogProduct[];
  state: CatalogPageState;
  variant: CatalogVariant;
  unavailable?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigate = (updates: {
    filter?: CatalogFilter;
    sort?: CatalogSort;
    page?: number;
  }) => {
    const next = new URLSearchParams(searchParams.toString());
    if (updates.filter !== undefined) {
      if (updates.filter === "all") next.delete("filtro");
      else next.set("filtro", updates.filter);
    }
    if (updates.sort !== undefined) {
      if (updates.sort === "featured") next.delete("orden");
      else next.set("orden", updates.sort);
    }
    if (updates.page !== undefined) {
      if (updates.page <= 1) next.delete("pagina");
      else next.set("pagina", String(updates.page));
    }
    if (updates.filter !== undefined || updates.sort !== undefined)
      next.delete("pagina");
    router.push(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  return (
    <section
      className="border-t border-black/8 bg-[#fbfbf9]"
      aria-label="Productos"
    >
      <div className="sticky top-[100px] z-20 border-b border-black/8 bg-[#fbfbf9]/95 backdrop-blur-xl max-[930px]:top-[76px]">
        <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-end gap-8 px-[clamp(22px,4vw,56px)] py-4 max-[760px]:items-stretch max-[760px]:flex-col max-[760px]:gap-4">
          <div className="flex shrink-0 items-center gap-6 max-[520px]:items-stretch max-[520px]:flex-col-reverse max-[520px]:gap-3">
            <span className="text-[10px] font-medium tracking-[1.2px] text-black/38 uppercase max-[520px]:text-center">
              {state.total} {state.total === 1 ? "pieza" : "piezas"}
            </span>
            <CatalogSortMenu
              value={state.sort}
              onChange={(sort) => navigate({ sort })}
            />
          </div>
        </div>
      </div>
      <div className="px-[clamp(22px,4vw,56px)] py-[clamp(48px,6vw,88px)]">
        <div
          key={`${state.categoryId}-${state.filter}-${state.sort}-${state.page}`}
          className="mx-auto grid max-w-[1440px] grid-cols-4 gap-x-[clamp(18px,2.2vw,34px)] gap-y-[clamp(48px,5vw,76px)] max-[1050px]:grid-cols-3 max-[720px]:grid-cols-2 max-[460px]:grid-cols-1"
        >
          {products.map((product) => (
            <ProductCard product={product} variant={variant} key={product.id} />
          ))}
        </div>
        {unavailable ? (
          <CatalogUnavailableNotice compact />
        ) : (
          products.length === 0 && (
            <p className="py-24 text-center text-[13px] font-normal text-black/40">
              No hay productos disponibles para este filtro.
            </p>
          )
        )}
        {state.totalPages > 1 && (
          <nav
            className="mt-16 flex items-center justify-center gap-3"
            aria-label="Paginación del catálogo"
          >
            <button
              type="button"
              disabled={state.page === 1}
              onClick={() => navigate({ page: state.page - 1 })}
              className="size-11 border border-black/10 bg-white text-lg transition-[background,color,opacity] duration-400 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25"
              aria-label="Página anterior"
            >
              ‹
            </button>
            <span className="min-w-20 text-center text-[9px] font-medium tracking-[1.5px] text-black/45 uppercase">
              {state.page} / {state.totalPages}
            </span>
            <button
              type="button"
              disabled={state.page === state.totalPages}
              onClick={() => navigate({ page: state.page + 1 })}
              className="size-11 border border-black/10 bg-white text-lg transition-[background,color,opacity] duration-400 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25"
              aria-label="Página siguiente"
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
