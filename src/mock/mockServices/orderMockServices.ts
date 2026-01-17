import type { Order, AllOrderType } from '@/@types/orders'

export const mockOrders: Order[] = [
  {
    id: 42,
    orderCode: '0042',
    type: 'Dine-in',
    table: 'Table 14',
    seatingArea: 'Main Floor',
    customer: 'Tarun Dewangan',
    createdBy: 'Manoj Kumar',
    status: 'Preparing',
    time: '14 Dec 13:44',
    amount: 270,
    payment: 'Cash',
    paymentStatus: 'Pending',
    paymentNote: 'Yet to be done',
    items: [
      {
        name: 'Classic Burger',
        qty: 2,
        amount: 30,
        total: 60,
        modifiers: [{ label: 'Extra Cheese', price: 2 }],
      },
      {
        name: 'Classic Burger',
        qty: 2,
        amount: 30,
        total: 60,
        modifiers: [{ label: 'Extra Cheese', price: 2 }],
      },
      {
        name: 'Classic Burger',
        qty: 2,
        amount: 30,
        total: 60,
        modifiers: [{ label: 'Extra Cheese', price: 2 }],
      },
      {
        name: 'Classic Burger',
        qty: 2,
        amount: 30,
        total: 60,
        modifiers: [{ label: 'Extra Cheese', price: 2 }],
      },
    ],
    value: 240,
    tax: 18,
    serviceCharge: 12,
    total: 270,
    charges: [
      { label: 'Order Value', amount: 240 },
      { label: 'Tax', amount: 18 },
      { label: 'Service Charge', amount: 12 },
      { label: 'Total', amount: 270, emphasized: true },
    ],
  },
  {
    id: 101,
    orderCode: '0101',
    type: 'Takeaway',
    table: 'Counter',
    seatingArea: 'Front Desk',
    customer: 'Rohit Sharma',
    createdBy: 'Admin',
    status: 'Completed',
    time: '14 Dec 14:05',
    amount: 230,
    payment: 'UPI',
    paymentStatus: 'Paid',
    paymentNote: 'Paid via UPI',
    items: [
      {
        name: 'Veg Wrap',
        qty: 2,
        amount: 100,
        total: 200,
        modifiers: [{ label: 'Extra Sauce' }],
      },
    ],
    value: 200,
    tax: 20,
    serviceCharge: 10,
    total: 230,
    charges: [
      { label: 'Order Value', amount: 200 },
      { label: 'Tax', amount: 20 },
      { label: 'Service Charge', amount: 10 },
      { label: 'Total', amount: 230, emphasized: true },
    ],
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
