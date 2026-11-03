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
  brand("norr11", "NORR11", "Dinamarca"),
  brand("fatboy", "Fatboy", "Países Bajos"),
  brand("brink-campman", "Brink & Campman", "Países Bajos"),
  brand("prostoria", "Prostoria", "Croacia"),
  brand("zeitraum", "Zeitraum", "Alemania"),
  brand("wendelbo", "Wendelbo", "Dinamarca"),
  brand("inter-cuisine", "Inter Cuisine", "Alemania"),
];
