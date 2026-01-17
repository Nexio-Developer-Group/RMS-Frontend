
import type { Order } from '@/@types/orders'
import type { MenuItem } from '@/@types/menu'
import type { Customer } from '@/@types/customers'
import type { Table } from '@/@types/table'

// ============================================================================
// DASHBOARD STATS
// ============================================================================


// ============================================================================
// MENU ITEMS
// ============================================================================
export const MOCK_MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'Classic Burger',
        price: 30,
        categoryId: 'burger',
        categoryName: 'Burger',
        available: true,
        image: '/img/menu/burger.jpg',
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        price: 22,
        categoryId: 'pizza',
        categoryName: 'Pizza',
        available: true,
        image: '/img/menu/pizza.jpg',
    },
    {
        id: '3',
        name: 'Butter Chicken',
        price: 45,
        categoryId: 'main',
        categoryName: 'Main Course',
        available: true,
        image: '/img/menu/main.jpg',
    },
    {
        id: '4',
        name: 'Naan Bread',
        price: 8,
        categoryId: 'bread',
        categoryName: 'Breads',
        available: true,
    },
    {
        id: '5',
        name: 'Biryani',
        price: 50,
        categoryId: 'main',
        categoryName: 'Main Course',
        available: true,
        image: '/img/menu/biryani.jpg',
    },
    {
        id: '6',
        name: 'Paneer Tikka',
        price: 35,
        categoryId: 'starter',
        categoryName: 'Starter',
        available: true,
    },
    {
        id: '7',
        name: 'Garlic Naan',
        price: 10,
        categoryId: 'bread',
        categoryName: 'Breads',
        available: true,
    },
    {
        id: '8',
        name: 'Veg Burger',
        price: 25,
        categoryId: 'burger',
        categoryName: 'Burger',
        available: true,
        image: '/img/menu/burger.jpg',
    },
    {
        id: '9',
        name: 'French Fries',
        price: 15,
        categoryId: 'sides',
        categoryName: 'Sides',
        available: true,
    },
    {
        id: '10',
        name: 'Paneer Masala',
        price: 40,
        categoryId: 'main',
        categoryName: 'Main Course',
        available: true,
    },
    {
        id: '11',
        name: 'Roti',
        price: 5,
        categoryId: 'bread',
        categoryName: 'Breads',
        available: true,
    },
    {
        id: '12',
        name: 'Chicken Wrap',
        price: 35,
        categoryId: 'wrap',
        categoryName: 'Wraps',
        available: true,
    },
    {
        id: '13',
        name: 'Coke',
        price: 10,
        categoryId: 'beverage',
        categoryName: 'Beverages',
        available: true,
    },
]

// ============================================================================
// CUSTOMERS
// ============================================================================
export const MOCK_CUSTOMERS: Customer[] = [
    {
        id: 'cust-1',
        customerId: 'CUST001',
        name: 'Tarun Dewangan',
        phoneNumber: '+91 7389884905',
        email: 'tarun@example.com',
        totalOrders: 15,
        totalTransaction: 8500,
        lastOrderedOn: 'Jan 14, 2026',
        status: 'active',
        campaignStatus: 'active',
        orders: [],
        address: 'Devendra Nagar, Raipur',
        city: 'Raipur',
        joinedDate: 'Jan 10, 2024',
    },
    {
        id: 'cust-2',
        customerId: 'CUST002',
        name: 'Rohit Sharma',
        phoneNumber: '+91 9876543210',
        email: 'rohit@example.com',
        totalOrders: 8,
        totalTransaction: 4200,
        lastOrderedOn: 'Jan 14, 2026',
        status: 'active',
        campaignStatus: 'active',
        orders: [],
        address: 'Civil Lines, Raipur',
        city: 'Raipur',
        joinedDate: 'Feb 15, 2024',
    },
    {
        id: 'cust-3',
        customerId: 'CUST003',
        name: 'Rahul Sharma',
        phoneNumber: '+91 7389884905',
        email: 'rahul@example.com',
        totalOrders: 12,
        totalTransaction: 6800,
        lastOrderedOn: 'Jan 13, 2026',
        status: 'active',
        campaignStatus: 'active',
        orders: [],
        address: 'Shankar Nagar, Raipur',
        city: 'Raipur',
        joinedDate: 'Mar 01, 2024',
    },
    {
        id: 'cust-walk-in',
        customerId: 'WALK-IN',
        name: 'Walk-in Customer',
        phoneNumber: '+91 0000000000',
        totalOrders: 0,
        totalTransaction: 0,
        lastOrderedOn: '',
        status: 'active',
        campaignStatus: 'inactive',
        orders: [],
        joinedDate: 'Jan 01, 2024',
    },
]

