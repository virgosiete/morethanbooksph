import React from 'react';
import { SoldOutProductCard } from './SoldOutProductCard';
import { soldOutProducts } from '../../data/soldOut';

export const SoldOutSection: React.FC = () => {
  if (soldOutProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-black dark:text-white">Sold Out</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Join waitlist to be notified when back in stock
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
          {soldOutProducts.map((product) => (
            <SoldOutProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};