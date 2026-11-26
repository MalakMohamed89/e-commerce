"use server"
import { getMyToken } from "@/utils/getMyToken";

export async function addProductToCart(productID: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("please login first!");
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId: productID }),
    });

    return await res.json();
  } catch (err) {
 return { status: "error", message: "please login first!" };
  }
}

export async function getProductsInCart() {
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

try{
const res =await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
    method:"GET",
    headers:{
             token:token as string,
    },
})

const data=await res.json()

return data

}catch(err){
    console.log(err)
}
}

 export async function updateCartProduct(productID:string,countOfProduct:number) {
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

try{
const res =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productID}`,{
    method:"PUT",
    headers:{
             "content-type":"application/json",
             token:token as string,
    },
    body: JSON.stringify({count:countOfProduct})
})

const data=await res.json()

return data

}catch(err){
    console.log(err)
}
}

export async function removeSpecificProduct(productID:string) {
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

try{
const res =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productID}`,{
    method:"DELETE",
    headers:{
             token:token as string,
    },

})

const data=await res.json()

return data

}catch(err){
    console.log(err)
}
}

export async function clearAllCart() {
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

try{
const res =await fetch(`https://ecommerce.routemisr.com/api/v2/cart`,{
    method:"DELETE",
    headers:{
             token:token as string,
    },

})

const data=await res.json()

return data

}catch(err){
    console.log(err)
}
}

export async function applyCouponToCart(couponName:string) {
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

try{
const res =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/applyCoupon`,{
    method:"PUT",
    headers:{
               "content-type":"application/json",
             token:token as string,
    },
    body: JSON.stringify({couponName:couponName})
})

const data=await res.json()

return data

}catch(err){
    console.log(err)
}
}