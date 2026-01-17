import {
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
  OrderItemModifier,
  OrderPricing,
  ChargeLine,
} from './shared'

/**
 * Order view types
 */
export type AllOrderType = 'live-orders' | 'kds-setup'

/**
 * Order item with detailed pricing
 */
export interface OrderItem {
  id?: string
  name: string
  qty: number
  amount: number
  total: number
  modifiers?: OrderItemModifier[]
  note?: string
}

/**
 * Complete order details
 */
export interface Order extends OrderPricing {
  id: number
  orderCode?: string
  orderNumber?: string
  type: OrderType
  table?: string
  seatingArea?: string
  customer: string
  createdBy: string
  status: OrderStatus
  time: string
  amount: number
  payment: PaymentMethod
  paymentStatus?: PaymentStatus
  paymentNote?: string
  items: OrderItem[]
  charges?: ChargeLine[]
}

// Re-export types for convenience
export type { OrderStatus, PaymentMethod, PaymentStatus }
