import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface SoldOutProductCardProps {
  product: Product;
}

export const SoldOutProductCard: React.FC<SoldOutProductCardProps> = ({ product }) => {
  const handleShopNow = () => {
    if (product.shopeeLink) {
      window.open(product.shopeeLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform -rotate-12">
            SOLD OUT
          </span>
        </div>
        <button
          className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-pink-500 text-white px-3 py-1.5 rounded-lg text-xs flex items-center justify-center gap-2"
          onClick={handleShopNow}
        >
          Join Waitlist <ExternalLink className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-2 sm:mt-4">
        <h3 className="text-[11px] sm:text-[13px] uppercase tracking-[0.15em] font-medium dark:text-white truncate" title={product.title}>
          {product.title}
        </h3>
        <p className="text-[11px] sm:text-[13px] text-gray-600 dark:text-gray-300">{product.author}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[13px] sm:text-[15px] font-medium text-gray-400 line-through">
            {formatCurrency(product.price)}
          </span>
          <span className="text-[10px] sm:text-xs text-red-500 font-medium">Out of Stock</span>
        </div>
      </div>
    </div>
  );
};