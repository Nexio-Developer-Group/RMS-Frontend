import { useQuery } from '@tanstack/react-query'
import { apiGetOrders } from '@/services/tenant_admin/orders'
import type { Order as ApiOrder, OrderStatus } from '@/services/tenant_admin/orders'
import type { Order, AllOrderType } from '@/@types/orders'

function mapApiOrderToOrder(o: ApiOrder): Order {
    return {
        id: parseInt(o.id) || 0,
        orderCode: o.order_number,
        orderNumber: o.order_number,
        type: 'dine-in',
        table: o.table_id ? `Table ${o.table_id}` : undefined,
        customer: `Order ${o.order_number}`,
        createdBy: o.waiter_id ? String(o.waiter_id) : 'Staff',
        status: (o.status as any) || 'pending',
        time: o.created_at,
        amount: Number(o.subtotal),
        value: Number(o.subtotal),
        total: Number(o.total),
        tax: Number(o.tax),
        serviceCharge: 0,
        discount: 0,
        payment: 'cash' as any,
        paymentStatus: o.payment_status as any,
        items: (o.items || []).map(i => ({
            id: i.id,
            name: i.name,
            qty: i.quantity,
            amount: Number(i.unit_price),
            total: Number(i.unit_price) * i.quantity,
        })),
    }
}

function filterOrders(orders: ApiOrder[], type: AllOrderType, search: string): Order[] {
    let filtered = [...orders]

    if (type === 'live-orders') {
        filtered = filtered.filter(o =>
            ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status)
        )
    }
    if (type === 'kds-setup') {
        filtered = filtered.filter(o => o.status !== 'cancelled')
    }
    if (search) {
        const q = search.toLowerCase()
        filtered = filtered.filter(o =>
            o.order_number.toLowerCase().includes(q) ||
            o.id.toLowerCase().includes(q)
        )
    }

    return filtered.map(mapApiOrderToOrder)
}

export function useOrders(type: AllOrderType, search: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: () => apiGetOrders(),
        staleTime: 30_000,
    })

    const orders = data ? filterOrders(data, type, search) : []
    return { orders, loading: isLoading }
}

export function useAllOrders(status?: OrderStatus) {
    return useQuery({
        queryKey: ['orders', status],
        queryFn: () => apiGetOrders(status ? { status } : undefined),
        staleTime: 30_000,
    })
}
