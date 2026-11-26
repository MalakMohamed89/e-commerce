"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ArrowLeft, Banknote, Check, CreditCard, ClipboardList,ShieldCheck } from "lucide-react";
import { getProductsInCart } from "@/Actions/cart.actions";
import type { CartData } from "@/Types/CartType/CartType.type";
import CartItemsCheckout from "@/app/_components/CartItemsCheckout/CartItemsCheckout";
import ShippingAddress from "@/app/_components/ShippingAddress/ShippingAddress";
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, checkoutSchemaType } from "@/Schema/checkout/checkout.schema";
import { useParams, useRouter } from "next/navigation";
import { onlinePayment,cashPayment } from "@/Actions/checkout.actions";
import { toast } from "@/components/ui/toast";
import { AddressType } from "@/app/_components/AddressCard/AddressCard";
import { addUserAddress, getUserAllAddress, removeUserAddress } from "@/Actions/userAddress.actions";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
const [paymentLoading, setPaymentLoading] = useState(false);

const [addresses, setAddresses] = useState<AddressType[]>([]);
const [selectedAddressId, setSelectedAddressId] = useState("");
const [useSavedAddress, setUseSavedAddress] = useState(true);
const [addressLoading, setAddressLoading] = useState(false);
const {id}:{id:string}=useParams()

const router=useRouter()
  async function getAddresses() {
    try {
      const res = await getUserAllAddress();
     console.log("ressss",res)
      if (res.status === "success") {
   setAddresses(res.data)
      }
    } catch {
      toast.add({
        title: "Couldn't load saved addresses",
        type: "error",
      });
    }
  }
function selectAddress(address: AddressType) {
  setSelectedAddressId(address._id);
  setUseSavedAddress(true);

  form.setValue("city", address.city, { shouldValidate: true });
  form.setValue("details", address.details, { shouldValidate: true });
  form.setValue("phone", address.phone, { shouldValidate: true });
}

function selectNewAddress() {
  setUseSavedAddress(false);
  setSelectedAddressId("");

  form.reset({
    city: "",
    details: "",
    phone: "",
  });
}

  const form = useForm<checkoutSchemaType>(
    {
    defaultValues: { city: "", details: "", phone: "" },
    resolver:zodResolver(checkoutSchema),
    mode: "onChange",
  });

  useEffect(() => {
    getProductsInCart()
      .then((response) => { if (response?.status === "success") setCart(response.data); })
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
      getAddresses()
  }, []);

const { handleSubmit } = form;

function handleCheckoutSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (useSavedAddress && !selectedAddressId) {
    toast.add({
      title: "Please select a shipping address",
      type: "error",
    });
    return;
  }

  handleSubmit(mySubmit)();
}

async function mySubmit(data: checkoutSchemaType) {
  try {
    setPaymentLoading(true);

    let shippingAddress = data;

    // if we use an saved address
    if (useSavedAddress) {
      const selectedAddress = addresses.find(
        (address) => address._id === selectedAddressId
      );

      if (!selectedAddress) {
        toast.add({
          title: "Please select a shipping address",
          type: "error",
        });
        return;
      }

      shippingAddress = {
        city: selectedAddress.city,
        details: selectedAddress.details,
        phone: selectedAddress.phone,
      };
    }

    // if we  use to add new address
    else {
      setAddressLoading(true);

      const addressResponse = await addUserAddress(
        data.city,
        data.details,
        data.phone
      );
console.log("addressResponse",addressResponse)
      if (addressResponse.status !== "success") {
        toast.add({
          title: addressResponse.message || "Failed to save address",
          type: "error",
        });
        return;
      }

      setAddresses(addressResponse.data);

const savedAddress = addressResponse.data.find(
  (address: AddressType) =>
    address.city === data.city &&
    address.details === data.details &&
    address.phone === data.phone
);

if (savedAddress) {
  setSelectedAddressId(savedAddress._id);
  setUseSavedAddress(true);
}

      setAddressLoading(false);
    }


    // checkout & paymentMethod
    if (paymentMethod === "online") {
      const res = await onlinePayment(id, "", shippingAddress);

      if (res.status === "success") {
        window.location.href = res.session.url;
        // console.log("done")
      } else {
        toast.add({
          title: res.message || "Payment failed!",
          type: "error",
        });
      }
} else {
  // Cash on Delivery
  const res = await cashPayment(
    id,
    shippingAddress.details,
    shippingAddress.phone,
    shippingAddress.city
  );

  if (res.status === "success") {
    router.push("/allorders")
    toast.add({
      title: "Order placed successfully!",
      type: "success",
    });
  } else {
    toast.add({
      title: res.message || "Failed to place order",
      type: "error",
    });
  }
}
  } catch (error) {
    toast.add({
      title: "Something went wrong!",
      type: "error",
    });
  } finally {
    setPaymentLoading(false);
    setAddressLoading(false);
  }
}

