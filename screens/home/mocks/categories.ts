import type { ProductCategory, RoomCategory } from "../types/category";

export const roomCategories: RoomCategory[] = [
  { id: "todas", label: "Todas" },
  { id: "sala", label: "Sala" },
  { id: "comedor", label: "Comedor" },
  { id: "dormitorio", label: "Dormitorio" },
  { id: "oficina", label: "Oficina" },
  { id: "cocina", label: "Cocina" },
  { id: "bano", label: "Baño" },
  { id: "iluminacion", label: "Iluminación" },
  { id: "accesorios", label: "Accesorios" },
];

export const productCategories: ProductCategory[] = [
  { id: "sofas", name: "Sofás", imageUrl: "/mocks/categories/sofas.png", href: "/mobiliario?categoria=sofas", roomIds: ["sala"] },
  { id: "butacas", name: "Butacas", imageUrl: "/mocks/categories/butacas.png", href: "/mobiliario?categoria=butacas", roomIds: ["sala", "dormitorio", "oficina"] },
  { id: "mesas", name: "Mesas", imageUrl: "/mocks/categories/mesas.png", href: "/mobiliario?categoria=mesas", roomIds: ["sala", "comedor", "oficina"] },
  { id: "sillas", name: "Sillas / Stools", imageUrl: "/mocks/categories/sillas.png", href: "/mobiliario?categoria=sillas", roomIds: ["sala", "comedor", "cocina"] },
  { id: "aparadores", name: "Aparadores / Bar", imageUrl: "/mocks/categories/aparadores.png", href: "/mobiliario?categoria=aparadores", roomIds: ["sala", "comedor"] },
  { id: "estanterias", name: "Estanterías", imageUrl: "/mocks/categories/estanterias.png", href: "/mobiliario?categoria=estanterias", roomIds: ["sala", "dormitorio", "oficina"] },
  { id: "camas", name: "Camas", imageUrl: "/mocks/categories/camas.png", href: "/mobiliario?categoria=camas", roomIds: ["dormitorio"] },
  { id: "sofa-cama", name: "Sofás cama", imageUrl: "/mocks/categories/sofa-cama.png", href: "/mobiliario?categoria=sofa-cama", roomIds: ["sala", "dormitorio"] },
  { id: "gaveteros", name: "Gaveteros / Mesa de noche", imageUrl: "/mocks/categories/gaveteros.png", href: "/mobiliario?categoria=gaveteros", roomIds: ["dormitorio"] },
  { id: "bancos", name: "Bancos / Pouffs", imageUrl: "/mocks/categories/bancos.png", href: "/mobiliario?categoria=bancos", roomIds: ["sala", "comedor", "dormitorio"] },
  { id: "mesas-centro", name: "Mesas de centro / Auxiliares", imageUrl: "/mocks/categories/mesas-centro.png", href: "/mobiliario?categoria=mesas-centro", roomIds: ["sala"] },
  { id: "bar", name: "Bar", imageUrl: "/mocks/categories/bar.png", href: "/mobiliario?categoria=bar", roomIds: ["sala", "comedor", "cocina"] },
  { id: "exteriores", name: "Exteriores", imageUrl: "/mocks/categories/exteriores.png", href: "/mobiliario?categoria=exteriores", roomIds: ["accesorios"] },
  { id: "iluminacion", name: "Iluminación", imageUrl: "/mocks/categories/ilumainacion.png", href: "/mobiliario?categoria=iluminacion", roomIds: ["sala", "comedor", "dormitorio", "oficina", "iluminacion"] },
  { id: "alfombras", name: "Alfombras", imageUrl: "/mocks/categories/alfombras.png", href: "/mobiliario?categoria=alfombras", roomIds: ["sala", "comedor", "dormitorio", "oficina", "accesorios"] },
  { id: "accesorios", name: "Accesorios", imageUrl: "/mocks/categories/accesorios.png", href: "/mobiliario?categoria=accesorios", roomIds: ["sala", "comedor", "dormitorio", "oficina", "cocina", "bano", "accesorios"] },
];
