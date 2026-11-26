"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaTruck,
  FaGift,
  FaCartShopping,
  FaRegAddressCard,
FaUserPlus 
} from "react-icons/fa6";
import {
  FiPhone,
  FiMail,
  FiUser,
  FiLogOut,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiHeadphones,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/context/cartContext/cartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
];

const categories = [
  { label: "All Categories", href: "/categories" },
  { label: "Electronics", href: "/categories/productsOnCategory/6439d2d167d9aa4ca970649f" },
  { label: "Women's Fashion", href: "/categories/productsOnCategory/6439d58a0049ad0b52b9003f" },
  { label: "Men's Fashion", href: "/categories/productsOnCategory/6439d5b90049ad0b52b90048" },
  { label: "Beauty & Health", href: "/categories/productsOnCategory/6439d30b67d9aa4ca97064b1" },
];

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
const [catOpen, setCatOpen] = useState(false);

const {status,data}=useSession()

function handleLogOut(){
  signOut({redirect:true,callbackUrl:"/signIn"})
}

const {numberOfCartItems,setnumberOfCartItems}=useContext(CartContext)

const name = data?.user?.name;
  return (
<header className="sticky top-0 z-50  md:-top-10">
      {/* ===== Top bar (desktop only) ===== */}
      <div className="hidden border-b border-gray-100 bg-gray-50 text-sm text-gray-600 md:block">
        <div className="mx-auto flex h-10 max-w-376 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaTruck className="text-green-600" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-2">
              <FaGift className="text-green-600" />
              New Arrivals Daily
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <FiPhone />
              +1 (800) 123-4567
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <FiMail />
              support@freshcart.com
            </a>

            <span className="h-4 w-px bg-gray-200" />
{status==="authenticated"?
<><Link
              href="/account"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <FiUser />
             {name?name:""}
            </Link> 
             <button
              type="button"
              onClick={()=>handleLogOut()}
              className="flex items-center cursor-pointer gap-2 hover:text-green-600"
            >
              <FiLogOut />
              Sign Out
            </button> </>
:<>
 <Link href="/signin">
           <button
              type="button"
              className="flex items-center cursor-pointer gap-2 hover:text-green-600"
            >
              <FiUser />
              Sign In
            </button>
 
 </Link>
<Link href="/signup">

      <button
              type="button"
              className="flex items-center cursor-pointer gap-2 hover:text-green-600"
            >
             <FaUserPlus />
              Sign Up
            </button>
</Link>

</>}
            



          </div>
        </div>
      </div>

      {/* ===== Main navbar ===== */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-18 max-w-376 items-center gap-4 px-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <FaCartShopping className="text-3xl text-green-600" />
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              FreshCart
            </span>
          </Link>

          {/* Search (desktop) */}
          <form
            role="search"
            action="/search"
            method="get"
            className="relative hidden max-w-170 flex-1 md:block"
          >
            <Input
              type="search"
              name="q"
              placeholder="Search for products, brands and more..."
              className="h-11 rounded-full border-gray-200 bg-gray-50 pl-5 pr-14 shadow-sm placeholder:text-gray-400 focus-visible:ring-green-600"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Search"
              className="absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-full bg-green-600 text-white hover:bg-green-700"
            >
              <FiSearch className="size-4" />
            </Button>
          </form>

          {/* Links (desktop) */}
          <nav className="hidden items-center gap-6 text-[15px] font-medium text-gray-900 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-green-600"
              >
                {link.label}
              </Link>
            ))}
