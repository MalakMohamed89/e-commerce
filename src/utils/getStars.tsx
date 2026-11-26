
import { Product } from "@/Types/ProductsType/Products.type";
import { ReactNode } from "react";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

export function getStarIcons(productData: Product) {
const stars: ReactNode[] = [];
  const fullStars = Math.floor(productData.ratingsAverage);
  const hasHalfStar = productData.ratingsAverage % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return stars;
}
