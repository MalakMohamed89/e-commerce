
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, PackageCheck, ShoppingBag } from "lucide-react";
import { getAllOrders } from "@/Actions/orders.actions";
import ProductCardOrders from "@/app/_components/ProductCardOrders/ProductCardOrders";
import { OrderType } from "@/Types/orderType/orderType.type";

export default function AllOrdersPage() {
  const { data: session, status: sessionStatus } = useSession();

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getOrders() {
    try {
      setLoading(true);

      const response = await getAllOrders(session!.id);
// console.log("ordersssss",response)
setOrders(response);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (sessionStatus !== "authenticated" || !session?.id) {
      setLoading(false);
      return;
    }

    getOrders();
  }, [session?.id, sessionStatus]);

  return (
    <main className="flex-1 bg-white pb-16 text-[#101828]">
      <div className="mx-auto w-full max-w-384 px-4 py-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-[#6a7282]">
          <Link href="/" className="transition hover:text-[#15803d]">Home</Link>
          <span className="text-[#d1d5dc]">/</span>
          <span aria-current="page" className="text-[#101828]">My Orders</span>
        </nav>

        <header className="mb-8 flex items-center justify-between gap-5 max-sm:items-start">
          <div className="flex items-center gap-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#16a34a] to-[#15803d] text-white shadow-md shadow-green-700/20">
              <ShoppingBag className="size-6 fill-white" />
            </span>
            <div>
              <h1 className="text-3xl font-bold leading-9 tracking-tight max-sm:text-2xl">My Orders</h1>
              <p className="mt-1 text-sm text-[#6a7282]">
                Track and manage your {loading ? "" : orders.length} orders
              </p>
            </div>
          </div>

          <Link href="/products" className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#16a34a] transition hover:bg-[#f0fdf4]">
            Continue Shopping <ArrowRight className="size-4" />
          </Link>
        </header>

        {loading ? (
          <div className="grid gap-4" aria-label="Loading orders">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-48 animate-pulse rounded-xl border border-[#e5e7eb] bg-[#f9fafb]" />
            ))}
          </div>
        ) : sessionStatus !== "authenticated" ? (
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-6 py-14 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f0fdf4] text-[#16a34a]">
              <PackageCheck className="size-7" />
            </span>
            <h2 className="mt-4 text-xl font-semibold">Sign in to see your orders</h2>
            <p className="mt-2 text-sm text-[#6a7282]">Your order history will appear here after you sign in.</p>
            <Link href="/signIn" className="mt-6 inline-flex rounded-xl bg-[#16a34a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#15803d]">
              Sign In
            </Link>
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-[#101828]">We couldn&apos;t load your orders</h2>
            <p className="mt-2 text-sm text-[#6a7282]">Please refresh the page and try again.</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-6 py-14 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#f0fdf4] text-[#16a34a]">
              <PackageCheck className="size-7" />
            </span>
            <h2 className="mt-4 text-xl font-semibold">No orders yet</h2>
            <p className="mt-2 text-sm text-[#6a7282]">When you place an order, you&apos;ll be able to track it here.</p>
            <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16a34a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d]">
              Explore products <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <section aria-label={`${orders.length} orders`} className="grid gap-4">
            {orders.map((order, index) => (
              <ProductCardOrders
         key={order._id}
                order={order}
                defaultExpanded={index === 0}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
