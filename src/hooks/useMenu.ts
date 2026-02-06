import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as menuApi from '@/services/tenant_admin/menu_management'
import {
    Menu,
    Category,
    ApiMenuItem,
    ApiCombo,
    EntityType,
    MenuItem,
    Modifier,
    Combo,
    MenuCategory,
    CreateMenuRequest,
    UpdateMenuRequest,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    CreateItemRequest,
    UpdateItemRequest,
    CreateComboRequest,
    UpdateComboRequest,
} from '@/services/tenant_admin/menu_management/types'

/* ================= QUERY KEYS ================= */

const menuKeys = {
    all: ['menus'] as const,
    list: (floorId?: string | number) => [...menuKeys.all, 'list', { floorId }] as const,
}

const categoryKeys = {
    all: ['categories'] as const,
    withItems: (menuId: string | number, type: EntityType) =>
        [...categoryKeys.all, 'with-items', { menuId, type }] as const,
}

const comboKeys = {
    all: ['combos'] as const,
    list: (menuId: string | number) => [...comboKeys.all, 'list', { menuId }] as const,
}

/* ================= MAPPERS ================= */

const mapItem = (i: ApiMenuItem, catName = ''): MenuItem => ({
    id: i.item_id,
    name: i.name ?? '',
    price: Number(i.price ?? 0),
    description: i.description ?? '',
    categoryId: i.category_id,
    categoryName: catName || i.category?.name || '',
    available: Boolean(i.is_available),
    image: undefined,
    menuId: i.menu_id,
})

const mapModifier = (i: ApiMenuItem, catName = ''): Modifier => ({
    id: i.item_id,
    name: i.name ?? '',
    description: i.description ?? '',
    required: Boolean(i.is_required),
    categoryId: i.category_id,
    categoryName: catName || i.category?.name || '',
    menuId: i.menu_id,
    options: [],
    parentIds: i.parent_ids,
})

const mapCombo = (c: ApiCombo): Combo => ({
    id: c.combo_id,
    name: c.name ?? '',
    price: Number(c.price ?? 0),
    description: c.description ?? '',
    available: Boolean(c.is_active),
    items: c.items?.map(i => ({ itemId: i.item_id, itemName: i.name ?? '', quantity: 1 })) || [],
    menuId: c.menu_id,
})

const mapCategory = (c: Category): MenuCategory => ({
    id: c.category_id,
    name: c.name,
    sortOrder: c.sortOrder,
})

/* ================= MAIN DOMAIN HOOK ================= */

