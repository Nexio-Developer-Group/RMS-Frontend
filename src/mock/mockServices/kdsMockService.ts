import type { KDSData } from '@/@types/kds';
import { Eclipse } from 'lucide-react';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockKDSData: KDSData = {
    orders: [
        {
            id: '1',
            orderNumber: '#0042',
            type: 'Dine-in',
            table: 'Floor 2/ Table 3',
            time: '44:39',
            items: [
                { id: 'a', name: 'Classic Burger', quantity: 2, price: 12, status: 'prepared' },
                { id: 'b', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
                { id: 'c', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
                { id: 'd', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
            ],
            overallStatus: 'pending',
        },
        {
            id: '2',
            orderNumber: '#0042',
            type: 'Dine-in',
            table: 'Floor 2/ Table 3',
            time: '44:39',
            items: [
                { id: 'a', name: 'Classic Burger', quantity: 2, price: 12, status: 'pending' },
                { id: 'b', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
                { id: 'c', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
                { id: 'd', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
            ],
            overallStatus: 'pending',
        },
        {
            id: '3',
            orderNumber: '#0042',
            type: 'Dine-in',
            table: 'Floor 2/ Table 3',
            time: '44:39',
            items: [
                { id: 'a', name: 'Classic Burger', quantity: 2, price: 12, status: 'pending' },
                { id: 'b', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
                { id: 'c', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
                { id: 'd', name: 'Classic Burger', quantity: 1, price: 12, status: 'pending' },
            ],
            overallStatus: 'pending',
        },

    ],
}

export const kdsMockService = {
    getKDSData: async (): Promise<KDSData> => {
        await delay(1000)
        return mockKDSData
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