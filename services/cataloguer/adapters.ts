import type { CatalogProduct, ProductDetail, ProductVariation } from "@/screens/catalog/types/catalog";
import type {
  CataloguerChild,
  CataloguerField,
  CataloguerProduct,
  CataloguerRelatedProduct,
} from "./types";

const PLACEHOLDER = "/catalog/products/product-placeholder.svg";

function normalized(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function fieldValue(fields: CataloguerField[], candidates: string[]): string | null {
  const wanted = new Set(candidates.map(normalized));
  const field = fields.find((item) => wanted.has(normalized(item.key)) || wanted.has(normalized(item.label)));
  return field?.value === null || field?.value === undefined ? null : String(field.value);
}

function splitValue(value: string | null): string[] {
  return value ? value.split(/[|;,\n]+/).map((item) => item.trim()).filter(Boolean) : [];
}

function tags(product: CataloguerProduct): CatalogProduct["tags"] {
  const paths = product.categories.flatMap((category) => [category.slug, ...category.ancestors.map((item) => item.slug)]);
  const result: CatalogProduct["tags"] = [];
  if (!product.trackInventory || product.availableQuantity > 0 || product.children.some((child) => child.availableQuantity > 0)) result.push("stock");
  if (paths.some((slug) => /new-in|novedad/.test(slug))) result.push("new");
  if (paths.some((slug) => /coleccion|collection/.test(slug))) result.push("collection");
  if (product.salePrice !== null && product.salePrice !== undefined) result.push("special");
  if (paths.some((slug) => /(^|-)h1($|-)|ch1/.test(slug))) result.push("h1");
  return result;
}

function effectivePrice(product: Pick<CataloguerProduct, "price" | "salePrice">) {
  return product.salePrice ?? product.price;
}

function displayMode(value?: string | null): "contain" | "cover" {
  return value?.toUpperCase() === "COVER" ? "cover" : "contain";
}

export function toCatalogProduct(product: CataloguerProduct): CatalogProduct {
  const brand = fieldValue(product.fields, ["brand", "marca", "fabricante", "manufacturer"]);
  const price = effectivePrice(product);
  return {
    id: product.id,
    slug: product.slug,
    brand: brand || undefined,
    name: product.name,
    description: product.description || "",
    price: price > 0 ? price : null,
    previousPrice: product.salePrice !== null && product.salePrice !== undefined && product.price > product.salePrice
      ? product.price
      : undefined,
    imageUrl: product.primaryImage?.url || product.images[0]?.url || PLACEHOLDER,
    imageDisplayMode: displayMode(product.primaryImage?.displayMode || product.images[0]?.displayMode),
    categoryIds: product.categories.flatMap((category) => [category.slug, ...category.ancestors.map((item) => item.slug)]),
    tags: tags(product),
  };
}

function childToVariation(child: CataloguerChild): ProductVariation {
  return {
    id: child.id,
    slug: child.slug,
    label: child.optionLabel || child.name,
    price: (child.salePrice ?? child.price) > 0 ? (child.salePrice ?? child.price) : null,
    previousPrice: child.salePrice !== null && child.salePrice !== undefined && child.price > child.salePrice ? child.price : undefined,
    imageUrl: child.primaryImage?.url,
    imageDisplayMode: displayMode(child.primaryImage?.displayMode),
    available: !child.trackInventory || child.availableQuantity > 0,
  };
}

export function toProductDetail(product: CataloguerProduct): ProductDetail {
  const base = toCatalogProduct(product);
  const dimensions = splitValue(fieldValue(product.fields, ["dimensions", "dimension", "medidas", "medida"]));
  const colors = splitValue(fieldValue(product.fields, ["colors", "color", "colores", "acabados", "acabado"]));
  const features = product.fields
    .filter((field) => field.value !== null && field.value !== "" && !["marca", "brand", "medidas", "dimensions", "color", "colors"].includes(normalized(field.key)))
    .map((field) => `${field.label}: ${String(field.value)}${field.unit ? ` ${field.unit}` : ""}`);

  return {
    ...base,
    collection: product.category?.publicLabel || product.category?.name || undefined,
    description: product.description || "",
    features: [
      ...(product.trackInventory ? [product.availableQuantity > 0 ? `Stock disponible: ${product.availableQuantity}` : "Sin stock disponible"] : []),
      ...features,
    ],
    dimensions,
    colors: colors.map((color, index) => ({ id: `color-${index + 1}`, label: color })),
    sizes: dimensions,
    variations: product.children.map(childToVariation),
    gallery: product.images.length
      ? product.images.map((image, index) => ({ src: image.url, alt: image.altText || `${product.name} — imagen ${index + 1}`, displayMode: displayMode(image.displayMode) }))
      : [{ src: base.imageUrl, alt: base.name, displayMode: base.imageDisplayMode }],
  };
}

export function relatedToCatalogProduct(product: CataloguerRelatedProduct): CatalogProduct {
  return {
    id: product.id,
    slug: product.slug,
    brand: undefined,
    name: product.name,
    description: "",
    price: null,
    imageUrl: product.primaryImage?.url || PLACEHOLDER,
    imageDisplayMode: displayMode(product.primaryImage?.displayMode),
    categoryIds: [],
    tags: [],
  };
}
