import { FaTruck, FaShieldHalved } from "react-icons/fa6";
import { FiRotateCcw, FiHeadphones } from "react-icons/fi";
import FeatureCard from "../FeatureCard/FeatureCard";

const features = [
  {
    id: 1,
    icon: FaTruck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    iconColor: "text-blue-500",
    iconBg: "bg-red-50",
  },
  {
    id: 2,
    icon: FaShieldHalved,
    title: "Secure Payment",
    description: "100% secure transactions",
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
  {
    id: 3,
    icon: FiRotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
    iconColor: "text-orange-500",
    iconBg: "bg-gray-100",
  },
  {
    id: 4,
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Dedicated support team",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
];



export default function Features() {
  return (
    <section className="bg-gray-50 py-6">
      <div className="mx-auto grid max-w-[1504px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.id} {...feature} />
        ))}
      </div>
    </section>
  );
}