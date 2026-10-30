export type CatalogVariant = "general" | "h1" | "merchandising";

export type CatalogProduct = {
  id: string;
  slug: string;
  brand?: string;
  name: string;
  description: string;
  price: number | null;
  previousPrice?: number;
  imageUrl: string;
  imageDisplayMode: "contain" | "cover";
  categoryIds: string[];
  tags: Array<"stock" | "new" | "collection" | "special" | "h1">;
};

export type ProductVariation = {
  id: string;
  slug?: string;
  label: string;
  price: number | null;
  previousPrice?: number;
  imageUrl?: string;
  imageDisplayMode?: "contain" | "cover";
  available: boolean;
};

export type CatalogCategory = {
  id: string;
  name: string;
  imageUrl: string;
  href: string;
  roomIds: string[];
  matchIds: string[];
};

export type CatalogCopy = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
};

export type CatalogFilter = 'all' | 'stock' | 'special';
export type CatalogSort = 'featured' | 'price-asc' | 'price-desc';

export type CatalogPageState = {
  categoryId: string;
  filter: CatalogFilter;
  sort: CatalogSort;
  page: number;
  total: number;
  totalPages: number;
};

export type ProductDetail = CatalogProduct & {
  collection?: string;
  description: string;
  features: string[];
  dimensions: string[];
  colors: Array<{ id: string; label: string }>;
  sizes: string[];
  variations: ProductVariation[];
  gallery: Array<{ src: string; alt: string; displayMode: "contain" | "cover" }>;
};