export const useMenuDomain = (menuId: string | number, floorId?: string | number) => {
    const qc = useQueryClient()

    /* ---------- DATA QUERIES ---------- */

    const menusQuery = useQuery({
        queryKey: menuKeys.list(floorId),
        queryFn: () => menuApi.apiGetMenus(floorId),
    })

    const itemCatsQuery = useQuery({
        queryKey: categoryKeys.withItems(menuId, 'ITEM'),
        queryFn: () => menuApi.apiGetCategoriesWithItems(menuId, 'ITEM'),
        enabled: !!menuId,
    })

    const modifierCatsQuery = useQuery({
        queryKey: categoryKeys.withItems(menuId, 'MODIFIER'),
        queryFn: () => menuApi.apiGetCategoriesWithItems(menuId, 'MODIFIER'),
        enabled: !!menuId,
    })

    const combosQuery = useQuery({
        queryKey: comboKeys.list(menuId),
        queryFn: () => menuApi.apiGetCombos(menuId),
        enabled: !!menuId,
    })

    /* ---------- DERIVED UI DATA ---------- */

    const items = useMemo(
        () => itemCatsQuery.data?.flatMap(c => (c.items || []).map(i => mapItem(i, c.name))) || [],
        [itemCatsQuery.data]
    )

    const modifiers = useMemo(
        () => modifierCatsQuery.data?.flatMap(c => (c.items || []).map(i => mapModifier(i, c.name))) || [],
        [modifierCatsQuery.data]
    )

    const combos = useMemo(
        () => combosQuery.data?.map(mapCombo) || [],
        [combosQuery.data]
    )

    /* ---------- MUTATIONS ---------- */

    const invalidateMenus = () => qc.invalidateQueries({ queryKey: menuKeys.all })
    const invalidateCategories = (categoryType?: EntityType) =>
        qc.invalidateQueries({ queryKey: categoryKeys.all })
    const invalidateCombos = () =>
        qc.invalidateQueries({ queryKey: comboKeys.all })

    const createMenu = useMutation({
        mutationFn: (d: CreateMenuRequest) => menuApi.apiCreateMenu(d),
        onSuccess: () => invalidateMenus(),
    }).mutateAsync

    const updateMenu = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateMenuRequest }) =>
            menuApi.apiUpdateMenu(id, data),
        onSuccess: () => invalidateMenus(),
    }).mutateAsync

    const deleteMenu = useMutation({
        mutationFn: (id: string) => menuApi.apiDeleteMenu(id),
        onSuccess: () => invalidateMenus(),
    }).mutateAsync

    const createCategory = useMutation({
        mutationFn: (d: CreateCategoryRequest) => menuApi.apiCreateCategory(d),
        onSuccess: (_, vars) => invalidateCategories(vars.category_type),
    }).mutateAsync

    const updateCategory = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
            menuApi.apiUpdateCategory(id, data),
        onSuccess: (_, vars) => invalidateCategories(vars.data.category_type!),
    }).mutateAsync

    const deleteCategory = useMutation({
        mutationFn: ({ id }: { id: string; category_type: EntityType }) =>
            menuApi.apiDeleteCategory(id, menuId),

        onSuccess: (_res, variables) => invalidateCategories(variables.category_type),
    })

    const upsertItem = useMutation({
        mutationFn: ({ id, data }: { id?: string; data: CreateItemRequest | UpdateItemRequest }) =>
            id ? menuApi.apiUpdateItem(id, data as UpdateItemRequest) : menuApi.apiCreateItem(data as CreateItemRequest),
        onSuccess: (_, vars) => invalidateCategories((vars.data as any).type),
    }).mutateAsync

    const deleteItem = useMutation({
        mutationFn: ({ id, item_type, categoryId }: { id: string; item_type: EntityType; categoryId: string }) =>
            menuApi.apiDeleteItem(id, menuId, categoryId),
        onSuccess: (_, vars) => invalidateCategories(vars.item_type),
    }).mutateAsync

    const upsertCombo = useMutation({
        mutationFn: ({ id, data }: { id?: string; data: CreateComboRequest | UpdateComboRequest }) =>
            id ? menuApi.apiUpdateCombo(id, data as UpdateComboRequest) : menuApi.apiCreateCombo(data as CreateComboRequest),
        onSuccess: () => invalidateCombos(),
    }).mutateAsync

    const deleteCombo = useMutation({
        mutationFn: (id: string) => menuApi.apiDeleteCombo(id, menuId),
        onSuccess: () => invalidateCombos(),
    }).mutateAsync

    /* ---------- RETURN ---------- */

    return {
        menus: menusQuery.data ?? [],
        categories: itemCatsQuery.data?.map(mapCategory) ?? [],
        modifierCategories: modifierCatsQuery.data?.map(mapCategory) ?? [],
        items,
        modifiers,
        combos,
        isLoading:
            menusQuery.isLoading ||
            itemCatsQuery.isLoading ||
            modifierCatsQuery.isLoading ||
            combosQuery.isLoading,

        actions: {
            createMenu,
            updateMenu,
            deleteMenu,
            createCategory,
            updateCategory,
            deleteCategory: (vars: { categoryId: string; category_type?: EntityType }) =>
                deleteCategory.mutateAsync({
                    id: vars.categoryId,
                    category_type: vars.category_type || 'ITEM'
                }),
            upsertItem,
            deleteItem,
            toggleItemAvailability: async (id: string) => {
                const item = items.find(i => i.id === id);
                if (!item) return;
                return upsertItem({
                    id,
                    data: { type: 'ITEM', is_available: !item.available } as any
                });
            },
            upsertCombo,
            deleteCombo,
            toggleComboAvailability: async (id: string) => {
                const combo = combos.find(c => c.id === id);
                if (!combo) return;
                return upsertCombo({
                    id,
                    data: { is_active: !combo.available } as any
                });
            }
        },
    }
}

