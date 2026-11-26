import Image from "next/image";
import Link from "next/link";
import { LoaderCircle, ShoppingCart, Trash2 } from "lucide-react";
import type { ProductType } from "@/Types/ProductsType/Products.type";
import { calcSale } from "@/utils/calcSale";

type WishlistCardProductProps = {
  product: ProductType;
  isAddingToCart: boolean;
  isRemoving: boolean;
  isDisabled: boolean;
  onAddToCart: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export default function WishlistCardProduct({
  product,
  isAddingToCart,
  isRemoving,
  isDisabled,
  onAddToCart,
  onRemove,
}: WishlistCardProductProps) {
  const sale = calcSale(product);
  const price = product.priceAfterDiscount || product.price;
  const inStock = product.quantity > 0;
  const busy = isDisabled || isAddingToCart || isRemoving;

  return (
    <article className="grid grid-cols-12 items-center gap-4 border-b border-[#f3f4f6] px-6 py-5 last:border-b-0 max-md:flex max-md:flex-col max-md:items-stretch max-md:gap-4 max-md:px-4 max-md:py-4">
      <div className="col-span-6 flex min-w-0 items-center gap-4">
        <Link
          href={`/productDetails/${product._id}`}
          aria-label={`View ${product.title}`}
          className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#f3f4f6] bg-[#f9fafb] p-px"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            width={78}
            height={78}
            className="size-19.5 object-contain"
          />
        </Link>
        <div className="flex min-w-0 flex-col gap-1">
          <Link
            href={`/productDetails/${product._id}`}
            className="line-clamp-2 text-base font-medium leading-6 text-[#101828] hover:text-[#16a34a]"
          >
            {product.title}
          </Link>
          <span className="text-sm leading-5 text-[#99a1af]">{product.category?.name}</span>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center gap-2 text-base leading-6 text-[#101828] max-md:justify-start">
        <span className="text-sm text-[#6a7282] md:hidden">Price:</span>
        <div className="flex flex-col items-center max-md:items-start">
          <span className={`font-semibold ${sale ? "text-[#16a34a]" : "text-[#101828]"}`}>
            {price.toLocaleString("en-US")} EGP
          </span>
          {sale ? (
            <span className="text-sm leading-5 text-[#99a1af] line-through">
              {product.price.toLocaleString("en-US")} EGP
            </span>
          ) : null}
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center gap-2 max-md:justify-start">
        <span className="text-sm text-[#6a7282] md:hidden">Status:</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium leading-4 ${inStock ? "bg-[#f0fdf4] text-[#008236]" : "bg-[#fef2f2] text-[#dc2626]"}`}>
          <span className={`size-1.5 rounded-full ${inStock ? "bg-[#00c950]" : "bg-[#dc2626]"}`} />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="col-span-2 flex items-center justify-center gap-2 max-md:gap-3">
        <button
          type="button"
          onClick={() => onAddToCart(product._id)}
          disabled={busy || !inStock}
          className="inline-flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-4 py-2.5 text-sm font-medium leading-5 text-white transition-colors hover:bg-[#15803d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAddingToCart ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <ShoppingCart aria-hidden="true" className="size-3.75" />}
          Add to Cart
        </button>
        <button
          type="button"
          aria-label={`Remove ${product.title} from wishlist`}
          onClick={() => onRemove(product._id)}
          disabled={busy}
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-[#e5e7eb] bg-white text-[#99a1af] transition-colors hover:border-[#ffc9c9] hover:bg-[#fef2f2] hover:text-[#fb2c36] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRemoving ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Trash2 aria-hidden="true" className="size-4.25" />}
        </button>
      </div>
    </article>
  );
}
