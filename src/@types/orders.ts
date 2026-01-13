export type AllOrderType = 'live-orders' | 'kds-setup'

export type OrderStatus = 'Pending' | 'Preparing' | 'Completed' | 'Cancelled'
export type OrderPayment = 'Cash' | 'Card' | 'UPI'

export interface OrderItem {
  name: string
  qty: number
  amount: number
  total: number
}

export interface Order {
  id: number
  type: 'Dine-in' | 'Takeaway' | 'Delivery'
  table?: string
  customer: string
  createdBy: string
  status: OrderStatus
  time: string
  amount: number
  payment: OrderPayment
  items: OrderItem[]
  value: number
  tax: number
  serviceCharge: number
  total: number
}
