"use server"
import { getMyToken } from "@/utils/getMyToken"


export async function addUserAddress(city:string,details:string,phone:string) {

try{
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

const res =await fetch("https://ecommerce.routemisr.com/api/v1/addresses",{
    method:"POST",
    headers:{
             "content-type":"application/json",
             token:token as string,
    },
    body: JSON.stringify({name:"home",city:city,details:details,phone:phone})
})

const data=await res.json()

return data

}catch(err){
   throw err;
}
}


export async function removeUserAddress(addressId:string) {

try{
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

const res =await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,{
    method:"DELETE",
    headers:{
    
             token:token as string,
    },

})

const data=await res.json()

return data

}catch(err){
   throw err;
}
}


export async function getUserSpecificAddress(addressId:string) {

try{
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

const res =await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,{
    method:"GET",
    headers:{
    
             token:token as string,
    },

})

const data=await res.json()

return data

}catch(err){
   throw err;
}
}


export async function getUserAllAddress() {

try{
const token=await getMyToken()
if(!token){
    throw new Error("please login first!")
}

const res =await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`,{
    method:"GET",
    headers:{
             token:token as string,
    },

})

const data=await res.json()

return data

}catch(err){
   throw err;
}
}