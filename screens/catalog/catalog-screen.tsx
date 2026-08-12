"use client";

import { useState } from "react";
import type { ProductCategory } from "@/screens/home/types/category";
import type { CatalogCopy, CatalogProduct } from "./types/catalog";
import { CatalogCategories } from "./components/catalog-categories";
import { CatalogHero } from "./components/catalog-hero";
import { ProductsCatalog } from "./components/products-catalog";

export function CatalogScreen({ copy, categories, products }: { copy: CatalogCopy; categories: ProductCategory[]; products: CatalogProduct[] }) {
  const [categoryId, setCategoryId] = useState("todas");
  return <><CatalogHero copy={copy} /><CatalogCategories categories={categories} activeId={categoryId} onSelect={setCategoryId} /><ProductsCatalog products={products} categoryId={categoryId} /></>;
}
