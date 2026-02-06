import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as menuService from '@/services/tenant_admin/menu_management'
import {
    CreateMenuRequest,
    UpdateMenuRequest,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    CreateItemRequest,
    UpdateItemRequest,
    CreateComboRequest,
    UpdateComboRequest,
    EntityType,
    Category,
    ApiMenuItem,
    ApiCombo,
    MenuItem,
    Combo,
    MenuCategory,
    Modifier,
    MenuTab
} from '@/services/tenant_admin/menu_management/types'

// Query Keys
export const menuQueryKeys = {
    all: ['menus'] as const,
    list: (floorId?: string | number) => [...menuQueryKeys.all, 'list', { floorId }] as const,
    detail: (id: string) => [...menuQueryKeys.all, 'detail', id] as const,
}

export const categoryQueryKeys = {
    all: ['categories'] as const,
    list: (menuId: string | number, type?: EntityType) => [...categoryQueryKeys.all, 'list', { menuId, type }] as const,
    withItems: (menuId: string | number, type: EntityType) => [...categoryQueryKeys.all, 'with-items', { menuId, type }] as const,
    detail: (id: string, menuId: string | number) => [...categoryQueryKeys.all, 'detail', { id, menuId }] as const,
}

export const itemQueryKeys = {
    all: ['items'] as const,
    list: (menuId: string | number, categoryId: string | number, type: EntityType) => [...itemQueryKeys.all, 'list', { menuId, categoryId, type }] as const,
    detail: (id: string, menuId: string | number, categoryId: string | number) => [...itemQueryKeys.all, 'detail', { id, menuId, categoryId }] as const,
}

export const comboQueryKeys = {
    all: ['combos'] as const,
    list: (menuId: string | number) => [...comboQueryKeys.all, 'list', { menuId }] as const,
    detail: (id: string, menuId: string | number) => [...comboQueryKeys.all, 'detail', { id, menuId }] as const,
}

//============================== Mappers ===================================//

const mapApiItemToUi = (item: ApiMenuItem, categoryName: string = ''): MenuItem => ({
    id: item.item_id,
    name: item.name,
    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
    description: item.description,
    categoryId: item.category_id,
    categoryName: categoryName || item.category?.name || '',
    available: item.is_available,
    image: undefined,
    menuId: item.menu_id,
} as any as MenuItem);

const mapApiModifierToUi = (item: ApiMenuItem, categoryName: string = ''): Modifier => ({
    id: item.item_id,
    name: item.name,
    description: item.description,
    required: item.is_required,
    categoryId: item.category_id,
    categoryName: categoryName || item.category?.name || '',
    menuId: item.menu_id,
    options: [],
    parentIds: item.parent_ids,
} as any as Modifier);

const mapApiComboToUi = (combo: ApiCombo): Combo => ({
    id: combo.combo_id,
    name: combo.name,
    price: typeof combo.price === 'string' ? parseFloat(combo.price) : combo.price,
    description: combo.description,
    available: combo.is_active,
    items: combo.items?.map(item => ({
        itemId: item.item_id,
        itemName: item.name,
        quantity: 1,
    })) || [],
    menuId: combo.menu_id,
} as any as Combo);

const mapApiCategoryToUi = (category: Category): MenuCategory => ({
    id: category.category_id,
    name: category.name,
});

//============================== Menu Hooks ===================================//

export const useMenus = (floorId?: string | number) => {
    return useQuery({
        queryKey: menuQueryKeys.list(floorId),
        queryFn: () => menuService.apiGetMenus(floorId),
    })
}

export const useMenuMutations = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: CreateMenuRequest) =>
            menuService.apiCreateMenu({
                ...data,
                floor_id: Number(data.floor_id)
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuQueryKeys.all })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ menuId, data }: { menuId: string, data: UpdateMenuRequest }) =>
            menuService.apiUpdateMenu(menuId, {
                ...data,
                floor_id: data.floor_id ? Number(data.floor_id) : undefined
            } as UpdateMenuRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuQueryKeys.all })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ menuId, floorId }: { menuId: string, floorId?: string | number }) =>
            menuService.apiDeleteMenu(menuId, floorId ? Number(floorId) : undefined),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: menuQueryKeys.all })
        }
    })

    return {
        createMenu: createMutation.mutateAsync,
        updateMenu: updateMutation.mutateAsync,
        deleteMenu: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}

//============================== Category Hooks ===================================//

export const useCategoriesWithItems = (menuId: string | number, type: EntityType) => {
    return useQuery({
        queryKey: categoryQueryKeys.withItems(menuId, type),
        queryFn: () => menuService.apiGetCategoriesWithItems(menuId, type),
        enabled: !!menuId,
    })
}

