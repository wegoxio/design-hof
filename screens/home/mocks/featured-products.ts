import type { FeaturedProduct } from "../types/featured-product";

export const featuredProducts: FeaturedProduct[] = [
  { id: "rhomb", brand: "KFF", name: "Rhomb", description: "Diseñada con precisión y funcionalidad.", imageUrl: "/home/featured-products/featured-01.png", href: "/mobiliario?producto=rhomb", badge: "German Design Award 2017" },
  { id: "polygon", brand: "KFF", name: "Polygon", description: "Ícono de diseño.", imageUrl: "/home/featured-products/featured-02.png", href: "/mobiliario?producto=polygon" },
  { id: "up-lift", brand: "Leolux", name: "Up-Lift", description: "Innovación en sofá cama.", imageUrl: "/home/featured-products/featured-03.png", href: "/mobiliario?producto=up-lift" },
  { id: "out", brand: "Objekte unserer Tage", name: "OUT", description: "Diseño hecho en Berlín.", imageUrl: "/home/featured-products/featured-04.png", href: "/mobiliario?producto=out" },
];
