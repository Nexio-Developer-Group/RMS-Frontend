import { useEffect, useState } from 'react'
import type { Order, AllOrderType } from '@/@types/orders'
import { fetchOrders } from '@/mock/mockServices/orderMockServices'

export function useOrders(type: AllOrderType, search: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchOrders(type, search)
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [type, search])

  return { orders, loading }
}
