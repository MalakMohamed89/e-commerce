import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request:NextRequest){

const protectedRoutes=["/cart","/wishlist","/account"]
const authRoutes=["/signIn","/signUp"]

// 1-gat path name
    const myPath=request.nextUrl.pathname
//2- get token
console.log(
  "COOKIES:",
  request.cookies.getAll().map((cookie) => cookie.name)
);

const myToken=await getToken({
    req:request,
    secret:process.env.NEXTAUTH_SECRET,
})
const token=myToken?.routeToken

console.log("MyTooooken",myToken)

if(!token&&protectedRoutes.some((path)=>myPath.startsWith(path))){
    return NextResponse.redirect(new URL("/signIn",request.nextUrl))
}


if(token&&authRoutes.some((path)=>myPath.startsWith(path))){
   return NextResponse.redirect(new URL("/",request.nextUrl))
}

return NextResponse.next()

}

export const config = { matcher: ["/cart/:path*","/wishlist/:path*","/profile/:path*","/signIn","/signUp"] }