import { HomeScreen } from "@/screens/home/home-screen";
import { getFeaturedProducts, getHomeCatalogueNavigation } from "@/services/cataloguer/catalog";
import { CataloguerRequestError } from "@/services/cataloguer/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  let navigation = { rooms: [], categories: [] } as Awaited<ReturnType<typeof getHomeCatalogueNavigation>>;
  let products = [] as Awaited<ReturnType<typeof getFeaturedProducts>>;
  let catalogueUnavailable = false;
  try {
    [navigation, products] = await Promise.all([getHomeCatalogueNavigation(), getFeaturedProducts(5)]);
  } catch (error) {
    if (!(error instanceof CataloguerRequestError)) throw error;
    catalogueUnavailable = true;
    console.error("Cataloguer unavailable while loading the home page", error);
  }
  const featured = products.map((product) => ({
    id: product.id,
    brand: product.brand,
    name: product.name,
    description: product.description,
    hoverDescription: product.description,
    imageUrl: product.imageUrl,
    href: `/mobiliario/${product.slug}`,
    badge: product.tags.includes("special") ? "Special Price" : product.tags.includes("new") ? "New In" : undefined,
  }));
  return <HomeScreen catalogueCategories={navigation.categories} catalogueRooms={navigation.rooms} catalogueFeatured={featured} catalogueUnavailable={catalogueUnavailable} />;
}
