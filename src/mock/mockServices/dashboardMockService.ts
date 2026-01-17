import type { DashboardData, OnlineOrder, RecentOrder } from '@/@types/dashboard'
import { MOCK_ORDERS, getLiveOrders, getRecentOrders } from '@/mock/data/mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Convert delivery orders to online order format
const convertToOnlineOrders = (): OnlineOrder[] => {
    return getLiveOrders().slice(0, 4).map(order => ({
        orderId: order.orderCode || order.id.toString(),
        platform: 'other' as const,
        amount: order.total,
        items: order.items.map(item => ({
            name: item.name,
            quantity: item.qty
        })),
        placedAgo: getTimeAgo(order.time)
    }))
}

// Convert dine-in/takeaway orders to recent order format
const convertToRecentOrders = (): RecentOrder[] => {
    return getRecentOrders().slice(0, 4).map(order => ({
        orderId: order.orderCode || order.id.toString(),
        orderType: order.type,
        tableNumber: order.table || '-',
        amount: order.total,
        status: order.status,
        placedAgo: getTimeAgo(order.time),
        items: order.items.map(item => ({
            name: item.name,
            quantity: item.qty
        }))
    }))
}

const getTimeAgo = (timeStr: string): string => {
    // Simple time ago calculator
    return '2 minutes ago'
}

const mockData: DashboardData = {
    stats: {
        totalRevenue: 12000,
        totalRevenueGrowth: 12,
        profitVsGoal: 85,
        profitVsGoalGrowth: -5,
        moneyLost: 890000,
        itemSold: 45680,
        itemSoldGrowth: 12,
    },
    get onlineOrders() {
        return convertToOnlineOrders()
    },
    get recentOrders() {
        return convertToRecentOrders()
    },
}

export const dashboardMockService = {
    getDashboardData: async (): Promise<DashboardData> => {
        await delay(1000) // Simulate 1s network latency
        return mockData
    },

    // Example mutation mock
    acceptOrder: async (orderId: string): Promise<{ success: boolean; orderId: string }> => {
        await delay(500)
        console.log(`Mock Service: Accepted order ${orderId}`)
        return { success: true, orderId }
    },

    rejectOrder: async (orderId: string): Promise<{ success: boolean; orderId: string }> => {
        await delay(500)
        console.log(`Mock Service: Rejected order ${orderId}`)
        return { success: true, orderId }
    }
}
