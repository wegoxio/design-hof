import { NextResponse } from "next/server";
import { cataloguerFetch, CataloguerRequestError } from "@/services/cataloguer/client";
import type { CataloguerPage, CataloguerProduct } from "@/services/cataloguer/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";
  if (q.length < 2) return NextResponse.json({ items: [], total: 0 });
  const channel = url.searchParams.get("channel") === "h1" ? process.env.CATALOGUER_H1_CHANNEL || "mobiliario-h1" : process.env.CATALOGUER_GENERAL_CHANNEL || "mobiliario";
  try {
    const result = await cataloguerFetch<CataloguerPage<CataloguerProduct>>("products", {
      search: q,
      page: 1,
      limit: 8,
      channel,
      minPrice: 0.01,
      inStock: true,
      sortBy: "name",
      sortDirection: "asc",
    });
    return NextResponse.json({
      total: result.total,
      items: result.items.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        salePrice: product.salePrice,
        imageUrl: product.primaryImage?.url || product.images[0]?.url || null,
        imageAlt: product.primaryImage?.altText || product.name,
      })),
    }, { headers: { "Cache-Control": "private, max-age=15" } });
  } catch (error) {
    const status = error instanceof CataloguerRequestError && error.status && error.status >= 400 && error.status < 500 ? error.status : 502;
    return NextResponse.json({ message: "No se pudo realizar la búsqueda" }, { status });
  }
}
