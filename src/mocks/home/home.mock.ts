import type { Banner, Category, Product } from "@/store/home/home.types";

const banners: Banner[] = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% off on top brands",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=450&fit=crop",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh styles for the season",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=450&fit=crop",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On orders above ₹999",
    image: "https://images.unsplash.com/photo-1472851294607-062f824d29cc?w=1200&h=450&fit=crop",
    cta: "Browse Deals",
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop",
    productCount: 128,
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
    productCount: 256,
  },
  {
    id: 3,
    name: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    productCount: 84,
  },
  {
    id: 4,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    productCount: 96,
  },
  {
    id: 5,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
    productCount: 72,
  },
  {
    id: 6,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba7951?w=300&h=300&fit=crop",
    productCount: 64,
  },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    price: 99999,
    originalPrice: 119999,
    image: "https://images.unsplash.com/photo-1695048133142-1a20465d8e53?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 1240,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "MacBook Pro M4",
    price: 199999,
    originalPrice: 219999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 890,
    badge: "New",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 24999,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 2100,
    badge: "Hot Deal",
  },
  {
    id: 4,
    name: "Nike Air Max 90",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 560,
  },
  {
    id: 5,
    name: "Samsung Galaxy S26",
    price: 74999,
    originalPrice: 84999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 430,
    badge: "Trending",
  },
  {
    id: 6,
    name: "Levi's Denim Jacket",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93b0?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 320,
  },
  {
    id: 7,
    name: "Apple Watch Ultra",
    price: 64999,
    originalPrice: 69999,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 780,
  },
  {
    id: 8,
    name: "Dyson V15 Vacuum",
    price: 54999,
    originalPrice: 62999,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 190,
    badge: "Limited",
  },
];

export const homeMock = {
  banners,
  categories,
  featuredProducts,
};
