import Image from "next/image";
import ProductsSection from "@/app/_components/ProductsSection/ProductsSection";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="flex-1">
      <section className="bg-[linear-gradient(151.47deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)] md:bg-[linear-gradient(173.35deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)]">
        <div className="mx-auto flex w-full max-w-384 flex-col gap-6 px-4 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="flex h-5 items-center gap-2 text-sm font-medium leading-5">
            <Link href={"/"}  className="text-white/70 cursor-pointer hover:text-white transition-all du">Home</Link >
            <span className="text-white/40">/</span>
            <span className="text-white">All Products</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative flex h-16 w-15 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur md:w-16">
              <Image
                src="/products-hero-icon.svg"
                alt=""
                aria-hidden="true"
                width={38}
                height={30}
                className="h-7.5 w-[37.5px]"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="text-3xl font-bold leading-9 tracking-[-0.75px] text-white md:text-4xl md:leading-10 md:tracking-[-0.9px]">
                All Products
              </h1>
              <p className="text-base font-medium leading-6 text-white/80">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductsSection />
    </main>
  );
}
