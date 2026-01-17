import { useEffect, useState } from 'react'
import type { Order } from '@/@types/orders'
import { fetchOrderById } from '@/mock/mockServices/orderMockServices'

export function useOrderDetail(orderId: number | null) {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!orderId) {
            setOrder(null)
            return
        }

        setLoading(true)
        setOrder(null)
        fetchOrderById(orderId)
            .then(setOrder)
            .finally(() => setLoading(false))
    }, [orderId])

    return { order, loading }
}
