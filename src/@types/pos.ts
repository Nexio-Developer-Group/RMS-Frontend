export type OrderType = 'dine-in' | 'takeaway' | 'delivery'

export type MenuCategory = {
    id: string
    name: string
    icon: string
}

export type MenuItem = {
    id: string
    name: string
    price: number
    category: string
    image?: string
    description?: string
}

export type Addon = {
    id: string
    name: string
    price: number
}

export type OrderItem = {
    id: string
    menuItem: MenuItem
    quantity: number
    size?: string
    addons: Addon[]
    notes?: string
}

export type Table = {
    id: string
    number: string
    capacity: number
    status: 'available' | 'occupied' | 'reserved'
}

export type Offer = {
    id: string
    name: string
    description: string
    type: 'bogo' | 'discount' | 'free'
}

export type CurrentOrder = {
    items: OrderItem[]
    orderType: OrderType
    table?: Table
    offers: Offer[]
    subtotal: number
    tax: number
    total: number
}

export type POSData = {
    categories: MenuCategory[]
    menuItems: MenuItem[]
    tables: Table[]
    availableAddons: Addon[]
}
