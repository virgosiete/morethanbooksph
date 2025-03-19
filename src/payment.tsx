import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { PaymentPage } from './pages/PaymentPage';
import './index.css';

const rootElement = document.getElementById('payment-root');
if (!rootElement) {
  throw new Error('Failed to find the payment-root element');
}

const Payment = () => (
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <PaymentPage />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);

createRoot(rootElement).render(<Payment />);