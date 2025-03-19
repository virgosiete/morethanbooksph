import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle } from 'lucide-react';

interface SignUpFormProps {
  onSuccess: () => void;
  switchToSignIn: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, switchToSignIn }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone
          }
        }
      });

      if (signUpError) throw signUpError;
      
      // Show success message
      setIsSuccess(true);
      
      // Redirect to sign in after 2 seconds
      setTimeout(() => {
        switchToSignIn();
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Account Created Successfully!</h3>
        <p className="text-gray-600 dark:text-gray-300 text-[15px] tracking-wider mb-4">
          Redirecting you to sign in...
        </p>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-[15px] tracking-wider"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-[15px] tracking-wider"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-[15px] tracking-wider"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-[15px] tracking-wider"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-[13px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
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
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-[13px] text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={switchToSignIn}
          className="text-pink-500 hover:text-pink-600"
        >
          Sign In
        </button>
      </p>
    </form>
  );
};