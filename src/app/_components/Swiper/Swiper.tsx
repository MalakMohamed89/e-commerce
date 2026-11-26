"use client";

import { Children, type ReactNode } from "react";
import {
  Swiper as SwiperCore,
  SwiperSlide,
  type SwiperProps as SwiperCoreProps,
} from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { SwiperModule } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperInstance } from "swiper";

type SwiperOptions = Omit<
  SwiperCoreProps,
  "children" | "className" | "modules" | "navigation" | "pagination"
>;

type Props = {
  children: ReactNode;
  className?: string;
  navigation?: SwiperCoreProps["navigation"];
  pagination?: SwiperCoreProps["pagination"];
  modules?: SwiperModule[];
  options?: SwiperOptions;
    onSwiper?: (swiper: SwiperInstance) => void;
};

/** Generic Swiper wrapper. Configure Swiper behavior through `options` and
 * presentation through `className` so callers can reuse it for any content. */
export default function Swiper({
  children,
  className = "",
  navigation = true,
  pagination = true,
  modules = [],
  options = {},
    onSwiper,
}: Props) {
  return (
    <SwiperCore
      {...options}
        onSwiper={onSwiper}
        
      modules={[Navigation, Pagination, ...modules]}
      navigation={navigation}
      pagination={pagination}
      className={`custom-swiper ${className}`.trim()}
    >
      {Children.toArray(children).map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </SwiperCore>
  );
}
