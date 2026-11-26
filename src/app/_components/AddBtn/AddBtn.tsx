
"use client";

import { addProductToCart } from "@/Actions/cart.actions";
import { toast } from "@/components/ui/toast";
import { FiPlus } from "react-icons/fi";
import { useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { CartContext } from "@/context/cartContext/cartContext";
type Props = {
  productId: string;

  className?: string;
  children?: React.ReactNode;
};
export default function AddBtn({
  productId,
  className,
  children,

}: Props) {
  const [loading, setLoading] = useState(false);

const { numberOfCartItems, setnumberOfCartItems, getUserCart } = useContext(CartContext);


  async function addToCart() {
    try {
      setLoading(true);

const res = await addProductToCart(productId);
console.log("ressssss",res)
if (res.status === "success") {
  toast.add({
    title: res.message,
    type: "success",
  });

  await getUserCart();
}else {
        toast.add({
          title: res?.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch (err) {
  const errorMessage =
    err instanceof Error ? err.message : "Something went wrong!";

  toast.add({
    title: errorMessage,
    type: "error",
  });
}finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={addToCart}
      className={className}
    >
      {loading ? <div className="animate-spin"><FaSpinner /></div> : children || <FiPlus className="size-5" />}
    </button>
  );
}
