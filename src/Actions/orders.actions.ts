"use server";

import { getMyToken } from "@/utils/getMyToken";

export async function getAllOrders(userId: string) {
  try {
    const token = await getMyToken();
    if (!token) throw new Error("Please sign in to view your orders.");

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      method: "GET",
      headers: { token: token as string },
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok) throw new Error(data?.message || "Could not load your orders.");
    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Could not load your orders.");
  }
}
