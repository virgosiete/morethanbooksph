import React, { useEffect } from 'react';
import { Trash2, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Logger } from '../../services/loggerService';

export const CartPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getShippingCost,
    getTotal,
  } = useCart();

  // Log cart view for analytics
  useEffect(() => {
    Logger.info('Cart page viewed', { itemCount: items.length });
  }, [items.length]);

  const handleCheckout = () => {
    Logger.info('Checkout button clicked', { cartValue: getTotal() });
    window.location.href = '/checkout.html';
  };

  const handleContinueShopping = () => {
    Logger.info('Continue shopping clicked');
    window.location.href = '/books.html';
  };

  const handleRemoveItem = (id: number) => {
    Logger.info('Item removed from cart', { productId: id });
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      Logger.info('Cart quantity updated', { productId: id, newQuantity: quantity });
      updateQuantity(id, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[80vh] bg-gray-50 dark:bg-gray-900 pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Looks like you haven't added any items to your cart yet.
                  Browse our collection and find something you'll love!
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-pink-500 text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-pink-600 transition-all duration-300"
                  >
                    Start Shopping
                  </button>
                  <button
                    onClick={() => window.location.href = '/wishlist.html'}
                    className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-600 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Heart className="h-5 w-5" />
                    View Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-900 pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold dark:text-white">Shopping Cart</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image - Adjusted for better ratio */}
                        <div className="relative w-[120px] h-[160px] flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={item.image || ''}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback for image loading errors
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/120x160?text=No+Image';
                              Logger.warn('Product image failed to load', { productId: item.id });
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium dark:text-white line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.author}
                              </p>
                            </div>
                            <p className="text-sm font-medium dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center gap-4">
                            <div className="inline-flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-lg"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <span className="h-5 w-5 flex items-center justify-center text-gray-600 dark:text-gray-400">−</span>
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="w-12 text-center border-x border-gray-200 dark:border-gray-600 bg-transparent dark:text-white"
                                min="1"
                                aria-label="Item quantity"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg"
                                aria-label="Increase quantity"
                              >
                                <span className="h-5 w-5 flex items-center justify-center text-gray-600 dark:text-gray-400">+</span>
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1"
                              aria-label={`Remove ${item.title} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleContinueShopping}
                className="mt-8 flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-6 dark:text-white">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="text-sm font-medium dark:text-white">{formatCurrency(getSubtotal())}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Shipping</span>
                    <span className="text-sm font-medium dark:text-white">
                      {getSubtotal() >= 2000 ? (
                        <span className="text-green-500">FREE</span>
                      ) : (
                        formatCurrency(getShippingCost())
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold dark:text-white">Total</span>
                      <span className="text-base font-semibold text-pink-500">{formatCurrency(getTotal())}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-pink-500 text-white py-4 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-pink-600 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Free shipping on orders over ₱2,000
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Estimated delivery: 2-3 business days for Metro Manila,
                    5-7 business days for Provincial areas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};