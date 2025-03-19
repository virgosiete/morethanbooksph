import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle, Truck, X } from 'lucide-react';

interface SignInFormProps {
  onSuccess: () => void;
  switchToSignUp: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess, switchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user's name from metadata
      const firstName = data.user?.user_metadata?.first_name || '';
      setUserName(firstName);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-fade-in space-y-8">
        {/* Close button */}
        <button
          onClick={onSuccess}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3">
            <CheckCircle className="h-14 w-14 text-green-500" />
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-3 dark:text-white">
            Welcome back{userName ? `, ${userName}` : ''}! 🎉
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-[15px] tracking-wider">
            We're delighted to see you again at More Than Books PH
          </p>
        </div>

        {/* Promotions Section */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Truck className="h-8 w-8" />
            <h4 className="text-xl font-bold tracking-wider">FREE SHIPPING</h4>
          </div>
          <p className="text-[16px] tracking-wider">
            On all orders over ₱2,000!
          </p>
          <p className="text-sm mt-2 text-pink-100">
            Limited time offer
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/books.html'}
            className="bg-black text-white px-8 py-3 rounded-lg text-[15px] tracking-wider hover:bg-gray-900 transition-colors"
          >
            Start Shopping
          </button>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-3">
            Click to explore our curated collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-3 rounded-lg text-[13px] tracking-wider">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-[15px] tracking-wider"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-[15px] tracking-wider"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-pink-500 text-white py-3 rounded text-[13px] uppercase tracking-wider hover:bg-pink-600 transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      <p className="text-center text-[13px] text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={switchToSignUp}
          className="text-pink-500 hover:text-pink-600"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};