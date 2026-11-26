export async function getAllSubCategoriesOnCategory(categoryId:string){
    try{
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,{
  cache:"force-cache",
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


export async function getSpecificSubCategory(subCategoryId:string){
    try{
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`,{
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