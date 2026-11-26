"use client";

import { useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ProductType } from "@/Types/ProductsType/Products.type";
import Swiper from "../Swiper/Swiper";
import ProductCard from "../ProductCard/ProductCard";
import ShowByLabel from "../ShowByLabel/ShowByLabel";

type Props = {
  currentProductId: string;
  products: ProductType[];
};

export default function RecommendedProducts({
  currentProductId,
  products,
}: Props) {
  const swiperId = useId().replace(/:/g, "");

  const recommendedProducts = products.filter(
    (product) => product._id !== currentProductId
  );

  if (!recommendedProducts.length) return null;

  return (
    <section className="mx-auto my-12 w-full max-w-376 px-4 sm:px-6 2xl:px-0">
      <div className="flex items-center justify-between gap-3 mb-6">
        <ShowByLabel paragraph="You May Also" shopByLabel="Like" />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className={`recommended-prev-${swiperId} cursor-pointer size-9 sm:size-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] hover:bg-[#E5E7EB] transition-colors`}
            aria-label="Previous products"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className={`recommended-next-${swiperId} cursor-pointer size-9 sm:size-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] hover:bg-[#E5E7EB] transition-colors`}
            aria-label="Next products"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <Swiper
        className="recommended-products-swiper"
        navigation={{
          prevEl: `.recommended-prev-${swiperId}`,
          nextEl: `.recommended-next-${swiperId}`,
        }}
        pagination={false}
        options={{
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 12,
          speed: 500,
          loop: false,
          watchOverflow: true,

          breakpoints: {
            480: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          },
        }}
      >
        {recommendedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Swiper>
    </section>
  );
}
