import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function PromoBanners() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-376 px-4">
        {/* phone: stacked | tablet: 2 columns (smaller) | desktop: 2 columns (full size) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {/* ===== Card 1: green ===== */}
          <div className="relative flex min-h-60 flex-col items-start justify-center gap-2.5 overflow-hidden rounded-2xl bg-linear-to-br from-[#00BC7D] to-[#007A55] p-6 text-white sm:min-h-55 sm:gap-2 sm:rounded-xl sm:p-5 lg:min-h-75 lg:gap-3 lg:rounded-2xl lg:p-8">
            {/* decorative circles */}
            <span className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-white/10 sm:-right-6 sm:-top-6 sm:size-20 lg:-right-10 lg:-top-10 lg:size-40" />
            <span className="pointer-events-none absolute -bottom-10 -left-8 size-24 rounded-full bg-white/10 sm:-bottom-8 sm:-left-6 sm:size-16 lg:-bottom-12 lg:-left-10 lg:size-32" />

            <span className="relative z-10 rounded-full bg-white/20 px-3 py-1 text-xs sm:px-2 sm:py-0.5 sm:text-[10px] lg:px-3 lg:py-1 lg:text-xs">
              🔥 Deal of the Day
            </span>
            <h2 className="relative z-10 text-2xl font-bold sm:text-xl lg:text-3xl">
              Fresh Organic Fruits
            </h2>
            <p className="relative z-10 text-sm text-white/90 sm:text-xs lg:text-sm">
              Get up to 40% off on selected organic fruits
            </p>
            <div className="relative z-10 flex items-baseline gap-2 sm:gap-1.5 lg:gap-3">
              <span className="text-2xl font-bold lg:text-3xl">40% OFF</span>
              <span className="text-xs text-white/90 sm:text-[10px] lg:text-xs">
                Use code: <span className="text-white text-lg font-bold lg:text-xl">ORGANIC40</span>
              </span>
            </div>
            <Link
              href="/products"
              className="relative z-10 mt-2 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-emerald-600 transition-colors hover:bg-white/90 sm:mt-1 sm:gap-1 sm:py-2 sm:text-xs lg:mt-2 lg:gap-2 lg:px-5 lg:py-3 lg:text-sm"
            >
              Shop Now
              <FiArrowRight />
            </Link>
          </div>

          {/* ===== Card 2: orange ===== */}
          <div className="relative flex min-h-60 flex-col items-start justify-center gap-2.5 overflow-hidden rounded-2xl bg-linear-to-br from-[#FF8904] to-[#FF2056] p-6 text-white sm:min-h-55 sm:gap-2 sm:rounded-xl sm:p-5 lg:min-h-75 lg:gap-3 lg:rounded-2xl lg:p-8">
            {/* decorative circles */}
            <span className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-white/10 sm:-right-6 sm:-top-6 sm:size-20 lg:-right-10 lg:-top-10 lg:size-40" />
            <span className="pointer-events-none absolute -bottom-10 -left-8 size-24 rounded-full bg-white/10 sm:-bottom-8 sm:-left-6 sm:size-16 lg:-bottom-12 lg:-left-10 lg:size-32" />

            <span className="relative z-10 rounded-full bg-white/20 px-3 py-1 text-xs sm:px-2 sm:py-0.5 sm:text-[10px] lg:px-3 lg:py-1 lg:text-xs">
              ✨ New Arrivals
            </span>
            <h2 className="relative z-10 text-2xl font-bold sm:text-xl lg:text-3xl">
              Exotic Vegetables
            </h2>
            <p className="relative z-10 text-sm text-white/90 sm:text-xs lg:text-sm">
              Discover our latest collection of premium vegetables
            </p>
            <div className="relative z-10 flex items-baseline gap-2 sm:gap-1.5 lg:gap-3">
              <span className="text-2xl font-bold lg:text-3xl">25% OFF</span>
              <span className="text-xs text-white/90 sm:text-[10px] lg:text-xs">
                Use code: <span className="text-white text-lg font-bold lg:text-xl">FRESH25</span>
              </span>
            </div>
            <Link
              href="/products"
              className="relative z-10 mt-2 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-orange-500 transition-colors hover:bg-white/90 sm:mt-1 sm:gap-1 sm:py-2 sm:text-xs lg:mt-2 lg:gap-2 lg:px-5 lg:py-3 lg:text-sm"
            >
              Explore Now
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}