/* ================= COMPATIBILITY HOOKS ================= */

export const useMenus = (floorId?: string | number) => {
    return useQuery({
        queryKey: menuKeys.list(floorId),
        queryFn: () => menuApi.apiGetMenus(floorId),
    })
}

export const useMenuData = (menuId: string | number, floorId?: string | number) => {
    const domain = useMenuDomain(menuId, floorId);
    return {
        data: {
            items: domain.items,
            modifiers: domain.modifiers,
            combos: domain.combos,
            categories: domain.categories,
            modifierCategories: domain.modifierCategories
        },
        isLoading: domain.isLoading
    };
};

export const useMenuItemActions = (menuId: string | number = "1", floorId?: string | number) => {
    const { actions } = useMenuDomain(menuId, floorId);
    return {
        addItem: (data: any) => actions.upsertItem({
            data: {
                menu_id: Number(menuId),
                category_id: Number(data.categoryId),
                name: data.name,
                price: Number(data.price),
                description: data.description,
                is_available: data.available ?? true,
                is_active: true,
                type: 'ITEM'
            } as any
        }),
        updateItem: ({ id, updates }: { id: string; updates: any }) =>
            actions.upsertItem({
                id,
                data: {
                    item_id: id,
                    category_id: updates.categoryId ? Number(updates.categoryId) : undefined,
                    name: updates.name,
                    price: updates.price ? Number(updates.price) : undefined,
                    description: updates.description,
                    is_available: updates.available,
                    type: 'ITEM'
                } as any
            }),
        deleteItem: (id: string, _menuId: string, categoryId: string) =>
            actions.deleteItem({ id, item_type: 'ITEM', categoryId }),
        toggleItemAvailability: actions.toggleItemAvailability,
    };
};

export const useModifierActions = (menuId: string | number = "1", floorId?: string | number) => {
    const { actions } = useMenuDomain(menuId, floorId);
    return {
        addModifier: (data: any) => actions.upsertItem({
            data: {
                menu_id: Number(menuId),
                category_id: Number(data.categoryId),
                name: data.name,
                description: data.description,
                is_required: data.required,
                is_available: true,
                is_active: true,
                type: 'MODIFIER',
                parent_ids: data.parentIds
            } as any
        }),
        updateModifier: ({ id, updates }: { id: string; updates: any }) =>
            actions.upsertItem({
                id,
                data: {
                    item_id: id,
                    name: updates.name,
                    description: updates.description,
                    is_required: updates.required,
                    parent_ids: updates.parentIds,
                    type: 'MODIFIER'
                } as any
            }),
        deleteModifier: (id: string, _menuId: string, categoryId: string) =>
            actions.deleteItem({ id, item_type: 'MODIFIER', categoryId }),
    };
};

export const useComboActions = (menuId: string | number = "1", floorId?: string | number) => {
    const { actions } = useMenuDomain(menuId, floorId);
    return {
        addCombo: (data: any) => actions.upsertCombo({
            data: {
                menu_id: Number(menuId),
                name: data.name,
                price: Number(data.price),
                description: data.description,
                is_active: true,
                start_date: new Date().toISOString(),
                end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                list_of_item_ids: data.items?.map((i: any) => Number(i.itemId)) || []
            } as any
        }),
        updateCombo: ({ id, updates }: { id: string; updates: any }) =>
            actions.upsertCombo({
                id,
                data: {
                    combo_id: id,
                    name: updates.name,
                    price: updates.price ? Number(updates.price) : undefined,
                    description: updates.description,
                    list_of_item_ids: updates.items?.map((i: any) => Number(i.itemId))
                } as any
            }),
        deleteCombo: (id: string) => actions.deleteCombo(id),
        toggleComboAvailability: actions.toggleComboAvailability,
    };
};

export const useCategoryActions = (menuId: string | number = "1", floorId?: string | number) => {
    const { actions } = useMenuDomain(menuId, floorId);
    return {
        createCategory: actions.createCategory,
        updateCategory: actions.updateCategory,
        deleteCategory: (vars: { categoryId: string; menuId?: string }) =>
            actions.deleteCategory({ categoryId: vars.categoryId, category_type: 'ITEM' }),
    };
};
