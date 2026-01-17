import type { Customer, CustomerStats, CustomerOrder, Campaign } from '@/@types/customers'

export const mockCustomerOrders: CustomerOrder[] = [
    {
        id: '0042',
        orderCode: '#0042',
        type: 'dine-in',
        items: 3,
        amount: 316.00,
        createdBy: 'Rahul Kumar',
        status: 'completed',
        time: '12 Feb 2025, 12:33 PM',
        table: 'Table 14',
        seatingArea: 'Main Floor',
        payment: 'cash',
    },
    {
        id: '0041',
        orderCode: '#0041',
        type: 'takeaway',
        items: 5,
        amount: 450.00,
        createdBy: 'Self',
        status: 'completed',
        time: '10 Feb 2025, 02:15 PM',
        payment: 'upi',
    },
]

export const mockCustomers: Customer[] = [
    {
        id: '1',
        customerId: '#0042',
        name: 'Sonal Kurre',
        phoneNumber: '+91 7389884905',
        email: 'sonal@example.com',
        totalOrders: 2,
        totalTransaction: 8190,
        lastOrderedOn: 'Mar 15, 2024',
        status: 'active',
        campaignStatus: 'active',
        orders: mockCustomerOrders,
        address: 'Devendra Nagar, Raipur',
        city: 'Raipur',
        joinedDate: 'Jan 10, 2024',
    },
    {
        id: '2',
        customerId: '#0043',
        name: 'John Smith',
        phoneNumber: '+91 7389884905',
        email: 'john@example.com',
        totalOrders: 2,
        totalTransaction: 2800,
        lastOrderedOn: 'Mar 15, 2023',
        status: 'active',
        campaignStatus: 'active',
        orders: mockCustomerOrders,
        address: 'Civil Lines, Raipur',
        city: 'Raipur',
        joinedDate: 'Feb 15, 2023',
    },
    {
        id: '3',
        customerId: '#0044',
        name: 'Priya Sharma',
        phoneNumber: '+91 9876543210',
        email: 'priya@example.com',
        totalOrders: 5,
        totalTransaction: 4500,
        lastOrderedOn: 'Mar 10, 2023',
        status: 'active',
        campaignStatus: 'inactive',
        orders: mockCustomerOrders,
        address: 'Shankar Nagar, Raipur',
        city: 'Raipur',
        joinedDate: 'Jan 20, 2023',
    },
    {
        id: '4',
        customerId: '#0045',
        name: 'Amit Kumar',
        phoneNumber: '+91 9988776655',
        email: 'amit@example.com',
        totalOrders: 8,
        totalTransaction: 6200,
        lastOrderedOn: 'Mar 12, 2023',
        status: 'active',
        campaignStatus: 'active',
        orders: mockCustomerOrders,
        address: 'Mowa, Raipur',
        city: 'Raipur',
        joinedDate: 'Dec 05, 2022',
    },
    {
        id: '5',
        customerId: '#0046',
        name: 'Sneha Patel',
        phoneNumber: '+91 8765432109',
        email: 'sneha@example.com',
        totalOrders: 3,
        totalTransaction: 2100,
        lastOrderedOn: 'Feb 28, 2023',
        status: 'inactive',
        campaignStatus: 'inactive',
        orders: [],
        address: 'Telibandha, Raipur',
        city: 'Raipur',
        joinedDate: 'Nov 12, 2022',
    },
    {
        id: '6',
        customerId: '#0047',
        name: 'Vikram Singh',
        phoneNumber: '+91 7654321098',
        email: 'vikram@example.com',
        totalOrders: 12,
        totalTransaction: 9800,
        lastOrderedOn: 'Mar 14, 2023',
        status: 'active',
        campaignStatus: 'active',
        orders: mockCustomerOrders,
        address: 'Vidhan Sabha Road, Raipur',
        city: 'Raipur',
        joinedDate: 'Oct 08, 2022',
    },
]

