export type AllOrderType = 'live-orders' | 'kds-setup'

export type OrderStatus = 'Pending' | 'Preparing' | 'Completed' | 'Cancelled'
export type OrderPayment = 'Cash' | 'Card' | 'UPI'
export type OrderPaymentStatus = 'Pending' | 'Paid' | 'Partially Paid' | 'Refunded'

export interface OrderItemModifier {
  label: string
  price?: number
}

export interface OrderItem {
  name: string
  qty: number
  amount: number
  total: number
  modifiers?: OrderItemModifier[]
  note?: string
}

export interface OrderChargeLine {
  label: string
  amount: number
  emphasized?: boolean
}

export interface Order {
  id: number
  orderCode?: string
  type: 'Dine-in' | 'Takeaway' | 'Delivery'
  table?: string
  seatingArea?: string
  customer: string
  createdBy: string
  status: OrderStatus
  time: string
  amount: number
  payment: OrderPayment
  paymentStatus?: OrderPaymentStatus
  paymentNote?: string
  items: OrderItem[]
  value: number
  tax: number
  serviceCharge: number
  total: number
  charges?: OrderChargeLine[]
}
