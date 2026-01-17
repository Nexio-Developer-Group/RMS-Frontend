export type MenuTab = 'items' | 'modifiers' | 'combos'

export interface MenuCategory {
    id: string
    name: string
    sortOrder: number
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
    categoryIds?: string[]
    itemIds?: string[]
}

export interface MenuItem {
    id: string
    name: string
    price: number
    categoryId: string
    categoryName: string
    image?: string
    description?: string
    available: boolean
    modifiers?: string[]
}

export interface ComboItem {
    itemId: string
    itemName: string
    size?: string
    quantity: number
}

export interface Combo {
    id: string
    name: string
    price: number
    description?: string
    image?: string
    items: ComboItem[]
    available: boolean
    schedule?: {
        specificMonth?: string
        specificDay?: string
        fromTime?: string
        toTime?: string
    }
}

export interface MenuData {
    categories: MenuCategory[]
    items: MenuItem[]
    modifiers: Modifier[]
    combos: Combo[]
}

export interface AddItemFormData {
    name: string
    price: number
    categoryId: string
    image?: File | null
    description?: string
}

export interface AddModifierFormData {
    name: string
    description?: string
    required: boolean
    options: { name: string; price: number }[]
    categoryIds?: string[]
    itemIds?: string[]
}

export interface AddComboFormData {
    name: string
    price: number
    description?: string
    items: string[]
    schedule?: {
        specificMonth?: string
        specificDay?: string
        useTimeSchedule: boolean
        fromTime?: string
        toTime?: string
    }
}
