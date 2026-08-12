import Image from "next/image";
import Link from "next/link";
import type { FeaturedProduct } from "../../types/featured-product";

export function FeaturedProductCard({ product }: { product: FeaturedProduct }) {
  return (
    <Link className="group block min-w-0 shrink-0 basis-[calc((100%-36px)/4)] text-black no-underline max-[900px]:basis-[calc((100%-12px)/2)] max-[560px]:basis-[82vw]" href={product.href}>
      <div className="relative aspect-[0.76] overflow-hidden bg-[#ececea]">
        <Image className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]" src={product.imageUrl} alt={product.name} fill sizes="(max-width: 560px) 82vw, (max-width: 900px) 50vw, 25vw" />
        {product.badge && <span className="absolute top-3 left-3 bg-[#111] px-2.5 py-1.5 text-[7px] font-medium tracking-[0.7px] text-white uppercase">{product.badge}</span>}
      </div>
      <p className="mt-4 text-[9px] font-medium tracking-[3px] text-black/42 uppercase">{product.brand}</p>
      <h3 className="mt-1 text-[14px] leading-tight font-bold">{product.name}</h3>
      <p className="mt-1 text-[11px] leading-[1.45] font-normal text-black/42">{product.description}</p>
    </Link>
  );
}
