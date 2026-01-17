import {
    OrderStatus,
    OrderType,
    OnlinePlatform,
    BaseOrderItem,
    RevenueStats,
} from './shared'

/**
 * Simplified order item for dashboard views
 */
export interface DashboardOrderItem {
    name: string
    quantity: number
}

/**
 * Online order summary for dashboard
 */
export interface OnlineOrder {
    orderId: string
    platform: OnlinePlatform
    amount: number
    items: DashboardOrderItem[]
    placedAgo: string
}

/**
 * Recent order summary for dashboard
 */
export interface RecentOrder {
    orderId: string
    orderType: OrderType
    tableNumber?: string
    amount: number
    status: OrderStatus
    placedAgo: string
    items: DashboardOrderItem[]
}

/**
 * Dashboard key performance indicators
 */
export interface DashboardStats extends RevenueStats {
    totalRevenueGrowth: number
    profitVsGoal: number
    profitVsGoalGrowth: number
    moneyLost: number
    itemSold: number
    itemSoldGrowth: number
}

/**
 * Complete dashboard data
 */
export interface DashboardData {
    stats: DashboardStats
    onlineOrders: OnlineOrder[]
    recentOrders: RecentOrder[]
}
