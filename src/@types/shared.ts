/**
 * Core Type Definitions
 * Shared types used across multiple domain modules
 */

// ============================================================================
// Order Status & Types
// ============================================================================

/**
 * Unified order status across all order types (POS, Online, KDS, etc.)
 */
export type OrderStatus =
    | 'pending'
    | 'preparing'
    | 'completed'
    | 'cancelled'

/**
 * Type of order based on service method
 */
export type OrderType =
    | 'dine-in'
    | 'takeaway'
    | 'delivery'

/**
 * Online ordering platforms
 */
export type OnlinePlatform =
    | 'zomato'
    | 'swiggy'
    | 'ubereats'
    | 'other'

// ============================================================================
// Payment
// ============================================================================

/**
 * Available payment methods
 */
export type PaymentMethod =
    | 'cash'
    | 'card'
    | 'upi'
    | 'online'

/**
 * Payment processing status
 */
export type PaymentStatus =
    | 'pending'
    | 'paid'
    | 'partially-paid'
    | 'failed'
    | 'refunded'

// ============================================================================
// Common Entity Statuses
// ============================================================================

/**
 * Generic active/inactive status
 */
export type ActiveStatus =
    | 'active'
    | 'inactive'

/**
 * Campaign or promotional status
 */
export type CampaignStatus =
    | 'active'
    | 'inactive'
    | 'scheduled'

/**
 * Table availability status
 */
export type TableStatus =
    | 'available'
    | 'occupied'
    | 'reserved'
    | 'inactive'

// ============================================================================
// Order Items & Modifiers
// ============================================================================

/**
 * Modifier/addon for an order item
 */
export interface OrderItemModifier {
    label: string
    price?: number
}

/**
 * Base order item structure used across order types
 */
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

/**
 * Base customer information
 */
export interface BaseCustomer {
    name: string
    phone: string
    email?: string
}

/**
 * Extended customer with address details
 */
export interface CustomerWithAddress extends BaseCustomer {
    address?: string
    city?: string
    zipCode?: string
}

// ============================================================================
// Table & Seating
// ============================================================================

/**
 * Basic table information
 */
export interface BaseTable {
    id: string
    number: string
    capacity: number
    status: TableStatus
}

/**
 * Floor/seating area information
 */
export interface Floor {
    id: string
    name: string
    tableCount: number
    isActive: boolean
    createdAt: string
}

// ============================================================================
// Menu Items
// ============================================================================

/**
 * Menu category
 */
export interface MenuCategory {
    id: string
    name: string
    sortOrder?: number
    icon?: string
}

/**
 * Base menu item
 */
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

/**
 * Modifier option
 */
export interface ModifierOption {
    id: string
    name: string
    price: number
}

/**
 * Menu item modifier/addon
 */
export interface Modifier {
    id: string
    name: string
    description?: string
    required: boolean
    options: ModifierOption[]
}

// ============================================================================
// Monetary Values
// ============================================================================

/**
 * Standard order pricing breakdown
 */
export interface OrderPricing {
    value: number
    tax: number
    serviceCharge: number
    discount?: number
    deliveryCharge?: number
    total: number
}

/**
 * Individual charge line item (for receipts, invoices)
 */
export interface ChargeLine {
    label: string
    amount: number
    emphasized?: boolean
}

// ============================================================================
// Campaign & Offers
// ============================================================================

/**
 * Campaign/offer type
 */
export type CampaignType =
    | 'discount'
    | 'cashback'
    | 'offer'
    | 'loyalty'
    | 'bogo'
    | 'free'

/**
 * Base campaign/offer structure
 */
export interface BaseCampaign {
    id: string
    name: string
    description: string
    type: CampaignType
    status: CampaignStatus
}

// ============================================================================
// Timestamps
// ============================================================================

/**
 * Standard entity timestamps
 */
export interface Timestamps {
    createdAt: string
    updatedAt?: string
}

/**
 * Order timeline tracking
 */
export interface OrderTimeline {
    received: string
    accepted?: string
    preparing?: string
    completed?: string
    cancelled?: string
}

// ============================================================================
// Statistics
// ============================================================================

/**
 * Revenue and growth statistics
 */
export interface RevenueStats {
    totalRevenue: number
    revenueGrowth?: number
    averageOrderValue?: number
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