<DropdownMenu open={catOpen} onOpenChange={setCatOpen}>
  <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer outline-none transition-colors hover:text-green-600">
    Categories
    <FiChevronDown
      className={`text-sm transition-transform duration-200 ${
        catOpen ? "rotate-180" : ""
      }`}
    />
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="start"
    className="bg-white border border-gray-100 shadow-lg rounded-lg p-1"
  >
    {categories.map((cat) => (
      <DropdownMenuItem
        key={cat.href}
        onClick={() => router.push(cat.href)}
        className="
          cursor-pointer rounded-md p-2
          bg-white text-gray-700
          border-0 outline-none
          hover:bg-green-50 hover:text-green-700
          focus:bg-green-50 focus:text-green-700
          focus-visible:outline-none

        "
      >
        {cat.label}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

            <Link
              href="/brands"
              className="transition-colors hover:text-green-600"
            >
              Brands
            </Link>
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-5">
            <div className="hidden items-center gap-3 xl:flex">
              <span className="flex size-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                <FiHeadphones className="text-lg" />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-gray-500">Support</p>
                <p className="text-sm font-semibold text-gray-900">24/7 Help</p>
              </div>
            </div>

            <span className="hidden h-9 w-px bg-gray-200 xl:block" />

            <div className="flex items-center gap-5 text-gray-700">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="transition-colors hover:text-green-600"
              >
                <FiHeart className="size-6" />
              </Link>
<Link
  href="/cart"
  aria-label="Cart"
  className="relative transition-colors hover:text-green-600"
>
  <FiShoppingCart className="size-6" />

  {numberOfCartItems > 0 && (
    <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-green-600 text-[11px] font-bold text-white">
      {numberOfCartItems}
    </span>
  )}
</Link>
   
{status==="authenticated"?<>
           <Link
                href="/account"
                aria-label="Account"
                className="hidden transition-colors hover:text-green-600 lg:block"
              >
                <FaRegAddressCard className="size-6" />
              </Link>
</>:<>

<Link href={"/signIn"} >
           <Button
              type="button"
              className="flex items-center rounded-full cursor-pointer w-26.75 h-10 gap-2 bg-[#16A34A] text-white py-2.5 px-5 hover:-translate-y-1.5 transition-all duration-300"
            >
              <FiUser />
              Sign In
            </Button> 

</Link>
</>}



              {/* Hamburger (mobile + tablet) */}
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700 lg:hidden"
              >
                <FiMenu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile side menu ===== */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-[85%] flex-col gap-0 overflow-y-auto bg-white p-0 sm:max-w-sm"
        >
          <SheetHeader className="flex-row items-center border-b border-gray-100 px-6 py-4">
            <Link href="/" onClick={close} className="flex items-center gap-2">
              <FaCartShopping className="text-2xl text-green-600" />
              <SheetTitle className="text-xl font-bold text-gray-900">
                FreshCart
              </SheetTitle>
            </Link>
            <SheetDescription className="sr-only">
              Site navigation menu
            </SheetDescription>
          </SheetHeader>

          <form
            role="search"
            action="/search"
            method="get"
            onSubmit={close}
            className="relative border-b border-gray-100 px-6 py-4"
          >
            <Input
              type="search"
              name="q"
              placeholder="Search products..."
              className="h-11 rounded-xl border-gray-200 bg-gray-50 pr-14 focus-visible:ring-green-600"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Search"
              className="absolute cursor-pointer right-7.5 top-1/2 size-8 -translate-y-1/2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              <FiSearch className="size-4" />
            </Button>
          </form>

          <nav className="flex flex-col border-b border-gray-100 px-6 py-2">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="py-4 text-base font-medium text-gray-800 transition-colors hover:text-green-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-6">
            <Link
              href="/wishlist"
              onClick={close}
              className="flex items-center gap-4 font-medium text-gray-800"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                <FiHeart className="size-5" />
              </span>
              Wishlist
            </Link>
<Link
  href="/cart"
  onClick={close}
  className="flex items-center gap-4 font-medium text-gray-800"
>
  <span className="relative flex size-11 items-center justify-center rounded-full bg-green-50 text-green-600">
    <FiShoppingCart className="size-5" />

    {numberOfCartItems > 0 && (
      <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-green-600 text-[11px] font-bold text-white">
        {numberOfCartItems}
      </span>
    )}
  </span>
  Cart
</Link>
          </div>

<div className="mt-auto space-y-5 border-t border-gray-100 px-6 py-6">
  <div className="grid grid-cols-2 gap-3">
    {status === "authenticated" ? (
      <>
        <Link
          href="/account"
          onClick={close}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 text-base font-semibold text-white transition-colors hover:bg-green-700"
        >
          <FiUser />
          My Account
        </Link>

        <button
          type="button"
          onClick={() => {
            close();
            handleLogOut();
          }}
          className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-green-600 text-base font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          <FiLogOut />
          Sign Out
        </button>
      </>
    ) : (
      <>
        <Link
          href="/signin"
          onClick={close}
          className="flex h-12 items-center justify-center rounded-xl bg-green-600 text-base font-semibold text-white transition-colors hover:bg-green-700"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          onClick={close}
          className="flex h-12 items-center justify-center rounded-xl border-2 border-green-600 text-base font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Sign Up
        </Link>
      </>
    )}
  </div>

  {/* Contact Support */}
  <a
    href="mailto:support@freshcart.com"
    onClick={close}
    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-colors hover:bg-green-50"
  >
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
      <FiHeadphones className="size-5" />
    </span>

    <div>
      <p className="font-semibold text-gray-800">Need Help?</p>
      <p className="text-green-600">Contact Support</p>
    </div>
  </a>
</div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
