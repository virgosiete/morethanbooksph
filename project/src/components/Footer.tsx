import React, { useState } from 'react';
import { Instagram, ShoppingBag } from 'lucide-react';
import { socialLinks } from '../config/socialLinks';
import { Modal } from './modals/Modal';
import { PaymentContent } from './modals/PaymentContent';
import { ReturnsContent } from './modals/ReturnsContent';
import { ShippingContent } from './modals/ShippingContent';
import { PrivacyPolicyContent } from './modals/PrivacyPolicyContent';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'payment' | 'returns' | 'shipping' | 'privacy' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={() => setActiveModal('payment')}
              className="text-[11px] tracking-[0.15em] text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              PAYMENT
            </button>
            <button
              onClick={() => setActiveModal('returns')}
              className="text-[11px] tracking-[0.15em] text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              RETURNS
            </button>
            <button
              onClick={() => setActiveModal('shipping')}
              className="text-[11px] tracking-[0.15em] text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              SHIPPING
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-[11px] tracking-[0.15em] text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              PRIVACY POLICY
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-6">
            <a 
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </a>
            <a 
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-1.022 6.174 6.174 0 0 1-1.373-2.243c-.071-.207-.124-.417-.166-.631a.037.037 0 0 0-.037-.034H12.8V12.7a3.066 3.066 0 0 1-3.066 3.066 3.066 3.066 0 0 1-1.745-.545 3.066 3.066 0 0 1-1.321-2.521 3.066 3.066 0 0 1 3.066-3.066c.293 0 .573.045.84.123v-3.13a6.985 6.985 0 0 0-.84-.05A6.948 6.948 0 0 0 4 13.5a6.948 6.948 0 0 0 3.821 6.208A6.944 6.944 0 0 0 16.7 13.5V7.967a9.306 9.306 0 0 0 5.3 1.652V6.29a6.02 6.02 0 0 1-2.679-.728z"/>
              </svg>
            </a>
            <a 
              href="https://shp.ee/whtdbej"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} MORE THAN BOOKS PH. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'payment'}
        onClose={closeModal}
        title="Payment Methods"
      >
        <PaymentContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'returns'}
        onClose={closeModal}
        title="Return Policy"
      >
        <ReturnsContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'shipping'}
        onClose={closeModal}
        title="Shipping Information"
      >
        <ShippingContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>
    </>
  );
};