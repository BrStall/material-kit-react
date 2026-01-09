/**
 * Firestore Collections Structure for ERP
 *
 * This file documents the proposed structure for your ERP database
 */

// USERS COLLECTION
// Path: /users/{userId}
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// CUSTOMERS COLLECTION
// Path: /customers/{customerId}
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cnpj?: string;
  cpf?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

// PRODUCTS COLLECTION
// Path: /products/{productId}
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  cost: number;
  quantity: number;
  category: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

// ORDERS COLLECTION
// Path: /orders/{orderId}
export interface Order {
  id: string;
  customerId: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// SETTINGS COLLECTION
// Path: /settings/{settingId}
export interface Setting {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object';
  updatedAt: Date;
}

/**
 * Usage Example:
 *
 * import { addDocument, getCollection, queryCollection } from 'src/services/firestore-service';
 * import { where } from 'firebase/firestore';
 *
 * // Add a customer
 * await addDocument('customers', 'cust_123', {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   phone: '123456789'
 * });
 *
 * // Get all customers
 * const customers = await getCollection('customers');
 *
 * // Query active customers
 * const activeCustomers = await queryCollection('customers', where('status', '==', 'active'));
 */
