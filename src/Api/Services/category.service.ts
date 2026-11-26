import { Category } from "@/Types/ProductsType/Products.type";


export async function getAllCategories(){
    try{
const res=await fetch("https://ecommerce.routemisr.com/api/v1/categories",{
    next: { revalidate: 60 }
});

if(!res.ok){
  throw new Error("Something went wrong")
}
const data=await res.json()
return data.data

}catch(err){
console.log(err)
   return [];
}
    }

    export async function getSpecificCategory(id: string): Promise<Category | undefined> {
    
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
          cache: "no-store",
        });
    
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
    
        return data.data;
      } catch (err) {
        console.log("ERROR:", err);
           return undefined;
      }
    }
    
