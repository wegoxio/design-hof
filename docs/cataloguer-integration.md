# Integración de DesignHof con Cataloguer

## Estado

El escaparate ya no consume WooCommerce. Las secciones de productos y
categorías de inicio, mobiliario, mobiliario H1 y detalle de producto leen la
API pública de Cataloguer desde el servidor de Next.js. El resto del sitio
continúa definido en DesignHof.

## Frontera de responsabilidad

Cataloguer controla exclusivamente:

- productos, familias y variantes;
- disponibilidad e inventario publicado;
- imágenes y galerías de productos;
- categorías, agrupaciones de navegación e imágenes de categorías.

DesignHof controla en su propio código:

- hero, footer, menús editoriales y contenido de las páginas;
- proyectos, marcas, servicios, nosotros y formularios;
- SEO y metadatos;
- estructura, estilos y comportamiento visual.

Cataloguer no es el CMS ni el website builder de DesignHof. No deben crearse
endpoints de contenido, marcas, formularios, SEO o bloques editoriales para
esta integración.

## Configuración

```env
CATALOGUER_API_URL=http://localhost:3001/api/v1
CATALOGUER_API_KEY=ck_...
```

La clave debe pertenecer a la sucursal `DesignHof Online` y tener únicamente la
capacidad `CATALOGUE_READ`. Es una variable de servidor: nunca debe llamarse
`NEXT_PUBLIC_CATALOGUER_API_KEY` ni enviarse al navegador.

En producción, `CATALOGUER_API_URL` debe apuntar al dominio HTTPS del backend.

## Datos consumidos

- `/public/products`: portada, catálogo general y catálogo H1.
- `/public/categories` y `/public/groups`: navegación, filtros e imágenes de
  categorías.
- `/public/products/:slug`: ficha comercial, galería, campos públicos,
  variantes y relacionados.

Cataloguer entrega una familia como un producto padre con sus productos hijos
en `children`. DesignHof representa esos hijos como variaciones seleccionables;
precio, disponibilidad e imagen proceden del hijo.

## Caché

Las lecturas usan la caché de Next.js durante cinco minutos y la etiqueta
`cataloguer`.

Los catálogos generales no descargan el inventario completo. Cada URL solicita
16 tarjetas y conserva en la propia URL los parámetros `categoria`, `filtro`,
`orden` y `pagina`. Cataloguer ejecuta esos filtros y la paginación en la base
de datos. Los únicos filtros comerciales mostrados son hechos verificables:
disponibilidad y precio especial.

## Imágenes

Next Image admite el bucket público actual:

- `cataloguer-products-bucket.s3.eu-north-1.amazonaws.com`
- `cataloguer-products-bucket.s3.amazonaws.com`

No se usa una URL de WordPress como fallback. Cuando un producto o categoría
no tiene imagen se muestra el placeholder local del sitio.

## Criterios del catálogo

- Marca, medidas, colores y demás características solo aparecen si sus campos
  están configurados como públicos para la sucursal en Cataloguer.
- `Special Price` se deriva de `salePrice`.
- `Stock` se deriva de `availableQuantity`, no del inventario bruto.
- H1 se identifica por su jerarquía de categorías importada (`h1`/`ch1`).
- Los slugs de Cataloguer identifican las rutas de detalle; cualquier decisión
  SEO o de URL canónica corresponde al código de DesignHof.

## Invalidación inmediata y tolerancia a fallos

El TTL de cinco minutos permanece como respaldo, pero las mutaciones
comerciales exitosas en Cataloguer llaman a
`POST /api/cataloguer/revalidate`. La llamada lleva timestamp y firma HMAC
SHA-256; DesignHof rechaza firmas incorrectas o con más de cinco minutos.

```env
# Cataloguer: una entrada por escaparate, cada una con secreto independiente
CATALOGUE_REVALIDATION_TARGETS=[{"name":"designhof","url":"https://designhof.example/api/cataloguer/revalidate","secret":"un-secreto-aleatorio-de-32-caracteres-o-mas"}]

# DesignHof: exactamente el mismo secreto
CATALOGUER_REVALIDATION_SECRET=un-secreto-aleatorio-de-32-caracteres-o-mas
```

Si el webhook falla, la edición no se revierte y el TTL sigue funcionando. Si
la API completa no está disponible, DesignHof conserva las páginas editoriales
y muestra un aviso controlado en las zonas comerciales.

Cada ficha envía también el canal. Un slug publicado para la sucursal pero
oculto del canal solicitado responde 404 y no puede abrirse mediante URL
directa. Los enlaces H1 conservan el contexto con `?catalogo=h1`.
