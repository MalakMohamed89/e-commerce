
"use client";

import { getProductsInCart } from "@/Actions/cart.actions";
import { CartProductType } from "@/Types/CartType/CartType.type";
import { createContext, ReactNode, useEffect, useState } from "react";

type CartContextType = {
  numberOfCartItems: number;
  setnumberOfCartItems: (num: number) => void;
  cartProducts: CartProductType[];
  getUserCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
  numberOfCartItems: 0,
  setnumberOfCartItems(num: number) {},
  cartProducts: [],
  getUserCart: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numberOfCartItems, setnumberOfCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);

  async function getUserCart() {
    try {
      const res = await getProductsInCart();

      const products = res.data.products;

      setCartProducts(products);

      let sum = 0;
      products.forEach((product: CartProductType) => {
        sum += product.count;
      });

      setnumberOfCartItems(sum);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        getUserCart,
        numberOfCartItems,
        setnumberOfCartItems,
        cartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
