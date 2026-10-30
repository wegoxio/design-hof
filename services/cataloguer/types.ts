export type CataloguerImage = {
  url: string;
  altText?: string;
  isPrimary: boolean;
  displayMode: string;
  sortOrder: number;
};

export type CataloguerField = {
  key: string;
  label: string;
  group: string | null;
  type: string;
  unit: string | null;
  value: string | boolean | null;
  inherited: boolean;
};

export type CataloguerCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  publicLabel: string | null;
  imageUrl: string | null;
  sortOrder: number;
  showInNavigation: boolean;
  kind: string | null;
  ancestors: Array<{ id: string; name: string; slug: string; publicLabel: string | null }>;
  locale: string;
  channelKey?: string | null;
  productCount?: number;
};

export type HeaderMerchandisingLink = {
  kind: "new" | "coming" | "special";
  label: string;
  href: string;
};

export type CataloguerChild = {
  id: string;
  name: string;
  slug?: string;
  sku?: string;
  price: number;
  salePrice?: number | null;
  purchasable: boolean;
  trackInventory: boolean;
  stockQuantity: number;
  availableQuantity: number;
  optionLabel?: string | null;
  primaryImage?: CataloguerImage | null;
};

export type CataloguerRelatedProduct = {
  id: string;
  name: string;
  slug: string;
  type: string;
  primaryImage: CataloguerImage | null;
};

export type CataloguerProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  price: number;
  salePrice?: number | null;
  trackInventory: boolean;
  stockQuantity: number;
  availableQuantity: number;
  category: CataloguerCategory | null;
  categories: CataloguerCategory[];
  optionLabel: string | null;
  parentId: string | null;
  purchasable: boolean;
  primaryImage: CataloguerImage | null;
  images: CataloguerImage[];
  relatedProducts: CataloguerRelatedProduct[];
  children: CataloguerChild[];
  fields: CataloguerField[];
  locale: string;
};

export type CataloguerPage<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CataloguerGroup = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  purpose: "NAVIGATION" | "FILTER";
  placements: string[];
  sortOrder: number;
  channelKey: string;
  imageUrl: string | null;
  categoryIds: string[];
  categorySlugs: string[];
  productCount: number;
};

export type CataloguerGroupList = { items: CataloguerGroup[] };

