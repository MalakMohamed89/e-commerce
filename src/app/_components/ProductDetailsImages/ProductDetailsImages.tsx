"use client";
import { useRef, useState } from 'react';
import Swiper from '../Swiper/Swiper'
import { ProductType } from '@/Types/ProductsType/Products.type';
import type { Swiper as SwiperInstance } from "swiper";
import Image from "next/image";

export default function ProductDetailsImages({productData}:{productData:ProductType}) {
const [imageCover,setImageCover]=useState(productData.imageCover)


  const swiperRef = useRef<SwiperInstance | null>(null);

  function handleImageClick(img: string, index: number) {
    setImageCover(img);
    swiperRef.current?.slideTo(index, 600);
  }

  return (
<div className="w-full min-w-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
  <div className="aspect-344/469 w-full overflow-hidden bg-[#F3F3F5]">
    <img
      src={imageCover}
      alt={productData.title}
      className="size-full object-cover"
    />
  </div>

  <Swiper
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    className="mt-1.5"
    navigation={false}
    pagination={false}
        options={{
          slidesPerView: 3.5,
          spaceBetween: 8,
          speed: 600,
          watchOverflow: true,
        }}
  >
    {productData.images.map((img, index) => (
      <button
        key={index}
        type="button"
      onClick={() => handleImageClick(img, index)}
        aria-label={`Product image ${index + 1}`}
              className={`aspect-3/4 w-full cursor-pointer overflow-hidden border-2 bg-[#F3F3F5] ${
              imageCover === img
                ? "border-gray-600"
                : "border-transparent"
            }`}
      >
  <Image
  height={300}
  width={300}
  src={img}
  alt="ProductImg"
  className="size-full object-cover"
/>
      </button>
    ))}
  </Swiper>
</div>

  )
}
