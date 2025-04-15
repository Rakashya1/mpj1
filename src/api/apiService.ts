/**
 * API Service for connecting to the Java backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Helper function to check if the backend is available
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // Timeout after 5 seconds
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.error("Backend connection check failed:", error);
    return false;
  }
};

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description?: string;
  quantity?: number;
  originalPrice?: number;
  isNew?: boolean;
}

// Import mock data
import { mockProducts } from "./mockData";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    console.log("Using mock data instead");
    return mockProducts;
  }
};

// Search products using Elasticsearch
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/products/search?query=${encodeURIComponent(query)}`,
      { credentials: "include" },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching products:", error);
    console.log("Using client-side search with mock data instead");
    // Fallback to client-side search with mock data
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    );
  }
};

// Filter products
export const filterProducts = async (
  categories: string[] = [],
  minPrice: number = 0,
  maxPrice: number = 1000,
  rating: number = 0,
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    if (categories.length)
      categories.forEach((c) => params.append("categories", c));
    params.append("minPrice", minPrice.toString());
    params.append("maxPrice", maxPrice.toString());
    params.append("rating", rating.toString());

    const response = await fetch(
      `${API_BASE_URL}/api/products/filter?${params}`,
      { credentials: "include" },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error filtering products:", error);
    console.log("Using client-side filtering with mock data instead");
    // Fallback to client-side filtering with mock data
    return mockProducts.filter((product) => {
      // Apply category filter
      if (categories.length > 0 && !categories.includes(product.category)) {
        return false;
      }

      // Apply price range filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Apply rating filter
      if (rating > 0 && product.rating < rating) {
        return false;
      }

      return true;
    });
  }
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    console.log("Using mock data instead");
    // Fallback to mock data
    const product = mockProducts.find((p) => p.id === id);
    return product || null;
  }
};
