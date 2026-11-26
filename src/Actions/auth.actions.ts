 "use server"
import { loginSchemaType } from "@/Schema/auth/login.schema";
 import { registerSchemaType } from "@/Schema/auth/register.schema"

export async function registerPost(values:registerSchemaType){
    try{
const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup',{
    method:"POST",
    headers:{
        "content-type":"application/json"
    }
    ,
    body:JSON.stringify(values)
})
const data = await res.json();

if (!res.ok) {
  return {
    ok: false,
    message: data.message,
  };
}

return {
  ok: true,
  message: data.message,
};
    }
    catch(err){
        console.log(err)
    }
}