async function handleDeleteAddress(addressId: string) {
  try {
    const res = await removeUserAddress(addressId);

    if (res.status === "success") {
      setAddresses((prev) =>
        prev.filter((address) => address._id !== addressId)
      );

      if (selectedAddressId === addressId) {
        setSelectedAddressId("");
        setUseSavedAddress(false);

        form.reset({
          city: "",
          details: "",
          phone: "",
        });
      }

      toast.add({
        title: "Address deleted successfully",
        type: "success",
      });
    }
  } catch {
    toast.add({
      title: "Failed to delete address",
      type: "error",
    });
  }
}


  const products = cart?.products ?? [];

  return (
    <main className="flex-1 bg-linear-to-b from-[#f9fafb] to-white pb-16 text-[#101828]">
      <div className="mx-auto w-full max-w-384 px-4 py-8">
        <div className="mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#6a7282]">
            <Link href="/" className="transition hover:text-[#15803d]">Home</Link><span className="text-[#d1d5dc]">/</span>
            <Link href="/cart" className="transition hover:text-[#15803d]">Cart</Link><span className="text-[#d1d5dc]">/</span>
            <span aria-current="page" className="text-[#101828]">Checkout</span>
          </nav>
          <div className="mt-6 flex items-center justify-between gap-5 max-sm:items-start">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#16a34a] to-[#15803d] text-white shadow-md shadow-green-700/20"><ClipboardList className="size-6" /></span>
              <div><h1 className="text-3xl font-bold leading-9 tracking-tight max-sm:text-2xl">Complete Your Order</h1><p className="mt-1 text-sm text-[#6a7282]">Review your items and complete your purchase</p></div>
            </div>
            <Link href="/cart" className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#16a34a] transition hover:bg-[#f0fdf4]"><ArrowLeft className="size-4" /> Back to Cart</Link>
          </div>
        </div>

        {loading ? (
          <div className="grid min-h-80 place-items-center rounded-2xl border border-[#e5e7eb] bg-white"><div className="size-10 animate-spin rounded-full border-4 border-[#d1d5dc] border-t-[#16a34a]" /></div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-[#e5e7eb] bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="text-xl font-semibold">Your cart is empty</h2><p className="mt-2 text-sm text-[#6a7282]">Add something to your cart before checking out.</p>
            <Link href="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16a34a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d]">Browse products</Link>
          </div>
        ) : (
<form onSubmit={handleCheckoutSubmit} className="grid items-start gap-6 lg:grid-cols-[minmax(0,2.0667fr)_minmax(0,1fr)] lg:gap-8">
            <div className="grid content-start gap-6">
<ShippingAddress
  form={form}
  addresses={addresses}
  selectedAddressId={selectedAddressId}
  useSavedAddress={useSavedAddress}
  onSelectAddress={selectAddress}
  onAddNewAddress={selectNewAddress}
  onDeleteAddress={handleDeleteAddress}
/>
              <section className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm" aria-labelledby="payment-method-title">
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 text-white"><h2 id="payment-method-title" className="flex items-center gap-2 text-lg font-semibold"><CreditCard className="size-4.5" /> Payment Method</h2><p className="mt-1 text-sm text-[#dcfce7]">Choose how you&apos;d like to pay</p></div>
                <div className="grid gap-3 p-6 max-sm:p-4">
                  <button type="button" aria-pressed={paymentMethod === "cash"} onClick={() => setPaymentMethod("cash")} className={`flex min-h-25 items-center gap-4 rounded-xl border p-4 text-left transition ${paymentMethod === "cash" ? "border-[#16a34a] bg-linear-to-r from-[#f0fdf4] to-[#f9fafb] shadow-sm" : "border-[#e5e7eb] bg-white hover:border-[#86efac]"}`}>
                    <span className={`grid size-14 shrink-0 place-items-center rounded-xl shadow-md ${paymentMethod === "cash" ? "bg-[#16a34a] text-white shadow-green-700/20" : "bg-[#f3f4f6] text-[#99a1af]"}`}><Banknote className="size-6" /></span>
                    <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#101828]">Cash on Delivery</strong><span className="mt-1 block text-sm text-[#6a7282]">Pay when your order arrives at your doorstep</span></span>
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full ${paymentMethod === "cash" ? "bg-[#16a34a] text-white" : "border-2 border-[#e5e7eb] bg-white"}`}>{paymentMethod === "cash" && <Check className="size-4" />}</span>
                  </button>
                  <button type="button" aria-pressed={paymentMethod === "online"} onClick={() => setPaymentMethod("online")} className={`flex min-h-29 items-center gap-4 rounded-xl border p-4 text-left transition ${paymentMethod === "online" ? "border-[#16a34a] bg-linear-to-r from-[#f0fdf4] to-[#f9fafb] shadow-sm" : "border-[#e5e7eb] bg-white hover:border-[#86efac]"}`}>
                    <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${paymentMethod === "online" ? "bg-[#16a34a] text-white shadow-md shadow-green-700/20" : "bg-[#f3f4f6] text-[#99a1af]"}`}><CreditCard className="size-6" /></span>
                    <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#101828]">Pay Online</strong><span className="mt-1 block text-sm text-[#6a7282]">Secure payment with Credit/Debit Card via Stripe</span><span className="mt-2 flex gap-1.5"><i className="rounded bg-[#1a1f71] px-1 text-[8px] font-bold not-italic text-white">VISA</i><i className="rounded bg-[#eb001b] px-1 text-[8px] font-bold not-italic text-white">MC</i><i className="rounded bg-[#2557d6] px-1 text-[8px] font-bold not-italic text-white">AMEX</i></span></span>
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full ${paymentMethod === "online" ? "bg-[#16a34a] text-white" : "border-2 border-[#e5e7eb] bg-white"}`}>{paymentMethod === "online" && <Check className="size-4" />}</span>
                  </button>
                  <div className="mt-1 flex items-center gap-3 rounded-xl bg-linear-to-r from-[#f0fdf4] to-[#f9fafb] p-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-[#16a34a]"><ShieldCheck className="size-5 fill-[#16a34a] text-white" /></span><div><p className="text-xs font-medium text-[#008236]">Secure &amp; Encrypted</p><p className="mt-0.5 text-[11px] text-[#00a63e]">Your payment info is protected with 256-bit SSL encryption</p></div></div>
                </div>
              </section>
            </div>
            <div className="lg:sticky lg:top-6">
<CartItemsCheckout
  products={products}
  total={cart?.totalCartPrice ?? 0}
  paymentLoading={paymentLoading}
/>
</div>
          </form>
        )}
      </div>
    </main>
  );
}
