/**
 * Mock data for when the backend is unavailable
 */

import { Product } from "./apiService";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.5,
    category: "Electronics",
    description:
      "Premium wireless headphones with noise cancellation and 30-hour battery life.",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.2,
    category: "Electronics",
    description:
      "Smart watch with heart rate monitoring, GPS, and water resistance.",
  },
  {
    id: "3",
    name: "Running Shoes",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    rating: 4.7,
    category: "Fashion",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh.",
  },
  {
    id: "4",
    name: "Coffee Maker",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80",
    rating: 4.0,
    category: "Home",
    description:
      "Programmable coffee maker with thermal carafe and auto-shutoff feature.",
  },
  {
    id: "5",
    name: "Backpack",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    rating: 4.3,
    category: "Fashion",
    description:
      "Durable backpack with multiple compartments and padded laptop sleeve.",
  },
  {
    id: "6",
    name: "Desk Lamp",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    rating: 3.8,
    category: "Home",
    description:
      "Adjustable desk lamp with multiple brightness levels and color temperatures.",
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    rating: 4.6,
    category: "Electronics",
    description:
      "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
  },
  {
    id: "8",
    name: "Yoga Mat",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=500&q=80",
    rating: 4.1,
    category: "Sports",
    description:
      "Non-slip yoga mat with alignment markings and carrying strap.",
  },
  {
    id: "9",
    name: "Digital Camera",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    rating: 4.4,
    category: "Electronics",
    description:
      "20MP digital camera with 4K video recording and image stabilization.",
  },
  {
    id: "10",
    name: "Ceramic Mug Set",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    rating: 4.2,
    category: "Home",
    description:
      "Set of 4 ceramic mugs in assorted colors with minimalist design.",
  },
  {
    id: "11",
    name: "Wireless Earbuds",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    rating: 4.3,
    category: "Electronics",
    description: "True wireless earbuds with touch controls and charging case.",
  },
  {
    id: "12",
    name: "Fitness Tracker",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500&q=80",
    rating: 4.0,
    category: "Electronics",
    description:
      "Fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications.",
  },
];

export const mockCategories = [
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Books",
  "Beauty",
];