// ============================================================================
// TABLES
// ============================================================================
export const MOCK_TABLES: Table[] = [
    {
        id: 'table-1',
        number: '12',
        name: 'Table 12',
        floorId: 'floor-1',
        floorName: 'Main Floor',
        capacity: 4,
        status: 'occupied',
        enabled: true,
        totalRevenue: 15000,
        totalOrders: 45,
        qrCode: 'https://forkfly.app/menu?table=12',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2026-01-18T00:00:00Z',
    },
    {
        id: 'table-2',
        number: '08',
        name: 'Table 08',
        floorId: 'floor-1',
        floorName: 'Main Floor',
        capacity: 4,
        status: 'occupied',
        enabled: true,
        totalRevenue: 12000,
        totalOrders: 38,
        qrCode: 'https://forkfly.app/menu?table=08',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2026-01-18T00:00:00Z',
    },
    {
        id: 'table-3',
        number: '14',
        name: 'Table 14',
        floorId: 'floor-1',
        floorName: 'Main Floor',
        capacity: 4,
        status: 'occupied',
        enabled: true,
        totalRevenue: 18000,
        totalOrders: 52,
        qrCode: 'https://forkfly.app/menu?table=14',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2026-01-18T00:00:00Z',
    },
]

// ============================================================================
// ORDERS
// ============================================================================
export const MOCK_ORDERS: Order[] = [
    // DINE-IN ORDERS (Recent Orders)
    {
        id: 42,
        orderCode: '0042',
        type: 'dine-in',
        table: 'Table 12',
        seatingArea: 'Main Floor',
        customer: 'Tarun Dewangan',
        createdBy: 'Manoj Kumar',
        status: 'preparing',
        time: '14 Jan 13:44',
        amount: 270,
        payment: 'cash',
        paymentStatus: 'pending',
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
                name: 'French Fries',
                qty: 2,
                amount: 15,
                total: 30,
            },
            {
                name: 'Butter Chicken',
                qty: 2,
                amount: 45,
                total: 90,
            },
            {
                name: 'Naan Bread',
                qty: 4,
                amount: 8,
                total: 32,
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
        id: 43,
        orderCode: '0043',
        type: 'dine-in',
        table: 'Table 08',
        seatingArea: 'Main Floor',
        customer: 'Tarun Dewangan',
        createdBy: 'Manoj Kumar',
        status: 'preparing',
        time: '14 Jan 14:05',
        amount: 320,
        payment: 'card',
        paymentStatus: 'pending',
        items: [
            {
                name: 'Paneer Masala',
                qty: 2,
                amount: 40,
                total: 80,
            },
            {
                name: 'Roti',
                qty: 4,
                amount: 5,
                total: 20,
            },
            {
                name: 'Butter Chicken',
                qty: 1,
                amount: 45,
                total: 45,
            },
            {
                name: 'Naan Bread',
                qty: 2,
                amount: 8,
                total: 16,
            },
            {
                name: 'Biryani',
                qty: 1,
                amount: 50,
                total: 50,
            },
        ],
        value: 280,
        tax: 28,
        serviceCharge: 12,
        total: 320,
        charges: [
            { label: 'Order Value', amount: 280 },
            { label: 'Tax', amount: 28 },
            { label: 'Service Charge', amount: 12 },
            { label: 'Total', amount: 320, emphasized: true },
        ],
    },
    // TAKEAWAY ORDERS (Recent Orders)
    {
        id: 44,
        orderCode: '0044',
        type: 'takeaway',
        customer: 'Rohit Sharma',
        createdBy: 'Admin',
        status: 'completed',
        time: '14 Jan 14:25',
        amount: 185,
        payment: 'upi',
        paymentStatus: 'paid',
        paymentNote: 'Paid via UPI',
        items: [
            {
                name: 'Chicken Wrap',
                qty: 2,
                amount: 35,
                total: 70,
            },
            {
                name: 'Coke',
                qty: 2,
                amount: 10,
                total: 20,
            },
            {
                name: 'French Fries',
                qty: 2,
                amount: 15,
                total: 30,
            },
        ],
        value: 160,
        tax: 16,
        serviceCharge: 9,
        total: 185,
        charges: [
            { label: 'Order Value', amount: 160 },
            { label: 'Tax', amount: 16 },
            { label: 'Service Charge', amount: 9 },
            { label: 'Total', amount: 185, emphasized: true },
        ],
    },
    {
        id: 101,
        orderCode: '0101',
        type: 'takeaway',
        customer: 'Walk-in Customer',
        createdBy: 'Admin',
        status: 'preparing',
        time: '14 Jan 15:10',
        amount: 230,
        payment: 'cash',
        paymentStatus: 'pending',
        items: [
            {
                name: 'Veg Burger',
                qty: 2,
                amount: 25,
                total: 50,
            },
            {
                name: 'Classic Burger',
                qty: 3,
                amount: 30,
                total: 90,
            },
            {
                name: 'French Fries',
                qty: 3,
                amount: 15,
                total: 45,
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
    // DELIVERY ORDERS (Live Orders)
    {
        id: 201,
        orderCode: '0201',
        type: 'delivery',
        customer: 'Rahul Sharma',
        createdBy: 'System',
        status: 'pending',
        time: '14 Jan 15:30',
        amount: 540,
        payment: 'online',
        paymentStatus: 'paid',
        items: [
            {
                name: 'Classic Burger',
                qty: 2,
                amount: 30,
                total: 60,
                modifiers: [{ label: 'Extra Cheese', price: 2 }],
            },
            {
                name: 'Butter Chicken',
                qty: 1,
                amount: 45,
                total: 45,
            },
            {
                name: 'Naan Bread',
                qty: 2,
                amount: 8,
                total: 16,
            },
            {
                name: 'Biryani',
                qty: 1,
                amount: 50,
                total: 50,
            },
        ],
        value: 320,
        tax: 32,
        serviceCharge: 16,
        deliveryCharge: 50,
        total: 418,
        charges: [
            { label: 'Order Value', amount: 320 },
            { label: 'Tax', amount: 32 },
            { label: 'Service Charge', amount: 16 },
            { label: 'Delivery Charge', amount: 50 },
            { label: 'Total', amount: 418, emphasized: true },
        ],
    },
    {
        id: 202,
        orderCode: '0202',
        type: 'delivery',
        customer: 'Tarun Dewangan',
        createdBy: 'System',
        status: 'preparing',
        time: '14 Jan 15:45',
        amount: 385,
        payment: 'card',
        paymentStatus: 'paid',
        items: [
            {
                name: 'Margherita Pizza',
                qty: 1,
                amount: 22,
                total: 22,
            },
            {
                name: 'Paneer Tikka',
                qty: 2,
                amount: 35,
                total: 70,
            },
            {
                name: 'Garlic Naan',
                qty: 3,
                amount: 10,
                total: 30,
            },
        ],
        value: 280,
        tax: 28,
        serviceCharge: 14,
        deliveryCharge: 50,
        total: 372,
        charges: [
            { label: 'Order Value', amount: 280 },
            { label: 'Tax', amount: 28 },
            { label: 'Service Charge', amount: 14 },
            { label: 'Delivery Charge', amount: 50 },
            { label: 'Total', amount: 372, emphasized: true },
        ],
    },
    {
        id: 203,
        orderCode: '0203',
        type: 'delivery',
        customer: 'Rohit Sharma',
        createdBy: 'System',
        status: 'preparing',
        time: '14 Jan 16:00',
        amount: 298,
        payment: 'upi',
        paymentStatus: 'paid',
        items: [
            {
                name: 'Veg Burger',
                qty: 2,
                amount: 25,
                total: 50,
            },
            {
                name: 'French Fries',
                qty: 1,
                amount: 15,
                total: 15,
            },
        ],
        value: 180,
        tax: 18,
        serviceCharge: 9,
        deliveryCharge: 50,
        total: 257,
        charges: [
            { label: 'Order Value', amount: 180 },
            { label: 'Tax', amount: 18 },
            { label: 'Service Charge', amount: 9 },
            { label: 'Delivery Charge', amount: 50 },
            { label: 'Total', amount: 257, emphasized: true },
        ],
    },
]

// Helper functions to get specific order types
export const getRecentOrders = () =>
    MOCK_ORDERS.filter(order => order.type === 'dine-in' || order.type === 'takeaway')

export const getLiveOrders = () =>
    MOCK_ORDERS.filter(order => order.type === 'delivery')

export const getDineInOrders = () =>
    MOCK_ORDERS.filter(order => order.type === 'dine-in')

export const getOrderById = (id: number) =>
    MOCK_ORDERS.find(order => order.id === id)

export const getMenuItemById = (id: string) =>
    MOCK_MENU_ITEMS.find(item => item.id === id)

export const getCustomerById = (id: string) =>
    MOCK_CUSTOMERS.find(customer => customer.id === id)

export const getTableById = (id: string) =>
    MOCK_TABLES.find(table => table.id === id)
