import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { formatCurrency } from '../../utils/formatCurrency';
import { Info, CreditCard, Truck, Clock, Shield } from 'lucide-react';
import { regions } from '../../data/regions';
import { supabase } from '../../lib/supabase';

// Direct webhook URL for make.com integration
const WEBHOOK_URL = 'https://hook.us1.make.com/rm4xebwtje2ff68tjd56jf9ar7bwcgzu';

export const CheckoutPage: React.FC = () => {
  const { items, getSubtotal, getShippingCost, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod'>('bank');
  const [shippingMethod, setShippingMethod] = useState<'manila-non-cod' | 'manila-cod' | 'provincial-non-cod' | 'provincial-cod'>('manila-non-cod');
  const [saveInfo, setSaveInfo] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [useDifferentBillingAddress, setUseDifferentBillingAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    postalCode: '',
    phone: '',
  });

  const shippingRates = {
    'manila-non-cod': 90,
    'manila-cod': 110,
    'provincial-non-cod': 165,
    'provincial-cod': 190
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create the order object
      const orderData = {
        customer_details: {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          phone: formData.phone
        },
        shipping_address: {
          address: formData.address,
          apartment: formData.apartment,
          postal_code: formData.postalCode,
          region: selectedRegion,
          province: selectedProvince,
          city: selectedCity
        },
        billing_address: useDifferentBillingAddress ? {
          // Add billing address fields if different
        } : null,
        order_details: {
          items: items.map(item => ({
            product_id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            image: item.image
          })),
          subtotal: getSubtotal(),
          shipping_cost: getShippingCost(),
          total: getTotal(),
          shipping_method: shippingMethod,
          payment_method: paymentMethod,
          special_instructions: specialInstructions
        },
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Insert the order into Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (error) {
        throw error;
      }

      // Send order data to make.com webhook
      const webhookData = {
        ...orderData,
        order_id: data[0].id // Include the Supabase order ID
      };

      // Store order ID in localStorage for the success page
      localStorage.setItem('lastOrderId', data[0].id);

      // Send the webhook directly - no fancy retry logic, just a direct POST
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      // Log webhook response for debugging
      console.info('Webhook response:', webhookResponse.status);
      
      if (!webhookResponse.ok) {
        console.error('Webhook failed:', await webhookResponse.text());
      }

      // Clear the cart and redirect to success page
      clearCart();
      window.location.href = '/order-success.html';
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedProvince('');
    setSelectedCity('');
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedCity('');
  };

  const selectedRegionData = regions.find(r => r.code === selectedRegion);
  const selectedProvinceData = selectedRegionData?.provinces.find(p => p.code === selectedProvince);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight dark:text-white mb-4">Checkout</h1>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-pink-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Secure Checkout</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-pink-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-pink-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Fast Delivery</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-8 rounded">
              <p className="text-red-700 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center">
                    <CreditCard className="h-5 w-5 text-pink-500 mr-2" />
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="09XX XXX XXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center">
                    <Truck className="h-5 w-5 text-pink-500 mr-2" />
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Street address or P.O. Box"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Apartment, suite, etc.
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Region
                        </label>
                        <select
                          value={selectedRegion}
                          onChange={handleRegionChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        >
                          <option value="">Select Region</option>
                          {regions.map((region) => (
                            <option key={region.code} value={region.code}>
                              {region.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Province
                        </label>
                        <select
                          value={selectedProvince}
                          onChange={handleProvinceChange}
                          required
                          disabled={!selectedRegion}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                        >
                          <option value="">Select Province</option>
                          {selectedRegionData?.provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City/Municipality
                        </label>
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          required
                          disabled={!selectedProvince}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                        >
                          <option value="">Select City</option>
                          {selectedProvinceData?.cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                          placeholder="Postal Code"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="specialInstructions"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Add any special delivery instructions"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center">
                    <Truck className="h-5 w-5 text-pink-500 mr-2" />
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    <label className="relative flex p-4 cursor-pointer bg-white dark:bg-gray-700 rounded-lg border-2 transition-colors hover:border-pink-500 dark:hover:border-pink-500">
                      <input
                        type="radio"
                        name="shipping"
                        value="manila-non-cod"
                        checked={shippingMethod === 'manila-non-cod'}
                        onChange={(e) => setShippingMethod(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-500 flex items-center justify-center">
                            {shippingMethod === 'manila-non-cod' && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full" />
                            )}
                          </div>
                          <span className="ml-3 font-medium dark:text-white">MANILA (1 - 3 days) - NON COD</span>
                        </div>
                        <span className="text-pink-500 font-medium">₱90.00</span>
                      </div>
                    </label>

                    <label className="relative flex p-4 cursor-pointer bg-white dark:bg-gray-700 rounded-lg border-2 transition-colors hover:border-pink-500 dark:hover:border-pink-500">
                      <input
                        type="radio"
                        name="shipping"
                        value="manila-cod"
                        checked={shippingMethod === 'manila-cod'}
                        onChange={(e) => setShippingMethod(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-500 flex items-center justify-center">
                            {shippingMethod === 'manila-cod' && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full" />
                            )}
                          </div>
                          <span className="ml-3 font-medium dark:text-white">MANILA (1 - 3 days) CASH ON DELIVERY</span>
                        </div>
                        <span className="text-pink-500 font-medium">₱110.00</span>
                      </div>
                    </label>

                    <label className="relative flex p-4 cursor-pointer bg-white dark:bg-gray-700 rounded-lg border-2 transition-colors hover:border-pink-500 dark:hover:border-pink-500">
                      <input
                        type="radio"
                        name="shipping"
                        value="provincial-non-cod"
                        checked={shippingMethod === 'provincial-non-cod'}
                        onChange={(e) => setShippingMethod(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-500 flex items-center justify-center">
                            {shippingMethod === 'provincial-non-cod' && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full" />
                            )}
                          </div>
                          <span className="ml-3 font-medium dark:text-white">PROVINCIAL (2 - 4 days) - NON COD</span>
                        </div>
                        <span className="text-pink-500 font-medium">₱165.00</span>
                      </div>
                    </label>

                    <label className="relative flex p-4 cursor-pointer bg-white dark:bg-gray-700 rounded-lg border-2 transition-colors hover:border-pink-500 dark:hover:border-pink-500">
                      <input
                        type="radio"
                        name="shipping"
                        value="provincial-cod"
                        checked={shippingMethod === 'provincial-cod'}
                        onChange={(e) => setShippingMethod(e.target.value as any)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-500 flex items-center justify-center">
                            {shippingMethod === 'provincial-cod' && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full" />
                            )}
                          </div>
                          <span className="ml-3 font-medium dark:text-white">PROVINCIAL (2 - 4 days) CASH ON DELIVERY</span>
                        </div>
                        <span className="text-pink-500 font-medium">₱190.00</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 dark:text-white flex items-center">
                    <CreditCard className="h-5 w-5 text-pink-500 mr-2" />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="relative flex p-4 cursor-pointer bg-white dark:bg-gray-700 rounded-lg border-2 transition-colors hover:border-pink-500 dark:hover:border-pink-500">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-500 flex items-center justify-center">
                            {paymentMethod === 'bank' && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full" />
                            )}
                          </div>
                          <span className="ml-3 font-medium dark:text-white">Bank Transfer / GCash</span>
                        </div>
                      </div>
                    </label>

                    <label className="relative flex p-4 cursor-pointer bg-white dark:bg-gray-700 rounded-lg border-2 transition-colors hover:border-pink-500 dark:hover:border-pink-500">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 rounded-full border-gray-300 dark:border-gray-500 flex items-center justify-center">
                            {paymentMethod === 'cod' && (
                              <div className="w-3 h-3 bg-pink-500 rounded-full" />
                            )}
                          </div>
                          <span className="ml-3 font-medium dark:text-white">Cash on Delivery</span>
                        </div>
                      </div>
                    </label>

                    {paymentMethod === 'bank' && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Your order will be reserved for 24 hours.
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                              Payment details & instructions will be provided after checkout.
                            </p>
                            <p className="text-sm italic text-blue-700 dark:text-blue-300 mt-2">
                              *You can take a screenshot*
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 text-white py-4 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-pink-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-40">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-lg font-semibold mb-6 dark:text-white">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="relative w-20 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-500 text-white text-xs font-medium rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium dark:text-white">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-base font-medium dark:text-white">Total</span>
                    <span className="text-base font-medium text-pink-500">{formatCurrency(getTotal())}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Free shipping on orders over ₱2,000
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Estimated delivery: 2-3 business days for Metro Manila,
                        5-7 business days for Provincial areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};