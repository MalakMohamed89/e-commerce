"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import {
  addProductToWishlist,
  getWishlistProducts,
  removeProductFromWishlist,
} from "@/Actions/wishlist.actions";
import type { WishlistResponse } from "@/Types/WishlistType/WishlistType.type";

type WishlistToggleResult =
  | { success: true; isWishlisted: boolean; message: string }
  | { success: false; message: string };

type WishlistContextValue = {
  productIds: ReadonlySet<string>;
  pendingProductIds: ReadonlySet<string>;
  isReady: boolean;
  syncProductIds: (productIds: string[]) => void;
  toggleProduct: (productId: string) => Promise<WishlistToggleResult>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [productIds, setProductIds] = useState<Set<string>>(() => new Set());
  const [pendingProductIds, setPendingProductIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [isReady, setIsReady] = useState(false);

  const syncProductIds = useCallback((nextProductIds: string[]) => {
    setProductIds(new Set(nextProductIds));
    setIsReady(true);
  }, []);

  useEffect(() => {
    let isCurrent = true;

    if (status === "authenticated") {
      void Promise.resolve()
        .then(() => getWishlistProducts())
        .then((data) => {
          const response = data as WishlistResponse;
          if (isCurrent && response.status === "success") {
            setProductIds(new Set((response.data ?? []).map((product) => product._id)));
          }
        })
        .catch(() => {
          if (isCurrent) setProductIds(new Set());
        })
        .finally(() => {
          if (isCurrent) setIsReady(true);
        });
    } else if (status === "unauthenticated") {
      void Promise.resolve().then(() => {
        if (isCurrent) {
          setProductIds(new Set());
          setIsReady(true);
        }
      });
    }

    return () => {
      isCurrent = false;
    };
  }, [status]);

  const toggleProduct = useCallback(
    async (productId: string): Promise<WishlistToggleResult> => {
      const shouldRemove = productIds.has(productId);

      setPendingProductIds((current) => new Set(current).add(productId));

      try {
        const response = shouldRemove
          ? await removeProductFromWishlist(productId)
          : await addProductToWishlist(productId);

        if (response?.status !== "success") {
          return {
            success: false,
            message:
              response?.message ||
              (shouldRemove
                ? "Failed to remove product from wishlist"
                : "Failed to add product to wishlist"),
          };
        }

        const nextIsWishlisted = !shouldRemove;
        setProductIds((current) => {
          const next = new Set(current);
          if (nextIsWishlisted) next.add(productId);
          else next.delete(productId);
          return next;
        });

        return {
          success: true,
          isWishlisted: nextIsWishlisted,
          message:
            response.message ||
            (nextIsWishlisted
              ? "Product added to your wishlist"
              : "Product removed from your wishlist"),
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : "Something went wrong!",
        };
      } finally {
        setPendingProductIds((current) => {
          const next = new Set(current);
          next.delete(productId);
          return next;
        });
      }
    },
    [productIds],
  );

  return (
    <WishlistContext.Provider
      value={{ productIds, pendingProductIds, isReady, syncProductIds, toggleProduct }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistProduct(productId: string) {
  const context = useWishlistManager();

  return {
    isWishlisted: context.productIds.has(productId),
    isPending: context.pendingProductIds.has(productId),
    isReady: context.isReady,
    toggleWishlist: () => context.toggleProduct(productId),
  };
}

export function useWishlistManager() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("Wishlist hooks must be used inside WishlistProvider");
  }

  return context;
}
