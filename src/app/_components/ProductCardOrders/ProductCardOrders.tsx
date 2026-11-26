
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Banknote,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  ReceiptText,
  Truck,
} from "lucide-react";
import { ProductCardOrdersProps } from "@/Types/orderType/orderType.type";



export default function ProductCardOrders({
  order,
  defaultExpanded = false,
}: ProductCardOrdersProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const items = order.cartItems || [];

  const itemCount = items.reduce(
    (total, item) => total + (item.count || 0),
    0
  );

  const total = order.totalOrderPrice || 0;
  const shipping = order.shippingPrice || 0;
  const tax = order.taxPrice || 0;
  const subtotal = total - shipping - tax;

  const firstProduct = items[0]?.product;

  const status = order.status
    ? order.status
    : order.isDelivered
      ? "Delivered"
      : order.isPaid
        ? "On the way"
        : "Processing";

  const statusColor = status.toLowerCase().includes("deliver")
    ? "bg-[#dcfce7] text-[#008236]"
    : status.toLowerCase().includes("way") ||
        status.toLowerCase().includes("ship")
      ? "bg-[#dbeafe] text-[#155dfc]"
      : status.toLowerCase().includes("cancel")
        ? "bg-[#fee2e2] text-[#dc2626]"
        : "bg-[#fef3c7] text-[#b45309]";

const orderNumber = String(order.id).slice(-5);

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  const paymentIsOnline =
    order.paymentMethodType?.toLowerCase().includes("card") ||
    order.paymentMethodType?.toLowerCase().includes("online");

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-white transition-colors ${
        expanded
          ? "border-[#bbf7d0] shadow-sm"
          : "border-[#e5e7eb] hover:border-[#d1d5dc]"
      }`}
    >
      <div className="flex min-h-48 items-center gap-5 p-6 max-sm:items-start max-sm:gap-3 max-sm:p-4">
        <div className="relative grid size-27 shrink-0 place-items-center rounded-xl border border-[#f3f4f6] bg-[#f9fafb] p-3 max-sm:size-20">
          {firstProduct?.imageCover ? (
            <Image
              src={firstProduct.imageCover}
              alt={firstProduct.title || "Ordered product"}
              width={96}
              height={96}
              className="size-full object-contain"
            />
          ) : (
            <Package className="size-9 text-[#99a1af]" />
          )}

          {items.length > 1 && (
            <span className="absolute -right-1.5 -top-1.5 grid size-7 place-items-center rounded-full bg-[#101828] text-[10px] font-bold text-white">
              +{items.length - 1}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-5 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
          <div className="min-w-0">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColor}`}
            >
              {status.toLowerCase().includes("way") ||
              status.toLowerCase().includes("ship") ? (
                <Truck className="size-3" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
              {status}
            </span>

            <p className="mt-2 text-sm font-semibold text-[#101828]">
              # {orderNumber}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6a7282]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3" />
                {orderDate}
              </span>

              <span>•</span>

              <span className="inline-flex items-center gap-1.5">
                <Package className="size-3" />
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>

              <span>•</span>

              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3" />
                {order.shippingAddress?.city || "Address unavailable"}
              </span>
            </div>

            <p className="mt-3 flex items-baseline gap-1">
              <strong className="text-lg leading-6 text-[#101828]">
                {total.toLocaleString("en-US")}
              </strong>
              <span className="text-[10px] text-[#99a1af]">EGP</span>
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end justify-between self-stretch max-sm:flex-row max-sm:items-center">
            <span
              className={`grid size-10 place-items-center rounded-xl ${
                paymentIsOnline
                  ? "bg-[#f3e8ff] text-[#a855f7]"
                  : "bg-[#f3f4f6] text-[#6a7282]"
              }`}
              title={
                paymentIsOnline ? "Online payment" : "Cash on delivery"
              }
            >
              {paymentIsOnline ? (
                <CreditCard className="size-4" />
              ) : (
                <Banknote className="size-4" />
              )}
            </span>

            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded(!expanded)}
              className={`inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg px-3 text-xs font-medium transition ${
                expanded
                  ? "bg-[#16a34a] text-white hover:bg-[#15803d]"
                  : "bg-[#f3f4f6] text-[#364153] hover:bg-[#e5e7eb]"
              }`}
            >
              {expanded ? "Hide" : "Details"}
              {expanded ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[#f3f4f6] bg-[#f9fafb]/60 px-6 pb-6 pt-5 max-sm:px-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#101828]">
            <span className="grid size-6 place-items-center rounded-md bg-[#dcfce7] text-[#16a34a]">
              <PackageCheck className="size-3.5" />
            </span>
            Order Items
          </h3>

          <div className="grid gap-2">
            {items.map((item, index) => (
              <div
                key={item._id || index}
                className="flex min-h-16 items-center gap-3 rounded-lg border border-[#f3f4f6] bg-white p-3"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#f9fafb] p-1">
                  {item.product?.imageCover ? (
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title || "Ordered product"}
                      width={36}
                      height={36}
                      className="size-full object-contain"
                    />
                  ) : (
                    <Package className="size-5 text-[#99a1af]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[#101828]">
                    {item.product?.title || "Product"}
                  </p>

                  <p className="mt-1 text-[10px] text-[#6a7282]">
                    {item.count} ×{" "}
                    {(item.price || 0).toLocaleString("en-US")} EGP
                  </p>
                </div>

                <strong className="text-xs text-[#101828]">
                  {((item.count || 0) * (item.price || 0)).toLocaleString(
                    "en-US"
                  )}{" "}
                  <span className="text-[9px] font-normal text-[#99a1af]">
                    EGP
                  </span>
                </strong>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <section className="rounded-xl border border-[#e5e7eb] bg-white p-4">
              <h3 className="flex items-center gap-2 text-xs font-semibold text-[#101828]">
                <span className="grid size-6 place-items-center rounded-md bg-[#eff6ff] text-[#2b7fff]">
                  <MapPin className="size-3.5" />
                </span>
                Delivery Address
              </h3>

              <p className="mt-3 text-xs font-medium text-[#101828]">
                {order.shippingAddress?.city || "Address unavailable"}
              </p>

              <p className="mt-1 text-[11px] text-[#6a7282]">
                {order.shippingAddress?.details || ""}
              </p>

              {order.shippingAddress?.phone && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[#6a7282]">
                  <Phone className="size-3" />
                  {order.shippingAddress.phone}
                </p>
              )}
            </section>

            <section className="rounded-xl border border-[#fde68a] bg-[#fef3c7] p-4">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#713f12]">
                <ReceiptText className="size-4 text-[#f59e0b]" />
                Order Summary
              </h3>

              <div className="space-y-2 text-[11px] text-[#6a7282]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString("en-US")} EGP</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping
                      ? `${shipping.toLocaleString("en-US")} EGP`
                      : "Free"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{tax.toLocaleString("en-US")} EGP</span>
                </div>

                <div className="flex justify-between border-t border-[#fcd34d] pt-2 font-semibold text-[#101828]">
                  <span>Total</span>
                  <span>{total.toLocaleString("en-US")} EGP</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </article>
  );
}
