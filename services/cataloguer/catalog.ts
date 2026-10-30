import "server-only";
import type { CatalogCategory, CatalogProduct, CatalogVariant, ProductDetail } from "@/screens/catalog/types/catalog";
import type { ProductCategory, RoomCategory } from "@/screens/home/types/category";
import { cataloguerFetch } from "./client";
import { relatedToCatalogProduct, toCatalogProduct, toProductDetail } from "./adapters";
import type { CataloguerCategory, CataloguerGroup, CataloguerGroupList, CataloguerPage, CataloguerProduct, HeaderMerchandisingLink } from "./types";

function channelFor(variant: CatalogVariant) {
  if (variant === "h1") return process.env.CATALOGUER_H1_CHANNEL || "mobiliario-h1";
  if (variant === "merchandising") return process.env.CATALOGUER_MERCHANDISING_CHANNEL || "merchandising";
  return process.env.CATALOGUER_GENERAL_CHANNEL || "mobiliario";
}

export type CatalogProductPageOptions = {
  page: number;
  limit: number;
  group?: string;
  categorySlug?: string;
  filter?: 'stock' | 'special';
  sort?: 'featured' | 'price-asc' | 'price-desc';
};

export async function getCatalogProductPage(variant: CatalogVariant, options: CatalogProductPageOptions) {
  const sort = options.sort ?? 'featured';
  let response = await cataloguerFetch<CataloguerPage<CataloguerProduct>>('products', {
    page: options.page,
    limit: options.limit,
    channel: channelFor(variant),
    group: options.group,
    categorySlug: options.categorySlug,
    inStock: options.filter === 'stock' ? true : undefined,
    hasSalePrice: options.filter === 'special' ? true : undefined,
    sortBy: sort === 'featured' ? 'createdAt' : 'price',
    sortDirection: sort === 'price-asc' ? 'asc' : 'desc',
  });
  if (response.totalPages > 0 && response.page > response.totalPages) {
    response = await cataloguerFetch<CataloguerPage<CataloguerProduct>>('products', {
      page: response.totalPages,
      limit: options.limit,
      channel: channelFor(variant),
      group: options.group,
      categorySlug: options.categorySlug,
      inStock: options.filter === 'stock' ? true : undefined,
      hasSalePrice: options.filter === 'special' ? true : undefined,
      sortBy: sort === 'featured' ? 'createdAt' : 'price',
      sortDirection: sort === 'price-asc' ? 'asc' : 'desc',
    });
  }
  return {
    items: response.items.map(toCatalogProduct),
    total: response.total,
    page: response.page,
    totalPages: response.totalPages,
  };
}

/**
 * Header merchandising is controlled by category publication in Cataloguer.
 * Merely creating a category is not enough: it must be visible in the neutral
 * merchandising channel. That channel is a storefront placement, not product
 * ownership, so NEW IN may contain both general and H1 products. NEW IN wins
 * defensively if both seasonal categories are accidentally published at once.
 */
export async function getHeaderMerchandisingLinks(): Promise<HeaderMerchandisingLink[]> {
  const response = await cataloguerFetch<CataloguerPage<CataloguerCategory>>("categories", {
    page: 1,
    limit: 100,
    channel: channelFor("merchandising"),
    sortBy: "sortOrder",
    sortDirection: "asc",
  });
  const bySlug = new Map(response.items.map((category) => [category.slug, category]));
  const seasonal = bySlug.get("new-in") ?? bySlug.get("coming-soon");
  const links: HeaderMerchandisingLink[] = [];
  if (seasonal) {
    links.push({
      kind: seasonal.slug === "new-in" ? "new" : "coming",
      label: seasonal.publicLabel || seasonal.name,
      href: `/mobiliario?coleccion=${encodeURIComponent(seasonal.slug)}`,
    });
  }
  const special = bySlug.get("special-prices");
  if (special) {
    links.push({
      kind: "special",
      label: special.publicLabel || special.name,
      href: `/mobiliario?coleccion=${encodeURIComponent(special.slug)}`,
    });
  }
  return links;
}

export async function getCatalogCategories(variant: Exclude<CatalogVariant, "merchandising">): Promise<CatalogCategory[]> {
  const groups = await getGroups(variant, "NAVIGATION", "CATALOG");
  return groups.filter((group) => group.productCount > 0).map((group) => ({
    id: group.key,
    name: group.name,
    imageUrl: group.imageUrl || "/catalog/products/product-placeholder.svg",
    href: `/${variant === "h1" ? "mobiliario-h1" : "mobiliario"}?categoria=${group.key}`,
    roomIds: [],
    matchIds: group.categorySlugs,
  }));
}

async function getGroups(variant: CatalogVariant, purpose: CataloguerGroup["purpose"], placement: string) {
  const response = await cataloguerFetch<CataloguerGroupList>("groups", {
    channel: channelFor(variant), purpose, placement,
  });
  return response.items;
}

export async function getHomeCatalogueNavigation(): Promise<{ rooms: RoomCategory[]; categories: ProductCategory[] }> {
  const [navigation, filters] = await Promise.all([
    getGroups("general", "NAVIGATION", "HOME"),
    getGroups("general", "FILTER", "HOME"),
  ]);
  const rooms: RoomCategory[] = [
    { id: "todas", label: "Todas" },
    ...filters.map((group) => ({ id: group.key, label: group.name })),
  ];
  const categories = navigation.filter((group) => group.productCount > 0).map((group) => {
    const categoryIds = new Set(group.categoryIds);
    return {
      id: group.key,
      name: group.name,
      imageUrl: group.imageUrl || "/catalog/products/product-placeholder.svg",
      href: `/mobiliario?categoria=${group.key}`,
      roomIds: filters.filter((filter) => filter.categoryIds.some((id) => categoryIds.has(id))).map((filter) => filter.key),
    };
  });
  return { rooms, categories };
}

export async function getCatalogProductDetail(slug: string, variant: CatalogVariant): Promise<{ product: ProductDetail; related: CatalogProduct[] } | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  try {
    const response = await cataloguerFetch<{ data: CataloguerProduct }>(`products/${encodeURIComponent(slug)}`, {
      channel: channelFor(variant),
    });
    return {
      product: toProductDetail(response.data),
      // Related DTOs do not expose their catalogue/category membership yet.
      // In a cross-catalogue collection we therefore cannot build a truthful
      // detail URL for them; hiding the strip is safer than linking to a
      // channel where the related product may not be published.
      related: variant === "merchandising" ? [] : response.data.relatedProducts.slice(0, 5).map(relatedToCatalogProduct),
    };
  } catch (error) {
    if (error instanceof Error && "status" in error && (error as { status?: number }).status === 404) return null;
    throw error;
  }
}

export async function getFeaturedProducts(limit = 5): Promise<CatalogProduct[]> {
  const page = await cataloguerFetch<CataloguerPage<CataloguerProduct>>("products", {
    page: 1,
    limit,
    channel: channelFor("general"),
    sortBy: "createdAt",
    sortDirection: "desc",
  });
  return page.items.map(toCatalogProduct);
}
