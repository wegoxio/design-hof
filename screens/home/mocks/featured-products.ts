import type { FeaturedProduct } from "../types/featured-product";

export const featuredProducts: FeaturedProduct[] = [
  { id: "rhomb", brand: "KFF", name: "Rhomb", description: "Diseñada con precisión y funcionalidad", imageUrl: "/featured-products/featured-01.webp", href: "/mobiliario?producto=rhomb", badge: "German Design Award 2017" },
  { id: "polygon", brand: "KFF", name: "Polygon", description: "Icono de diseño.", imageUrl: "/featured-products/featured-02.webp", href: "/mobiliario?producto=polygon" },
  { id: "up-lift", brand: "Leolux", name: "Up-Lift", description: "Innovación en sofá cama.", imageUrl: "/featured-products/featured-03.webp", href: "/mobiliario?producto=up-lift" },
  { id: "out", brand: "Objekte unserer Tage", name: "OUT", description: "Diseño made in Berlin.", imageUrl: "/featured-products/featured-04.png", href: "/mobiliario?producto=out" },
];
