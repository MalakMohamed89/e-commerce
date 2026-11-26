
import { IconType } from "react-icons";
import {
  FaMinus, FaPlus, FaShoppingCart, FaBolt,
  FaRegHeart, FaHeart, FaShareAlt, FaTruck, FaUndo, FaShieldAlt,
} from "react-icons/fa";

import { getAllProducts, getSpecificProduct } from "@/Api/Services/product.service";
import { getStarIcons } from "@/utils/getStars";
import ProductDetailsImages from "../ProductDetailsImages/ProductDetailsImages";
import { calcSale } from "@/utils/calcSale";
import ProductTabs from "../ProductTabs/ProductTabs";
import RecommendedProducts from "../RecommendedProducts/RecommendedProducts";
import AddToWishlistBtn from "../AddToWishlistBtn/AddToWishlistBtn";

import { ProductType, SpecificProductType } from "@/Types/ProductsType/Products.type";
import AddBtn from "../AddBtn/AddBtn";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import BuyNowBtn from "../BuyNowBtn/BuyNowBtn";
import ProductPurchaseControls from "../ProductPurchaseControls/ProductPurchaseControls"

type PerkProps = {
  icon: IconType;
  title: string;
  text: string;
};

export default async function ProductOverview({id}:{id:string}) {

const products: ProductType[] = await getAllProducts();

const productData: SpecificProductType | undefined = await getSpecificProduct(id)

console.log("dataaaaaaaa",productData)
if(!productData){
  return <div>Product not found</div>
}


const sale = calcSale(productData)

const stars = getStarIcons(productData)

return (
  <>
  <section className="mx-auto grid w-full max-w-376 items-start gap-5 px-4 py-3 sm:px-6 lg:grid-cols-[minmax(280px,376px)_minmax(0,1fr)] lg:gap-8 2xl:px-0">
    {/* Product Images */}
<ProductDetailsImages productData={productData} />
    {/* Product Details */}
    <div className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-[10px]">
        <span className="rounded-full bg-green-50 px-2.5 py-1 text-green-700">
          {productData.category.name}
        </span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
          {productData.brand.name}
        </span>
      </div>

      <h1 className="mt-2 wrap-break-word text-[22px] font-bold leading-tight text-gray-950">
        {productData.title}
      </h1>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-0.5 text-sm text-amber-400">
          {stars}
        </div>
        <span className="text-[11px] text-gray-700">
          {productData.ratingsAverage} ({productData.ratingsQuantity} reviews)
        </span>
      </div>

      {/* Price */}

{/* Price */}
<div className="mt-3 flex flex-wrap items-center gap-3">
  {sale ? (
    <>
      <span className="text-[23px] font-bold text-green-600">
        {productData.priceAfterDiscount} EGP
      </span>

      <span className="text-base font-medium text-gray-400 line-through">
        {productData.price} EGP
      </span>

      <span className="rounded-md bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
        -{sale}% OFF
      </span>
    </>
  ) : (
    <span className="text-[23px] font-bold text-gray-950">
      {productData.price} EGP
    </span>
  )}
</div>


      {/* Stock */}
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs text-green-700">
        <span className="size-1.5 rounded-full bg-green-600" />
        {productData.quantity > 0 ? "In Stock" : "Out of Stock"}
      </span>

      <hr className="my-4 border-gray-100" />

      {/* Description */}
      <p className="wrap-break-word text-sm leading-6 text-gray-600">{productData.description}</p>

      {/* Purchase Controls */}
<ProductPurchaseControls
  productId={productData._id}
  stock={productData.quantity}
  price={
    sale
      ? productData.priceAfterDiscount!
      : productData.price
  }
/>

      {/* Wishlist & Share */}
      <div className="mt-4 flex gap-2">
<AddToWishlistBtn
  productId={productData._id}
  className="flex h-13 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm text-gray-700 transition-colors hover:bg-gray-50"
  activeClassName="border-red-200 bg-red-50 hover:bg-red-50"
  activeChildren={
    <>
      <FaHeart size={12} className="text-red-500" /> In Wishlist
    </>
  }
>
  <FaRegHeart size={12} /> Add to Wishlist
</AddToWishlistBtn>

        <button
          type="button"
          className="flex h-13 cursor-pointer w-13 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          aria-label="Share"
        >
          <FaShareAlt size={12} />
        </button>
      </div>

      <hr className="my-4 border-gray-100" />

      {/* Perks */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Perk icon={FaTruck} title="Free Delivery" text="Orders over $50" />
        <Perk icon={FaUndo} title="30 Days Return" text="Money back" />
        <Perk icon={FaShieldAlt} title="Secure Payment" text="100% Protected" />
      </div>
    </div>
  </section>

  <ProductTabs product={productData} />

<RecommendedProducts products={products} currentProductId={id} />

  </>
);
}
function Perk({ icon: Icon, title, text }: PerkProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm text-green-600">
        <Icon />
      </span>
      <div>
        <p className="text-xs font-medium text-gray-900">{title}</p>
        <p className="text-[10px] text-gray-500">{text}</p>
      </div>
    </div>
  );
}
