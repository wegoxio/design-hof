import { CatalogScreen } from "@/screens/catalog/catalog-screen";
import { getCatalogCategories, getCatalogProductPage } from "@/services/cataloguer/catalog";
import { catalogCopy } from "@/screens/catalog/content/catalog-copy";
import type { CatalogFilter, CatalogSort } from "@/screens/catalog/types/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";

export const dynamic = "force-dynamic";

export default async function FurniturePage({ searchParams }: PageProps<"/mobiliario">) {
  const query = await searchParams;
  let categories = [] as Awaited<ReturnType<typeof getCatalogCategories>>;
  let unavailable = false;
  try {
    categories = await getCatalogCategories("general");
  } catch (error) {
    if (!(error instanceof CataloguerRequestError)) throw error;
    unavailable = true;
    console.error("Cataloguer unavailable while loading general categories", error);
  }
  const categoryId = typeof query.categoria === "string" && categories.some((category) => category.id === query.categoria) ? query.categoria : "todas";
  const filter: CatalogFilter = query.filtro === "stock" || query.filtro === "special" ? query.filtro : "all";
  const sort: CatalogSort = query.orden === "price-asc" || query.orden === "price-desc" ? query.orden : "featured";
  const requestedPage = typeof query.pagina === "string" && /^\d+$/.test(query.pagina) ? Number(query.pagina) : 1;
  const categorySlug = typeof query.coleccion === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(query.coleccion) ? query.coleccion : undefined;
  let result = { items: [], total: 0, page: 1, totalPages: 0 } as Awaited<ReturnType<typeof getCatalogProductPage>>;
  if (!unavailable) {
    try {
      result = await getCatalogProductPage("general", { page: requestedPage, limit: 16, group: categorySlug ? undefined : categoryId === "todas" ? undefined : categoryId, categorySlug, filter: filter === "all" ? undefined : filter, sort });
    } catch (error) {
      if (!(error instanceof CataloguerRequestError)) throw error;
      unavailable = true;
      console.error("Cataloguer unavailable while loading general products", error);
    }
  }
  return <CatalogScreen copy={catalogCopy.general} categories={categories} products={result.items} state={{ categoryId, filter, sort, page: result.page, total: result.total, totalPages: result.totalPages }} variant="general" unavailable={unavailable} />;
}
