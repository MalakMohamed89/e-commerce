import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandType } from "@/Types/BrandsType/Brands.type";
import Link from "next/link";

export default function BrandCard({brand}: {brand: BrandType}) {
  return (
<Link href={`/brands/${brand._id}`}>
    <article className="group relative cursor-pointer h-56.25 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] md:h-[202.67px] xl:h-72">
      <div className="absolute inset-x-4 top-4 aspect-square overflow-hidden rounded-xl bg-gray-50 p-4 md:inset-x-5 md:top-5">
        <div className="relative h-full w-full">
          <Image
            src={brand.image}
            alt={`${brand.name} logo`}
            width={160}
            height={113}
            sizes="(max-width: 767px) 105px, (max-width: 1279px) 75px, 160px"
            className="absolute left-0 top-[14.64%] h-[70.71%] w-full object-fill"
          />
        </div>
      </div>

      <h2 className="absolute inset-x-4 bottom-10 overflow-hidden text-center text-sm font-semibold leading-5 text-[#101828] md:bottom-10.75 xl:inset-x-5 xl:bottom-11">
        {brand.name}
      </h2>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-1 text-xs font-medium leading-4 text-[#7f22fe] opacity-0 transition-opacity group-hover:opacity-100 md:inset-x-5">
        <span>View Products</span>
        <ArrowRight aria-hidden="true" className="size-3" />
      </div>
    </article>
</Link>
  );
}
