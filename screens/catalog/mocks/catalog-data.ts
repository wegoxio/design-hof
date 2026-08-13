import type { ProductCategory } from "@/screens/home/types/category";
import type { CatalogCopy, CatalogProduct, CatalogVariant } from "../types/catalog";

export { productCategories as catalogCategories } from "@/screens/home/mocks/categories";

export const catalogCopy: Record<CatalogVariant, CatalogCopy> = {
  general: { eyebrow: "Design Hof", title: "Mobiliario", description: "SofÃ¡s, sillas, mesas, estanterÃ­as y mÃ¡s â€” diseÃ±o europeo para cada espacio", heroImage: "/catalog/hero/catalog-hero-01.png" },
  h1: { eyebrow: "Design Hof Â· H1", title: "Mobiliario H1", description: "DiseÃ±o nÃ³rdico, atemporal y cercano para proyectos residenciales y corporativos", heroImage: "/catalog/hero/catalog-hero-01.png" },
};

const product = (id: number, brand: string, name: string, price: number, categoryId: string, extension: "webp" | "png" | "jpg", tags: CatalogProduct["tags"], previousPrice?: number): CatalogProduct => ({ id: String(id), brand, name, price, previousPrice, categoryId, tags, imageUrl: `/catalog/products/product-${String(id).padStart(2, "0")}.${extension}` });

export const catalogProducts: CatalogProduct[] = [
  product(1, "Rolf Benz", "SofÃ¡ Seccional Oslo", 12200, "sofas", "jpg", ["stock", "collection"]),
  product(2, "MÃ¶ller Design", "Sistema de Cama Riva", 7400, "camas", "jpg", ["stock", "h1"]),
  product(3, "Raumplus", "EstanterÃ­a Modular", 3100, "estanterias", "jpg", ["stock", "h1"]),
  product(4, "KFF", "Silla Dining Arc", 890, "sillas", "jpg", ["stock", "collection", "h1"]),
  product(5, "Leolux", "Butaca Lounge Nord", 2900, "butacas", "jpg", ["new"]),
  product(6, "Zeitraum", "Mesa Comedor Oval", 4850, "mesas", "jpg", ["new", "collection", "h1"]),
  product(7, "Rolf Benz", "SofÃ¡ Cama Flex", 6500, "sofa-cama", "jpg", ["new"]),
  product(8, "Bolia", "SillÃ³n Accent Verde", 3200, "butacas", "jpg", ["new", "h1"]),
  product(9, "Bolia", "SofÃ¡ ColecciÃ³n Arco", 5600, "sofas", "jpg", ["collection"]),
  product(10, "Zeitraum", "Mesa Comedor Redonda", 4200, "mesas", "jpg", ["stock", "h1"]),
  product(11, "KFF", "Silla Dining Blanca", 720, "sillas", "jpg", ["new", "h1"]),
  product(12, "MÃ¶ller Design", "Dormitorio NÃ³rdico", 9800, "camas", "jpg", ["collection"]),
  product(13, "Bolia", "Aparador NÃ³rdico", 1890, "aparadores", "jpg", ["special"], 2650),
  product(14, "Himolla", "Mesa de Centro Oak", 1200, "mesas-centro", "jpg", ["special", "h1"], 1650),
  product(15, "Leolux", "Armchair Cocoon", 2100, "butacas", "jpg", ["special"], 2900),
  product(16, "Raumplus", "Gavetero Slim", 980, "gaveteros", "jpg", ["special", "h1"], 1350),
];

export function getProductsForVariant(variant: CatalogVariant) {
  return variant === "h1" ? catalogProducts.filter((item) => item.tags.includes("h1")) : catalogProducts;
}

export type CatalogCategory = ProductCategory;

