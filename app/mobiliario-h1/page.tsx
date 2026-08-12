import { CatalogScreen } from "@/screens/catalog/catalog-screen";
import { catalogCategories, catalogCopy, getProductsForVariant } from "@/screens/catalog/mocks/catalog-data";

export default function H1FurniturePage() {
  return <CatalogScreen copy={catalogCopy.h1} categories={catalogCategories} products={getProductsForVariant("h1")} />;
}
