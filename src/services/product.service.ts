import { apiClient } from "./api-client";
import { Category, Product, ProductFilterParams } from "@/types/product";
import { PaginatedResponse } from "@/types/api";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mock-data";

export const productService = {
  /**
   * Fetch list of products with filters, sorting, and pagination
   */
  async getProducts(params?: ProductFilterParams): Promise<PaginatedResponse<Product>> {
    try {
      return await apiClient.get<PaginatedResponse<Product>>("/products", params as Record<string, string | number | boolean | undefined>);
    } catch {
      // Fallback to local mock data when backend is not ready
      let filtered = [...MOCK_PRODUCTS];

      if (params?.categorySlug) {
        filtered = filtered.filter((p) => p.category.slug === params.categorySlug);
      }

      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }

      if (params?.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= (params.minPrice || 0));
      }

      if (params?.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= (params.maxPrice || Infinity));
      }

      if (params?.sortBy) {
        if (params.sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
        if (params.sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
        if (params.sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 12;
      const startIndex = (page - 1) * limit;
      const paginatedItems = filtered.slice(startIndex, startIndex + limit);

      return {
        items: paginatedItems,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit) || 1,
        hasNext: startIndex + limit < filtered.length,
        hasPrev: page > 1,
      };
    }
  },

  /**
   * Fetch single product by slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      return await apiClient.get<Product>(`/products/${slug}`);
    } catch {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
    }
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      return await apiClient.get<Category[]>("/categories");
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  /**
   * Get featured products for homepage
   */
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>("/products/featured");
    } catch {
      return MOCK_PRODUCTS.filter((p) => p.isFeatured);
    }
  },
};
