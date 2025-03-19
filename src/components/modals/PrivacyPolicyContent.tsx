import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyContent: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Privacy Statement</h2>
        </div>
        <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
          At More Than Books PH, we take your privacy seriously. This policy outlines how we collect, 
          use, and protect your personal information when you use our website and services.
        </p>
      </section>

      {/* Information Collection */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Eye className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">What Do We Do With Your Information?</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">When you purchase something from our store</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              As part of the buying and selling process, we collect the personal information you provide, such as:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping address</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">When you browse our store</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              We automatically receive your computer's internet protocol (IP) address to provide us with 
              information that helps us learn about your browser and operating system.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Email marketing</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              With your permission, we may send you emails about our store, new products, and other updates.
            </p>
          </div>
        </div>
      </section>

      {/* Consent */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Consent</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">How do you get my consent?</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              When you provide us with personal information to complete a transaction, verify your 
              credit card, place an order, arrange for a delivery or return a purchase, we imply that 
              you consent to our collecting it and using it for that specific reason only.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">How do I withdraw my consent?</h3>
            <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              If you change your mind, you may withdraw your consent for us to contact you, for the 
              continued collection, use or disclosure of your information, at any time, by contacting us at:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
              <li>Email: morethanbooksph@gmail.com</li>
              <li>Phone: 09060588369</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Disclosure</h2>
        </div>
        
        <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
          We may disclose your personal information if we are required by law to do so or if you 
          violate our Terms of Service. We may also share your information with third-party service 
          providers who assist us in operating our website, conducting our business, or servicing you.
        </p>
      </section>

      {/* Security */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-6 w-6 text-pink-500" />
          <h2 className="text-xl font-semibold dark:text-white">Security</h2>
        </div>
        
        <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
          To protect your personal information, we take reasonable precautions and follow industry 
          best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, 
          altered or destroyed.
        </p>
      </section>

      {/* Contact Information */}
      <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-pink-600 dark:text-pink-400">Questions and Contact Information</h2>
        <p className="text-[15px] tracking-wider text-gray-600 dark:text-gray-300 mb-4">
          If you would like to: access, correct, amend or delete any personal information we have 
          about you, register a complaint, or simply want more information, contact us at:
        </p>
        <ul className="space-y-2 text-[15px] tracking-wider text-gray-600 dark:text-gray-300">
          <li>More Than Books PH</li>
          <li>Email: morethanbooksph@gmail.com</li>
          <li>Phone: 09060588369</li>
          <li>Tayabas, Quezon</li>
        </ul>
      </div>
    </div>
  );
};