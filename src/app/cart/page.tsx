"use client"
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck, ShoppingCart, Tag, Trash2, Truck } from "lucide-react";
import CardProductCart from "../_components/CardProductCart/CardProductCart";
import { getProductsInCart, removeSpecificProduct, updateCartProduct,clearAllCart, applyCouponToCart } from "@/Actions/cart.actions";
import { toast } from "@/components/ui/toast";
import { useContext, useEffect, useState } from "react";
import { CartData} from "@/Types/CartType/CartType.type";
import CouponModel from "../_components/CouponModel/CouponModel";
import { CartContext } from "@/context/cartContext/cartContext";


export default   function CartPage() {
const [cartData,setcartData]=useState<CartData |null>(null)
const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
const [isDisabled, setIsDisabled] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [cartId,setcartId]=useState(null)

const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const {numberOfCartItems,setnumberOfCartItems}=useContext(CartContext)
  

async function getCartProducts(){

      try {

          setIsLoading(true);

  const res=await getProductsInCart()
// console.log("dataaaaaaa",res)

      if (res.status === "success") {
   setcartData(res.data)

   setcartId(res.cartId)
        toast.add({
          title: res.message,
          type: "success",
        });
      } else {
        toast.add({
          title: res?.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch {
      toast.add({
        title: "Something went wrong!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

async function updateQuantityProduct(productId: string, newCount: number,sign:string) {

  try {
    setLoadingProductId(productId);
    setIsDisabled(true);
    const res = await updateCartProduct(productId, newCount);

    if (res.status === "success") {
      setcartData(res.data);
      toast.add({
        title: "Cart updated successfully",
        type: "success",
      });
if(sign==="+"){
  setnumberOfCartItems(numberOfCartItems+1)
}else{
    setnumberOfCartItems(numberOfCartItems-1)
}
      
    } else {
      toast.add({
        title: res.message || "Failed to update cart",
        type: "error",
      });
    }
  } catch {
    toast.add({
      title: "Something went wrong!",
      type: "error",
    });
  } finally {
    setLoadingProductId(null);
        setIsDisabled(false);
  }
}


async function removeProduct(productId: string,count:number) {

  try {
    setIsDisabled(true);
    const res = await removeSpecificProduct(productId);

    if (res.status === "success") {
      setcartData(res.data);
      toast.add({
        title:  res.message|| "product removed successfully",
        type: "success",
      });
      setnumberOfCartItems(numberOfCartItems-count)
    } else {
      toast.add({
        title: res.message || "Failed to remove product",
        type: "error",
      });
    }
  } catch {
    toast.add({
      title: "Something went wrong!",
      type: "error",
    });
  } finally {
        setIsDisabled(false);
  }
}




async function clearAllProductsCart() {

  try {
    setIsDisabled(true);
    const res = await clearAllCart();

    if (res.status === "success") {
      setcartData(res.data);
      toast.add({
        title:  res.message|| "Cart Cleared successfully",
        type: "success",
      });
          setnumberOfCartItems(0)
    } else {
      toast.add({
        title: res.message || "Failed to clear cart",
        type: "error",
      });
    }
  } catch {
    toast.add({
      title: "Something went wrong!",
      type: "error",
    });
  } finally {
        setIsDisabled(false);
  }
}

async function handleApplyCoupon(couponCode: string) {
  const trimmedCoupon = couponCode.trim();

  if (!trimmedCoupon) {
    toast.add({
      title: "Please enter a coupon code",
      type: "error",
    });
    return;
  }

  try {
    setIsDisabled(true);

    const res = await applyCouponToCart(trimmedCoupon);

    if (res.status === "success") {
      setcartData(res.data);

      toast.add({
        title: res.message || "Coupon applied successfully",
        type: "success",
      });

      setIsPromoModalOpen(false);
    } else {
      toast.add({
        title: res.message || "Invalid coupon code",
        type: "error",
      });
    }
  } catch {
    toast.add({
      title: "Something went wrong!",
      type: "error",
    });
  } finally {
    setIsDisabled(false);
  }
}


useEffect(()=>{
 getCartProducts()
},[])

const itemCount = cartData?.products.length;
const subtotal = cartData?.totalCartPrice ?? 0;
const money = new Intl.NumberFormat("en-US").format(subtotal);


if (isLoading) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f9fafb]">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 animate-spin rounded-full border-4 border-[#d1d5dc] border-t-[#16a34a]" />
        <p className="text-sm font-medium text-[#6a7282]">
          Loading your cart...
        </p>
      </div>
    </main>
  );
}



return cartData && cartData.products.length > 0 ? (
    <main className="flex-1 bg-[#f9fafb] py-8 pb-19.5 text-[#101828] max-md:py-6 max-md:pb-12">
      <div className="mx-auto w-full max-w-384">
        <div className="mx-4 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm leading-5 text-[#6a7282]">
            <Link className="hover:text-[#15803d]" href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#101828]">Shopping Cart</span>
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#16a34a] to-[#15803d] text-white shadow-md shadow-green-700/20"><ShoppingCart aria-hidden="true" className="size-7.5 stroke-[2.5]" /></span>
            <div>
              <h1 className="m-0 text-7.5 font-bold leading-9 max-md:text-2xl max-md:leading-8">Shopping Cart</h1>
              <p className="mt-1 text-sm leading-5 text-[#6a7282] max-md:mt-0 max-md:text-xs max-md:leading-4.5">You have <strong className="font-semibold text-[#16a34a]">{itemCount} items</strong> in your cart</p>
            </div>
          </div>
        </div>

        <div className="mx-4 grid grid-cols-[minmax(0,2.0667fr)_minmax(0,1fr)] items-start gap-8 max-[1199px]:gap-6.75 max-md:grid-cols-1 max-md:gap-6">
          <section aria-label="Cart items" className="min-w-0">
            <div className="grid gap-4">
{cartData?.products.map((product) => (
  <CardProductCart
    key={product._id}
    product={product}
    updateQuantityProduct={updateQuantityProduct}
    isUpdating={loadingProductId === product.product._id}
      isDisabled={isDisabled}
      removeSpecificProduct={removeProduct}
  />
))}
            </div>
            <div className="mt-6 flex min-h-11.25 items-end justify-between border-t border-[#e5e7eb] pt-6 text-sm leading-5">
              <Link className="inline-flex items-center gap-2 text-[#16a34a] hover:text-[#15803d]" href="/products"><ArrowLeft aria-hidden="true" className="size-3.5" /> Continue Shopping</Link>
              <button onClick={clearAllProductsCart} className="inline-flex cursor-pointer items-center gap-2 text-xs text-[#99a1af] hover:text-red-600 transition-all duration-300"><Trash2 aria-hidden="true" className="size-3" /> Clear all items</button>
            </div>
          </section>

          <aside aria-label="Order summary" className="sticky top-4 overflow-hidden rounded-2xl border border-[#f3f4f6] bg-white shadow-sm max-md:static">
            <div className="min-h-21 bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 text-white">
              <h2 className="m-0 flex items-center gap-2 text-lg font-bold leading-7"><LockKeyhole aria-hidden="true" className="size-4.5 stroke-[2.5]" /> Order Summary</h2>
              <p className="mt-1 text-sm leading-5 text-[#dcfce7]">{itemCount} items in your cart</p>
            </div>
            <div className="flex flex-col gap-5 p-6 max-[380px]:px-4">
              <div className="flex min-h-19 items-center gap-3 rounded-xl bg-linear-to-r from-[#f0fdf4] to-[#f3f4f6] p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-[#00a63e]"><Truck aria-hidden="true" className="size-5" /></span>
                <div className="flex min-w-0 flex-col"><strong className="text-base font-semibold leading-6 text-[#008236]">Free Shipping!</strong><span className="text-sm leading-5 text-[#00a63e]">You qualify for free delivery</span></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-base leading-6 text-[#4a5565]"><span>Subtotal</span><strong className="font-medium text-[#101828]">{money} EGP</strong></div>
                <div className="flex items-center justify-between text-base leading-6 text-[#4a5565]"><span>Shipping</span><strong className="font-medium text-[#00a63e]">FREE</strong></div>
                <div className="flex items-center justify-between border-t border-dashed border-[#e5e7eb] pt-3.25 text-base leading-6"><strong className="font-semibold">Total</strong><p className="m-0 flex items-baseline gap-1"><strong className="text-2xl font-bold leading-8">{money}</strong><span className="text-sm leading-5 text-[#6a7282]">EGP</span></p></div>
              </div>
<button
  onClick={() => setIsPromoModalOpen(true)}
  disabled={isDisabled}
  className="flex min-h-11.5 cursor-pointer w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#d1d5dc] text-sm leading-5 text-[#4a5565] transition hover:border-[#16a34a] hover:text-[#16a34a] disabled:cursor-not-allowed disabled:opacity-50"
>
  <Tag aria-hidden="true" className="size-3.75 fill-[#4a5565]" />
  Apply Promo Code
</button>
{isPromoModalOpen &&
<CouponModel
  isOpen={isPromoModalOpen}
  onClose={() => setIsPromoModalOpen(false)}
  onApply={handleApplyCoupon}
/>
}
<Link href={`/checkout/${cartId}`} >
  <button className="flex cursor-pointer min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#16a34a] to-[#15803d] text-base font-semibold leading-6 text-white shadow-lg shadow-green-700/20"><LockKeyhole aria-hidden="true" className="size-4 fill-white" /> Secure Checkout</button>
</Link>
              <div className="flex min-h-8 items-center justify-center gap-4 py-2 text-xs leading-4 text-[#6a7282]">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><ShieldCheck aria-hidden="true" className="size-3 text-[#00c950]" /> Secure Payment</span>
                <i aria-hidden="true" className="h-4 w-px bg-[#e5e7eb]" />
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap"><Truck aria-hidden="true" className="size-3 text-[#2b7fff]" /> Fast Delivery</span>
              </div>
              <Link className="block py-2 text-center text-sm leading-5 text-[#16a34a] hover:text-[#15803d]" href="/products">← Continue Shopping</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  ):(<main className="flex min-h-screen items-center justify-center bg-[#f9fafb] px-4">
  <div className="w-full max-w-lg rounded-3xl border border-[#e5e7eb] bg-white px-6 py-12 text-center shadow-sm">
    <div className="mx-auto mb-6 grid size-24 place-items-center rounded-full bg-[#f0fdf4]">
      <ShoppingCart className="size-11 text-[#16a34a]" strokeWidth={1.5} />
    </div>

    <h2 className="text-3xl font-bold text-[#101828]">
      Your Cart is Empty
    </h2>

    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#6a7282]">
      Looks like you haven't added anything to your cart yet.
      Explore our collection and find something you'll love!
    </p>

    <Link
      href="/products"
      className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-8 text-sm font-semibold text-white transition hover:bg-[#15803d]"
    >
      <ShoppingCart className="size-4" />
      Start Shopping
    </Link>
  </div>
</main>)
}
