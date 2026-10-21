import { CategoriesSection } from "./components/categories/categories-section";
import { HeroSection } from "./components/hero/hero-section";
import { H1FeatureSection } from "./components/h1-feature/h1-feature-section";
import { FeaturedProductsSection } from "./components/featured-products/featured-products-section";
import { DesignSpacesSection } from "./components/design-spaces/design-spaces-section";
import { PromotionalPopup } from "./components/popup/promotional-popup";
import { HomeProjectsSection } from "./components/projects/home-projects-section";
import type { ProductCategory, RoomCategory } from "./types/category";
import { heroSlides } from "./content/hero-slides";
import { h1FeatureContent } from "./content/h1-feature";
import type { FeaturedProduct } from "./types/featured-product";
import { designSpacesContent } from "./content/design-spaces";
import { promotionalPopupContent } from "./content/promotional-popup";
import { homeProjects } from "./content/home-projects";
import { CatalogUnavailableNotice } from "../catalog/components/catalog-unavailable-notice";

export function HomeScreen({ catalogueCategories, catalogueRooms, catalogueFeatured, catalogueUnavailable = false }: { catalogueCategories: ProductCategory[]; catalogueRooms: RoomCategory[]; catalogueFeatured: FeaturedProduct[]; catalogueUnavailable?: boolean }) {
  return (
    <>
      <HeroSection slides={heroSlides} />
      {catalogueUnavailable ? <CatalogUnavailableNotice /> : <CategoriesSection rooms={catalogueRooms} categories={catalogueCategories} />}
      <H1FeatureSection content={h1FeatureContent} />
      {!catalogueUnavailable && <FeaturedProductsSection products={catalogueFeatured} />}
      <DesignSpacesSection content={designSpacesContent} />
      <HomeProjectsSection projects={homeProjects} />
      <PromotionalPopup content={promotionalPopupContent} />
    </>
  );
}