export const mockCampaigns: Campaign[] = [
    {
        id: '1',
        name: 'Welcome Offer',
        description: '20% off on first order',
        type: 'discount',
        status: 'active',
        startDate: 'Jan 01, 2024',
        endDate: 'Dec 31, 2024',
        discount: 20,
        customersEnrolled: 150,
    },
    {
        id: '2',
        name: 'Weekend Special',
        description: 'Buy 1 Get 1 Free on weekends',
        type: 'offer',
        status: 'active',
        startDate: 'Jan 15, 2024',
        endDate: 'Jun 30, 2024',
        customersEnrolled: 230,
    },
    {
        id: '3',
        name: 'Loyalty Rewards',
        description: 'Earn points on every order',
        type: 'loyalty',
        status: 'active',
        startDate: 'Feb 01, 2024',
        endDate: 'Dec 31, 2024',
        customersEnrolled: 450,
    },
    {
        id: '4',
        name: 'Festival Cashback',
        description: '15% cashback on orders above ₹500',
        type: 'cashback',
        status: 'scheduled',
        startDate: 'Apr 01, 2024',
        endDate: 'Apr 15, 2024',
        discount: 15,
        customersEnrolled: 0,
    },
    {
        id: '5',
        name: 'Summer Sale',
        description: 'Flat 25% off on all items',
        type: 'discount',
        status: 'inactive',
        startDate: 'May 01, 2023',
        endDate: 'Jul 31, 2023',
        discount: 25,
        customersEnrolled: 320,
    },
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const customerMockService = {
    // Get all customers with optional search
    async getCustomers(search = ''): Promise<Customer[]> {
        await delay(600)

        let customers = [...mockCustomers]

        // Search filter
        if (search) {
            const q = search.toLowerCase()
            customers = customers.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.phoneNumber.includes(q) ||
                c.customerId.toLowerCase().includes(q) ||
                c.email?.toLowerCase().includes(q)
            )
        }

        return customers
    },

    // Get single customer by ID
    async getCustomerById(id: string): Promise<Customer | null> {
        await delay(300)
        return mockCustomers.find(c => c.id === id) ?? null
    },

    // Get customer statistics
    async getCustomerStats(): Promise<CustomerStats> {
        await delay(400)

        const customers = mockCustomers
        const activeCustomers = customers.filter(c => c.status === 'active')

        return {
            totalCustomers: customers.length,
            activeCampaigns: mockCampaigns.filter(c => c.status === 'active').length,
            inactiveCustomers: customers.filter(c => c.status === 'inactive').length,
            totalRevenue: customers.reduce((sum, c) => sum + c.totalTransaction, 0),
            averageOrderValue: customers.length > 0
                ? customers.reduce((sum, c) => sum + c.totalTransaction, 0) / customers.length
                : 0,
        }
    },

    // Get all campaigns
    async getCampaigns(search = ''): Promise<Campaign[]> {
        await delay(500)

        let campaigns = [...mockCampaigns]

        // Search filter
        if (search) {
            const q = search.toLowerCase()
            campaigns = campaigns.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.description.toLowerCase().includes(q)
            )
        }

        return campaigns
    },

    // Add new customer
    async addCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
        await delay(500)
        const newCustomer: Customer = {
            ...customer,
            id: String(mockCustomers.length + 1),
        }
        mockCustomers.push(newCustomer)
        return newCustomer
    },

    // Update customer status
    async updateCustomerStatus(customerId: string, status: 'active' | 'inactive'): Promise<Customer> {
        await delay(500)
        const customer = mockCustomers.find(c => c.id === customerId)
        if (!customer) throw new Error('Customer not found')

        customer.status = status
        return customer
    },

    // Update campaign status for customer
    async updateCampaignStatus(
        customerId: string,
        campaignStatus: 'active' | 'inactive' | 'scheduled'
    ): Promise<Customer> {
        await delay(500)
        const customer = mockCustomers.find(c => c.id === customerId)
        if (!customer) throw new Error('Customer not found')

        customer.campaignStatus = campaignStatus
        return customer
    },

    // Get customer orders
    async getCustomerOrders(customerId: string): Promise<CustomerOrder[]> {
        await delay(400)
        const customer = mockCustomers.find(c => c.id === customerId)
        return customer?.orders ?? []
    },
}
