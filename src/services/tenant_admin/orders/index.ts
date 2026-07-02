import ApiService from '@/services/ApiService'

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'paid' | 'cancelled'
export type OrderItemStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface OrderItem {
    id: string
    order_id: string
    item_id?: string
    combo_id?: string
    name: string
    unit_price: number
    quantity: number
    status: OrderItemStatus
    notes?: string
}

export interface Order {
    id: string
    order_number: string
    tenant_id: string
    table_id: string
    waiter_id: string
    cart_id?: string
    status: OrderStatus
    payment_status: PaymentStatus
    subtotal: number
    tax: number
    total: number
    notes?: string
    items: OrderItem[]
    created_at: string
    updated_at: string
}

export interface OrderStats {
    by_status: Record<OrderStatus, number>
    revenue: {
        today: number
        this_week: number
        this_month: number
    }
}

export interface OrderFilters {
    status?: OrderStatus
    date_from?: string
    date_to?: string
    waiter_id?: string
    table_id?: string
}

export async function apiGetOrders(filters?: OrderFilters): Promise<Order[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<Order[]>({
            url: '/orders',
            method: 'get',
            params: filters ? { ...filters } : {},
        })
        return response
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}

export async function apiGetOrderStats(): Promise<OrderStats> {
    try {
        const response = await ApiService.fetchDataWithAxios<OrderStats>({
            url: '/orders/stats',
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching order stats:', error)
        throw error
    }
}

export async function apiGetOrderById(id: string): Promise<Order> {
    try {
        const response = await ApiService.fetchDataWithAxios<Order>({
            url: `/orders/${id}`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching order by ID:', error)
        throw error
    }
}

export async function apiUpdateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    try {
        const response = await ApiService.fetchDataWithAxios<Order, { status: OrderStatus }>({
            url: `/orders/${id}/status`,
            method: 'patch',
            data: { status },
        })
        return response
    } catch (error) {
        console.error('Error updating order status:', error)
        throw error
    }
}

export async function apiUpdateOrderItemStatus(
    orderId: string,
    itemId: string,
    status: OrderItemStatus,
): Promise<Order> {
    try {
        const response = await ApiService.fetchDataWithAxios<Order, { status: OrderItemStatus }>({
            url: `/orders/${orderId}/items/${itemId}/status`,
            method: 'patch',
            data: { status },
        })
        return response
    } catch (error) {
        console.error('Error updating order item status:', error)
        throw error
    }
}

export async function apiPayOrder(id: string): Promise<Order> {
    try {
        // POS counter payment — marks the order paid, bypassing the kitchen status chain
        const response = await ApiService.fetchDataWithAxios<Order>({
            url: `/orders/${id}/pay`,
            method: 'post',
        })
        return response
    } catch (error) {
        console.error('Error paying order:', error)
        throw error
    }
}

export async function apiCancelOrder(id: string): Promise<void> {
    try {
        await ApiService.fetchDataWithAxios<void>({
            url: `/orders/${id}`,
            method: 'delete',
        })
    } catch (error) {
        console.error('Error cancelling order:', error)
        throw error
    }
}
