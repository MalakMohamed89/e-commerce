
export interface CartProductType {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    imageCover: string;
    images: string[];
    price: number;
    priceAfterDiscount?: number;
    quantity: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    subcategory: {
      _id: string;
      name: string;
      slug: string;
      category: string;
    }[];
  };
}

export interface CartData {
  _id: string;
  cartOwner: string;
  createdAt: string;
  updatedAt: string;
  products: CartProductType[];
  totalCartPrice: number;
  __v: number;
}

export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
