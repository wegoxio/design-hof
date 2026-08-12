import { CatalogScreen } from "@/screens/catalog/catalog-screen";
import { catalogCategories, catalogCopy, getProductsForVariant } from "@/screens/catalog/mocks/catalog-data";

export default function FurniturePage() {
  return <CatalogScreen copy={catalogCopy.general} categories={catalogCategories} products={getProductsForVariant("general")} />;
}
