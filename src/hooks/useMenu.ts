import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { menuMockService } from '@/mock/mockServices/menuMockService'
import type { MenuData, MenuItem, Modifier, Combo } from '@/@types/menu'

// Get all menu data
export const useMenuData = () => {
    return useQuery<MenuData>({
        queryKey: ['menuData'],
        queryFn: menuMockService.getMenuData,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Get items by category
export const useMenuItemsByCategory = (categoryId: string) => {
    return useQuery<MenuItem[]>({
        queryKey: ['menuItems', categoryId],
        queryFn: () => menuMockService.getItemsByCategory(categoryId),
        staleTime: 1000 * 60 * 5,
    })
}

// Menu item actions
export const useMenuItemActions = () => {
    const queryClient = useQueryClient()

    const addItemMutation = useMutation({
        mutationFn: menuMockService.addItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

    const updateItemMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<MenuItem> }) =>
            menuMockService.updateItem(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

    const deleteItemMutation = useMutation({
        mutationFn: menuMockService.deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
            queryClient.invalidateQueries({ queryKey: ['menuItems'] })
        },
    })

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

// Modifier actions
export const useModifierActions = () => {
    const queryClient = useQueryClient()

    const addModifierMutation = useMutation({
        mutationFn: menuMockService.addModifier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    const updateModifierMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Modifier> }) =>
            menuMockService.updateModifier(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

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

// Combo actions
export const useComboActions = () => {
    const queryClient = useQueryClient()

    const addComboMutation = useMutation({
        mutationFn: menuMockService.addCombo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    const updateComboMutation = useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Combo> }) =>
            menuMockService.updateCombo(id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

    const deleteComboMutation = useMutation({
        mutationFn: menuMockService.deleteCombo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuData'] })
        },
    })

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
