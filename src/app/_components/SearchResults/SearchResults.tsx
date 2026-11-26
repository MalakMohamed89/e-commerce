"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Filter, Grid2X2, List, Search, SlidersHorizontal, Star, X } from "lucide-react";
import type { BrandType } from "@/Types/BrandsType/Brands.type";
import type { Category, ProductType } from "@/Types/ProductsType/Products.type";
import { calcSale } from "@/utils/calcSale";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import AddToWishlistBtn from "@/app/_components/AddToWishlistBtn/AddToWishlistBtn";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

type ViewMode = "grid" | "list";
type SortMode = "relevance" | "price-low" | "price-high" | "rating" | "newest";

type FilterPanelProps = {
  categories: Category[];
  brands: BrandType[];
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  onToggleCategory: (id: string) => void;
  onToggleBrand: (id: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
};

function FilterPanel({ categories, brands, selectedCategories, selectedBrands, minPrice, maxPrice, onToggleCategory, onToggleBrand, onMinPriceChange, onMaxPriceChange, onClear }: FilterPanelProps) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <section className="border-b border-[#f3f4f6] pb-4">
        <h2 className="mb-3 text-sm font-semibold text-[#101828]">Categories</h2>
        <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
          {categories.map((category) => <label key={category._id} className="flex cursor-pointer items-center gap-2 text-xs text-[#4a5565] hover:text-[#15803d]">
            <input type="checkbox" checked={selectedCategories.includes(category._id)} onChange={() => onToggleCategory(category._id)} className="size-3.5 rounded border-[#d1d5dc] accent-[#16a34a]" />{category.name}
          </label>)}
        </div>
      </section>

      <section className="border-b border-[#f3f4f6] py-4">
        <h2 className="mb-3 text-sm font-semibold text-[#101828]">Price Range</h2>
        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-1 text-[10px] text-[#6a7282]">Min (EGP)<input type="number" min="0" value={minPrice} onChange={(event) => onMinPriceChange(event.target.value)} placeholder="0" className="h-9 min-w-0 rounded-lg border border-[#e5e7eb] px-2 text-xs text-[#364153] outline-none focus:border-[#16a34a]" /></label>
          <label className="grid gap-1 text-[10px] text-[#6a7282]">Max (EGP)<input type="number" min="0" value={maxPrice} onChange={(event) => onMaxPriceChange(event.target.value)} placeholder="No limit" className="h-9 min-w-0 rounded-lg border border-[#e5e7eb] px-2 text-xs text-[#364153] outline-none focus:border-[#16a34a]" /></label>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[500, 1000, 5000, 10000].map((price) => <button key={price} type="button" onClick={() => { onMinPriceChange(""); onMaxPriceChange(String(price)); }} className={`rounded-full px-2.5 py-1 text-[10px] transition ${maxPrice === String(price) ? "bg-[#dcfce7] text-[#008236]" : "bg-[#f3f4f6] text-[#4a5565] hover:bg-[#e5e7eb]"}`}>Under {price >= 1000 ? `${price / 1000}K` : price}</button>)}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="mb-3 text-sm font-semibold text-[#101828]">Brands</h2>
        <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
          {brands.map((brand) => <label key={brand._id} className="flex cursor-pointer items-center gap-2 text-xs text-[#4a5565] hover:text-[#15803d]">
            <input type="checkbox" checked={selectedBrands.includes(brand._id)} onChange={() => onToggleBrand(brand._id)} className="size-3.5 rounded border-[#d1d5dc] accent-[#16a34a]" />{brand.name}
          </label>)}
        </div>
      </section>

      {(selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice || maxPrice) && <button type="button" onClick={onClear} className="mt-4 w-full border-t border-[#f3f4f6] pt-3 text-left text-xs font-medium text-[#16a34a] hover:text-[#15803d]">Clear filters</button>}
    </div>
  );
}

