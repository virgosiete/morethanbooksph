export interface CustomerDetails {
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  apartment?: string;
  postal_code: string;
  region: string;
  province: string;
  city: string;
}

export interface OrderItem {
  product_id: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderDetails {
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_method: string;
  payment_method: string;
  special_instructions?: string;
}

export interface Order {
  id?: string;
  order_number: string;
  customer_details: CustomerDetails;
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress | null;
  order_details: OrderDetails;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface WebhookPayload extends Order {
  order_id: string;
  timestamp: string;
}

// Interface for webhook log entries
export interface WebhookLog {
  id?: string;
  order_id: string;
  order_number?: string | null;
  attempt_number: number;
  status: 'success' | 'failure' | 'pending';
  response_code?: number | null;
  response_body?: string | null;
  error_message?: string | null;
  created_at?: string;
}

// Interface for webhook queue items
export interface WebhookQueueItem {
  data: any;
  attempts: number;
  lastAttempt: Date | null;
}