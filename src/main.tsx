import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { initWebhookQueue } from './utils/webhookQueue';
import { retryFailedWebhooks } from './services/orderService';
import { Logger } from './services/loggerService';
import './index.css';

// Initialize the webhook queue system
initWebhookQueue();

// Check if we need to retry any previously failed webhooks
if (navigator.onLine) {
  // Wait a bit for app initialization before retrying
  setTimeout(() => {
    Logger.info('Checking for failed webhooks to retry');
    retryFailedWebhooks();
  }, 5000);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const Main = () => (
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

createRoot(rootElement).render(<Main />);