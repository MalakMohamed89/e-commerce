
"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Check,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import type { ProductType } from "@/Types/ProductsType/Products.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReviews } from "@/Actions/reviews.actions";
import { ReviewType } from "@/Types/ReviewType/Reviews.type";
import ReviewCard from "../ReviewCard/ReviewCard";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import { getSession } from "next-auth/react";

type ProductTabsProps = {
  product: ProductType;
  features?: string[];
  reviewsContent?: ReactNode;
  shippingContent?: ReactNode;
};

const defaultFeatures = [
  "Premium quality product",
  "Authenticity guaranteed",
  "Carefully packaged for delivery",
  "Quality checked before shipping",
];

const shippingFeatures = [
  "Free shipping on orders over $50",
  "Standard delivery: 3-5 business days",
  "Express delivery available (1-2 business days)",
  "Track your order in real-time",
];

const returnFeatures = [
  "30-day hassle-free returns",
  "Full refund or exchange available",
  "Free return shipping on defective items",
  "Easy online return process",
];

export default function ProductTabs({
  product,
  features = defaultFeatures,
  reviewsContent,
  shippingContent,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details");
const [reviewData,setReviewData]=useState<ReviewType[] | null>(null)
const [showReviewModal, setShowReviewModal] = useState(false);
const [currentUserId, setCurrentUserId] = useState("");

  const tabBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
const reviewCount = reviewData?.length ?? product.ratingsQuantity;

  
async function getAllReviews(){
 const res=await getReviews(product.id)
 console.log("reviews",res)
 setReviewData(res.data)
}


useEffect(() => {
  getAllReviews();
}, [product.id]);
async function getUserSession() {
  const session = await getSession();

  setCurrentUserId(session?.id ?? "");
}

useEffect(() => {
  getUserSession();
}, []);

  useLayoutEffect(() => {
    
    const bar = tabBarRef.current;
    const activeTrigger = bar?.querySelector<HTMLElement>("[data-active]");

    if (!bar || !activeTrigger || !indicatorRef.current) return;

    const barRect = bar.getBoundingClientRect();
    const triggerRect = activeTrigger.getBoundingClientRect();

    indicatorRef.current.style.left = `${triggerRect.left - barRect.left}px`;
    indicatorRef.current.style.width = `${triggerRect.width}px`;
  }, [activeTab]);

  const productInformation = [
    { label: "Category", value: product.category.name },
    ...(product.subcategory?.length
      ? [
          {
            label: "Subcategory",
            value: product.subcategory.map((item) => item.name).join(", "),
          },
        ]
      : []),
    { label: "Brand", value: product.brand.name },
    { label: "Items sold", value: `${product.sold.toLocaleString()} sold` },
  ];

  return (
    <section
      aria-label="Product information"
      className="mx-auto w-full max-w-376 px-4 pt-14 sm:px-6 2xl:px-0"
    >
      <div className="overflow-hidden rounded-lg border-x border-b border-gray-100 bg-white shadow-sm">

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="gap-0"
        >
          {/* Tabs Header */}
          <div ref={tabBarRef} className="relative border-b border-gray-200">
            <TabsList
              variant="line"
              aria-label="Product information sections"
              className="h-auto w-full justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-none bg-transparent p-0"
              style={{ height: "auto" }}
            >
              <TabsTrigger
                value="details"
                className="h-auto cursor-pointer py-5 flex-none gap-2 rounded-none border-0 px-3 text-base text-gray-600 transition-colors duration-200 after:hidden sm:px-6"
                style={getTabStyle(activeTab === "details")}
              >
                <PackageCheck aria-hidden="true" className="size-4.5" />
                <span>Product Details</span>
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="h-auto cursor-pointer flex-none gap-2 rounded-none border-0 px-3 text-base text-gray-600 transition-colors duration-200 after:hidden sm:px-6"
                style={getTabStyle(activeTab === "reviews")}
              >
                <Star aria-hidden="true" className="size-4.5" />
                <span>
              Reviews ({reviewCount.toLocaleString()})
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="shipping"
                className="h-auto cursor-pointer flex-none gap-2 rounded-none border-0 px-3 text-base text-gray-600 transition-colors duration-200 after:hidden sm:px-6"
                style={getTabStyle(activeTab === "shipping")}
              >
                <Truck aria-hidden="true" className="size-4.5" />
                <span>Shipping &amp; Returns</span>
              </TabsTrigger>
            </TabsList>

            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-[#16a34a] transition-[left,width] duration-300 ease-in-out motion-reduce:transition-none"
            />
          </div>

          {/* Product Details */}
          <TabsContent
            value="details"
            className="space-y-6 px-4 py-6 data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 sm:px-6"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-semibold leading-7 text-gray-950">
                About this Product
              </h2>

              <p className="text-base leading-6.5 text-gray-600">
                {product.description}
              </p>
            </div>

            <div className="grid min-w-0 gap-4 md:grid-cols-2 md:gap-6">
              <InfoCard title="Product Information">
                <dl className="space-y-2">
                  {productInformation.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <dt className="text-gray-500">{item.label}</dt>

                      <dd className="max-w-[65%] text-right font-medium text-gray-900">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </InfoCard>

              <InfoCard title="Key Features">
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm leading-5 text-gray-600"
                    >
                      <ShieldCheck
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-green-600"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent
            value="reviews"
            className="px-4 py-6 data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 sm:px-6"
          >
            {reviewsContent ?? (
              <div className="space-y-6">
                <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                  <div className="w-full text-center md:w-auto">
                    <div className="mb-2 text-5xl font-bold text-gray-900">
                      {product.ratingsAverage.toFixed(1)}
                    </div>

                    <div
                      className="flex justify-center"
                      aria-label={`${product.ratingsAverage.toFixed(1)} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          aria-hidden="true"
                          className={`size-5 ${
                            index < Math.round(product.ratingsAverage)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                    Based on {reviewCount.toLocaleString()} reviews
                    </p>
                  </div>

                  <div className="w-full flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const roundedRating = Math.round(product.ratingsAverage);

                      const percentage =
                        rating === roundedRating
                          ? 60
                          : Math.abs(rating - roundedRating) === 1
                            ? 25
                            : 5;

                      return (
                        <div
                          key={rating}
                          className="mb-2 flex items-center gap-3 last:mb-0"
                        >
                          <span className="w-10 shrink-0 text-sm text-gray-600">
                            {rating} star
                          </span>

                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-yellow-400 transition-[width] duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          <span className="w-10 shrink-0 text-right text-sm text-gray-500">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="py-8 text-center">

        <div className="border-t border-gray-200 pt-6">
  {reviewData && reviewData.length > 0 ? (
<div className="grid gap-4 md:grid-cols-2">
  {reviewData.map((review) => (
    <ReviewCard
      key={review._id}
      review={review}
      currentUserId={currentUserId}
      onRefresh={getAllReviews}
    />
  ))}
</div>
  ) : (
    <div className="py-8 text-center">
      <Star className="mx-auto mb-3 size-10 text-gray-300" />

      <p className="text-sm text-gray-500">
        No reviews yet. Be the first to review this product!
      </p>
    </div>
  )}
</div>

                    <button
                      type="button"
                        onClick={() => setShowReviewModal(true)}
                      className="mt-4 cursor-pointer text-sm font-medium text-green-600 transition-colors hover:text-green-700"
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Shipping & Returns */}
          <TabsContent
            value="shipping"
            className="px-4 py-6 data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 sm:px-6"
          >
            {shippingContent ?? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  <ShippingCard
                    title="Shipping Information"
                    icon={<Truck aria-hidden="true" className="size-5" />}
                    items={shippingFeatures}
                  />

                  <ShippingCard
                    title="Returns & Refunds"
                    icon={<RotateCcw aria-hidden="true" className="size-5" />}
                    items={returnFeatures}
                  />

                </div>

                <section className="flex items-center gap-4 rounded-lg bg-gray-50 p-6">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                    <ShieldCheck aria-hidden="true" className="size-6" />
                  </span>

                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">
                      Buyer Protection Guarantee
                    </h3>

                    <p className="text-sm leading-5 text-gray-600">
                      Get a full refund if your order doesn&apos;t arrive or
                      isn&apos;t as described. We ensure your shopping
                      experience is safe and secure.
                    </p>
                  </div>
                </section>
              </div>
            )}
          </TabsContent>
        </Tabs>
{showReviewModal && (
  <AddReviewModal
    productID={product.id}
    onClose={() => setShowReviewModal(false)}
    onSuccess={getAllReviews}
  />
)}

      </div>
    </section>
  );
}

function getTabStyle(isActive: boolean): CSSProperties {
  return {
    paddingBlock: "16px",
    backgroundColor: isActive ? "rgba(240, 253, 244, 0.5)" : "transparent",
    color: isActive ? "#16a34a" : "#4b5563",
  };
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 rounded-lg bg-gray-50 p-4">
      <h3 className="mb-3 text-base font-medium leading-6 text-gray-950">
        {title}
      </h3>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

function ShippingCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
}) {
  return (
    <section className="rounded-lg bg-linear-to-br from-green-50 to-green-100 p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-full bg-green-600 text-white">
          {icon}
        </span>

        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-green-600"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
