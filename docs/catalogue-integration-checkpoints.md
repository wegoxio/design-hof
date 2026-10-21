# Checkpoints de Cataloguer y DesignHof

## Frontend público

- [ ] `/` conserva hero, textos, proyectos, popup y footer definidos en DesignHof.
- [ ] Las categorías y productos destacados de `/` proceden de Cataloguer.
- [ ] `/mobiliario` muestra 16 productos como máximo por página.
- [ ] `/mobiliario-h1` solo muestra productos del canal H1.
- [ ] Cambiar categoría actualiza `categoria` en la URL y reinicia la página.
- [ ] `Stock disponible` actualiza `filtro=stock` y el total mostrado.
- [ ] `Special Prices` actualiza `filtro=special` y solo devuelve productos o
      familias con una oferta pública.
- [ ] Ordenar por precio actualiza `orden` y mantiene categoría/filtro.
- [ ] Anterior/siguiente actualiza `pagina` y conserva los demás filtros.
- [ ] Una página manipulada o excesiva no produce error y termina mostrando la
      última página válida.
- [ ] Una ficha standalone muestra nombre, precio, galería y campos públicos.
- [ ] Una ficha de familia muestra hijos como variantes seleccionables.
- [ ] Cambiar variante actualiza precio, precio anterior e imagen cuando el
      hijo posee imagen propia.
- [ ] Una variante sin imagen propia conserva la galería efectiva del padre.
- [ ] Ninguna imagen servida depende de WordPress o WooCommerce.
- [ ] Hero, footer, marcas, proyectos, contenido, SEO y metadatos no se leen de
      Cataloguer.

## Panel de Cataloguer

- [ ] Productos permite crear/editar productos y gestionar sus imágenes S3.
- [ ] Un producto puede tener varias imágenes, una principal y un orden.
- [ ] Las familias permiten relacionar hijos y definir `optionLabel`.
- [ ] La publicación por sucursal determina qué productos llegan a la API.
- [ ] Inventario publicado utiliza disponibilidad vendible, no solo cantidad
      bruta.
- [ ] Categorías permite activar publicaciones por canal.
- [ ] Cada categoría publicada permite elegir portada, nombre público y orden.
- [ ] La portada reutiliza la imagen principal de un producto de esa categoría.
- [ ] Los grupos permiten seleccionar categorías y una portada propia.
- [ ] Los canales `mobiliario` y `mobiliario-h1` se pueden administrar sin
      reglas específicas de DesignHof en el código.

## API y seguridad

- [ ] La API key de DesignHof solo tiene `CATALOGUE_READ`.
- [ ] `/public/products` pagina, filtra por canal/grupo y limita a 100 elementos.
- [ ] `/public/categories` y `/public/groups` respetan tienda, canal y visibilidad.
- [ ] `/public/products/:slug` no expone productos archivados o no publicados.
- [ ] Las imágenes públicas pertenecen al bucket S3 configurado.
- [ ] `/public/content`, `/public/collections`, `/public/brands` y
      `/public/forms` responden 404.
- [ ] La key nunca aparece en variables `NEXT_PUBLIC_*` ni en el navegador.

## Rendimiento y regresión

- [ ] La respuesta HTML inicial de `/mobiliario` permanece por debajo de 250 KB.
- [ ] Una lectura paginada devuelve 16 tarjetas o menos.
- [ ] Los filtros combinados responden 200 y conservan una URL reproducible.
- [ ] `next build`, TypeScript y ESLint pasan en DesignHof.
- [ ] TypeScript y las pruebas de rutas/consultas públicas pasan en Cataloguer.