function ProductListRow({ product }: { product: ProductType }) {
  const sale = calcSale(product);
  const price = product.priceAfterDiscount && product.priceAfterDiscount > 0 ? product.priceAfterDiscount : product.price;
  return (
    <article className="flex min-w-0 items-center gap-5 rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm transition hover:shadow-md max-sm:items-start max-sm:gap-3 max-sm:p-3">
      <Link href={`/productDetails/${product._id}`} className="relative grid size-36 shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-3 max-sm:size-24">
        {sale && <span className="absolute left-0 top-2 z-10 rounded-r-sm bg-red-500 px-2 py-0.5 text-[10px] font-medium text-white">-{sale}%</span>}
        <Image src={product.imageCover} alt={product.title} width={132} height={132} className="size-full object-contain" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="text-xs text-[#6a7282]">{product.category?.name}</span>
        <Link href={`/productDetails/${product._id}`} className="line-clamp-2 text-base font-semibold text-[#101828] hover:text-[#15803d]">{product.title}</Link>
        <div className="flex items-center gap-1 text-xs text-[#6a7282]"><span className="inline-flex items-center gap-0.5 text-amber-400">{Array.from({ length: 5 }, (_, index) => <Star key={index} className={`size-3 ${index < Math.round(product.ratingsAverage) ? "fill-current" : "text-[#d1d5dc]"}`} />)}</span>{product.ratingsAverage?.toFixed(1)} ({product.ratingsQuantity})</div>
        <div className="mt-1 flex items-center gap-2"><strong className={`text-lg ${sale ? "text-[#16a34a]" : "text-[#1e2939]"}`}>{price} EGP</strong>{sale && <span className="text-xs text-gray-400 line-through">{product.price} EGP</span>}</div>
      </div>
      <div className="flex shrink-0 items-center gap-2 max-sm:flex-col-reverse">
        <AddToWishlistBtn productId={product._id} className="grid size-9 place-items-center rounded-full border border-gray-100 bg-white text-gray-600 shadow-sm transition hover:text-red-500" activeChildren={<FaHeart className="size-4" />}><FiHeart className="size-4" /></AddToWishlistBtn>
        <AddBtn productId={product._id} className="grid size-10 place-items-center rounded-full bg-[#16a34a] text-white transition hover:bg-[#15803d]"><span className="text-xl leading-none">+</span></AddBtn>
      </div>
    </article>
  );
}

