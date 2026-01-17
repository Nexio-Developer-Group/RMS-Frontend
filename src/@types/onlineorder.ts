import {
    OrderStatus,
    OnlinePlatform,
    PaymentMethod,
    PaymentStatus,
    OrderItemModifier,
    CustomerWithAddress,
    OrderTimeline,
    OrderPricing,
    RevenueStats,
} from './shared'

/**
 * Online order item with pricing details
 */
export interface OnlineOrderItem {
    name: string
    qty: number
    amount: number
    total: number
    modifiers?: OrderItemModifier[]
    note?: string
}

/**
 * Complete online order
 */
export interface OnlineOrder extends OrderPricing {
    id: string
    orderCode: string
    platform: OnlinePlatform
    customer: CustomerWithAddress
    status: OrderStatus
    timeline: OrderTimeline
    items: OnlineOrderItem[]
    payment: PaymentMethod
    paymentStatus: PaymentStatus
    estimatedTime?: string
    actualDeliveryTime?: string
    notes?: string
    cancelReason?: string
}

/**
 * Online order statistics
 */
export interface OnlineOrderStats extends RevenueStats {
    allOrders: number
    pendingOrders: number
    acceptedOrders: number
    preparingOrders: number
    completedOrders: number
    cancelledOrders: number
}

/**
 * Filter status for online orders
 */
export type OnlineOrderFilterStatus =
    | 'all'
    | 'pending'
    | 'accepted'
    | 'preparing'
    | 'completed'
    | 'cancelled'
