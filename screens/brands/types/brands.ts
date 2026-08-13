export type BrandsHeroContent = {
  eyebrow: string;
  lead: string;
  accent: string;
  continuation: string;
  closing: string;
};

export type Brand = {
  id: string;
  name: string;
  country: string;
  logoUrl: string;
  href: string;
};

export type BrandsSummaryContent = {
  total: number;
  label: string;
  countries: string[];
};
