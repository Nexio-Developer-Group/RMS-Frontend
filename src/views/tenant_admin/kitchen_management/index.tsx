import { useEffect, useState } from 'react'
import KDSTypeHeader from './components/KDSTypeHeader'
import KDSCard from './components/KDSCard'

import type { KDSType, Order } from '@/@types/kds'
import { kdsMockService } from '@/mock/mockServices/kdsMockService'

const KitchenManagement = () => {
    const [kdsType, setKdsType] = useState<KDSType>('live-orders')
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await kdsMockService.getKDSData()
            setOrders(data.orders)
            setLoading(false)
        }

        fetchData()
    }, [])

    const handleApproveItem = async (orderId: string, itemId: string) => {
        await kdsMockService.approveOrderItem(orderId, itemId)

        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId
                    ? {
                          ...order,
                          items: order.items.map((item) =>
                              item.id === itemId
                                  ? { ...item, status: 'prepared' }
                                  : item
                          ),
                      }
                    : order
            )
        )
    }

    const handleCompleteOrder = async (orderId: string) => {
        setOrders((prev) => prev.filter((order) => order.id !== orderId))
    }

    return (
        <div className="flex flex-col gap-4">
            <KDSTypeHeader
                kdsType={kdsType}
                onKDSTypeChange={setKdsType}
            />

            {kdsType === 'live-orders' && (
                <>
                    {loading ? (
                        <div className="p-6 text-sm text-muted-foreground">
                            Loading orders…
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                            {orders.map((order) => (
                                <KDSCard
                                    key={order.id}
                                    order={order}
                                    onApproveItem={handleApproveItem}
                                    onCompleteOrder={handleCompleteOrder}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {kdsType === 'kds-setup' && (
                <div className="p-6 text-sm text-muted-foreground">
                    KDS Setup coming soon
                </div>
            )}
        </div>
    )
}

export default KitchenManagement
