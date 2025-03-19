import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ReturnsContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="h-6 w-6 text-pink-500" />
        <h2 className="text-xl font-semibold dark:text-white">NO RETURN, NO EXCHANGE</h2>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300 mb-6">
          Due to the nature of our products and to ensure the quality and authenticity of all items, 
          we maintain a strict no return, no exchange policy. All sales are final once the order has 
          been placed and payment has been processed.
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Why We Have This Policy</h3>
            <ul className="list-disc pl-6 space-y-3 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              <li>To maintain the integrity and authenticity of our products</li>
              <li>To ensure all customers receive brand new, untouched items</li>
              <li>To prevent any possibility of counterfeit or damaged products entering our inventory</li>
              <li>To keep our prices competitive by minimizing operational costs</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Quality Assurance</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              We take great care in ensuring that:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              <li>All items are thoroughly inspected before shipping</li>
              <li>Products are properly packaged to prevent damage during transit</li>
              <li>All items are genuine and sourced directly from authorized suppliers</li>
              <li>Product descriptions and images accurately represent the items</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Exceptions</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              In the rare case of receiving a defective item or if there's a fulfillment error on our part:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              <li>Contact us within 24 hours of receiving your order</li>
              <li>Provide clear photos of the issue</li>
              <li>Include your order number in all communications</li>
              <li>We will address these cases on an individual basis</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg mt-8">
        <h2 className="text-lg font-semibold mb-4 text-pink-600 dark:text-pink-400">Need Assistance?</h2>
        <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300 mb-4">
          If you have any questions or concerns about our return policy, please don't hesitate to contact us:
        </p>
        <ul className="space-y-2 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
          <li>Email: morethanbooksph@gmail.com</li>
          <li>Phone: 09060588369</li>
          <li>Business Hours: Monday - Saturday, 9:00 AM - 6:00 PM</li>
        </ul>
      </div>
    </div>
  );
};