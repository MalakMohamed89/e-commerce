
export interface ReviewType {
  _id: string;
  rating: number;
  review: string;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  results: number;
  metadata: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
  };
  data: ReviewType[];
}
