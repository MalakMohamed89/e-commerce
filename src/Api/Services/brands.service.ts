import { BrandType } from "@/Types/BrandsType/Brands.type";

export async function getAllBrands(){
    try{
const res=await fetch("https://ecommerce.routemisr.com/api/v1/brands",{
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

        export async function getSpecificBrand(id: string): Promise<BrandType | undefined> {
        
          try {
            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
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