"use client";

import { useState } from "react";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import AddBtn from "../AddBtn/AddBtn";
import { FaShoppingCart } from "react-icons/fa";
import BuyNowBtn from "../BuyNowBtn/BuyNowBtn";

type Props = {
  productId: string;
  stock: number;
  price: number;
};

export default function ProductPurchaseControls({
  productId,
  stock,
  price,
}: Props) {
  const [count, setCount] = useState(1);
return (
  <>
    {/* Quantity */}
    <div className="mt-5">
      <p className="mb-1.5 text-sm text-gray-700">Quantity</p>

      <div className="flex flex-wrap items-center gap-3">
<ProductQuantity productId={productId} />
        <span className="text-xs text-gray-500">
          {stock} available
        </span>
      </div>
    </div>

    {/* Total Price */}
    <div className="mt-4 flex min-h-16 items-center justify-between rounded-lg bg-gray-50 px-4 py-4">
      <span className="text-xs text-gray-600">Total Price:</span>

      <span className="text-base font-bold text-green-600">
        {(price * count).toFixed(2)} EGP
      </span>
    </div>

    {/* Actions */}
    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <AddBtn
        productId={productId}
        className="flex  h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 text-sm font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
      >
        <FaShoppingCart size={14} />
        Add to Cart
      </AddBtn>

      <BuyNowBtn productId={productId}  />
    </div>
  </>
);
}