import { notFound } from "next/navigation";
import { ProductDetailView } from "@/screens/catalog/components/product-detail-view";
import { getCatalogProductDetail } from "@/services/cataloguer/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";
import { CatalogUnavailableNotice } from "@/screens/catalog/components/catalog-unavailable-notice";

export default async function ProductPage({ params, searchParams }: PageProps<"/mobiliario/[productId]">) {
  const { productId } = await params;
  const query = await searchParams;
  const variant = query.catalogo === "h1" ? "h1" : "general";
  let result;
  try {
    result = await getCatalogProductDetail(productId, variant);
  } catch (error) {
    if (!(error instanceof CataloguerRequestError)) throw error;
    console.error("Cataloguer unavailable while loading product detail", error);
    return <main className="min-h-[60vh] bg-[#f8f8f6] pt-20"><CatalogUnavailableNotice /></main>;
  }
  if (!result) notFound();
  return <ProductDetailView product={result.product} related={result.related} variant={variant} />;
}
