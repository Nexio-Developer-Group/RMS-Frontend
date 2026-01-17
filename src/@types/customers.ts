export type CustomerStatus = 'Active' | 'Inactive'
export type CampaignStatus = 'Active' | 'Inactive' | 'Scheduled'

export interface CustomerOrder {
    id: string
    orderCode: string
    type: 'Dine-in' | 'Takeaway' | 'Delivery'
    items: number
    amount: number
    createdBy: string
    status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled'
    time: string
    table?: string
    seatingArea?: string
    payment: 'Cash' | 'Card' | 'UPI' | 'Online'
}

export interface Customer {
    id: string
    customerId: string
    name: string
    phoneNumber: string
    email?: string
    totalOrders: number
    totalTransaction: number
    lastOrderedOn: string
    status: CustomerStatus
    campaignStatus: CampaignStatus
    orders: CustomerOrder[]
    address?: string
    city?: string
    joinedDate: string
}

export interface CustomerStats {
    totalCustomers: number
    activeCampaigns: number
    inactiveCustomers: number
    totalRevenue: number
    averageOrderValue: number
}

export interface Campaign {
    id: string
    name: string
    description: string
    type: 'Discount' | 'Cashback' | 'Offer' | 'Loyalty'
    status: CampaignStatus
    startDate: string
    endDate: string
    discount?: number
    customersEnrolled: number
}

export type CustomerFilterTab = 'customer-list' | 'campaign'
