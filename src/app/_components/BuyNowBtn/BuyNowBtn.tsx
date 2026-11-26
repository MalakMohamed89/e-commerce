"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBolt } from "react-icons/fa";
import { addProductToCart } from "@/Actions/cart.actions";
import { toast } from "@/components/ui/toast";

type Props = {
  productId: string;

};

export default function BuyNowBtn({ productId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBuyNow() {
    try {
      setLoading(true);

      const res = await addProductToCart(productId);

      if (res.status === "success") {
        router.push(`/checkout/${res.cartId}`);
      } else {
        toast.add({
          title: res.message || "Failed to add product",
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
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={loading}
      className="flex h-13 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
    >
      <FaBolt size={12} />
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
}