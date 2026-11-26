import { ProductType } from "@/Types/ProductsType/Products.type";
import { calcSale } from "@/utils/calcSale";
import { getStarIcons } from "@/utils/getStars";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiRefreshCw, FiEye, FiPlus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import AddBtn from "../AddBtn/AddBtn";
import AddToWishlistBtn from "../AddToWishlistBtn/AddToWishlistBtn";



export default function ProductCard({product}:{product:ProductType}) {


const sale = calcSale(product)


const stars = getStarIcons(product)

  return (

    <div className="flex  w-full flex-col   hover:shadow-lg hover:-translate-y-2 transition-all duration-200 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">
      {/* ===== Image area ===== */}
      <div className="relative flex h-60 items-center justify-center bg-white p-4">
        {/* discount badge (remove it for products without a discount) */}
{sale&&<span className="absolute left-0 top-3 rounded-r-sm bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
       -{sale}%
        </span>}

        <Image
          src={product.imageCover}
          alt="Product"
          width={180}
          height={180}
          className="h-full w-auto object-contain"
        />

{/* floating action buttons */}
<div className="absolute right-3 top-3 flex flex-col gap-2">

  {/* Wishlist */}
  <AddToWishlistBtn
    productId={product._id}
    className="flex size-8 items-center justify-center rounded-full cursor-pointer border border-gray-100 bg-white text-gray-600 shadow-sm transition-colors hover:text-red-500"
    activeChildren={<FaHeart className="size-4" />}
  >
    <FiHeart className="size-4" />
  </AddToWishlistBtn>

  {/* Compare */}
  <button
    type="button"
    aria-label="Compare"

    className="flex size-8 items-center justify-center rounded-full cursor-pointer border border-gray-100 bg-white text-gray-600 shadow-sm transition-colors hover:text-green-600"
  >
    <FiRefreshCw className="size-4" />
  </button>

  {/* Quick View */}
  <Link
    href={`/productDetails/${product._id}`}
    aria-label="Quick view"
    className="flex size-8 items-center justify-center rounded-full cursor-pointer border border-gray-100 bg-white text-gray-600 shadow-sm transition-colors hover:text-green-600"
  >
    <FiEye className="size-4" />
  </Link>

</div>
      </div>

      {/* ===== Body ===== */}
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs leading-4 text-[#6a7282]">{product.category.name}</span>
        <Link href={`/productDetails/${product._id}`}>
        <h3 className="line-clamp-2 hover:text-green-600 duration-300 transition-all cursor-pointer text-base font-medium leading-6 text-[#364153]">
         {product.title}
        </h3>
</Link>
        {/* rating */}
        <div className="flex items-center">
          <div className="flex items-start pt-0.75 pr-2 pb-1.25 [&_svg]:h-4 [&_svg]:w-5">
 {stars}
          </div>
          <span className="text-xs leading-4 text-[#6a7282]">{product.ratingsAverage?.toFixed(1)} ({product.ratingsQuantity})</span>
        </div>

        {/* price + add to cart */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`text-lg font-bold leading-7 ${sale ? "text-[#16a34a]" : "text-[#1e2939]"}`}>
              {sale ? product.priceAfterDiscount : product.price} EGP
            </span>
            {sale && (
              <span className="text-xs font-medium leading-4 text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>
<AddBtn
  productId={product._id}
  className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#16a34a] text-white transition-colors hover:bg-green-700"
>
  <FiPlus className="size-5" />
</AddBtn>
        </div>
      </div>
    </div>

  );
}
