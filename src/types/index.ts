// Common types used across components
export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  image: string;
  inStock?: boolean;
}

export interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  soldOut?: boolean;
  isbn?: string;
  description?: string;
  specifications?: {
    length: string;
    width: string;
    height: string;
    publisher: string;
    publicationDate: string;
    pages: number;
    format: string;
    language: string;
    signed: boolean;
  };
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  relatedProducts: number[];
}