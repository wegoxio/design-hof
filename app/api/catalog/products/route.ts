import { NextResponse } from "next/server";
import { getCatalogProductPage } from "@/services/cataloguer/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";
import type { CatalogFilter, CatalogSort, CatalogVariant } from "@/screens/catalog/types/catalog";

export const dynamic = "force-dynamic";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const page = Number(params.get("page"));
  const variant = params.get("variant") as CatalogVariant;
  const categoryId = params.get("categoryId") || "todas";
  const categorySlug = params.get("categorySlug") || undefined;
  const filter = (params.get("filter") || "all") as CatalogFilter;
  const sort = (params.get("sort") || "featured") as CatalogSort;
  if (!Number.isInteger(page) || page < 2 || !["general", "h1", "merchandising"].includes(variant)) return NextResponse.json({ message: "Parametros de paginacion invalidos" }, { status: 400 });
  if ((categoryId !== "todas" && !slugPattern.test(categoryId)) || (categorySlug && !slugPattern.test(categorySlug))) return NextResponse.json({ message: "Categoria invalida" }, { status: 400 });
  if (!["all", "stock", "special"].includes(filter) || !["featured", "price-asc", "price-desc"].includes(sort)) return NextResponse.json({ message: "Filtro invalido" }, { status: 400 });
  try {
    const result = await getCatalogProductPage(variant, { page, limit: 16, group: categorySlug || categoryId === "todas" ? undefined : categoryId, categorySlug, filter: filter === "all" ? undefined : filter, sort });
    return NextResponse.json(result, { headers: { "Cache-Control": "private, max-age=15" } });
  } catch (error) {
    const status = error instanceof CataloguerRequestError && error.status && error.status >= 400 && error.status < 500 ? error.status : 502;
    return NextResponse.json({ message: "No se pudo cargar la siguiente pagina" }, { status });
  }
}
