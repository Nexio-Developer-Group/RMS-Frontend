import {
    OrderStatus,
    OrderType,
    PaymentMethod,
    ActiveStatus,
    CampaignStatus,
    BaseCampaign,
    CampaignType,
    RevenueStats,
} from './shared'

/**
 * Customer order summary
 */
export interface CustomerOrder {
    id: string
    orderCode: string
    type: OrderType
    items: number
    amount: number
    createdBy: string
    status: OrderStatus
    time: string
    table?: string
    seatingArea?: string
    payment: PaymentMethod
}

/**
 * Customer profile with order history
 */
export interface Customer {
    id: string
    customerId: string
    name: string
    phoneNumber: string
    email?: string
    totalOrders: number
    totalTransaction: number
    lastOrderedOn: string
    status: ActiveStatus
    campaignStatus: CampaignStatus
    orders: CustomerOrder[]
    address?: string
    city?: string
    joinedDate: string
}

/**
 * Customer analytics statistics
 */
export interface CustomerStats extends RevenueStats {
    totalCustomers: number
    activeCampaigns: number
    inactiveCustomers: number
}

/**
 * Marketing campaign
 */
export interface Campaign extends BaseCampaign {
    startDate: string
    endDate: string
    discount?: number
    customersEnrolled: number
}

/**
 * Filter tabs for customer views
 */
export type CustomerFilterTab = 'customer-list' | 'campaign'
