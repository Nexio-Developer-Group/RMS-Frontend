import type { KDSData, KDSOrder } from '@/@types/kds'
import { getLiveOrders } from '@/mock/data/mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Convert delivery orders to KDS format
const convertToKDSOrders = (): KDSOrder[] => {
    return getLiveOrders().map(order => ({
        id: order.id.toString(),
        orderNumber: order.orderCode || `#${order.id}`,
        type: order.type,
        table: order.table || 'Delivery',
        time: getElapsedTime(order.time),
        items: order.items.map((item, idx) => ({
            id: `${order.id}-${idx}`,
            name: item.name,
            quantity: item.qty,
            price: item.amount,
            total: item.total,
            status: order.status
        })),
        overallStatus: order.status
    }))
}

const getElapsedTime = (timeStr: string): string => {
    return '15:30'
}

const getMockKDSData = (): KDSData => ({
    orders: [
        ...convertToKDSOrders()
    ]
})

export const kdsMockService = {
    getKDSData: async (): Promise<KDSData> => {
        await delay(1000)
        return getMockKDSData()
    },

    approveOrderItem: async (orderId: string, itemId: string): Promise<{ success: boolean; orderId: string }> => {
        await delay(500)
        console.log(`Approved item ${itemId} from order ${orderId}`)
        return { success: true, orderId }
    },

    completeOrderItem: async (orderId: string, itemId: string): Promise<{ success: boolean; orderId: string }> => {
        await delay(500)
        console.log(`Completed item ${itemId} from order ${orderId}`)
        return { success: true, orderId }
    },
}