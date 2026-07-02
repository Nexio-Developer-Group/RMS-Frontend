import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Loading from '@/components/shared/Loading'
import KDSTypeHeader from './components/KDSTypeHeader'
import KDSCard from './components/KDSCard'
import { apiGetOrders, apiUpdateOrderItemStatus } from '@/services/tenant_admin/orders'
import type { Order as ApiOrder } from '@/services/tenant_admin/orders'
import type { KDSType, KDSOrder, KDSOrderItem } from '@/@types/kds'

const KITCHEN_STATUSES = ['pending', 'confirmed', 'preparing', 'ready'] as const

function mapToKDSOrder(order: ApiOrder): KDSOrder {
    return {
        id: order.id,
        orderNumber: order.order_number,
        type: 'dine-in',
        table: order.table_id ? `Table ${order.table_id}` : undefined,
        time: order.created_at,
        items: (order.items || []).map((item): KDSOrderItem => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: Number(item.unit_price),
            total: Number(item.unit_price) * item.quantity,
            status: (item.status as any) || 'pending',
        })),
        overallStatus: order.status as any,
    }
}

const KitchenManagement = () => {
    const [kdsType, setKdsType] = useState<KDSType>('live-orders')
    const queryClient = useQueryClient()

    const { data: apiOrders, isLoading } = useQuery({
        queryKey: ['orders', 'kitchen'],
        queryFn: () => apiGetOrders({ status: undefined }),
        staleTime: 15_000,
        refetchInterval: 30_000,
    })

    const orders: KDSOrder[] = (apiOrders || [])
        .filter((o) => KITCHEN_STATUSES.includes(o.status as any))
        .map(mapToKDSOrder)

    const approveItemMutation = useMutation({
        mutationFn: ({ orderId, itemId }: { orderId: string; itemId: string }) =>
            apiUpdateOrderItemStatus(orderId, itemId, 'ready'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', 'kitchen'] })
        },
    })

    const handleApproveItem = useCallback(
        (orderId: string, itemId: string) => {
            approveItemMutation.mutate({ orderId, itemId })
        },
        [approveItemMutation],
    )

    const handleCompleteOrder = useCallback((_orderId: string) => {
        queryClient.invalidateQueries({ queryKey: ['orders', 'kitchen'] })
    }, [queryClient])

    return (
        <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
            <div className="h-full flex flex-col rounded-md border bg-card overflow-hidden">
                <div className="shrink-0">
                    <KDSTypeHeader
                        kdsType={kdsType}
                        onKDSTypeChange={setKdsType}
                    />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {kdsType === 'live-orders' && (
                        <>
                            {isLoading ? (
                                <div className="flex h-full items-center justify-center min-h-100">
                                    <Loading loading={true} />
                                </div>
                            ) : (
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {orders.map((order) => (
                                            <KDSCard
                                                key={order.id}
                                                order={order}
                                                onApproveItem={handleApproveItem}
                                                onCompleteOrder={handleCompleteOrder}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {kdsType === 'kds-setup' && (
                        <div className="flex items-center justify-center h-full p-6 text-sm text-muted-foreground">
                            KDS Setup coming soon
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default KitchenManagement
