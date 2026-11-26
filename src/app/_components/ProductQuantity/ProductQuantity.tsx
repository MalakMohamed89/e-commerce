
"use client";

import { useContext, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "@/context/cartContext/cartContext";
import { updateCartProduct } from "@/Actions/cart.actions";
import { toast } from "@/components/ui/toast";

type Props = {
  productId: string;
};

export default function ProductQuantity({ productId }: Props) {
  const { cartProducts, getUserCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const cartProduct = cartProducts.find(
    (item) => item.product._id === productId
  );

  const quantity = cartProduct?.count || 1;

  async function updateQuantity(newCount: number) {
    if (!cartProduct) {
      toast.add({
        title: "Please add this product to your cart first!",
        type: "error",
      });
      return;
    }

    if (newCount < 1 || loading) return;

    try {
      setLoading(true);

      const res = await updateCartProduct(productId, newCount);

      if (res.status === "success") {
        toast.add({
          title: "Cart updated successfully",
          type: "success",
        });

        await getUserCart();
      } else {
        toast.add({
          title: res.message || "Failed to update cart",
          type: "error",
        });
      }
    } catch {
      toast.add({
        title: "Something went wrong!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-13 items-center rounded-md border border-gray-200">
      <button
        type="button"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={loading || quantity <= 1}
        className="flex cursor-pointer h-full w-10 items-center justify-center disabled:opacity-40"
      >
        <FaMinus size={10} />
      </button>

      <span className="min-w-10 text-center text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={loading}
        className="flex cursor-pointer h-full w-10 items-center justify-center disabled:opacity-40"
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
}
