import type { MenuData, MenuItem, Modifier, Combo } from '@/@types/menu'
import { MOCK_MENU_ITEMS } from '@/mock/data/mockData'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockMenuData: MenuData = {
    categories: [
        { id: 'starter', name: 'Starter', sortOrder: 1 },
        { id: 'main', name: 'Main Course', sortOrder: 2 },
        { id: 'burger', name: 'Burger', sortOrder: 3 },
        { id: 'pizza', name: 'Pizza', sortOrder: 4 },
        { id: 'bread', name: 'Breads', sortOrder: 5 },
        { id: 'wrap', name: 'Wraps', sortOrder: 6 },
        { id: 'sides', name: 'Sides', sortOrder: 7 },
        { id: 'beverage', name: 'Beverages', sortOrder: 8 },
    ],

    get items() {
        return MOCK_MENU_ITEMS
    },

    modifiers: [
        {
            id: '1',
            name: 'Margherita Pizza',
            description: 'Addon',
            required: true,
            options: [
                { id: '1', name: 'Small', price: 0 },
                { id: '2', name: 'Medium', price: 2.01 },
                { id: '3', name: 'Large', price: 3.01 },
            ],
        },
        {
            id: '2',
            name: 'Extra Trappings',
            description: 'Addon',
            required: false,
            options: [
                { id: '4', name: 'Small', price: 0 },
                { id: '5', name: 'Medium', price: 2.01 },
                { id: '6', name: 'Large', price: 3.01 },
            ],
        },
        {
            id: '3',
            name: 'Spice level',
            description: 'Condition',
            required: false,
            options: [
                { id: '7', name: 'Small', price: 0 },
                { id: '8', name: 'Medium', price: 2.01 },
                { id: '9', name: 'Large', price: 3.01 },
            ],
        },
        {
            id: '4',
            name: 'Sause Choice',
            description: 'Addon',
            required: false,
            options: [
                { id: '10', name: 'Small', price: 0 },
                { id: '11', name: 'Medium', price: 2.01 },
                { id: '12', name: 'Large', price: 3.01 },
            ],
        },
    ],

    combos: [
        {
            id: '1',
            name: 'Combo_1',
            price: 22,
            description: 'Margherita Pizza',
            available: true,
            items: [
                { itemId: '1', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '2', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '3', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
            ],
        },
        {
            id: '2',
            name: 'Combo_1',
            price: 22,
            description: 'Margherita Pizza',
            available: true,
            items: [
                { itemId: '1', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '2', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '3', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
            ],
        },
        {
            id: '3',
            name: 'Combo_1',
            price: 22,
            description: 'Margherita Pizza',
            available: true,
            items: [
                { itemId: '1', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '2', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '3', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
            ],
        },
        {
            id: '4',
            name: 'Combo_1',
            price: 22,
            description: 'Margherita Pizza',
            available: true,
            items: [
                { itemId: '1', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '2', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '3', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
            ],
        },
        {
            id: '5',
            name: 'Combo_1',
            price: 22,
            description: 'Margherita Pizza',
            available: true,
            items: [
                { itemId: '1', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '2', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '3', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
            ],
        },
        {
            id: '6',
            name: 'Combo_1',
            price: 22,
            description: 'Margherita Pizza',
            available: true,
            items: [
                { itemId: '1', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '2', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
                { itemId: '3', itemName: 'Classic Burger', size: 'Small', quantity: 3 },
            ],
        },
    ],
}

export const menuMockService = {
    // Get all menu data
    getMenuData: async (): Promise<MenuData> => {
        await delay(500)
        return mockMenuData
    },

    // Get items by category
    getItemsByCategory: async (categoryId: string): Promise<MenuItem[]> => {
        await delay(300)
        if (categoryId === 'all') {
            return mockMenuData.items
        }
        return mockMenuData.items.filter((item) => item.categoryId === categoryId)
    },

    // Add new item
    addItem: async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
        await delay(500)
        const newItem: MenuItem = {
            ...item,
            id: `item-${Date.now()}`,
        }
        mockMenuData.items.push(newItem)
        return newItem
    },

    // Update item
    updateItem: async (id: string, updates: Partial<MenuItem>): Promise<MenuItem> => {
        await delay(500)
        const index = mockMenuData.items.findIndex((item) => item.id === id)
        if (index === -1) throw new Error('Item not found')
        mockMenuData.items[index] = { ...mockMenuData.items[index], ...updates }
        return mockMenuData.items[index]
    },

    // Delete item
    deleteItem: async (id: string): Promise<void> => {
        await delay(500)
        const index = mockMenuData.items.findIndex((item) => item.id === id)
        if (index === -1) throw new Error('Item not found')
        mockMenuData.items.splice(index, 1)
    },

    // Toggle item availability
    toggleItemAvailability: async (id: string): Promise<MenuItem> => {
        await delay(300)
        const index = mockMenuData.items.findIndex((item) => item.id === id)
        if (index === -1) throw new Error('Item not found')
        mockMenuData.items[index].available = !mockMenuData.items[index].available
        return mockMenuData.items[index]
    },

    // Add new modifier
    addModifier: async (modifier: Omit<Modifier, 'id'>): Promise<Modifier> => {
        await delay(500)
        const newModifier: Modifier = {
            ...modifier,
            id: `modifier-${Date.now()}`,
        }
        mockMenuData.modifiers.push(newModifier)
        return newModifier
    },

    // Update modifier
    updateModifier: async (id: string, updates: Partial<Modifier>): Promise<Modifier> => {
        await delay(500)
        const index = mockMenuData.modifiers.findIndex((mod) => mod.id === id)
        if (index === -1) throw new Error('Modifier not found')
        mockMenuData.modifiers[index] = { ...mockMenuData.modifiers[index], ...updates }
        return mockMenuData.modifiers[index]
    },

    // Delete modifier
    deleteModifier: async (id: string): Promise<void> => {
        await delay(500)
        const index = mockMenuData.modifiers.findIndex((mod) => mod.id === id)
        if (index === -1) throw new Error('Modifier not found')
        mockMenuData.modifiers.splice(index, 1)
    },

    // Add new combo
    addCombo: async (combo: Omit<Combo, 'id'>): Promise<Combo> => {
        await delay(500)
        const newCombo: Combo = {
            ...combo,
            id: `combo-${Date.now()}`,
        }
        mockMenuData.combos.push(newCombo)
        return newCombo
    },

    // Update combo
    updateCombo: async (id: string, updates: Partial<Combo>): Promise<Combo> => {
        await delay(500)
        const index = mockMenuData.combos.findIndex((combo) => combo.id === id)
        if (index === -1) throw new Error('Combo not found')
        mockMenuData.combos[index] = { ...mockMenuData.combos[index], ...updates }
        return mockMenuData.combos[index]
    },

    // Delete combo
    deleteCombo: async (id: string): Promise<void> => {
        await delay(500)
        const index = mockMenuData.combos.findIndex((combo) => combo.id === id)
        if (index === -1) throw new Error('Combo not found')
        mockMenuData.combos.splice(index, 1)
    },

    // Toggle combo availability
    toggleComboAvailability: async (id: string): Promise<Combo> => {
        await delay(300)
        const index = mockMenuData.combos.findIndex((combo) => combo.id === id)
        if (index === -1) throw new Error('Combo not found')
        mockMenuData.combos[index].available = !mockMenuData.combos[index].available
        return mockMenuData.combos[index]
    },
}
