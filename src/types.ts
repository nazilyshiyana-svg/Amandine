export interface Product {
  id: string;
  name: string;
  tagline: string;
  collection: string;
  category: 'necklaces' | 'rings' | 'earrings' | 'bracelets';
  price: number; // in USD
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  materials: string;
  karat: string;
  dimensions: string;
  images: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  metalOptions: string[];
  sizes: string[];
  inStock: boolean;
  aestheticTag?: string;
  hallmark?: string;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMetal: string;
  selectedSize: string;
  customEngraving?: string;
  customGemstone?: string;
  customCarat?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productPurchased: string;
  verified: boolean;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
  handle: string;
  productName: string;
  productId: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export interface JewellerySet {
  id: string;
  name: string;
  frenchTitle: string;
  tagline: string;
  description: string;
  image: string;
  pieces: {
    necklace: Product;
    bracelet: Product;
    ring: Product;
    earrings: Product;
  };
  totalOriginalPrice: number;
  setPrice: number;
  discountPct: number;
  features: string[];
}
