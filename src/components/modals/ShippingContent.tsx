import React from 'react';
import { Truck, Clock, Package, MapPin, AlertCircle, DollarSign } from 'lucide-react';

export const ShippingContent: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Delivery Areas */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Delivery Areas</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-[15px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-3">
              Philippines
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-4 h-4 mt-1 bg-pink-500 rounded-full flex-shrink-0"></span>
                <div className="ml-4">
                  <p className="text-[15px] tracking-wider font-medium dark:text-white">Metro Manila</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">1-3 business days</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-4 h-4 mt-1 bg-pink-500 rounded-full flex-shrink-0"></span>
                <div className="ml-4">
                  <p className="text-[15px] tracking-wider font-medium dark:text-white">Provincial Areas</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">3-5 business days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Shipping Rates */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <DollarSign className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Shipping Rates</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-[15px] uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-3">
              Domestic Shipping
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-4 h-4 mt-1 bg-pink-500 rounded-full flex-shrink-0"></span>
                <div className="ml-4">
                  <p className="text-[15px] tracking-wider font-medium dark:text-white">Metro Manila</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">₱90 (Non-COD)</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">₱110 (COD)</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-4 h-4 mt-1 bg-pink-500 rounded-full flex-shrink-0"></span>
                <div className="ml-4">
                  <p className="text-[15px] tracking-wider font-medium dark:text-white">Provincial Areas</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">₱165 (Non-COD)</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400">₱190 (COD)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Order Processing */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Package className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Order Processing</h2>
        </div>

        <div className="space-y-4">
          <p className="text-[15px] tracking-wider dark:text-white">
            Orders are processed within 1-2 business days after payment confirmation.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-[15px] tracking-wider dark:text-white">
              Orders placed before 2 PM (Manila time) on business days are processed the same day
            </li>
            <li className="text-[15px] tracking-wider dark:text-white">
              Orders placed after 2 PM or during weekends/holidays are processed the next business day
            </li>
          </ul>
        </div>
      </section>

      {/* Delivery Times */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Delivery Times</h2>
        </div>

        <div className="space-y-4">
          <p className="text-[15px] tracking-wider dark:text-white">
            Standard delivery times:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-[15px] tracking-wider dark:text-white">
              Monday to Friday: 9:00 AM - 6:00 PM
            </li>
            <li className="text-[15px] tracking-wider dark:text-white">
              Saturday: 9:00 AM - 3:00 PM
            </li>
            <li className="text-[15px] tracking-wider dark:text-white">
              No deliveries on Sundays and holidays
            </li>
          </ul>
        </div>
      </section>

      {/* Important Notes */}
      <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-6 w-6 text-pink-500" />
          <h2 className="text-lg font-semibold text-pink-600 dark:text-pink-400">Important Notes</h2>
        </div>
        <ul className="space-y-3 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
          <li>• Free shipping on orders over ₱2,000</li>
          <li>• Delivery times may be affected during peak seasons or adverse weather conditions</li>
          <li>• Please ensure someone is available to receive the package during delivery</li>
          <li>• For COD orders, please prepare the exact amount</li>
          <li>• Contact us immediately if you notice any issues with your delivery</li>
        </ul>
      </div>
    </div>
  );
};