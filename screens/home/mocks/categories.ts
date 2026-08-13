import type { ProductCategory, RoomCategory } from "../types/category";

export const roomCategories: RoomCategory[] = [
  { id: "todas", label: "Todas" },
  { id: "sala", label: "Sala" },
  { id: "comedor", label: "Comedor" },
  { id: "dormitorio", label: "Dormitorio" },
  { id: "oficina", label: "Oficina" },
  { id: "cocina", label: "Cocina" },
  { id: "bano", label: "BaÃ±o" },
  { id: "iluminacion", label: "IluminaciÃ³n" },
  { id: "accesorios", label: "Accesorios" },
];

export const productCategories: ProductCategory[] = [
  { id: "sofas", name: "SofÃ¡s", imageUrl: "/home/categories/sofas.png", href: "/mobiliario?categoria=sofas", roomIds: ["sala"] },
  { id: "butacas", name: "Butacas", imageUrl: "/home/categories/butacas.png", href: "/mobiliario?categoria=butacas", roomIds: ["sala", "dormitorio", "oficina"] },
  { id: "mesas", name: "Mesas", imageUrl: "/home/categories/mesas.png", href: "/mobiliario?categoria=mesas", roomIds: ["sala", "comedor", "oficina"] },
  { id: "sillas", name: "Sillas / Stools", imageUrl: "/home/categories/sillas.png", href: "/mobiliario?categoria=sillas", roomIds: ["sala", "comedor", "cocina"] },
  { id: "aparadores", name: "Aparadores / Bar", imageUrl: "/home/categories/aparadores.png", href: "/mobiliario?categoria=aparadores", roomIds: ["sala", "comedor"] },
  { id: "estanterias", name: "EstanterÃ­as", imageUrl: "/home/categories/estanterias.png", href: "/mobiliario?categoria=estanterias", roomIds: ["sala", "dormitorio", "oficina"] },
  { id: "camas", name: "Camas", imageUrl: "/home/categories/camas.png", href: "/mobiliario?categoria=camas", roomIds: ["dormitorio"] },
  { id: "sofa-cama", name: "SofÃ¡s cama", imageUrl: "/home/categories/sofa-cama.png", href: "/mobiliario?categoria=sofa-cama", roomIds: ["sala", "dormitorio"] },
  { id: "gaveteros", name: "Gaveteros / Mesa de noche", imageUrl: "/home/categories/gaveteros.png", href: "/mobiliario?categoria=gaveteros", roomIds: ["dormitorio"] },
  { id: "bancos", name: "Bancos / Pouffs", imageUrl: "/home/categories/bancos-v2.png", href: "/mobiliario?categoria=bancos", roomIds: ["sala", "comedor", "dormitorio"] },
  { id: "mesas-centro", name: "Mesas de centro / Auxiliares", imageUrl: "/home/categories/mesas-centro.png", href: "/mobiliario?categoria=mesas-centro", roomIds: ["sala"] },
  { id: "bar", name: "Bar", imageUrl: "/home/categories/bar.png", href: "/mobiliario?categoria=bar", roomIds: ["sala", "comedor", "cocina"] },
  { id: "exteriores", name: "Exteriores", imageUrl: "/home/categories/exteriores.png", href: "/mobiliario?categoria=exteriores", roomIds: ["accesorios"] },
  { id: "iluminacion", name: "IluminaciÃ³n", imageUrl: "/home/categories/ilumainacion.png", href: "/mobiliario?categoria=iluminacion", roomIds: ["sala", "comedor", "dormitorio", "oficina", "iluminacion"] },
  { id: "alfombras", name: "Alfombras", imageUrl: "/home/categories/alfombras.png", href: "/mobiliario?categoria=alfombras", roomIds: ["sala", "comedor", "dormitorio", "oficina", "accesorios"] },
  { id: "accesorios", name: "Accesorios", imageUrl: "/home/categories/accesorios.png", href: "/mobiliario?categoria=accesorios", roomIds: ["sala", "comedor", "dormitorio", "oficina", "cocina", "bano", "accesorios"] },
];

