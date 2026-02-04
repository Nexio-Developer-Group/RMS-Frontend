import type {
  TableStatus,
  Timestamps,
  CreateInput,
  UpdateInput,
  BaseTable,
} from '../../types'

/** Backend node coming from API */
export interface FloorTableNodeDto {
  floor_id: string
  name: string
  type: 'floor' | 'table'
  is_active: boolean
  parent_id: string | number | null
  tenant_id: string
  created_by: string
  updated_by: string
  created_at: string
  updated_at: string
  children?: FloorTableNodeDto[]
}

/** UI Floor model */
export interface FloorModel {
  id: string
  name: string
  tableCount: number
  isActive: boolean
  createdAt: string
}

/** UI Table model (extends shared BaseTable) */
export interface TableModel extends BaseTable, Timestamps {
  name: string
  floorId: string
  floorName: string
  enabled: boolean
  totalRevenue: number
  totalOrders: number
  qrCode?: string
}

/** Simplified order item for table orders */
export interface TableOrderItem {
  name: string
  quantity: number
  price: number
}

/** Order associated with a table */
export interface TableOrder {
  id: string
  orderId: string
  tableId: string
  customerId: string
  customerName: string
  items: TableOrderItem[]
  totalAmount: number
  status: string
  createdBy: string
  createdAt: string
}

/** API Payloads */
export interface CreateFloorTableDto {
  name: string
  type: 'floor' | 'table'
  parent_id?: string | number | null
}

export interface UpdateFloorTableDto {
  name?: string
  type: 'floor' | 'table'
  parent_id?: string | number | null
  is_active?: boolean
}

/** UI Inputs */
export type CreateTableInput = CreateInput<
  Omit<TableModel, 'totalRevenue' | 'totalOrders' | 'floorName'>
> & { floorId?: string }

export type UpdateTableInput = UpdateInput<TableModel>
export type CreateFloorInput = CreateInput<Omit<FloorModel, 'tableCount' | 'isActive'>>
export type UpdateFloorInput = UpdateInput<FloorModel>
