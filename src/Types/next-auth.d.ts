import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  
  interface Session {
user:{name:string,email:string,image?:string|undefined},
id:string,
expires:string
  }

  interface User {
email:string,
id:string,
name:string,
accessToken:string,
  }

}

declare module "next-auth/jwt" {

  interface JWT {
   routeToken: string,
   idToken?:string
  }
}