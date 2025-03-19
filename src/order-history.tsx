import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import './index.css';

const rootElement = document.getElementById('order-history-root');
if (!rootElement) {
  throw new Error('Failed to find the order-history-root element');
}

const OrderHistory = () => (
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <OrderHistoryPage />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

createRoot(rootElement).render(<OrderHistory />);