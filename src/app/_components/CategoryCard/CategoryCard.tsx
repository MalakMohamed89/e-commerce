import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
type CategoryCardProps = {
  img: string;
  label: string;
  id:string;
};

export default function CategoryCard({ img, label,id }: CategoryCardProps) {
  return (
<Link href={`/categories/${id}`}>
    <article className="group cursor-pointer relative flex h-full w-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-lg md:p-6">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={img}
          alt={`${label} category`}
          width={232}
          height={316}
       
             className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h2 className="mt-4 w-full text-center text-base font-bold leading-6 text-[#101828]">
        {label}
      </h2>

      <div className="mt-2 flex items-center justify-center gap-1 text-xs font-medium leading-4 text-[#16a34a] opacity-0 transition-opacity group-hover:opacity-100">
        <span>View Subcategories</span>
        <ArrowRight aria-hidden="true" className="size-3" />
      </div>
    </article>
</Link>
  );
}
