import React from 'react';
import { ProductCard } from './ui/ProductCard';
import { books } from '../data/books';
import { soldOutProducts } from '../data/soldOut';

interface FeaturedSectionProps {
  title: string;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ title }) => {
  // Get IDs of all sold-out products to filter them out
  const soldOutIds = soldOutProducts.map(product => product.id);
  
  // Filter out any books that are in the sold-out list
  const availableBooks = books.filter(book => !soldOutIds.includes(book.id) && !book.soldOut);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {availableBooks.map((book) => (
            <ProductCard key={book.id} product={book} />
          ))}
        </div>
      </div>
    </section>
  );
};