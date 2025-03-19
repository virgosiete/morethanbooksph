import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { books } from '../../data/books';
import { newArrivals } from '../../data/newArrivals';
import { formatCurrency } from '../../utils/formatCurrency';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof books>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const allBooks = [...books, ...newArrivals];

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const results = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProductClick = (id: number) => {
    window.location.href = `/product.html?id=${id}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full h-full">
        {/* Search Input */}
        <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or author..."
                className="w-full pl-12 pr-10 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-[15px] tracking-wider focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="w-full h-[calc(100vh-80px)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {searchTerm.length < 2 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-[15px] tracking-wider">Start typing to search...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-[15px] tracking-wider">No results found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleProductClick(book.id)}
                    className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
                  >
                    {/* Glow effect container */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:via-pink-500/20 group-hover:to-pink-500/10 transition-all duration-500 rounded-lg blur-xl opacity-0 group-hover:opacity-100" />
                    
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/5 group-hover:to-pink-500/5 transition-all duration-300 rounded-lg" />

                    {/* Content */}
                    <div className="relative">
                      <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 relative z-10">
                        <h3 className="text-[13px] uppercase tracking-[0.15em] font-medium dark:text-white group-hover:text-pink-500 transition-colors line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
                          {book.author}
                        </p>
                        <p className="mt-2 text-[15px] tracking-wider font-medium dark:text-white group-hover:text-pink-500 transition-colors">
                          {formatCurrency(book.price)}
                        </p>
                      </div>
                    </div>

                    {/* Hover border effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/20 rounded-lg transition-colors duration-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};