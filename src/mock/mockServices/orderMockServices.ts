import type { Order, AllOrderType } from '@/@types/orders'

export const mockOrders: Order[] = [
  {
    id: 101,
    type: 'Dine-in',
    table: 'Table 4',
    customer: 'Tarun Dewangan',
    createdBy: 'Manoj Kumar',
    status: 'Preparing',
    time: '14 Dec 13:44',
    amount: 540,
    payment: 'Cash',
    items: [
      { name: 'Classic Burger', qty: 2, amount: 120, total: 240 },
      { name: 'French Fries', qty: 1, amount: 80, total: 80 },
    ],
    value: 320,
    tax: 32,
    serviceCharge: 16,
    total: 368,
  },
  {
    id: 102,
    type: 'Takeaway',
    customer: 'Rohit Sharma',
    createdBy: 'Admin',
    status: 'Completed',
    time: '14 Dec 14:05',
    amount: 260,
    payment: 'UPI',
    items: [
      { name: 'Veg Wrap', qty: 2, amount: 100, total: 200 },
    ],
    value: 200,
    tax: 20,
    serviceCharge: 10,
    total: 230,
  },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchOrders(
  type: AllOrderType,
  search = ''
): Promise<Order[]> {
  await delay(600)

  let orders = [...mockOrders]

  // Live Orders
  if (type === 'live-orders') {
    orders = orders.filter(o => o.status !== 'Completed')
  }

  // KDS Setup
  if (type === 'kds-setup') {
    orders = orders.filter(o => o.status !== 'Cancelled')
  }

  // Search
  if (search) {
    const q = search.toLowerCase()
    orders = orders.filter(o =>
      o.customer.toLowerCase().includes(q) ||
      o.id.toString().includes(q)
    )
  }

  return orders
}

export async function fetchOrderById(id: number): Promise<Order | null> {
  await delay(300)
  return mockOrders.find(o => o.id === id) ?? null
}
