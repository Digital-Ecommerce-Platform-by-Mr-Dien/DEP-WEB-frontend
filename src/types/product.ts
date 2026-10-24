export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  itemCount?: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku?: string;
  attributes?: Record<string, string>;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 - 5
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  category: Category;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  createdAt?: string;
}

export interface ProductFilterParams {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest" | "popular";
  search?: string;
  page?: number;
  limit?: number;
}
