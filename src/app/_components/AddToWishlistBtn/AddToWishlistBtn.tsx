"use client";

import type { ReactNode } from "react";
import { toast } from "@/components/ui/toast";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils"; 
import { useWishlistProduct } from "@/context/WishlistProvider/WishlistWishlistProvider";

type AddToWishlistBtnProps = {
  productId: string;
  className?: string;
  activeClassName?: string; 
  children: ReactNode;
  activeChildren?: ReactNode;
  label?: string;
};

export default function AddToWishlistBtn({
  productId,
  className,
  activeClassName,
  children,
  activeChildren,
  label = "Add to wishlist",
}: AddToWishlistBtnProps) {
  const { isWishlisted, isPending, isReady, toggleWishlist } =
    useWishlistProduct(productId);

  async function handleToggleWishlist() {
    const result = await toggleWishlist();
    toast.add({
      title: result.message,
      type: result.success ? "success" : "error",
    });
  }

  const loading = !isReady || isPending;

  return (
    <button
      type="button"
      aria-label={isWishlisted ? "Remove from wishlist" : label}
      title={isWishlisted ? "Remove from wishlist" : label}
      aria-pressed={isWishlisted}
      disabled={loading}
      onClick={handleToggleWishlist}
      className={cn(
        className,
        isWishlisted && "text-[#fb2c36]",
        isWishlisted && activeClassName 
      )}
    >
      {loading ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      ) : isWishlisted ? (
        activeChildren ?? children
      ) : (
        children
      )}
    </button>
  );
}