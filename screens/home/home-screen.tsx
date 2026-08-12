import { CategoriesSection } from "./components/categories/categories-section";
import { HeroSection } from "./components/hero/hero-section";
import { H1FeatureSection } from "./components/h1-feature/h1-feature-section";
import { FeaturedProductsSection } from "./components/featured-products/featured-products-section";
import { DesignSpacesSection } from "./components/design-spaces/design-spaces-section";
import { PromotionalPopup } from "./components/popup/promotional-popup";
import { productCategories, roomCategories } from "./mocks/categories";
import { heroSlides } from "./mocks/hero-slides";
import { h1FeatureContent } from "./mocks/h1-feature";
import { featuredProducts } from "./mocks/featured-products";
import { designSpacesContent } from "./mocks/design-spaces";
import { promotionalPopupContent } from "./mocks/promotional-popup";

export function HomeScreen() {
  return (
    <>
      <HeroSection slides={heroSlides} />
      <CategoriesSection rooms={roomCategories} categories={productCategories} />
      <H1FeatureSection content={h1FeatureContent} />
      <FeaturedProductsSection products={featuredProducts} />
      <DesignSpacesSection content={designSpacesContent} />
      <PromotionalPopup content={promotionalPopupContent} />
    </>
  );
}
