import { OrderStatus, OrderType, BaseOrderItem } from './shared'

/**
 * KDS view types
 */
export type KDSType = 'live-orders' | 'kds-setup'

/**
 * KDS order item with individual status tracking
 */
export interface KDSOrderItem extends BaseOrderItem {
    id: string
    status: OrderStatus
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
