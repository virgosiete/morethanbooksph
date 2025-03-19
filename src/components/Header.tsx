import React, { useState } from 'react';
import { Search, ShoppingBag, User, Moon, Sun, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { SearchOverlay } from './search/SearchOverlay';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './UserMenu';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ui/theme-toggle';

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const totalItems = getTotalItems();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCartClick = () => {
    window.location.href = '/cart.html';
  };

  return (
    <>
      <header className="fixed w-full bg-white dark:bg-gray-900 z-50 transition-colors">
        {/* Announcement Bar */}
        <div className="bg-pink-100 dark:bg-pink-900/20">
          <div className="max-w-7xl mx-auto px-4">
            <p className="py-2 text-center text-[11px] tracking-[0.15em] text-pink-900 dark:text-pink-100">
              FREE SHIPPING ON ORDERS OVER ₱2,000 | NATIONWIDE DELIVERY 📦
            </p>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-16 flex items-center justify-between gap-4">
              {/* Left - Menu & Search */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="sm:hidden"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-gray-900 dark:text-white" />
                  ) : (
                    <Menu className="h-5 w-5 text-gray-900 dark:text-white" />
                  )}
                </button>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-pink-500 dark:hover:text-pink-400"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* Center - Logo */}
              <a 
                href="/" 
                className="relative group flex-shrink-0 px-4"
              >
                <span className="text-[13px] sm:text-[16px] tracking-[0.3em] uppercase font-medium text-pink-500 hover:text-pink-600 transition-colors">
                  MORE THAN BOOKS PH
                </span>
                <div className="absolute -inset-x-6 -inset-y-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
              </a>

              {/* Right - Account & Cart */}
              <div className="flex items-center gap-4">
                {user ? (
                  <UserMenu />
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hover:text-pink-500 dark:hover:text-pink-400"
                    aria-label="Sign in"
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
                
                {/* Theme Toggle */}
                <ThemeToggle />
                
                <button 
                  onClick={handleCartClick}
                  className="hover:text-pink-500 dark:hover:text-pink-400 relative"
                  title="View cart"
                  aria-label={`View cart with ${totalItems} items`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-700 hidden sm:block bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-12 flex items-center justify-center">
              <div className="flex items-center space-x-8">
                <a href="/" className="nav-link text-sm tracking-wider hover:text-pink-500">HOME</a>
                <a href="/books.html" className="nav-link text-sm tracking-wider hover:text-pink-500">SHOP</a>
                <a href="/bestsellers.html" className="nav-link text-sm tracking-wider hover:text-pink-500">BESTSELLERS</a>
                <a href="/about.html" className="nav-link text-sm tracking-wider hover:text-pink-500">ABOUT</a>
                <a href="/contact.html" className="nav-link text-sm tracking-wider hover:text-pink-500">CONTACT</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div 
          className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 sm:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-[13px] tracking-[0.3em] uppercase font-medium text-pink-500">
                MORE THAN BOOKS PH
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {/* Shipping Banner */}
              <div className="mb-8 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <p className="text-[11px] tracking-[0.15em] text-pink-900 dark:text-pink-100 text-center">
                  FREE SHIPPING ON ORDERS OVER ₱2,000 | NATIONWIDE DELIVERY 📦
                </p>
              </div>

              <nav className="space-y-4">
                <a 
                  href="/" 
                  className="block py-3 text-[13px] tracking-[0.2em] text-gray-900 dark:text-white uppercase font-medium border-b border-gray-200 dark:border-gray-700 hover:text-pink-500"
                >
                  HOME
                </a>
                <a 
                  href="/books.html" 
                  className="block py-3 text-[13px] tracking-[0.2em] text-gray-900 dark:text-white uppercase font-medium border-b border-gray-200 dark:border-gray-700 hover:text-pink-500"
                >
                  SHOP
                </a>
                <a 
                  href="/bestsellers.html" 
                  className="block py-3 text-[13px] tracking-[0.2em] text-gray-900 dark:text-white uppercase font-medium border-b border-gray-200 dark:border-gray-700 hover:text-pink-500"
                >
                  BESTSELLERS
                </a>
                <a 
                  href="/about.html" 
                  className="block py-3 text-[13px] tracking-[0.2em] text-gray-900 dark:text-white uppercase font-medium border-b border-gray-200 dark:border-gray-700 hover:text-pink-500"
                >
                  ABOUT
                </a>
                <a 
                  href="/contact.html" 
                  className="block py-3 text-[13px] tracking-[0.2em] text-gray-900 dark:text-white uppercase font-medium border-b border-gray-200 dark:border-gray-700 hover:text-pink-500"
                >
                  CONTACT
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};