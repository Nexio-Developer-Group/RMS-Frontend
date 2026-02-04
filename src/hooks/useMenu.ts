import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { menuMockService } from '@/mock/mockServices/menuMockService'
import type { MenuData, MenuItem, Modifier, Combo } from '@/services/tenant_admin/menu_management/types'

/**
 * Hook to fetch the complete menu data
 * @returns Menu data including categories, items, modifiers, and combos
 */
export const useMenuData = () => {
    return useQuery<MenuData>({
        queryKey: ['menuData'],
        queryFn: menuMockService.getMenuData,
    })
}

/**
 * Hook to fetch menu items filtered by category
 * @param categoryId ID of the category to filter by
 */
export const useMenuItemsByCategory = (categoryId: string) => {
    return useQuery<MenuItem[]>({
        queryKey: ['menuItems', categoryId],
        queryFn: () => menuMockService.getItemsByCategory(categoryId),
    })
}

/**
 * Hook for performing actions on menu items
 */
export const useMenuItemActions = () => {
    const queryClient = useQueryClient()

    // Mutation to add a new item
    const addItemMutation = useMutation({
        mutationFn: menuMockService.addItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

    // Mutation to update an existing item
    const updateItemMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<MenuItem> }) =>
            menuMockService.updateItem(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

    // Mutation to delete an item
    const deleteItemMutation = useMutation({
        mutationFn: menuMockService.deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

    // Mutation to toggle item availability
    const toggleItemAvailabilityMutation = useMutation({
        mutationFn: menuMockService.toggleItemAvailability,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

    return {
        addItem: addItemMutation.mutateAsync,
        updateItem: updateItemMutation.mutateAsync,
        deleteItem: deleteItemMutation.mutateAsync,
        toggleItemAvailability: toggleItemAvailabilityMutation.mutateAsync,
        isAddingItem: addItemMutation.isPending,
        isUpdatingItem: updateItemMutation.isPending,
        isDeletingItem: deleteItemMutation.isPending,
        isTogglingAvailability: toggleItemAvailabilityMutation.isPending,
    }
}

/**
 * Hook for performing actions on modifiers
 */
export const useModifierActions = () => {
    const queryClient = useQueryClient()

    // Mutation to add a new modifier
    const addModifierMutation = useMutation({
        mutationFn: menuMockService.addModifier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    // Mutation to update an existing modifier
    const updateModifierMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Modifier> }) =>
            menuMockService.updateModifier(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    // Mutation to delete a modifier
    const deleteModifierMutation = useMutation({
        mutationFn: menuMockService.deleteModifier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    return {
        addModifier: addModifierMutation.mutateAsync,
        updateModifier: updateModifierMutation.mutateAsync,
        deleteModifier: deleteModifierMutation.mutateAsync,
        isAddingModifier: addModifierMutation.isPending,
        isUpdatingModifier: updateModifierMutation.isPending,
        isDeletingModifier: deleteModifierMutation.isPending,
    }
}

/**
 * Hook for performing actions on combos
 */
export const useComboActions = () => {
    const queryClient = useQueryClient()

    // Mutation to add a new combo
    const addComboMutation = useMutation({
        mutationFn: menuMockService.addCombo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    // Mutation to update an existing combo
    const updateComboMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Combo> }) =>
            menuMockService.updateCombo(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    // Mutation to delete a combo
    const deleteComboMutation = useMutation({
        mutationFn: menuMockService.deleteCombo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    // Mutation to toggle combo availability
    const toggleComboAvailabilityMutation = useMutation({
        mutationFn: menuMockService.toggleComboAvailability,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    return {
        addCombo: addComboMutation.mutateAsync,
        updateCombo: updateComboMutation.mutateAsync,
        deleteCombo: deleteComboMutation.mutateAsync,
        toggleComboAvailability: toggleComboAvailabilityMutation.mutateAsync,
        isAddingCombo: addComboMutation.isPending,
        isUpdatingCombo: updateComboMutation.isPending,
        isDeletingCombo: deleteComboMutation.isPending,
        isTogglingComboAvailability: toggleComboAvailabilityMutation.isPending,
    }
}
