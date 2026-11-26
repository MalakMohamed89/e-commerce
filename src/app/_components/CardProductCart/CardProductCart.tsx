
"use client";

import Image from "next/image";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { CartProductType } from "@/Types/CartType/CartType.type";
import { calcSale } from "@/utils/calcSale";

export default function CardProductCart({ product,updateQuantityProduct,isUpdating,isDisabled,removeSpecificProduct }: {product:CartProductType,
  updateQuantityProduct:(  productId: string,newCount: number,sign:string) => Promise<void>,  isUpdating: boolean,isDisabled:boolean,
removeSpecificProduct:(productId: string,count:number)=>Promise<void>
}) {
  // في مشكل الخصم ال api مش مرجع لي السعر بعد الخصم
const discount = calcSale(product.product);

const hasDiscount = discount !== undefined;

const currentPrice = product.product.priceAfterDiscount ?? product.price;

const total = currentPrice * product.count;

// console.log("Full product:", product);

  return (
    <article className="flex min-h-51.5 min-w-0 items-stretch gap-6 rounded-2xl border border-[#f3f4f6] bg-white p-5 shadow-sm max-md:min-h-67 max-md:gap-4 max-md:p-4">

      <div className="relative flex w-32 shrink-0 flex-col items-start justify-between max-md:w-28">
        <div className="grid size-32 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#f3f4f6] bg-linear-to-br from-[#f9fafb] via-white to-[#f3f4f6] p-3.25 max-md:size-28">
          <Image
            src={product.product.imageCover}
            alt={product.product.title}
            width={102}
            height={102}
            className="size-full object-contain"
          />
        </div>

        <span className="mt-1 inline-flex items-center gap-1 self-end rounded-full bg-[#00c950] px-2 py-0.5 text-[10px] font-semibold text-white">
          <Check className="size-2 stroke-3" />
          In Stock
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#101828] max-md:text-base">
            {product.product.title}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#99a1af]">
            <span className="rounded-full bg-[#f0fdf4] px-2.5 py-1 text-[#15803d]">
              {product.product.category.name}
            </span>

            <span aria-hidden="true">•</span>

            <span>Quantity in stock: {product.product.quantity}</span>
          </div>
        </div>

<div className="flex flex-col">
  <div className="flex items-center gap-2">
    <strong className="text-lg text-gray-900">
      {currentPrice} EGP
    </strong>

    {hasDiscount && (
      <span className="text-sm text-gray-400 line-through">
        {product.product.price} EGP
      </span>
    )}
  </div>

  {hasDiscount && (
    <span className="text-sm font-semibold text-green-600">
      {discount}% OFF
    </span>
  )}

  <span className="text-xs text-gray-500">per unit</span>
</div>

        <div className="flex min-w-0 items-center justify-between gap-4 max-md:flex-wrap">

<div
  aria-label={`Quantity: ${product.count}`}
  className="flex shrink-0 items-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-1.25"
>
  <button
    type="button"
    aria-label="Decrease quantity"
    onClick={() =>
      updateQuantityProduct(product.product._id, product.count - 1,"-")
    }
    disabled={isDisabled || product.count <= 1}
    className="grid cursor-pointer size-8 place-items-center rounded-lg bg-white text-[#6a7282] shadow-sm disabled:cursor-not-allowed disabled:opacity-40"
  >
    <Minus className="h-3 w-3.75" />
  </button>

  <div className="flex w-12 items-center justify-center">
    {isUpdating ? (
      <div className="size-4 animate-spin rounded-full border-2 border-[#d1d5dc] border-t-[#16a34a]" />
    ) : (
      <strong className="text-base font-bold text-[#101828]">
        {product.count}
      </strong>
    )}
  </div>

  <button
    type="button"
    aria-label="Increase quantity"
    onClick={() =>
      updateQuantityProduct(product.product._id, product.count + 1,"+")
    }
    disabled={isDisabled}
    className="grid size-8 cursor-pointer place-items-center rounded-lg bg-[#16a34a] text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
  >
    <Plus className="h-3 w-3.75" />
  </button>
</div>

   
<div className="ml-auto flex shrink-0 items-center gap-4">
  <div className="min-w-17 text-right">
    <span className="block text-xs leading-4 text-[#99a1af]">
      Total
    </span>

    <p className="m-0 mt-0.5 flex items-baseline justify-end gap-0.5">
      <strong className="text-xl font-bold leading-7 text-[#101828]">
        {total}
      </strong>
      <span className="text-xs leading-5 text-[#99a1af]">
        EGP
      </span>
    </p>
  </div>

  <button
    type="button"
    aria-label="Remove from cart"
    onClick={() => removeSpecificProduct(product.product._id,product.count)}
    disabled={isDisabled}
    className="grid size-10 shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 place-items-center rounded-xl border border-[#ffc9c9] bg-[#fef2f2] text-[#fb2c36]"
  >
    <Trash2 className="size-4" />
  </button>
</div>

        </div>
      </div>
    </article>
  );
}
