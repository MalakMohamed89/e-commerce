"use server"
import { ReviewFormData } from "@/app/_components/AddReviewModal/AddReviewModal"
import { getMyToken } from "@/utils/getMyToken"

export async function getReviews(productId:string) {

try{
const res =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,{
    method:"GET",

})

const data=await res.json()

return data

}catch(err){
    console.log(err)
}
}


export async function createReview(productID: string,data:ReviewFormData) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("please login first!");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productID}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
 throw err;
  }
}


export async function updateReview(reviewId: string,data:ReviewFormData) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("please login first!");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: token as string,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
 throw err;
  }
}


export async function deleteReview(reviewId: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      throw new Error("please login first!");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    return await res.json();
  } catch (err) {
 throw err;
  }
}