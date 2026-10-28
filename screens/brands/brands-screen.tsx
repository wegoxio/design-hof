import { BrandsHero } from "./components/brands-hero";
import { BrandsGrid } from "./components/brands-grid";
import { brandsHeroContent } from "./content/brands-content";
import { brands } from "./content/brands";

export function BrandsScreen() {
  return (
    <>
      <BrandsHero content={brandsHeroContent} />
      <BrandsGrid brands={brands} />
    </>
  );
}
