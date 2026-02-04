/**
 * Shared Core Type Definitions for Tenant Admin Services
 */

// ============================================================================
// Order Status & Types
// ============================================================================

export type OrderStatus =
    | 'pending'
    | 'preparing'
    | 'completed'
    | 'cancelled'

export type OrderType =
    | 'dine-in'
    | 'takeaway'
    | 'delivery'

export type OnlinePlatform =
    | 'zomato'
    | 'swiggy'
    | 'ubereats'
    | 'other'

// ============================================================================
// Payment
// ============================================================================

export type PaymentMethod =
    | 'cash'
    | 'card'
    | 'upi'
    | 'online'

export type PaymentStatus =
    | 'pending'
    | 'paid'
    | 'partially-paid'
    | 'failed'
    | 'refunded'

// ============================================================================
// Common Entity Statuses
// ============================================================================

export type ActiveStatus =
    | 'active'
    | 'inactive'

export type CampaignStatus =
    | 'active'
    | 'inactive'
    | 'scheduled'

export type TableStatus =
    | 'available'
    | 'occupied'
    | 'reserved'
    | 'inactive'

// ============================================================================
// Order Items & Modifiers
// ============================================================================

export interface OrderItemModifier {
    label: string
    price?: number
}

export interface BaseOrderItem {
    name: string
    quantity: number
    price: number
    total: number
    modifiers?: OrderItemModifier[]
    note?: string
}

// ============================================================================
// Customer
// ============================================================================

export interface BaseCustomer {
    name: string
    phone: string
    email?: string
}

export interface CustomerWithAddress extends BaseCustomer {
    address?: string
    city?: string
    zipCode?: string
}

// ============================================================================
// Menu Items
// ============================================================================

export interface MenuCategory {
    id: string
    name: string
    sortOrder?: number
    icon?: string
}

export interface BaseMenuItem {
    id: string
    name: string
    price: number
    categoryId?: string
    categoryName?: string
    image?: string
    description?: string
    available?: boolean
}

export interface ModifierOption {
    id: string
    name: string
    price: number
}

export interface Modifier {
    id: string
    name: string
    description?: string
    required: boolean
    options: ModifierOption[]
}

// ============================================================================
// Table & Seating
// ============================================================================

export interface BaseTable {
    id: string
    number: string
    capacity: number
    status: TableStatus
}

export interface Floor {
    id: string
    name: string
    tableCount: number
    isActive: boolean
    createdAt: string
}

// ============================================================================
// Campaign & Offers
// ============================================================================

export type CampaignType =
    | 'discount'
    | 'cashback'
    | 'offer'
    | 'loyalty'
    | 'bogo'
    | 'free'

export interface BaseCampaign {
    id: string
    name: string
    description: string
    type: CampaignType
    status: CampaignStatus
}

// ============================================================================
// Statistics
// ============================================================================

export interface RevenueStats {
    totalRevenue: number
    revenueGrowth?: number
    averageOrderValue?: number
}

// ============================================================================
// Timestamps
// ============================================================================

export interface Timestamps {
    createdAt: string
    updatedAt?: string
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Standard create input (omits generated fields)
 */
export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

/**
 * Standard update input (partial + id required)
 */
export type UpdateInput<T> = Partial<CreateInput<T>> & { id: string }