export const useCategoryMutations = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: CreateCategoryRequest) =>
            menuService.apiCreateCategory({
                ...data,
                menu_id: Number(data.menu_id)
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ categoryId, data }: { categoryId: string, data: UpdateCategoryRequest }) =>
            menuService.apiUpdateCategory(categoryId, {
                ...data,
                menu_id: data.menu_id ? Number(data.menu_id) : undefined
            } as UpdateCategoryRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ categoryId, menuId }: { categoryId: string, menuId: string | number }) =>
            menuService.apiDeleteCategory(categoryId, Number(menuId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
        }
    })

    return {
        createCategory: createMutation.mutateAsync,
        updateCategory: updateMutation.mutateAsync,
        deleteCategory: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}

//============================== Item Hooks ===================================//

export const useItemMutations = (defaultMenuId: string | number = 1) => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: Partial<CreateItemRequest>) => {
            const request: CreateItemRequest = {
                ...data,
                menu_id: Number(data.menu_id || defaultMenuId),
                category_id: Number(data.category_id || 1),
                name: data.name || "",
                price: Number(data.price || 0),
                description: data.description || "",
                parent_ids: data.type === 'ITEM' ? null : (data.parent_ids || []),
                type: data.type || "ITEM",
                is_required: data.is_required || false,
                under_offer: data.under_offer || false,
                is_active: data.is_active ?? true,
                is_available: data.is_available ?? true,
            } as CreateItemRequest;
            return menuService.apiCreateItem(request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ itemId, data }: { itemId: string, data: Partial<UpdateItemRequest> }) => {
            const request: UpdateItemRequest = {
                ...data,
                item_id: itemId,
                menu_id: data.menu_id ? Number(data.menu_id) : Number(defaultMenuId),
                category_id: data.category_id ? Number(data.category_id) : undefined,
                price: data.price !== undefined ? Number(data.price) : undefined,
                parent_ids: data.type === 'ITEM' ? null : data.parent_ids
            } as UpdateItemRequest;
            return menuService.apiUpdateItem(itemId, request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ itemId, menuId, categoryId }: { itemId: string, menuId: string | number, categoryId: string | number }) =>
            menuService.apiDeleteItem(itemId, Number(menuId), Number(categoryId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: itemQueryKeys.all })
            queryClient.invalidateQueries({ queryKey: categoryQueryKeys.all })
        }
    })

    return {
        createItem: createMutation.mutateAsync,
        updateItem: updateMutation.mutateAsync,
        deleteItem: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}

//============================== Combo Hooks ===================================//

export const useCombos = (menuId: string | number) => {
    return useQuery({
        queryKey: comboQueryKeys.list(menuId),
        queryFn: () => menuService.apiGetCombos(menuId),
        enabled: !!menuId,
    })
}

export const useComboMutations = (defaultMenuId: string | number = 1) => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: Partial<CreateComboRequest>) => {
            const itemIds = (data.list_of_item_ids || []).map((id: string | number) => Number(id)).filter((id: number) => !isNaN(id));

            if (itemIds.length === 0) {
                throw new Error("list_of_item_ids should not be empty");
            }

            const request: CreateComboRequest = {
                ...data,
                menu_id: Number(data.menu_id || defaultMenuId),
                name: data.name || "",
                price: Number(data.price || 0),
                description: data.description || "",
                is_active: data.is_active ?? true,
                start_date: data.start_date || new Date().toISOString(),
                end_date: data.end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                list_of_item_ids: itemIds,
            } as CreateComboRequest;
            return menuService.apiCreateCombo(request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: comboQueryKeys.all })
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ comboId, data }: { comboId: string, data: Partial<UpdateComboRequest> }) => {
            const request: UpdateComboRequest = {
                ...data,
                combo_id: comboId,
                menu_id: data.menu_id ? Number(data.menu_id) : Number(defaultMenuId),
                price: data.price !== undefined ? Number(data.price) : undefined,
                list_of_item_ids: data.list_of_item_ids ? data.list_of_item_ids.map(id => Number(id)).filter(id => !isNaN(id)) : undefined
            } as UpdateComboRequest;

            if (request.list_of_item_ids && request.list_of_item_ids.length === 0) {
                throw new Error("list_of_item_ids should not be empty");
            }
            return menuService.apiUpdateCombo(comboId, request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: comboQueryKeys.all })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ comboId, menuId }: { comboId: string, menuId: string | number }) =>
            menuService.apiDeleteCombo(comboId, Number(menuId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: comboQueryKeys.all })
        }
    })

    return {
        createCombo: createMutation.mutateAsync,
        updateCombo: updateMutation.mutateAsync,
        deleteCombo: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    }
}

//============================== Aggregated Hooks (for UI compatibility) ===================================//

