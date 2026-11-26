"use server";

import { getMyToken } from "@/utils/getMyToken";

const WISHLIST_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

async function getWishlistToken() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first!");
  }

  return token;
}

async function readWishlistResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Wishlist request failed");
  }

  return data;
}

export async function getWishlistProducts() {
  const token = await getWishlistToken();
  const response = await fetch(WISHLIST_URL, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  return readWishlistResponse(response);
}

export async function addProductToWishlist(productId: string) {
  const token = await getWishlistToken();
  const response = await fetch(WISHLIST_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  return readWishlistResponse(response);
}

export async function removeProductFromWishlist(productId: string) {
  const token = await getWishlistToken();
  const response = await fetch(`${WISHLIST_URL}/${productId}`, {
    method: "DELETE",
    headers: { token },
  });

  return readWishlistResponse(response);
}
