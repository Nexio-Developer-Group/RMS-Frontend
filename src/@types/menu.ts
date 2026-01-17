import { MenuCategory, BaseMenuItem, Modifier, ModifierOption } from './shared'

/**
 * Menu view tabs
 */
export type MenuTab = 'items' | 'modifiers' | 'combos'

/**
 * Full menu item with all properties
 */
export interface MenuItem extends BaseMenuItem {
    categoryId: string
    categoryName: string
    available: boolean
    modifiers?: string[]
}

/**
 * Combo meal item reference
 */
export interface ComboItem {
    itemId: string
    itemName: string
    size?: string
    quantity: number
}

/**
 * Combo meal with scheduling
 */
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

/**
 * Complete menu data structure
 */
export interface MenuData {
    categories: MenuCategory[]
    items: MenuItem[]
    modifiers: Modifier[]
    combos: Combo[]
}

/**
 * Form data for adding a menu item
 */
export interface AddItemFormData {
    name: string
    price: number
    categoryId: string
    image?: File | null
    description?: string
}

/**
 * Form data for adding a modifier
 */
export interface AddModifierFormData {
    name: string
    description?: string
    required: boolean
    options: { name: string; price: number }[]
    categoryIds?: string[]
    itemIds?: string[]
}

/**
 * Form data for adding a combo
 */
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

// Re-export core types used in menu
export type { MenuCategory, Modifier, ModifierOption }
