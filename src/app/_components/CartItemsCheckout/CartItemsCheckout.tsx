import Image from "next/image";
import { CreditCard, LockKeyhole, ShieldCheck, Truck } from "lucide-react";
import type { CartProductType } from "@/Types/CartType/CartType.type";

type CartItemsCheckoutProps = {
  products: CartProductType[];
  total: number;
  paymentLoading: boolean;
};
const money = (value: number) => new Intl.NumberFormat("en-US").format(value);

export default function CartItemsCheckout({ products, total ,paymentLoading}: CartItemsCheckoutProps) {
  const itemCount = products.reduce((count, item) => count + item.count, 0);
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm" aria-label="Order summary">
      <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 text-white">
        <h2 className="flex items-center gap-2 text-lg font-bold"><LockKeyhole className="size-4.5" /> Order Summary</h2>
        <p className="mt-1 text-sm text-[#dcfce7]">{itemCount} items</p>
      </div>
      <div className="p-5">
        <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
          {products.map(({ _id, count, product, price }) => {
            const unitPrice = product.priceAfterDiscount ?? price;
            return <article key={_id} className="flex min-h-20 items-center gap-3 rounded-xl bg-[#f9fafb] p-3">
              <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-1.5"><Image src={product.imageCover} alt={product.title} width={48} height={48} className="size-full object-contain" /></div>
              <div className="min-w-0 flex-1"><h3 className="line-clamp-1 text-sm font-medium text-[#101828]">{product.title}</h3><p className="mt-1 text-xs text-[#6a7282]">{count} × {money(unitPrice)} EGP</p></div>
              <strong className="shrink-0 text-sm text-[#101828]">{money(unitPrice * count)}</strong>
            </article>;
          })}
        </div>
        <div className="mt-4 space-y-3 border-t border-[#f3f4f6] pt-4 text-sm">
          <div className="flex justify-between text-[#4a5565]"><span>Subtotal</span><span>{money(total)} EGP</span></div>
          <div className="flex justify-between text-[#4a5565]"><span className="inline-flex items-center gap-2"><Truck className="size-4 text-[#99a1af]" /> Shipping</span><strong className="text-[#00a63e]">FREE</strong></div>
          <div className="flex items-center justify-between border-t border-[#f3f4f6] pt-3"><strong className="text-base">Total</strong><p className="m-0 text-right"><strong className="text-xl text-[#16a34a]">{money(total)}</strong> <span className="text-xs text-[#6a7282]">EGP</span></p></div>
        </div>
<button
  type="submit"
  disabled={paymentLoading}
  className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] text-sm font-semibold text-white shadow-lg shadow-green-700/15 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
>
  {paymentLoading ? (
    <>
      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      Processing...
    </>
  ) : (
    <>
      <LockKeyhole className="size-4" />
      Place Order
    </>
  )}
</button>
        <div className="mt-4 flex items-center justify-center gap-3 text-[11px] text-[#6a7282]"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3 text-[#16a34a]" /> Secure</span><i className="h-4 w-px bg-[#e5e7eb]" /><span className="inline-flex items-center gap-1.5"><Truck className="size-3 text-[#2b7fff]" /> Fast Delivery</span><i className="h-4 w-px bg-[#e5e7eb]" /><span className="inline-flex items-center gap-1.5"><CreditCard className="size-3 text-[#f97316]" /> Easy Returns</span></div>
      </div>
    </aside>
  );
}
