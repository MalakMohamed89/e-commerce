"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, LoaderCircle } from "lucide-react";
import WishlistCardProduct from "../_components/WishlistCardProduct/WishlistCardProduct";
import { addProductToCart } from "@/Actions/cart.actions";
import {
  getWishlistProducts,
} from "@/Actions/wishlist.actions";
import { toast } from "@/components/ui/toast";
import type { ProductType } from "@/Types/ProductsType/Products.type";
import type { WishlistResponse } from "@/Types/WishlistType/WishlistType.type";
import { useWishlistManager } from "@/context/WishlistProvider/WishlistWishlistProvider";


type WishlistAction = { productId: string; action: "cart" | "remove" } | null;

export default function WishlistPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeAction, setActiveAction] = useState<WishlistAction>(null);
  const { isReady: isWishlistReady, syncProductIds, toggleProduct } = useWishlistManager();

  useEffect(() => {
    getWishlistProducts()
      .then((data) => {
        const response = data as WishlistResponse;

        if (response.status === "success") {
          const wishlistProducts = Array.isArray(response.data) ? response.data : [];
          setProducts(wishlistProducts);
          syncProductIds(wishlistProducts.map((product) => product._id));
        } else {
          toast.add({
            title: response.message || "Failed to load your wishlist",
            type: "error",
          });
        }
      })
      .catch((error: unknown) => {
        toast.add({
          title: error instanceof Error ? error.message : "Something went wrong!",
          type: "error",
        });
      })
      .finally(() => setIsLoading(false));
  }, [syncProductIds]);

  async function removeWishlistProduct(productId: string) {
    try {
      setActiveAction({ productId, action: "remove" });
      setIsDisabled(true);
      const response = await toggleProduct(productId);

      if (response.success && !response.isWishlisted) {
        setProducts((currentProducts) => currentProducts.filter((product) => product._id !== productId));
        toast.add({
          title: response.message,
          type: "success",
        });
      } else {
        toast.add({
          title: response.message || "Failed to remove product",
          type: "error",
        });
      }
    } catch (error) {
      toast.add({
        title: error instanceof Error ? error.message : "Something went wrong!",
        type: "error",
      });
    } finally {
      setActiveAction(null);
      setIsDisabled(false);
    }
  }

  async function addWishlistProductToCart(productId: string) {
    try {
      setActiveAction({ productId, action: "cart" });
      setIsDisabled(true);
      const response = await addProductToCart(productId);

      if (response?.status === "success") {
        toast.add({
          title: response.message || "Product added to cart",
          type: "success",
        });
      } else {
        toast.add({
          title: response?.message || "Failed to add product to cart",
          type: "error",
        });
      }
    } catch (error) {
      toast.add({
        title: error instanceof Error ? error.message : "Something went wrong!",
        type: "error",
      });
    } finally {
      setActiveAction(null);
      setIsDisabled(false);
    }
  }

  return (
    <main className="flex-1 bg-[#f9fafb] text-[#101828]">
      <section className="bg-white">
        <div className="mx-auto w-full max-w-384 px-4 pb-8 pt-8">
          <nav aria-label="Breadcrumb" className="flex h-5 items-center gap-2 text-sm leading-5 text-[#6a7282]">
            <Link href="/" className="transition-colors hover:text-[#16a34a]">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#101828]">Wishlist</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#fef2f2] text-[#fb2c36]">
              <Heart aria-hidden="true" className="size-6 fill-current" />
            </span>
            <div>
              <h1 className="m-0 text-2xl font-bold leading-8 text-[#101828]">My Wishlist</h1>
              <p className="m-0 text-sm leading-5 text-[#6a7282]">{products.length} items saved</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto min-h-193.75 w-full max-w-384 px-4 py-8">
        {isLoading ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-[#f3f4f6] bg-white">
            <LoaderCircle aria-hidden="true" className="size-10 animate-spin text-[#16a34a]" />
            <p className="m-0 text-sm font-medium text-[#6a7282]">Loading your wishlist...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <section aria-label="Wishlist products" className="overflow-hidden rounded-xl border border-[#f3f4f6] bg-white shadow-sm">
              <div className="grid grid-cols-12 gap-4 border-b border-[#f3f4f6] bg-[#f9fafb] px-6 py-4 text-sm font-medium leading-5 text-[#6a7282] max-md:hidden">
                <span className="col-span-6">Product</span>
                <span className="col-span-2 text-center">Price</span>
                <span className="col-span-2 text-center">Status</span>
                <span className="col-span-2 text-center">Actions</span>
              </div>
              <div className="divide-y divide-[#f3f4f6]">
                {products.map((product) => (
                  <WishlistCardProduct
                    key={product._id}
                    product={product}
                    isAddingToCart={activeAction?.productId === product._id && activeAction.action === "cart"}
                    isRemoving={activeAction?.productId === product._id && activeAction.action === "remove"}
                    isDisabled={isDisabled || !isWishlistReady}
                    onAddToCart={addWishlistProductToCart}
                    onRemove={removeWishlistProduct}
                  />
                ))}
              </div>
            </section>
            <Link href="/products" className="mt-6 inline-flex items-center gap-2 py-2 text-sm leading-5 text-[#16a34a] transition-colors hover:text-[#15803d]">
              <ArrowLeft aria-hidden="true" className="size-3.5" /> Continue Shopping
            </Link>
          </>
        ) : (
          <div className="flex min-h-105 flex-col items-center justify-center rounded-xl border border-[#f3f4f6] bg-white px-6 py-12 text-center shadow-sm">
            <span className="mb-6 grid size-20 place-items-center rounded-full bg-[#fef2f2] text-[#fb2c36]"><Heart aria-hidden="true" className="size-9" /></span>
            <h2 className="m-0 text-2xl font-bold text-[#101828]">Your Wishlist is Empty</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#6a7282]">Save your favorite products here and come back to them whenever you like.</p>
            <Link href="/products" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#16a34a] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]">Start Shopping</Link>
          </div>
        )}
      </section>
    </main>
  );
}
