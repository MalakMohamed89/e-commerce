import Features from "./_components/Features/Features ";
import ShowByLabel from "./_components/ShowByLabel/ShowByLabel";


import PromoBanners from "./_components/PromoBanners/PromoBanners";
import CategoriesSection from "./_components/CategoriesSection/CategoriesSection";
import ProductsSection from "./_components/ProductsSection/ProductsSection";
import Swiper from "./_components/Swiper/Swiper";
import HeroContent from "./_components/HeroContent/HeroContent";
import Newsletter from "./_components/Newsletter/Newsletter";

export default async function Home() {

  return (
<>
<Swiper
  className="hero-swiper"
  options={{ spaceBetween: 0, slidesPerView: 1, loop: true }}
  pagination={{ clickable: true }}
>
  <HeroContent priority />
  <HeroContent
 title = "Premium Quakity Guaranteed"
  description = "Fresh from farm to your table"
  secondaryAction = {{ label: "Learn More", href: "/products" }}
  coloredLabel="text-blue-500" />
  <HeroContent
   title = "Fast & Free Delivery"
  description = "Same day delivery available"
   coloredLabel="text-violet-500" 
    primaryAction = {{ label: "Order Now", href: "/products" }}

  secondaryAction = {{ label: "Delivery Info", href: "/products" }}
  />
</Swiper>

<Features />

<ShowByLabel paragraph="Shop By" shopByLabel={"Category"} />
{/* All Categories */}

<CategoriesSection />
    {/* PromoBanners */}
<PromoBanners/>

<ShowByLabel paragraph="Featured" shopByLabel={"Products"} />
{/* Products Section */}
<ProductsSection />
<Newsletter />

</>
  );
}
