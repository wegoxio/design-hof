import { BrandsHero } from "./components/brands-hero";
import { BrandsGrid } from "./components/brands-grid";
import { BrandsSummary } from "./components/brands-summary";
import { brandsHeroContent, brandsSummaryContent } from "./mocks/brands-content";
import { brands } from "./mocks/brands";

export function BrandsScreen() {
  return (
    <>
      <BrandsHero content={brandsHeroContent} />
      <BrandsGrid brands={brands} />
      <BrandsSummary content={brandsSummaryContent} />
    </>
  );
}
