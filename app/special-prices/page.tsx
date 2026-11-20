import { CatalogScreen } from "@/screens/catalog/catalog-screen";
import { catalogCopyForCollection } from "@/screens/catalog/content/catalog-copy";
import type { CatalogSort } from "@/screens/catalog/types/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";
import { getCatalogProductPage } from "@/services/cataloguer/catalog";

export const dynamic = "force-dynamic";

type SpecialPricesPageProps = {
  searchParams: Promise<{ orden?: string }>;
};

export default async function SpecialPricesPage({ searchParams }: SpecialPricesPageProps) {
  const query = await searchParams;
  const sort: CatalogSort =
    query.orden === "price-asc" || query.orden === "price-desc"
      ? query.orden
      : "featured";

  let unavailable = false;
  let result = {
    items: [],
    total: 0,
    page: 1,
    totalPages: 0,
  } as Awaited<ReturnType<typeof getCatalogProductPage>>;

  try {
    result = await getCatalogProductPage("merchandising", {
      page: 1,
      limit: 16,
      categorySlug: "mobiliario-special-prices",
      sort,
    });
  } catch (error) {
    if (!(error instanceof CataloguerRequestError)) throw error;
    unavailable = true;
    console.error("Cataloguer unavailable while loading Special Prices", error);
  }

  return (
    <CatalogScreen
      copy={catalogCopyForCollection("mobiliario-special-prices")}
      categories={[]}
      products={result.items}
      state={{
        categoryId: "todas",
        categorySlug: "mobiliario-special-prices",
        filter: "all",
        sort,
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
      }}
      variant="merchandising"
      unavailable={unavailable}
    />
  );
}
