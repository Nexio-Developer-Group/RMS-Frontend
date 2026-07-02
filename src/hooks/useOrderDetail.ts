import { useQuery } from '@tanstack/react-query'
import { apiGetOrderById } from '@/services/tenant_admin/orders'
import type { Order as ApiOrder } from '@/services/tenant_admin/orders'
import type { Order } from '@/@types/orders'

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

export function useOrderDetail(orderId: number | string | null) {
    const id = orderId ? String(orderId) : null

    const { data, isLoading } = useQuery({
        queryKey: ['order', id],
        queryFn: () => apiGetOrderById(id!),
        enabled: !!id,
        staleTime: 30_000,
    })

    return {
        order: data ? mapApiOrderToOrder(data) : null,
        loading: isLoading,
    }
}
