import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct, CatalogVariant } from "../types/catalog";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ProductCard({ product, variant = "general" }: { product: CatalogProduct; variant?: CatalogVariant }) {
  const status = product.tags.includes("special")
    ? { label: "Special Price", className: "bg-h1 text-black" }
    : product.tags.includes("stock")
      ? { label: "Stock", className: "bg-white text-black" }
      : product.tags.includes("new")
        ? { label: "New", className: "bg-[#111] text-white" }
        : null;

  return (
    <article className="group min-w-0 opacity-100 transition-[opacity,transform] duration-700 starting:translate-y-6 starting:opacity-0">
      <Link href={`/mobiliario/${product.slug}${variant === "h1" ? "?catalogo=h1" : ""}`} className="block text-inherit no-underline">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f2] shadow-[0_0_0_rgba(0,0,0,0)] transition-[background-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#efefeb] group-hover:shadow-[0_20px_55px_rgba(0,0,0,0.06)]">
        <Image unoptimized className={`${product.imageDisplayMode === "cover" ? "object-cover" : "object-contain p-[5%]"} transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]`} src={product.imageUrl} alt={product.name} fill sizes="(max-width: 450px) 92vw, (max-width: 650px) 46vw, (max-width: 1000px) 31vw, 330px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
        <span className="absolute right-4 bottom-4 translate-y-2 text-[8px] font-medium tracking-[2px] text-white uppercase opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">Ver detalle →</span>
        {status && <span className={`absolute top-3 left-3 px-2.5 py-1.5 text-[7px] font-bold tracking-[.8px] uppercase shadow-[0_4px_14px_rgba(0,0,0,.08)] transition-transform duration-500 group-hover:-translate-y-px ${status.className}`}>{status.label}</span>}
      </div>
      <div className="translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px]">
        {product.brand && <p className="mt-4 text-[8px] font-medium tracking-[2.4px] text-black/42 uppercase transition-colors duration-500 group-hover:text-black/58">{product.brand}</p>}
        <h3 className={`${product.brand ? "mt-1.5" : "mt-5"} text-[15px] leading-[1.3] font-semibold tracking-[-.15px] transition-colors duration-500 group-hover:text-black/72`}>{product.name}</h3>
        <div className="mt-1.5 flex gap-2 text-[12px] font-normal text-black/65"><span>{product.price === null ? "Consultar precio" : money.format(product.price)}</span>{product.previousPrice && <span className="text-black/35 line-through">{money.format(product.previousPrice)}</span>}</div>
      </div>
      </Link>
    </article>
  );
}
