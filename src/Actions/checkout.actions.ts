"use server"
import { checkoutSchemaType } from "@/Schema/checkout/checkout.schema";
import { getMyToken } from "@/utils/getMyToken";

export async function onlinePayment(cartId:string,url:string=process.env.NEXTAUTH_URL!,formValues:checkoutSchemaType){

try{
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

const res =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
    method:"POST",
    headers:{
             "content-type":"application/json",
             token:token as string,
    },
    body: JSON.stringify({shippingAddress:formValues})
})

const data=await res.json()

return data

}catch(err){
   return err
}

}

export async function cashPayment(cartId:string, details:string,phone:string ,city:string){

try{
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

const res =await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{
    method:"POST",
    headers:{
             "content-type":"application/json",
             token:token as string,
    },
    body: JSON.stringify({shippingAddress: {
    details: details,
    phone: phone,
    city: city,
    postalCode: "12345"
  }})
})

const data=await res.json()

return data

}catch(err){
   return err
}

}

