 import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";

 export const authOptions:NextAuthOptions  = {

    providers:[
        Credentials({
            name:"login",
            credentials:{
                email:{label:"Email",type:"email",placeholder:"Enter your email"},
                    password:{label:"Password",type:"password",placeholder:"Enter your password"},

            },
async authorize(credentials,req){

    try{
const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin',{
    method:"POST",
    headers:{
        "content-type":"application/json"
    }
    ,
    body: JSON.stringify({
        email:credentials?.email,
        password:credentials?.password
    })
})
const data = await res.json();

if (!res.ok) {
    throw new Error(data.message)
}

// console.log("responseeeeee",data)
const jwt:{ id:string }=jwtDecode(data.token)

return {
  name: data.user.name,
  email:data.user.email,
  id:jwt.id,
  accessToken:data.token,
    } }
    catch(err){
        console.log(err)
        throw new Error((err as Error).message)
    }
            
           }
        })
        

    ],
    callbacks:{
// recive obj from authorize function and return obj to session
    async jwt(param){
// console.log("jwttttttt",param)
        if(param.user){

             param.token.routeToken=param.user.accessToken
            param.token.id=param.user.id
       }
            return param.token
        },
           
// recive obj from jwt function and return obj to browser
async session(param){
// console.log("sessssssssssssssion ",param)
param.session.id=param.token.id as string

return param.session 
}
    

    }
    ,

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
    pages:{signIn:"/signIn"}

}