import Image from "next/image";
import Link from "next/link";
import type { FeaturedProduct } from "../../types/featured-product";

export function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <Link className="group block min-w-0 shrink-0 basis-[calc((100%-36px)/4)] text-black no-underline max-[900px]:basis-[calc((100%-12px)/2)] max-[560px]:basis-[82vw]" href={product.href}>
      <div className="relative aspect-[0.76] overflow-hidden bg-[#ececea]">
        <Image className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055] group-focus-visible:scale-[1.055]" src={product.imageUrl} alt={product.name} fill sizes="(max-width: 560px) 82vw, (max-width: 900px) 50vw, 25vw" />
        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-visible:opacity-100 max-[700px]:opacity-100" aria-hidden="true" />
        <div className="absolute right-5 bottom-5 left-5 z-10 translate-y-5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-[700px]:translate-y-0 max-[700px]:opacity-100">
          <p className="line-clamp-5 text-[clamp(12px,1vw,15px)] leading-[1.48] font-normal text-white">{product.hoverDescription}</p>
          <span className="mt-4 inline-flex items-center gap-3 text-[9px] font-medium tracking-[1.3px] text-white/72 uppercase transition-colors duration-500 group-hover:text-white">
            Ver producto <span className="transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true">→</span>
          </span>
        </div>
        {product.badge && <span className="absolute top-3 left-3 z-10 bg-[#111] px-2.5 py-1.5 text-[7px] font-medium tracking-[0.7px] text-white uppercase">{product.badge}</span>}
      </div>
      {product.brand && <p className="mt-4 text-[9px] font-medium tracking-[3px] text-black/42 uppercase">{product.brand}</p>}
      <h3 className={`${product.brand ? "mt-1" : "mt-4"} text-[14px] leading-tight font-bold`}>{product.name}</h3>
      {product.description && <p className="mt-1 text-[11px] leading-[1.45] font-normal text-black/42">{product.description}</p>}
    </Link>
  );
}
