import {
    TableStatus,
    Floor,
    OrderStatus,
    BaseOrderItem,
    CreateInput,
    UpdateInput,
    Timestamps,
} from './shared'

/**
 * Table with analytics and QR code
 */
export interface Table extends Timestamps {
    id: string
    number: string
    name: string
    floorId: string
    floorName: string
    capacity: number
    status: TableStatus
    enabled: boolean
    totalRevenue: number
    totalOrders: number
    qrCode?: string
}

/**
 * Simplified order item for table orders
 */
export interface TableOrderItem {
    name: string
    quantity: number
    price: number
}

/**
 * Order associated with a table
 */
export interface TableOrder {
    id: string
    orderId: string
    tableId: string
    customerId: string
    customerName: string
    items: TableOrderItem[]
    totalAmount: number
    status: OrderStatus
    createdBy: string
    createdAt: string
}

/**
 * Table management statistics
 */
export interface TableStats {
    totalFloors: number
    totalTables: number
    availableTables: number
    occupiedTables: number
    inactiveTables: number
}

/**
 * Input for creating a new table
 */
export type CreateTableInput = CreateInput<
    Omit<Table, 'totalRevenue' | 'totalOrders' | 'qrCode'>
>

/**
 * Input for updating an existing table
 */
export type UpdateTableInput = UpdateInput<Table>

/**
 * Input for creating a new floor
 */
export type CreateFloorInput = CreateInput<Omit<Floor, 'tableCount'>>

/**
 * Input for updating an existing floor
 */
export type UpdateFloorInput = UpdateInput<Floor>

// Re-export core types for convenience
export type { TableStatus, Floor }
