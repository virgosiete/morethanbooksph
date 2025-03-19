import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { BestsellersPage } from './pages/BestsellersPage';
import './index.css';

const rootElement = document.getElementById('bestsellers-root');
if (!rootElement) {
  throw new Error('Failed to find the bestsellers-root element');
}

const Bestsellers = () => (
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <BestsellersPage />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

createRoot(rootElement).render(<Bestsellers />);