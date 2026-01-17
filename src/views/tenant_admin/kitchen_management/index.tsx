import { useEffect, useState } from 'react'
import Loading from '@/components/shared/Loading'
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
        <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
            {/* Main Container - Full Height */}
            <div className="h-full flex flex-col rounded-md border bg-card overflow-hidden">

                {/* Fixed Header - Non-scrollable */}
                <div className="shrink-0">
                    <KDSTypeHeader
                        kdsType={kdsType}
                        onKDSTypeChange={setKdsType}
                    />
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    {kdsType === 'live-orders' && (
                        <>
                            {loading ? (
                                <div className="flex h-full items-center justify-center min-h-100">
                                    <Loading loading={true} />
                                </div>
                            ) : (
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
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
