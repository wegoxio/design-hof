import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "../../types/category";

type CategoryCardProps = {
  category: ProductCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link className="group block min-w-0 shrink-0 basis-[calc((100%-75px)/6)] text-[#151515] no-underline max-[1199px]:basis-[calc((100%-45px)/4)] max-[767px]:basis-[min(72vw,270px)]" href={category.href}>
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 767px) 72vw, (max-width: 1199px) 25vw, 230px"
          unoptimized
        />
      </div>
      <h3 className="mt-[18px] text-[14px] leading-[1.4] font-medium tracking-[1.8px] uppercase transition-colors duration-300 group-hover:text-[#777772] max-[767px]:mt-4 max-[767px]:text-[12px] max-[767px]:tracking-[1.5px]">
        {category.name}
      </h3>
    </Link>
  );
}
