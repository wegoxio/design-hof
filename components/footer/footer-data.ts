export type FooterLink = {
  label: string;
  href: string;
};

export const furnitureLinks: FooterLink[] = [
  { label: "Colección", href: "/mobiliario" },
  { label: "Mobiliario H1", href: "/mobiliario-h1" },
  { label: "Stock disponible", href: "/mobiliario?disponibilidad=stock" },
  { label: "New In", href: "/mobiliario?coleccion=new-in" },
  { label: "Special Prices", href: "/mobiliario?coleccion=special-prices" },
  { label: "Iluminación", href: "/mobiliario?categoria=iluminacion" },
];

export const companyLinks: FooterLink[] = [
  { label: "Diseño de Espacios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Sobre Nosotros", href: "/nosotros" },
  { label: "Nuestras Marcas", href: "/mobiliario" },
  { label: "Contacto", href: "/contacto" },
];

export const legalLinks: FooterLink[] = [
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Cookies", href: "/cookies" },
];