export const useMenuData = (menuId: string | number = "1") => {
    const itemCategoriesQuery = useCategoriesWithItems(menuId, 'ITEM');
    const modifierCategoriesQuery = useCategoriesWithItems(menuId, 'MODIFIER');
    const combosQuery = useCombos(menuId);

    const isLoading = itemCategoriesQuery.isLoading || modifierCategoriesQuery.isLoading || combosQuery.isLoading;
    const isError = itemCategoriesQuery.isError || modifierCategoriesQuery.isError || combosQuery.isError;

    const allItems = itemCategoriesQuery.data?.flatMap(cat =>
        (cat.items || []).map(item => mapApiItemToUi(item, cat.name))
    ) || [];

    const allModifiers = modifierCategoriesQuery.data?.flatMap(cat =>
        (cat.items || []).map(mod => mapApiModifierToUi(mod, cat.name))
    ) || [];

    const allCombos = combosQuery.data?.map(combo => mapApiComboToUi(combo)) || [];

    return {
        data: {
            categories: itemCategoriesQuery.data?.map(mapApiCategoryToUi) || [],
            modifierCategories: modifierCategoriesQuery.data?.map(mapApiCategoryToUi) || [],
            items: allItems,
            modifiers: allModifiers,
            combos: allCombos,
        },
        isLoading,
        isError,
        refetch: () => {
            itemCategoriesQuery.refetch();
            modifierCategoriesQuery.refetch();
            combosQuery.refetch();
        }
    };
}

export const useMenuItemActions = () => {
    const { createItem, updateItem, deleteItem } = useItemMutations();

    return {
        addItem: async (data: any) => {
            return createItem({
                name: data.name,
                price: data.price,
                category_id: data.categoryId,
                description: data.description || '',
                type: 'ITEM',
                is_available: data.available,
                is_active: data.available,
                parent_ids: null
            });
        },
        updateItem: async ({ id, updates }: { id: string, updates: any }) => {
            return updateItem({
                itemId: id,
                data: {
                    name: updates.name,
                    price: updates.price,
                    category_id: updates.categoryId,
                    description: updates.description,
                    is_available: updates.available,
                    is_active: updates.available,
                    type: 'ITEM'
                }
            });
        },
        deleteItem: async (id: string, menuId: string | number, categoryId: string | number) => {
            return deleteItem({ itemId: id, menuId, categoryId });
        },
        toggleItemAvailability: async (id: string) => {
            console.log('Toggle availability for item:', id);
        }
    }
}

export const useModifierActions = () => {
    const { createItem, updateItem, deleteItem } = useItemMutations();

    return {
        addModifier: async (data: any) => {
            return createItem({
                name: data.name,
                price: 0,
                category_id: data.categoryId || 1,
                description: data.description,
                type: 'MODIFIER',
                is_required: data.required,
                parent_ids: data.itemIds || []
            });
        },
        updateModifier: async ({ id, updates }: { id: string, updates: any }) => {
            return updateItem({
                itemId: id,
                data: {
                    name: updates.name,
                    price: 0,
                    category_id: updates.categoryId || 1,
                    description: updates.description,
                    is_required: updates.required,
                    parent_ids: updates.itemIds || [],
                    type: 'MODIFIER'
                }
            });
        },
        deleteModifier: async (id: string, menuId: string | number, categoryId: string | number) => {
            return deleteItem({ itemId: id, menuId, categoryId });
        }
    }
}

export const useComboActions = () => {
    const { createCombo, updateCombo, deleteCombo } = useComboMutations();

    return {
        addCombo: async (data: any) => {
            return createCombo({
                name: data.name,
                price: data.price,
                description: data.description,
                list_of_item_ids: data.items.map((it: any) => Number(typeof it === 'string' ? it : it.itemId)),
                is_active: true
            });
        },
        updateCombo: async ({ id, updates }: { id: string; updates: any }) => {
            return updateCombo({
                comboId: id,
                data: {
                    name: updates.name,
                    price: updates.price,
                    description: updates.description,
                    list_of_item_ids: updates.items.map((it: any) => Number(typeof it === 'string' ? it : it.itemId)),
                    is_active: true
                }
            });
        },
        deleteCombo: async (id: string, menuId: string | number) => {
            return deleteCombo({ comboId: id, menuId });
        },
        toggleComboAvailability: async (id: string) => {
            console.log('Toggle availability for combo:', id);
        }
    }
}

export const useCategoryActions = () => {
    const { createCategory, updateCategory, deleteCategory } = useCategoryMutations();

    return {
        addCategory: createCategory,
        updateCategory: async ({ id, updates }: { id: string, updates: any }) => {
            return updateCategory({ categoryId: id, data: updates });
        },
        deleteCategory: async ({ categoryId, menuId }: { categoryId: string, menuId: string | number }) => {
            return deleteCategory({ categoryId, menuId });
        }
    }
}
