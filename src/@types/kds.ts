export type KDSType = 'live-orders' | 'kds-setup'

export type OrderStatus = 'pending' | 'prepared' | 'completed'

export type OrderItem = {
    id: string
    name: string
    quantity: number
    price: number
    status: OrderStatus
}

export type Order = {
    id: string
    orderNumber: string
    type: 'Dine-in' | 'Takeaway' | 'Delivery'
    table: string
    time: string
    items: OrderItem[]
    overallStatus: OrderStatus
}

export type KDSData = {
    orders: Order[]
}
