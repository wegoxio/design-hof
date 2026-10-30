import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/screens/catalog/components/product-detail-view";
import { getCatalogProductDetail } from "@/services/cataloguer/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";
import { CatalogUnavailableNotice } from "@/screens/catalog/components/catalog-unavailable-notice";

export async function generateMetadata({ params, searchParams }: PageProps<"/mobiliario/[productId]">): Promise<Metadata> {
  const { productId } = await params;
  const query = await searchParams;
  const variant = query.catalogo === "h1" ? "h1" : query.catalogo === "merchandising" ? "merchandising" : "general";
  const result = await getCatalogProductDetail(productId, variant);
  if (!result) return {};

  const { product } = result;
  const image = product.gallery[0]?.src || product.imageUrl;
  const description = product.description || `Conoce ${product.name} en Design HOF.`;
  return {
    title: `${product.name} | Design HOF`,
    description,
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: `https://www.design-hof.com/mobiliario/${product.slug}`,
      siteName: "Design HOF",
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params, searchParams }: PageProps<"/mobiliario/[productId]">) {
  const { productId } = await params;
  const query = await searchParams;
  const variant = query.catalogo === "h1" ? "h1" : query.catalogo === "merchandising" ? "merchandising" : "general";
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
