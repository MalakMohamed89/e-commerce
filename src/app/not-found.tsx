import Link from "next/link";
import { Home, LayoutGrid, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f8fafc] px-4 py-16">
      <div className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="relative mb-8">
          <span className="select-none text-[8rem] font-extrabold leading-none tracking-tight text-green-100 md:text-[10rem]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-[linear-gradient(149.69deg,#16a34a_0%,#22c55e_50%,#4ade80_100%)] text-white shadow-lg shadow-green-600/30">
              <SearchX className="size-10" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#0f172a] md:text-3xl">
          Page Not Found
        </h1>
        <p className="mb-8 max-w-sm text-sm leading-6 text-gray-500 md:text-base">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been
          moved, removed, or the link might be incorrect.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-green-600 hover:text-green-600"
          >
            <LayoutGrid className="size-4" />
            Browse Categories
          </Link>
        </div>
      </div>
    </main>
  );
}