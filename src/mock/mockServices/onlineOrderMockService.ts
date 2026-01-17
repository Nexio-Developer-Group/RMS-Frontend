import type { OnlineOrder, OnlineOrderStats, OnlineOrderFilterStatus } from '@/@types/onlineorder'

export const mockOnlineOrders: OnlineOrder[] = [
    {
        id: 'ZOM-4561',
        orderCode: 'ZOM-4561',
        platform: 'zomato',
        customer: {
            name: 'Rahul Sharma',
            phone: '+917389884905',
            address: 'Devendra nagar, Raipur',
            city: 'Raipur',
            zipCode: '492001',
        },
        status: 'completed',
        timeline: {
            received: '11 Dec 2025 12:33 PM',
            accepted: '11 Dec 2025 12:33 PM',
            preparing: '11 Dec 2025 12:33 PM',
            completed: '11 Dec 2025 12:45 PM',
        },
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
                modifiers: [{ label: 'Extra Cheese', price: 2 }],
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
                modifiers: [{ label: 'Extra Cheese', price: 2 }],
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
                modifiers: [{ label: 'Extra Cheese', price: 2 }],
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
                modifiers: [{ label: 'Extra Cheese', price: 2 }],
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
                modifiers: [{ label: 'Extra Cheese', price: 2 }],
            },
        ],
        value: 50,
        tax: 2.18,
        serviceCharge: 2.18,
        total: 54.36,
        payment: 'cash',
        paymentStatus: 'paid',
        estimatedTime: '30 mins',
    },
    {
        id: 'ZOM-4562',
        orderCode: 'ZOM-4562',
        platform: 'zomato',
        customer: {
            name: 'Priya Verma',
            phone: '+919876543210',
            address: 'Shankar Nagar, Raipur',
            city: 'Raipur',
            zipCode: '492007',
        },
        status: 'pending',
        timeline: {
            received: '11 Dec 2025 12:33 PM',
        },
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
        ],
        value: 32,
        tax: 1.76,
        serviceCharge: 0,
        total: 33.76,
        payment: 'online',
        paymentStatus: 'paid',
        estimatedTime: '25 mins',
    },
    {
        id: 'ZOM-4563',
        orderCode: 'ZOM-4563',
        platform: 'zomato',
        customer: {
            name: 'Amit Kumar',
            phone: '+919988776655',
            address: 'Civil Lines, Raipur',
            city: 'Raipur',
            zipCode: '492001',
        },
        status: 'preparing',
        timeline: {
            received: '11 Dec 2025 12:33 PM',
            accepted: '11 Dec 2025 12:34 PM',
        },
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
        ],
        value: 32,
        tax: 1.76,
        serviceCharge: 0,
        total: 33.76,
        payment: 'card',
        paymentStatus: 'paid',
        estimatedTime: '35 mins',
    },
    {
        id: 'ZOM-4564',
        orderCode: 'ZOM-4564',
        platform: 'swiggy',
        customer: {
            name: 'Sneha Patel',
            phone: '+918765432109',
            address: 'Mowa, Raipur',
            city: 'Raipur',
            zipCode: '492001',
        },
        status: 'preparing',
        timeline: {
            received: '11 Dec 2025 12:33 PM',
            accepted: '11 Dec 2025 12:34 PM',
            preparing: '11 Dec 2025 12:35 PM',
        },
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
        ],
        value: 32,
        tax: 1.76,
        serviceCharge: 0,
        total: 33.76,
        payment: 'upi',
        paymentStatus: 'paid',
        estimatedTime: '30 mins',
    },
    {
        id: 'ZOM-4565',
        orderCode: 'ZOM-4565',
        platform: 'zomato',
        customer: {
            name: 'Vikram Singh',
            phone: '+917654321098',
            address: 'Telibandha, Raipur',
            city: 'Raipur',
            zipCode: '492006',
        },
        status: 'cancelled',
        timeline: {
            received: '11 Dec 2025 12:33 PM',
            cancelled: '11 Dec 2025 12:35 PM',
        },
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
        ],
        value: 32,
        tax: 1.76,
        serviceCharge: 0,
        total: 33.76,
        payment: 'cash',
        paymentStatus: 'refunded',
        cancelReason: 'Customer requested cancellation',
    },
    // Additional mock orders
    {
        id: 'ZOM-4566',
        orderCode: 'ZOM-4566',
        platform: 'zomato',
        customer: {
            name: 'Anjali Mehta',
            phone: '+919876543211',
            address: 'Vidhan Sabha Road, Raipur',
            city: 'Raipur',
            zipCode: '492001',
        },
        status: 'preparing',
        timeline: {
            received: '11 Dec 2025 12:33 PM',
            accepted: '11 Dec 2025 12:34 PM',
            preparing: '11 Dec 2025 12:36 PM',
        },
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30.00,
                total: 60,
            },
        ],
        value: 32,
        tax: 1.76,
        serviceCharge: 0,
        total: 33.76,
        payment: 'online',
        paymentStatus: 'paid',
        estimatedTime: '28 mins',
    },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const onlineOrderMockService = {
    // Get all orders with optional filtering
    async getOnlineOrders(status: OnlineOrderFilterStatus = 'all', search = ''): Promise<OnlineOrder[]> {
        await delay(600)

        let orders = [...mockOnlineOrders]

        // Filter by status
        if (status !== 'all') {
            orders = orders.filter(o => o.status.toLowerCase() === status)
        }

        // Search filter
        if (search) {
            const q = search.toLowerCase()
            orders = orders.filter(o =>
                o.orderCode.toLowerCase().includes(q) ||
                o.customer.name.toLowerCase().includes(q) ||
                o.customer.phone.includes(q)
            )
        }

        return orders
    },

    // Get single order by ID
    async getOnlineOrderById(id: string): Promise<OnlineOrder | null> {
        await delay(300)
        return mockOnlineOrders.find(o => o.id === id) ?? null
    },

    // Get order statistics
    async getOnlineOrderStats(): Promise<OnlineOrderStats> {
        await delay(400)

        const orders = mockOnlineOrders
        const completed = orders.filter(o => o.status === 'completed')

        return {
            allOrders: orders.length,
            pendingOrders: orders.filter(o => o.status === 'pending').length,
            acceptedOrders: orders.filter(o => o.status === 'preparing').length,
            preparingOrders: orders.filter(o => o.status === 'preparing').length,
            completedOrders: completed.length,
            cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
            totalRevenue: completed.reduce((sum, o) => sum + o.total, 0),
            averageOrderValue: completed.length > 0
                ? completed.reduce((sum, o) => sum + o.total, 0) / completed.length
                : 0,
        }
    },

    // Accept order
    async acceptOrder(orderId: string): Promise<OnlineOrder> {
        await delay(500)
        const order = mockOnlineOrders.find(o => o.id === orderId)
        if (!order) throw new Error('Order not found')

        order.status = 'preparing'
        order.timeline.accepted = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })

        return order
    },

    // Start preparing order
    async startPreparing(orderId: string): Promise<OnlineOrder> {
        await delay(500)
        const order = mockOnlineOrders.find(o => o.id === orderId)
        if (!order) throw new Error('Order not found')

        order.status = 'preparing'
        order.timeline.preparing = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })

        return order
    },

    // Mark order as ready/completed
    async markAsReady(orderId: string): Promise<OnlineOrder> {
        await delay(500)
        const order = mockOnlineOrders.find(o => o.id === orderId)
        if (!order) throw new Error('Order not found')

        order.status = 'completed'
        order.timeline.completed = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })

        return order
    },

    // Cancel order
    async cancelOrder(orderId: string, reason: string): Promise<OnlineOrder> {
        await delay(500)
        const order = mockOnlineOrders.find(o => o.id === orderId)
        if (!order) throw new Error('Order not found')

        order.status = 'cancelled'
        order.cancelReason = reason
        order.timeline.cancelled = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })

        return order
    },

    // Print order receipt
    async printOrder(orderId: string): Promise<{ success: boolean }> {
        await delay(300)
        console.log('Printing order:', orderId)
        return { success: true }
    },

    // Print KOT (Kitchen Order Ticket)
    async printKOT(orderId: string): Promise<{ success: boolean }> {
        await delay(300)
        console.log('Printing KOT for order:', orderId)
        return { success: true }
    },
}
