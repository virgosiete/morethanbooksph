import { Logger } from '../services/loggerService';
import { sendOrderWebhook } from '../services/webhookService';

// Queue for storing webhooks that need to be sent
const webhookQueue: Array<{
  data: any;
  attempts: number;
  lastAttempt: Date | null;
}> = [];

// Constants
const MAX_QUEUE_SIZE = 100;
const MAX_ATTEMPTS = 5;
const RETRY_INTERVALS = [
  1000 * 30,   // 30 seconds
  1000 * 60,   // 1 minute
  1000 * 60 * 5, // 5 minutes
  1000 * 60 * 15, // 15 minutes
  1000 * 60 * 60, // 1 hour
];

/**
 * Add a webhook to the queue for sending
 * @param data The data to send in the webhook
 */
export const queueWebhook = (data: any): void => {
  // Don't queue invalid data
  if (!data || typeof data !== 'object') {
    Logger.warn('Attempted to queue invalid webhook data');
    return;
  }
  
  // Don't add if queue is already at max capacity
  if (webhookQueue.length >= MAX_QUEUE_SIZE) {
    Logger.error('Webhook queue full, dropping webhook', { orderId: data.order_id || 'unknown' });
    return;
  }

  webhookQueue.push({
    data,
    attempts: 0,
    lastAttempt: null,
  });

  Logger.info(`Webhook queued for order ${data.order_id || 'unknown'}`);
  
  // Start processing the queue if this is the first item
  if (webhookQueue.length === 1) {
    processQueue();
  }
};

/**
 * Process all webhooks in the queue
 */
const processQueue = async (): Promise<void> => {
  if (webhookQueue.length === 0) return;

  Logger.info(`Processing webhook queue with ${webhookQueue.length} items`);

  const now = new Date();
  const itemsToProcess = webhookQueue.filter(item => {
    // Process items that haven't been attempted yet or are due for retry
    if (item.lastAttempt === null) return true;
    
    const retryInterval = RETRY_INTERVALS[Math.min(item.attempts - 1, RETRY_INTERVALS.length - 1)];
    const timeSinceLastAttempt = now.getTime() - item.lastAttempt.getTime();
    
    return timeSinceLastAttempt >= retryInterval;
  });

  for (const item of itemsToProcess) {
    item.attempts += 1;
    item.lastAttempt = new Date();

    try {
      const success = await sendOrderWebhook(item.data);
      
      if (success) {
        // Remove from queue if successful
        const index = webhookQueue.indexOf(item);
        if (index !== -1) {
          webhookQueue.splice(index, 1);
        }
        Logger.info(`Webhook for order ${item.data.order_id || 'unknown'} sent successfully`);
      } else if (item.attempts >= MAX_ATTEMPTS) {
        // If we've reached max attempts, remove from queue and log failure
        const index = webhookQueue.indexOf(item);
        if (index !== -1) {
          webhookQueue.splice(index, 1);
          
          // Store permanently in localStorage as a completely failed webhook
          storePermenantlyFailedWebhook(item.data);
        }
        Logger.error(`Failed to send webhook for order ${item.data.order_id || 'unknown'} after ${MAX_ATTEMPTS} attempts`);
      } else {
        Logger.warn(`Webhook attempt failed for order ${item.data.order_id || 'unknown'}, will retry later (${item.attempts}/${MAX_ATTEMPTS})`);
      }
    } catch (error) {
      Logger.error(`Error processing webhook for order ${item.data.order_id || 'unknown'}`, error);
    }
  }

  // If there are still items in the queue, schedule the next processing
  if (webhookQueue.length > 0) {
    // Check again in 30 seconds
    setTimeout(processQueue, 30000);
  }
};

/**
 * Store permanently failed webhook for manual review
 */
