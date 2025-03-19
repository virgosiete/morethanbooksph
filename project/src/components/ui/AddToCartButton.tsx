import React, { useState } from 'react';
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <label htmlFor="quantity" className="text-[11px] tracking-wider text-gray-500 mb-1">
            Quantity
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={decrementQuantity}
              className="p-1 hover:bg-gray-100 rounded-l"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center text-sm font-medium border-x border-gray-300 py-1"
              min="1"
            />
            <button
              onClick={incrementQuantity}
              className="p-1 hover:bg-gray-100 rounded-r"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${
            showSuccess
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-orange-500 hover:bg-orange-600'
          } text-white`}
        >
          {showSuccess ? (
            <>
              <Check className="h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};