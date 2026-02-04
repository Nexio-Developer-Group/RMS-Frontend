import {
    OrderType,
    MenuCategory,
    BaseMenuItem,
    BaseTable,
    CampaignType,
    BaseCampaign,
} from '../../types'

/**
 * POS menu item with category reference
 */
export interface POSMenuItem extends BaseMenuItem {
    category: string
}

/**
 * Alias for POSMenuItem for backwards compatibility
 */
export type MenuItem = POSMenuItem

/**
 * POS addon/modifier
 */
export interface Addon {
    id: string
    name: string
    price: number
}

/**
 * Order item in POS cart
 */
export interface POSOrderItem {
    id: string
    menuItem: POSMenuItem
    quantity: number
    size?: string
    addons: Addon[]
    notes?: string
}

/**
 * POS offer/promotion
 */
export interface Offer extends BaseCampaign {
    type: Extract<CampaignType, 'bogo' | 'discount' | 'free'>
}

/**
 * Current order in POS
 */
export interface CurrentOrder {
    items: POSOrderItem[]
    orderType: OrderType
    table?: BaseTable
    offers: Offer[]
    subtotal: number
    tax: number
    total: number
}

/**
 * POS data structure
 */
export interface POSData {
    categories: MenuCategory[]
    menuItems: POSMenuItem[]
    tables: BaseTable[]
    availableAddons: Addon[]
}

/**
 * Legacy API Response types
 */
export interface MenuListResponse {
    status: string
    data: MenuList[]
}

export interface MenuList {
    item_name: string
    item_id: string
    item_price: number
    item_image: string
    item_description: string
    item_category: string
    item_type: string
    item_stock: number
}