function storePermenantlyFailedWebhook(data: any): void {
  try {
    const permanentFailures = JSON.parse(localStorage.getItem('permanent_webhook_failures') || '[]');
    permanentFailures.push({
      timestamp: new Date().toISOString(),
      orderId: data.order_id || 'unknown',
      orderNumber: data.order_number || 'unknown',
      data: data
    });
    
    // Keep only the latest 20 permanent failures to avoid storage issues
    const trimmedFailures = permanentFailures.slice(-20);
    localStorage.setItem('permanent_webhook_failures', JSON.stringify(trimmedFailures));
  } catch (error) {
    Logger.error('Failed to store permanent webhook failure', error);
  }
}

/**
 * Load failed webhooks from localStorage and add them to the queue
 * This should be called when the application starts
 */
export const loadFailedWebhooks = (): void => {
  try {
    const failedWebhooksJson = localStorage.getItem('failed_webhooks');
    if (!failedWebhooksJson) return;
    
    let failedWebhooks;
    try {
      failedWebhooks = JSON.parse(failedWebhooksJson);
    } catch (e) {
      Logger.error('Failed to parse failed webhooks from localStorage', e);
      localStorage.removeItem('failed_webhooks');
      return;
    }
    
    if (!Array.isArray(failedWebhooks) || failedWebhooks.length === 0) return;
    
    Logger.info(`Loading ${failedWebhooks.length} failed webhooks from storage`);
    
    failedWebhooks.forEach(webhook => {
      if (webhook.orderData) {
        queueWebhook(webhook.orderData);
      } else if (webhook.data) {
        queueWebhook(webhook.data);
      }
    });
    
    // Clear the storage after loading
    localStorage.removeItem('failed_webhooks');
  } catch (error) {
    Logger.error('Error loading failed webhooks', error);
  }
};

/**
 * Create a beacon request as a fallback mechanism for failed webhooks
 * This uses the Navigator.sendBeacon API which is more reliable for sending
 * data before page unload
 */
export const sendWebhookBeacon = (data: any): boolean => {
  try {
    if (!navigator.sendBeacon) {
      Logger.warn('sendBeacon API not available in this browser');
      return false;
    }
    
    if (!data || typeof data !== 'object') {
      Logger.warn('Invalid data provided to sendWebhookBeacon');
      return false;
    }

    const webhookUrl = 'https://hook.us1.make.com/rm4xebwtje2ff68tjd56jf9ar7bwcgzu';
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    
    const result = navigator.sendBeacon(webhookUrl, blob);
    
    if (result) {
      Logger.info(`Successfully sent webhook beacon for order ${data.order_id || 'unknown'}`);
    } else {
      Logger.error(`Failed to send webhook beacon for order ${data.order_id || 'unknown'}`);
    }
    
    return result;
  } catch (error) {
    Logger.error('Error sending webhook beacon', error);
    return false;
  }
};

/**
 * Add event listener for page unload to send any pending webhooks
 */
export const addUnloadHandler = (): void => {
  window.addEventListener('beforeunload', () => {
    // Try to send any queued webhooks via beacon
    webhookQueue.forEach(item => {
      sendWebhookBeacon(item.data);
    });
    
    // Also check for failed webhooks in storage
    try {
      const failedWebhooksJson = localStorage.getItem('failed_webhooks');
      if (failedWebhooksJson) {
        const failedWebhooks = JSON.parse(failedWebhooksJson);
        if (Array.isArray(failedWebhooks) && failedWebhooks.length > 0) {
          failedWebhooks.forEach(webhook => {
            if (webhook.orderData) {
              sendWebhookBeacon(webhook.orderData);
            }
          });
        }
      }
    } catch (error) {
      // Can't log during unload event
    }
  });
};

// Initialize queue processor
export const initWebhookQueue = (): void => {
  // Load any failed webhooks from storage
  loadFailedWebhooks();
  
  // Start processing the queue
  processQueue();
  
  // Set up periodic processing
  setInterval(processQueue, 60000); // Check every minute
  
  // Set up page unload handler
  addUnloadHandler();
  
  // Set up network status monitoring
  window.addEventListener('online', () => {
    Logger.info('Network connection restored, processing webhook queue');
    processQueue();
  });
  
  // Monitor for network status changes
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', () => {
        if (navigator.onLine) {
          Logger.info('Network connection changed, processing webhook queue');
          processQueue(); 
        }
      });
    }
  }
};