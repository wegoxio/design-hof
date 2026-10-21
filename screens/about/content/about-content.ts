import type { AboutContent } from "../types/about";

export const aboutContent: AboutContent = {
  hero: { eyebrow: "Sobre nosotros", title: "Sobre DESIGN HOF", imageUrl: "/about/hero/about-hero-01.png" },
  introduction: {
    lead: "Somos DESIGN HOF, una tienda de diseño que ofrece una propuesta integral de mobiliario, cocinas, baños, clósets y revestimientos de estilo contemporáneo, atemporal y sofisticado.",
    paragraphs: [
      "Nuestra propuesta se caracteriza por el uso de líneas puras, propias del norte de Europa, para crear espacios que trasciendan y brinden un verdadero placer.",
      "Nuestros clientes son la fuerza de inspiración para personalizar propuestas creativas y auténticas, con espacios sofisticados caracterizados por el buen gusto y la estética funcional.",
      "Somos DESIGN HOF, un equipo de amplia trayectoria que ofrece soluciones integrales y personalizables de diseño. Brindamos acompañamiento a nuestros clientes para desarrollar soluciones de interiorismo particulares, residenciales y comerciales.",
      "Nos enorgullece representar un portafolio de reconocidas marcas del norte de Europa, cuidadosamente seleccionadas para garantizar la calidad artesanal de cada detalle.",
    ],
    brochureHref: "/brochure-design-hof.pdf",
  },
  founders: {
    imageUrl: "/about/founders/about-founders-01.png",
    people: [{ name: "Klaus Koller", role: "Director" }, { name: "Karin Koller", role: "Codirectora" }],
    stats: [{ value: "25", label: "Años de trayectoria" }, { value: "20+", label: "Años en diseño" }],
    paragraphs: [
      "Design HOF está dirigida por Klaus Koller y su hermana Karin Koller, ambos amantes del diseño y apasionados por la belleza y los estándares de alta calidad.",
      "Tras 20 años de experiencia en el mundo del diseño de interiores y la decoración, y bajo la curaduría de los hermanos Koller, se ha desarrollado Design HOF: una selección exclusiva de mobiliario, accesorios e iluminación de marcas alemanas y europeas, ganadoras de prestigiosos premios de diseño internacional.",
    ],
  },
  interviews: [
    { index: "03", title: "Conoce a Klaus Koller, director de Design HOF", eyebrow: "¿Cómo comenzó Design HOF?", paragraphs: ["«Nacimos de la necesidad de ofrecer alternativas diferentes para quienes buscan decorar con la sofisticación del diseño puro, simple y atemporal, tan característico del norte de Europa».", "En Design HOF te asesoramos y acompañamos para crear espacios que trascienden.", "«Todo está muy bien estudiado: los materiales, las texturas. Hay muchísimas opciones para quienes quieren espacios personalizados con diseño puro»."], videoLabel: "Conoce a Klaus Koller — Director de Design HOF", videoPosition: "left" },
    { index: "04", title: "Para ti, ¿qué es la sofisticación?", eyebrow: "", paragraphs: ["«Una pieza sofisticada no tiene que ser costosa ni recargada. La sofisticación hay que sentirla», así lo dice Klaus Koller, director de @design_hof, en este ciclo de entrevistas con @marioaranaga.", "¿Y qué se siente en un ambiente Design HOF?", "«En Design HOF vives y sientes el diseño puro». Así de simple (y sofisticado).", "«Nuestro arte consiste en saber seleccionar las últimas tendencias sin sacrificar la calidad artesanal ni el nivel de confección. Aquí te ayudamos a crear espacios modernos y, a la vez, acogedores, en los que definitivamente te sientes bien».", "¡Vive con autenticidad! Aprecia lo innovador y adapta piezas que sobresalgan, pero sin perder tu esencia ni aquello que realmente te distingue. En nuestro caso, las líneas puras de diseño crean ambientes atemporales: ambientes creados para trascender."], videoLabel: "La sofisticación según Klaus Koller", videoPosition: "right" },
    { index: "", title: "", eyebrow: "", paragraphs: [], videoLabel: "25 años de trayectoria — Klaus Koller", videoPosition: "full" },
  ],
  legacy: { index: "05", title: "Klaus Koller inició su trayectoria hace 25 años con el diseño y la fabricación de cocinas", paragraphs: ["De origen alemán y con una gran pasión por las líneas simples y funcionales, Klaus Koller inició su trayectoria hace 25 años con el diseño y la fabricación de cocinas de alta gama.", "«Hemos acumulado mucha experiencia, una gran cantidad de clientes y buenos amigos en este negocio. Los espacios han cambiado y ahora la gente quiere que la cocina sea parte del escenario».", "Para ello se necesita un equipo comprometido y con experiencia, capaz de innovar con las tendencias más recientes, mantener la pureza del diseño y la calidad artesanal, y cuidar cada detalle."] },
};
