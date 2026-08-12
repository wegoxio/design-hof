export type CatalogVariant = "general" | "h1";

export type CatalogProduct = {
  id: string;
  brand: string;
  name: string;
  price: number;
  previousPrice?: number;
  imageUrl: string;
  categoryId: string;
  tags: Array<"stock" | "new" | "collection" | "special" | "h1">;
};

export type CatalogCopy = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
};
