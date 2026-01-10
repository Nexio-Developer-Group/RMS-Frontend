import type { DashboardData } from '@/@types/dashboard'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockData: DashboardData = {
    stats: {
        totalRevenue: 12000,
        totalRevenueGrowth: 12,
        profitVsGoal: 85,
        profitVsGoalGrowth: -5,
        moneyLost: 890000, // 8.9L
        itemSold: 45680,
        itemSoldGrowth: 12,
    },
    onlineOrders: [
        {
            orderId: 'ZOM-4335',
            platform: 'Zomato',
            amount: 23.55,
            items: [
                { name: 'Butter Chicken', quantity: 1 },
                { name: 'Naan Bread', quantity: 2 },
                { name: 'Biryani', quantity: 1 },
            ],
            placedAgo: '2 minutes ago',
        },
        {
            orderId: 'SGY-9921',
            platform: 'Swiggy',
            amount: 45.0,
            items: [
                { name: 'Paneer Tikka', quantity: 2 },
                { name: 'Garlic Naan', quantity: 3 },
            ],
            placedAgo: '5 minutes ago',
        },
        {
            orderId: 'ZOM-4336',
            platform: 'Zomato',
            amount: 12.5,
            items: [
                { name: 'Veg Burger', quantity: 2 },
                { name: 'Fries', quantity: 1 },
            ],
            placedAgo: '8 minutes ago',
        },
         {
            orderId: 'ZOM-4337',
            platform: 'Zomato',
            amount: 12.5,
            items: [
                { name: 'Veg Burger', quantity: 2 },
                { name: 'Fries', quantity: 1 },
            ],
            placedAgo: '8 minutes ago',
        },
    ],
    recentOrders: [
        {
            orderId: '0042',
            orderType: 'Dine-in',
            tableNumber: 'Table 12',
            amount: 23.98,
            status: 'Preparing',
            placedAgo: '2 minutes ago',
            items: [
                { name: 'Butter Chicken', quantity: 1 },
                { name: 'Naan Bread', quantity: 2 },
                { name: 'Biryani', quantity: 1 },
                { name: 'Butter Chicken', quantity: 1 },
                { name: 'Naan Bread', quantity: 2 },
                { name: 'Biryani', quantity: 1 },
            ],
        },
        {
            orderId: '0043',
            orderType: 'Dine-in',
            tableNumber: 'Table 08',
            amount: 55.2,
            status: 'Preparing',
            placedAgo: '5 minutes ago',
            items: [
                { name: 'Paneer Masala', quantity: 2 },
                { name: 'Roti', quantity: 4 },
            ],
        },
        {
            orderId: '0044',
            orderType: 'Takeaway',
            tableNumber: '-',
            amount: 18.5,
            status: 'Ready',
            placedAgo: '12 minutes ago',
            items: [
                { name: 'Chicken Wrap', quantity: 2 },
                { name: 'Coke', quantity: 2 },
            ],
        },
        {
            orderId: '0042',
            orderType: 'Dine-in',
            tableNumber: 'Table 12',
            amount: 23.98,
            status: 'Preparing',
            placedAgo: '2 minutes ago',
            items: [
                { name: 'Butter Chicken', quantity: 1 },
                { name: 'Naan Bread', quantity: 2 },
                { name: 'Biryani', quantity: 1 },
                { name: 'Butter Chicken', quantity: 1 },
                { name: 'Naan Bread', quantity: 2 },
                { name: 'Biryani', quantity: 1 },
            ],
        },
    ],
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
