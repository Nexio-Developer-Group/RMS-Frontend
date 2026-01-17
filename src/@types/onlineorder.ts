export type OnlineOrderStatus = 'Pending' | 'Accepted' | 'Preparing' | 'Completed' | 'Cancelled'
export type OnlineOrderType = 'Online' | 'Zomato' | 'Swiggy' | 'UberEats'
export type OnlinePaymentMethod = 'Cash' | 'Card' | 'UPI' | 'Online'
export type OnlinePaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded'

export interface OnlineOrderItemModifier {
    label: string
    price?: number
}

export interface OnlineOrderItem {
    name: string
    qty: number
    amount: number
    total: number
    modifiers?: OnlineOrderItemModifier[]
    note?: string
}

export interface OnlineCustomer {
    name: string
    phone: string
    email?: string
    address?: string
    city?: string
    zipCode?: string
}

export interface OnlineOrderTimeline {
    received: string
    accepted?: string
    preparing?: string
    completed?: string
    cancelled?: string
}

export interface OnlineOrder {
    id: string
    orderCode: string
    platform: OnlineOrderType
    customer: OnlineCustomer
    status: OnlineOrderStatus
    timeline: OnlineOrderTimeline
    items: OnlineOrderItem[]
    value: number
    tax: number
    serviceCharge: number
    deliveryCharge?: number
    discount?: number
    total: number
    payment: OnlinePaymentMethod
    paymentStatus: OnlinePaymentStatus
    estimatedTime?: string
    actualDeliveryTime?: string
    notes?: string
    cancelReason?: string
}

export interface OnlineOrderStats {
    allOrders: number
    pendingOrders: number
    acceptedOrders: number
    preparingOrders: number
    completedOrders: number
    cancelledOrders: number
    totalRevenue: number
    averageOrderValue: number
}

export type OnlineOrderFilterStatus = 'all' | 'pending' | 'accepted' | 'preparing' | 'completed' | 'cancelled'
