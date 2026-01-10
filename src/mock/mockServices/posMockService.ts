import type { POSData, CurrentOrder, OrderItem, Table } from '@/@types/pos'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockPOSData: POSData = {
    categories: [
        { id: 'all', name: 'All', icon: '🍽️' },
        { id: 'pizza', name: 'Pizza', icon: '🍕' },
        { id: 'burger', name: 'Burger', icon: '🍔' },
        { id: 'pasta', name: 'Pasta', icon: '🍝' },
        { id: 'beverages', name: 'Beverages', icon: '🥤' },
        { id: 'desserts', name: 'Desserts', icon: '🍰' },
    ],
    menuItems: [
        {
            id: '1',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        },
        {
            id: '2',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '3',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '4',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '5',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '6',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '7',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '8',
            name: 'Margherita Pizza',
            price: 22,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '9',
            name: 'Pepperoni Pizza',
            price: 26,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '10',
            name: 'Veggie Supreme Pizza',
            price: 24,
            category: 'pizza',
            image: '/placeholder-pizza.jpg',
        },
        {
            id: '11',
            name: 'Veg Cheese Burger',
            price: 15,
            category: 'burger',
            image: '/placeholder-burger.jpg',
        },
    ],
    tables: [
        { id: 't1', number: 'Table 1', capacity: 2, status: 'available' },
        { id: 't2', number: 'Table 2', capacity: 4, status: 'available' },
        { id: 't3', number: 'Table 3', capacity: 4, status: 'occupied' },
        { id: 't4', number: 'Table 4', capacity: 6, status: 'available' },
        { id: 't5', number: 'Table 5', capacity: 2, status: 'reserved' },
        { id: 't6', number: 'Table 6', capacity: 8, status: 'available' },
        { id: 't7', number: 'Table 7', capacity: 4, status: 'available' },
        { id: 't8', number: 'Table 8', capacity: 2, status: 'available' },
        { id: 't9', number: 'Table 9', capacity: 4, status: 'available' },
        { id: 't10', number: 'Table 10', capacity: 6, status: 'available' },
    ],
    availableAddons: [
        { id: 'addon1', name: 'Extra Cheese', price: 2 },
        { id: 'addon2', name: 'Olives', price: 1.5 },
        { id: 'addon3', name: 'Mushrooms', price: 2 },
        { id: 'addon4', name: 'Pepperoni', price: 3 },
        { id: 'addon5', name: 'Bacon', price: 3 },
        { id: 'addon6', name: 'Jalapeños', price: 1 },
    ],
}

export const posMockService = {
    // Get all POS data
    getPOSData: async (): Promise<POSData> => {
        await delay(300)
        return mockPOSData
    },

    // Get menu items by category
    getMenuItemsByCategory: async (category: string): Promise<POSData['menuItems']> => {
        await delay(200)
        if (category === 'all') {
            return mockPOSData.menuItems
        }
        return mockPOSData.menuItems.filter((item) => item.category === category)
    },

    // Get available tables
    getTables: async (): Promise<Table[]> => {
        await delay(200)
        return mockPOSData.tables
    },

    // Create KOT (Kitchen Order Ticket)
    createKOT: async (order: CurrentOrder): Promise<{ success: boolean; kotId: string }> => {
        await delay(500)
        console.log('Mock Service: Creating KOT', order)
        return {
            success: true,
            kotId: `KOT-${Math.floor(Math.random() * 10000)}`,
        }
    },

    // Hold order
    holdOrder: async (order: CurrentOrder): Promise<{ success: boolean; orderId: string }> => {
        await delay(500)
        console.log('Mock Service: Holding order', order)
        return {
            success: true,
            orderId: `HOLD-${Math.floor(Math.random() * 10000)}`,
        }
    },

    // Save order
    saveOrder: async (order: CurrentOrder): Promise<{ success: boolean; orderId: string }> => {
        await delay(500)
        console.log('Mock Service: Saving order', order)
        return {
            success: true,
            orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
        }
    },

    // Print order
    printOrder: async (order: CurrentOrder): Promise<{ success: boolean }> => {
        await delay(300)
        console.log('Mock Service: Printing order', order)
        return { success: true }
    },

    // Process payment
    processPayment: async (order: CurrentOrder): Promise<{ success: boolean; transactionId: string }> => {
        await delay(700)
        console.log('Mock Service: Processing payment', order)
        return {
            success: true,
            transactionId: `TXN-${Math.floor(Math.random() * 100000)}`,
        }
    },
}
