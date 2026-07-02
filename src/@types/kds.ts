import { OrderStatus, OrderType, BaseOrderItem } from './shared'

/**
 * KDS view types
 */
export type KDSType = 'live-orders' | 'kds-setup'

/**
 * Per-item kitchen status — mirrors the backend OrderItemStatus enum
 */
export type KDSItemStatus =
    | 'pending'
    | 'preparing'
    | 'ready'
    | 'served'
    | 'cancelled'

/**
 * KDS order item with individual status tracking
 */
export interface KDSOrderItem extends BaseOrderItem {
    id: string
    status: KDSItemStatus
}

/**
 * Kitchen Display System order
 */
export interface KDSOrder {
    id: string
    orderNumber: string
    type: OrderType
    table?: string
    time: string
    items: KDSOrderItem[]
    overallStatus: OrderStatus
}

/**
 * KDS data container
 */
export interface KDSData {
    orders: KDSOrder[]
}
