import type { CatalogCopy, CatalogVariant } from '../types/catalog';

export const catalogCopy: Record<Exclude<CatalogVariant, 'merchandising' | 'collection'>, CatalogCopy> = {
  general: { eyebrow: 'Design HOF', title: 'Mobiliario', description: 'Sofás, sillas, mesas, estanterías y más — diseño europeo para cada espacio.', heroImage: '/catalog/hero/catalog-hero-01.png' },
  h1: { eyebrow: 'Design HOF · H1', title: 'Mobiliario H1', description: 'Diseño nórdico, atemporal y cercano para proyectos residenciales y corporativos.', heroImage: '/catalog/hero/catalog-hero-01.png' },
};

const collectionCopy: Record<string, CatalogCopy> = {
  'new-in': {
    eyebrow: 'Design HOF · Novedades',
    title: 'New In',
    description: 'Descubre las piezas que acaban de incorporarse a nuestra selección.',
    heroImage: '/catalog/hero/catalog-hero-01.png',
  },
  'coming-soon': {
    eyebrow: 'Design HOF · Próximamente',
    title: 'Coming Soon',
    description: 'Una mirada anticipada a las piezas que llegarán muy pronto.',
    heroImage: '/catalog/hero/catalog-hero-01.png',
  },
  'special-prices': {
    eyebrow: 'Design HOF · Selección especial',
    title: 'Special Prices',
    description: 'Piezas seleccionadas disponibles con condiciones especiales.',
    heroImage: '/catalog/hero/catalog-hero-01.png',
  },
  collection: {
    eyebrow: 'Design HOF · Curaduría',
    title: 'Colección',
    description: 'Una selección curada de piezas que comparten diseño, carácter y materialidad.',
    heroImage: '/catalog/hero/catalog-hero-01.png',
  },
};

export function catalogCopyForCollection(categorySlug?: string): CatalogCopy {
  return (categorySlug && collectionCopy[categorySlug]) || catalogCopy.general;
}
