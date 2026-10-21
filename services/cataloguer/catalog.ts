import "server-only";
import type { CatalogCategory, CatalogProduct, CatalogVariant, ProductDetail } from "@/screens/catalog/types/catalog";
import type { ProductCategory, RoomCategory } from "@/screens/home/types/category";
import { cataloguerFetch } from "./client";
import { relatedToCatalogProduct, toCatalogProduct, toProductDetail } from "./adapters";
import type { CataloguerGroup, CataloguerGroupList, CataloguerPage, CataloguerProduct } from "./types";

function channelFor(variant: CatalogVariant) {
  return variant === "h1"
    ? process.env.CATALOGUER_H1_CHANNEL || "mobiliario-h1"
    : process.env.CATALOGUER_GENERAL_CHANNEL || "mobiliario";
}

export type CatalogProductPageOptions = {
  page: number;
  limit: number;
  group?: string;
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

export async function getCatalogCategories(variant: CatalogVariant): Promise<CatalogCategory[]> {
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
      related: response.data.relatedProducts.slice(0, 5).map(relatedToCatalogProduct),
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
