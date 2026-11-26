export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductType {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  category: Category;
  priceAfterDiscount:number;
  subcategory: Subcategory[];
}


export interface ReviewUser {
  _id: string;
  name: string;
}

export interface ProductReview {
  _id: string;
  product: string;
  rating: number;
  review: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SpecificProductType extends ProductType {
  reviews: ProductReview[];
  __v: number;
}