export default function SearchResults({ products, categories, brands, initialQuery }: { products: ProductType[]; categories: Category[]; brands: BrandType[]; initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("relevance");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const pageSize = 12;

  useEffect(() => { setQuery(initialQuery); setCurrentPage(1); }, [initialQuery]);

  function toggleValue(value: string, current: string[], setCurrent: (next: string[]) => void) {
    setCurrent(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
    setCurrentPage(1);
  }

  function updateMinPrice(value: string) { setMinPrice(value); setCurrentPage(1); }
  function updateMaxPrice(value: string) { setMaxPrice(value); setCurrentPage(1); }

  function clearFilters() {
    setSelectedCategories([]); setSelectedBrands([]); setMinPrice(""); setMaxPrice(""); setCurrentPage(1);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
    setCurrentPage(1);
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Number.POSITIVE_INFINITY;
    const filtered = products.filter((product) => {
      const currentPrice = product.priceAfterDiscount && product.priceAfterDiscount > 0 ? product.priceAfterDiscount : product.price;
      const searchable = [product.title, product.brand?.name, product.category?.name, ...(product.subcategory ?? []).map((item) => item.name)].filter(Boolean).join(" ").toLocaleLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (!selectedCategories.length || selectedCategories.includes(product.category?._id ?? ""))
        && (!selectedBrands.length || selectedBrands.includes(product.brand?._id ?? ""))
        && currentPrice >= min && currentPrice <= max;
    });

    if (sortMode === "price-low") filtered.sort((a, b) => (a.priceAfterDiscount || a.price) - (b.priceAfterDiscount || b.price));
    else if (sortMode === "price-high") filtered.sort((a, b) => (b.priceAfterDiscount || b.price) - (a.priceAfterDiscount || a.price));
    else if (sortMode === "rating") filtered.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    else if (sortMode === "newest") filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (normalizedQuery) filtered.sort((a, b) => {
      const score = (product: ProductType) => {
        const title = product.title.toLocaleLowerCase();
        const brand = product.brand?.name.toLocaleLowerCase() ?? "";
        if (title === normalizedQuery) return 0;
        if (title.startsWith(normalizedQuery)) return 1;
        if (title.includes(normalizedQuery)) return 2;
        if (brand.startsWith(normalizedQuery)) return 3;
        return 4;
      };
      return score(a) - score(b);
    });

    return filtered;
  }, [products, query, selectedCategories, selectedBrands, minPrice, maxPrice, sortMode]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, pageCount);
  const pageProducts = filteredProducts.slice((safeCurrentPage - 1) * pageSize, safeCurrentPage * pageSize);
  const pageNumbers = Array.from({ length: Math.min(5, pageCount) }, (_, index) => index + 1);
  const filterProps: FilterPanelProps = {
    categories, brands, selectedCategories, selectedBrands, minPrice, maxPrice,
    onToggleCategory: (id) => toggleValue(id, selectedCategories, setSelectedCategories),
    onToggleBrand: (id) => toggleValue(id, selectedBrands, setSelectedBrands),
    onMinPriceChange: updateMinPrice, onMaxPriceChange: updateMaxPrice, onClear: clearFilters,
  };

  return (
    <main className="flex-1 bg-[#f9fafb] text-[#101828]">
      <div className="bg-white">
        <div className="mx-auto max-w-384 px-4 py-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-xs text-[#6a7282]"><Link href="/" className="hover:text-[#15803d]">Home</Link><span>/</span><span aria-current="page" className="text-[#101828]">Search Results</span></nav>
          <form role="search" onSubmit={submitSearch} className="relative w-full max-w-2xl">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#99a1af]" />
            <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1); }} placeholder="Search for products..." aria-label="Search products" className="h-11 w-full rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-4 text-sm text-[#364153] outline-none placeholder:text-[#99a1af] transition focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10" />
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-384 items-start gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-8">
        <aside className="hidden lg:block"><FilterPanel {...filterProps} /></aside>
        <section className="min-w-0" aria-label="Search results">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setMobileFiltersOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 text-xs font-medium text-[#364153] lg:hidden"><Filter className="size-4" />Filters</button>
              <div className="inline-flex rounded-lg border border-[#e5e7eb] bg-white p-0.5" aria-label="Product view">
                <button type="button" onClick={() => setViewMode("grid")} aria-label="Grid view" aria-pressed={viewMode === "grid"} className={`grid size-9 place-items-center rounded-md transition ${viewMode === "grid" ? "bg-[#16a34a] text-white" : "text-[#6a7282] hover:bg-[#f3f4f6]"}`}><Grid2X2 className="size-4" /></button>
                <button type="button" onClick={() => setViewMode("list")} aria-label="List view" aria-pressed={viewMode === "list"} className={`grid size-9 place-items-center rounded-md transition ${viewMode === "list" ? "bg-[#16a34a] text-white" : "text-[#6a7282] hover:bg-[#f3f4f6]"}`}><List className="size-4" /></button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-[#6a7282]">Sort by:
              <select value={sortMode} onChange={(event) => { setSortMode(event.target.value as SortMode); setCurrentPage(1); }} className="h-10 min-w-36 rounded-lg border border-[#e5e7eb] bg-white px-3 text-xs text-[#364153] outline-none focus:border-[#16a34a]">
                <option value="relevance">Relevance</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Top Rated</option><option value="newest">Newest</option>
              </select>
            </label>
          </div>

          {pageProducts.length === 0 ? <div className="rounded-xl border border-[#e5e7eb] bg-white px-5 py-16 text-center shadow-sm"><span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f0fdf4] text-[#16a34a]"><SlidersHorizontal className="size-6" /></span><h2 className="mt-4 text-lg font-semibold">No products found</h2><p className="mt-1 text-sm text-[#6a7282]">Try a different search term or adjust your filters.</p><button type="button" onClick={clearFilters} className="mt-4 text-sm font-medium text-[#16a34a] hover:text-[#15803d]">Clear filters</button></div> : <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4" : "grid grid-cols-1 gap-3 sm:gap-4"}>
            {pageProducts.map((product) => viewMode === "grid" ? <ProductCard key={product._id} product={product} /> : <ProductListRow key={product._id} product={product} />)}
          </div>}

          {pageCount > 1 && <nav aria-label="Search result pages" className="mt-8 flex items-center justify-center gap-1.5">
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={safeCurrentPage === 1} aria-label="Previous page" className="grid size-10 place-items-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] transition hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="size-4" /></button>
            {pageNumbers.map((page) => <button type="button" key={page} onClick={() => setCurrentPage(page)} aria-current={safeCurrentPage === page ? "page" : undefined} className={`grid size-10 place-items-center rounded-lg border text-xs font-medium transition ${safeCurrentPage === page ? "border-[#16a34a] bg-[#16a34a] text-white" : "border-[#e5e7eb] bg-white text-[#4a5565] hover:bg-[#f3f4f6]"}`}>{page}</button>)}
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} disabled={safeCurrentPage === pageCount} aria-label="Next page" className="grid size-10 place-items-center rounded-lg border border-[#e5e7eb] bg-white text-[#6a7282] transition hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="size-4" /></button>
          </nav>}
        </section>
      </div>

      {mobileFiltersOpen && <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="Product filters">
        <button type="button" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} className="absolute inset-0 bg-black/40" />
        <div className="relative ml-auto h-full w-[min(88vw,360px)] overflow-y-auto bg-[#f9fafb] p-4 shadow-xl"><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Filters</h2><button type="button" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} className="grid size-9 place-items-center rounded-lg bg-white text-[#4a5565]"><X className="size-4" /></button></div><FilterPanel {...filterProps} /><button type="button" onClick={() => setMobileFiltersOpen(false)} className="mt-4 min-h-11 w-full rounded-lg bg-[#16a34a] text-sm font-semibold text-white">Show {filteredProducts.length} products</button></div>
      </div>}
    </main>
  );
}
