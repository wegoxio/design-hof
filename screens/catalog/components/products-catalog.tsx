"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogFilter, CatalogPageState, CatalogProduct, CatalogSort, CatalogVariant } from "../types/catalog";
import { ProductCard } from "./product-card";
import { CatalogSortMenu } from "./catalog-sort-menu";
import { CatalogUnavailableNotice } from "./catalog-unavailable-notice";

export function ProductsCatalog({ products, state, variant, unavailable = false }: { products: CatalogProduct[]; state: CatalogPageState; variant: CatalogVariant; unavailable?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [loadedPage, setLoadedPage] = useState(state.page);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const datasetKey = `${variant}:${state.categoryId}:${state.categorySlug ?? ""}:${state.filter}:${state.sort}`;

  const navigate = (updates: { filter?: CatalogFilter; sort?: CatalogSort }) => {
    const next = new URLSearchParams(searchParams.toString());
    if (updates.filter !== undefined) {
      if (updates.filter === "all") next.delete("filtro");
      else next.set("filtro", updates.filter);
    }
    if (updates.sort !== undefined) {
      if (updates.sort === "featured") next.delete("orden");
      else next.set("orden", updates.sort);
    }
    next.delete("pagina");
    router.push(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const loadMore = useCallback(async () => {
    if (requestRef.current || loading || loadError || loadedPage >= state.totalPages || unavailable) return;
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    try {
      const query = new URLSearchParams({ variant, page: String(loadedPage + 1), categoryId: state.categoryId, filter: state.filter, sort: state.sort });
      if (state.categorySlug) query.set("categorySlug", state.categorySlug);
      const response = await fetch(`/api/catalog/products?${query}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`Catalog page failed with ${response.status}`);
      const result = (await response.json()) as { items: CatalogProduct[]; page: number };
      setVisibleProducts((current) => {
        const known = new Set(current.map((product) => product.id));
        return [...current, ...result.items.filter((product) => !known.has(product.id))];
      });
      setLoadedPage(result.page);
      setLoadError(false);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setLoadError(true);
    } finally {
      if (!controller.signal.aborted) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  }, [loadedPage, loadError, loading, state.categoryId, state.categorySlug, state.filter, state.sort, state.totalPages, unavailable, variant]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || loadedPage >= state.totalPages || unavailable) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) void loadMore(); }, { rootMargin: "500px 0px" });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loadedPage, state.totalPages, unavailable]);

  useEffect(() => () => requestRef.current?.abort(), []);

  return (
    <section className="border-t border-black/8 bg-[#fbfbf9]" aria-label="Productos">
      <div className="sticky top-[100px] z-20 border-b border-black/8 bg-[#fbfbf9]/95 backdrop-blur-xl max-[930px]:top-[76px]">
        <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-end gap-8 px-[clamp(22px,4vw,56px)] py-4 max-[760px]:items-stretch max-[760px]:flex-col max-[760px]:gap-4">
          <div className="flex shrink-0 items-center gap-6 max-[520px]:items-stretch max-[520px]:flex-col-reverse max-[520px]:gap-3">
            <span className="text-[10px] font-medium tracking-[1.2px] text-black/38 uppercase max-[520px]:text-center">{state.total} {state.total === 1 ? "pieza" : "piezas"}</span>
            <CatalogSortMenu value={state.sort} onChange={(sort) => navigate({ sort })} />
          </div>
        </div>
      </div>
      <div className="px-[clamp(22px,4vw,56px)] py-[clamp(48px,6vw,88px)]">
        <div key={datasetKey} className="mx-auto grid max-w-[1440px] grid-cols-4 gap-x-[clamp(18px,2.2vw,34px)] gap-y-[clamp(48px,5vw,76px)] max-[1050px]:grid-cols-3 max-[720px]:grid-cols-2 max-[460px]:grid-cols-1">
          {visibleProducts.map((product) => <ProductCard product={product} variant={variant} key={product.id} />)}
        </div>
        {unavailable ? <CatalogUnavailableNotice compact /> : visibleProducts.length === 0 && <p className="py-24 text-center text-[13px] font-normal text-black/40">No hay productos disponibles para este filtro.</p>}
        <div ref={sentinelRef} className="flex min-h-28 items-center justify-center pt-14" aria-live="polite">
          {loading && <div className="flex flex-col items-center gap-4 text-black/45" role="status"><div className="flex h-8 items-end gap-1.5" aria-hidden="true">{[0, 1, 2].map((index) => <span key={index} className="h-5 w-1 animate-pulse bg-black/65" style={{ animationDelay: `${index * 160}ms` }} />)}</div><span className="text-[9px] font-medium tracking-[1.8px] uppercase">Cargando mas piezas</span></div>}
          {loadError && <button type="button" onClick={() => setLoadError(false)} className="border-b border-black/30 pb-1 text-[10px] font-medium tracking-[1.4px] text-black/60 uppercase transition hover:border-black hover:text-black">Reintentar carga</button>}
          {!loading && !loadError && visibleProducts.length > 0 && loadedPage >= state.totalPages && <span className="text-[9px] font-medium tracking-[1.8px] text-black/30 uppercase">Has visto todas las piezas</span>}
        </div>
      </div>
    </section>
  );
}
