import type { Brand } from "../types/brands";

const brand = (id: string, name: string, country: string): Brand => ({
  id,
  name,
  country,
  logoUrl: `/brands/logos/brand-${id}.svg`,
  href: `/nuestras-marcas/${id}`,
});

export const brands: Brand[] = [
  brand("bolia", "Bolia", "Dinamarca"),
  brand("rolf-benz", "Rolf Benz", "Alemania"),
  brand("freistil", "Freistil Rolf Benz", "Alemania"),
  brand("and", "A—N—D", "Alemania"),
  brand("kettnaker", "Kettnaker", "Alemania"),
  brand("himolla", "Himolla", "Alemania"),
  brand("nolte-kuechen", "Nolte Küchen", "Alemania"),
  brand("raumplus", "Raumplus", "Alemania"),
  brand("out", "OUT", "Alemania"),
  brand("bordbar", "Bordbar", "Alemania"),
  brand("neolith", "Neolith", "España"),
  brand("norr11", "NORR11", "Dinamarca"),
  brand("fatboy", "Fatboy", "Países Bajos"),
  brand("brink-campman", "Brink & Campman", "Países Bajos"),
  brand("prostoria", "Prostoria", "Croacia"),
  brand("vincent-sheppard", "Vincent Sheppard", "Bélgica"),
  brand("zeitraum", "Zeitraum", "Alemania"),
  brand("wendelbo", "Wendelbo", "Dinamarca"),
  brand("xl-slabs", "XL Slabs", "España"),
  brand("inter-cuisine", "Inter Cuisine", "Alemania"),
];
