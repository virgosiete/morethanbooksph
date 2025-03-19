import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.soldOut) {
      addToCart(product, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleProductClick = () => {
    window.location.href = `/product.html?id=${product.id}`;
  };

  return (
    <div 
      onClick={handleProductClick}
      className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
    >
      <div className="product-card">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
            product.soldOut ? 'opacity-50' : ''
          }`}
        />
        
        {product.soldOut ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 text-sm animate-pulse">
              SOLD OUT
            </span>
          </div>
        ) : (
          <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full h-12 btn-primary flex items-center justify-center rounded-lg bg-pink-500 hover:bg-pink-600 transition-all duration-300"
              aria-label="Add to cart"
            >
              {showSuccess ? (
                <Check className="h-6 w-6 text-white" />
              ) : (
                <ShoppingCart className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        )}

        {/* Rating badge */}
        {product.rating >= 4.8 && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            ⭐ {product.rating}
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-[13px] uppercase tracking-[0.15em] font-medium dark:text-white line-clamp-2">
          {product.title}
        </h3>
        <p className="text-[13px] tracking-wider text-gray-500 dark:text-gray-400">
          {product.author}
        </p>
        <div className="flex items-center justify-between">
          <p className={`text-[15px] tracking-wider font-medium dark:text-white ${
            product.soldOut ? 'text-gray-400 line-through' : ''
          }`}>
            {formatCurrency(product.price)}
          </p>
          {product.soldOut && (
            <p className="text-[11px] tracking-wider text-red-500 animate-pulse">
              Out of Stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
};