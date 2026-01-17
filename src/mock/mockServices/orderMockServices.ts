import type { Order, AllOrderType } from '@/@types/orders'
import { MOCK_ORDERS } from '@/mock/data/mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchOrders(
  type: AllOrderType,
  search = ''
): Promise<Order[]> {
  await delay(600)

  let orders = [...MOCK_ORDERS]

  // Live Orders = Delivery orders
  if (type === 'live-orders') {
    orders = orders.filter(o => o.type === 'delivery')
  }

  // KDS Setup - exclude cancelled
  if (type === 'kds-setup') {
    orders = orders.filter(o => o.status !== 'cancelled')
  }

  // Search
  if (search) {
    const q = search.toLowerCase()
    orders = orders.filter(o =>
      o.customer.toLowerCase().includes(q) ||
      o.id.toString().includes(q) ||
      o.orderCode?.toLowerCase().includes(q)
    )
  }

  return orders
}

export async function fetchOrderById(id: number): Promise<Order | null> {
  await delay(300)
  return MOCK_ORDERS.find(o => o.id === id) ?? null
}
