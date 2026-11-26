"use client"

import { SessionProvider } from "next-auth/react"
import { WishlistProvider } from "@/context/WishlistProvider/WishlistWishlistProvider";

export default function MyProvider({children}:{children:React.ReactNode}) {
  return (
    <SessionProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </SessionProvider>
  )
}
