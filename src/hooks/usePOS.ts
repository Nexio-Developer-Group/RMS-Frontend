import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    apiGetCarts,
    apiCreateCart,
    apiAddCartItem,
    apiUpdateCartItem,
    apiRemoveCartItem,
    apiConvertCart,
    apiDeleteCart,
    type Cart,
    type CreateCartDto,
    type AddCartItemDto,
    type UpdateCartItemDto,
} from '@/services/tenant_admin/pos'
import {
    apiGetMenus,
    apiGetCategoriesWithItems,
} from '@/services/tenant_admin/menu_management'
import { apiGetTables } from '@/services/tenant_admin/table_management'
import type { POSData, MenuItem } from '@/services/tenant_admin/pos/types'
import type { MenuCategory, BaseTable } from '@/services/tenant_admin/types'

export const usePOSData = () => {
    return useQuery<POSData>({
        queryKey: ['posData'],
        queryFn: async () => {
            const [menus, tables] = await Promise.all([
                apiGetMenus(),
                apiGetTables(),
            ])

            const allCategories: MenuCategory[] = []
            const allMenuItems: MenuItem[] = []

            for (const menu of menus || []) {
                const cats = await apiGetCategoriesWithItems(menu.menu_id, 'ITEM')
                for (const cat of cats || []) {
                    allCategories.push({
                        id: cat.category_id,
                        name: cat.name,
                        sortOrder: cat.sortOrder,
                    })
                    for (const item of cat.items || []) {
                        allMenuItems.push({
                            id: item.item_id,
                            name: item.name,
                            price: Number(item.price),
                            category: cat.name,
                            categoryId: cat.category_id,
                            categoryName: cat.name,
                            description: item.description ?? undefined,
                            available: item.is_available ?? true,
                        })
                    }
                }
            }

            const baseTables: BaseTable[] = (tables || []).map((t) => ({
                id: t.floor_id,
                number: t.name,
                capacity: 4,
                status: 'available' as const,
            }))

            return {
                categories: allCategories,
                menuItems: allMenuItems,
                tables: baseTables,
                availableAddons: [],
            }
        },
        staleTime: 60_000,
    })
}

export const useMenuItems = (category: string) => {
    return useQuery<MenuItem[]>({
        queryKey: ['menuItems', category],
        queryFn: async () => {
            const menus = await apiGetMenus()
            const items: MenuItem[] = []
            for (const menu of menus || []) {
                const cats = await apiGetCategoriesWithItems(menu.menu_id, 'ITEM')
                for (const cat of cats || []) {
                    if (category && cat.name !== category) continue
                    for (const item of cat.items || []) {
                        items.push({
                            id: item.item_id,
                            name: item.name,
                            price: Number(item.price),
                            category: cat.name,
                            categoryId: cat.category_id,
                            categoryName: cat.name,
                            description: item.description ?? undefined,
                            available: item.is_available ?? true,
                        })
                    }
                }
            }
            return items
        },
        staleTime: 60_000,
    })
}

export const useTables = () => {
    return useQuery<BaseTable[]>({
        queryKey: ['tables'],
        queryFn: async () => {
            const tables = await apiGetTables()
            return (tables || []).map((t) => ({
                id: t.floor_id,
                number: t.name,
                capacity: 4,
                status: 'available' as const,
            }))
        },
        staleTime: 60_000,
    })
}

export const useCarts = () => {
    return useQuery<Cart[]>({
        queryKey: ['carts'],
        queryFn: apiGetCarts,
        staleTime: 30_000,
    })
}

export const useOrderActions = () => {
    const queryClient = useQueryClient()

    const createCartMutation = useMutation({
        mutationFn: (data: CreateCartDto) => apiCreateCart(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    const addCartItemMutation = useMutation({
        mutationFn: ({ cartId, data }: { cartId: string; data: AddCartItemDto }) =>
            apiAddCartItem(cartId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    const updateCartItemMutation = useMutation({
        mutationFn: ({
            cartId,
            itemId,
            data,
        }: {
            cartId: string
            itemId: string
            data: UpdateCartItemDto
        }) => apiUpdateCartItem(cartId, itemId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    const removeCartItemMutation = useMutation({
        mutationFn: ({ cartId, itemId }: { cartId: string; itemId: string }) =>
            apiRemoveCartItem(cartId, itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    const convertCartMutation = useMutation({
        mutationFn: (cartId: string) => apiConvertCart(cartId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
    })

    const deleteCartMutation = useMutation({
        mutationFn: (cartId: string) => apiDeleteCart(cartId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
        },
    })

    return {
        createCart: createCartMutation.mutate,
        addCartItem: addCartItemMutation.mutate,
        updateCartItem: updateCartItemMutation.mutate,
        removeCartItem: removeCartItemMutation.mutate,
        convertCart: convertCartMutation.mutate,
        deleteCart: deleteCartMutation.mutate,
        isCreatingCart: createCartMutation.isPending,
        isAddingItem: addCartItemMutation.isPending,
        isUpdatingItem: updateCartItemMutation.isPending,
        isRemovingItem: removeCartItemMutation.isPending,
        isConvertingCart: convertCartMutation.isPending,
        isDeletingCart: deleteCartMutation.isPending,
    }
}
