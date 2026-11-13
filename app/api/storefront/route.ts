import { NextResponse } from "next/server";
import { cataloguerFetch, CataloguerRequestError } from "@/services/cataloguer/client";
import type { CataloguerPage, CataloguerProduct } from "@/services/cataloguer/types";

const SEARCH_PAGE_SIZE = 100;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";
  if (q.length < 2) return NextResponse.json({ items: [], total: 0 });
  try {
    const fetchPage = (page: number) => cataloguerFetch<CataloguerPage<CataloguerProduct>>("products", {
      search: q,
      page,
      limit: SEARCH_PAGE_SIZE,
      sortBy: "name",
      sortDirection: "asc",
    });
    const firstPage = await fetchPage(1);
    const pageCount = Math.ceil(firstPage.total / SEARCH_PAGE_SIZE);
    const remainingPages = pageCount > 1
      ? await Promise.all(Array.from({ length: pageCount - 1 }, (_, index) => fetchPage(index + 2)))
      : [];
    const products = Array.from(
      new Map([firstPage, ...remainingPages].flatMap((page) => page.items).map((product) => [product.id, product])).values(),
    );
    return NextResponse.json({
      total: products.length,
      items: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price > 0 ? product.price : null,
        salePrice: product.salePrice && product.salePrice > 0 ? product.salePrice : null,
        imageUrl: product.primaryImage?.url || product.images[0]?.url || null,
        imageAlt: product.primaryImage?.altText || product.name,
      })),
    }, { headers: { "Cache-Control": "private, max-age=15" } });
  } catch (error) {
    const status = error instanceof CataloguerRequestError && error.status && error.status >= 400 && error.status < 500 ? error.status : 502;
    return NextResponse.json({ message: "No se pudo realizar la búsqueda" }, { status });
  }
}
