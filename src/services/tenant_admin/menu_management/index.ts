import ApiService from "@/services/ApiService";
import {
    Menu,
    CreateMenuRequest,
    UpdateMenuRequest,
    Category,
    CreateCategoryRequest,
    UpdateCategoryRequest,
    MenuItemAPI as MenuItem,
    CreateItemRequest,
    UpdateItemRequest,
    ComboAPI as Combo,
    CreateComboRequest,
    UpdateComboRequest,
    SuccessMessageResponse,
    EntityType
} from "./types";

//============================== Menu ===================================//

export async function apiCreateMenu(data: CreateMenuRequest) {
    try {
        // floor_id is required as a query param per the API spec
        const { floor_id, ...body } = data;
        const response = await ApiService.fetchDataWithAxios<Menu, Omit<CreateMenuRequest, 'floor_id'>>({ 
            url: '/menus',
            method: 'post',
            data: body,
            params: { floor_id },
        });
        return response;
    } catch (error) {
        console.error('Error creating menu:', error);
        throw error;
    }
}

export async function apiGetMenus(floorId?: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<Menu[]>({
            url: '/menus',
            method: 'get',
            params: floorId ? { floor_id: floorId } : {}
        });
        return response;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
}

export async function apiGetMenuById(menuId: string, floorId?: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<Menu>({
            url: `/menus/${menuId}`,
            method: 'get',
            params: floorId ? { floor_id: floorId } : {}
        });
        return response;
    } catch (error) {
        console.error('Error fetching menu by ID:', error);
        throw error;
    }
}

export async function apiUpdateMenu(menuId: string, data: UpdateMenuRequest) {
    try {
        const response = await ApiService.fetchDataWithAxios<Menu, UpdateMenuRequest>({
            url: `/menus/${menuId}`,
            method: 'patch',
            data
        });
        return response;
    } catch (error) {
        console.error('Error updating menu:', error);
        throw error;
    }
}

export async function apiDeleteMenu(menuId: string, floorId?: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<SuccessMessageResponse>({
            url: `/menus/${menuId}`,
            method: 'delete',
            params: floorId ? { floor_id: floorId } : {}
        });
        return response;
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw error;
    }
}

//============================== Categories ===================================//

export async function apiCreateCategory(data: CreateCategoryRequest) {
    try {
        // menu_id and category_type are required as query params per the API spec
        const { menu_id, category_type, ...body } = data;
        const response = await ApiService.fetchDataWithAxios<Category, Omit<CreateCategoryRequest, 'menu_id' | 'category_type'>>({
            url: '/categories',
            method: 'post',
            data: body,
            params: { menu_id, category_type },
        });
        return response;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
}

export async function apiGetCategories(menuId: number | string, categoryType: EntityType) {
    try {
        const response = await ApiService.fetchDataWithAxios<Category[]>({
            url: '/categories',
            method: 'get',
            params: { menu_id: menuId, category_type: categoryType }
        });
        return response;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function apiGetCategoriesWithItems(menuId: number | string, categoryType: EntityType) {
    try {
        const response = await ApiService.fetchDataWithAxios<Category[]>({
            url: '/categories/with-items',
            method: 'get',
            params: { menu_id: menuId, category_type: categoryType }
        });
        return response;
    } catch (error) {
        console.error('Error fetching categories with items:', error);
        throw error;
    }
}

export async function apiGetCategoryById(categoryId: string, menuId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<Category>({
            url: `/categories/${categoryId}`,
            method: 'get',
            params: { menu_id: menuId }
        });
        return response;
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        throw error;
    }
}

export async function apiUpdateCategory(categoryId: string, data: UpdateCategoryRequest) {
    try {
        const response = await ApiService.fetchDataWithAxios<Category, UpdateCategoryRequest>({
            url: `/categories/${categoryId}`,
            method: 'patch',
            data
        });
        return response;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

export async function apiDeleteCategory(categoryId: string, menuId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<SuccessMessageResponse>({
            url: `/categories/${categoryId}`,
            method: 'delete',
            params: { menu_id: menuId }
        });
        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

//============================== Items / Modifiers ===================================//

export async function apiCreateItem(data: CreateItemRequest) {
    try {
        // menu_id, category_id, and type are required as query params per the API spec
        const { menu_id, category_id, type, ...body } = data;
        const response = await ApiService.fetchDataWithAxios<MenuItem, Omit<CreateItemRequest, 'menu_id' | 'category_id' | 'type'>>({
            url: '/items',
            method: 'post',
            data: body,
            params: { menu_id, category_id, type },
        });
        return response;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
}

export async function apiGetItems(menuId: number | string, categoryId: number | string, type: EntityType) {
    try {
        const response = await ApiService.fetchDataWithAxios<MenuItem[]>({
            url: '/items',
            method: 'get',
            params: { menu_id: menuId, category_id: categoryId, type }
        });
        return response;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

export async function apiGetItemById(itemId: string, menuId: number | string, categoryId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<MenuItem>({
            url: `/items/${itemId}`,
            method: 'get',
            params: { menu_id: menuId, category_id: categoryId }
        });
        return response;
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        throw error;
    }
}

export async function apiUpdateItem(itemId: string, data: UpdateItemRequest) {
    try {
        const response = await ApiService.fetchDataWithAxios<MenuItem, UpdateItemRequest>({
            url: `/items/${itemId}`,
            method: 'patch',
            data
        });
        return response;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}

export async function apiDeleteItem(itemId: string, menuId: number | string, categoryId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<SuccessMessageResponse>({
            url: `/items/${itemId}`,
            method: 'delete',
            params: { menu_id: menuId, category_id: categoryId }
        });
        return response;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
}

//============================== Combos ===================================//

export async function apiCreateCombo(data: CreateComboRequest) {
    try {
        // menu_id is required as a query param per the API spec
        const { menu_id, ...body } = data;
        const response = await ApiService.fetchDataWithAxios<Combo, Omit<CreateComboRequest, 'menu_id'>>({
            url: '/combos',
            method: 'post',
            data: body,
            params: { menu_id },
        });
        return response;
    } catch (error) {
        console.error('Error creating combo:', error);
        throw error;
    }
}

export async function apiGetCombos(menuId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<Combo[]>({
            url: '/combos',
            method: 'get',
            params: { menu_id: menuId }
        });
        return response;
    } catch (error) {
        console.error('Error fetching combos:', error);
        throw error;
    }
}

export async function apiGetComboById(comboId: string, menuId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<Combo>({
            url: `/combos/${comboId}`,
            method: 'get',
            params: { menu_id: menuId }
        });
        return response;
    } catch (error) {
        console.error('Error fetching combo by ID:', error);
        throw error;
    }
}

export async function apiUpdateCombo(comboId: string, data: UpdateComboRequest) {
    try {
        const response = await ApiService.fetchDataWithAxios<Combo, UpdateComboRequest>({
            url: `/combos/${comboId}`,
            method: 'patch',
            data
        });
        return response;
    } catch (error) {
        console.error('Error updating combo:', error);
        throw error;
    }
}

export async function apiDeleteCombo(comboId: string, menuId: number | string) {
    try {
        const response = await ApiService.fetchDataWithAxios<SuccessMessageResponse>({
            url: `/combos/${comboId}`,
            method: 'delete',
            params: { menu_id: menuId }
        });
        return response;
    } catch (error) {
        console.error('Error deleting combo:', error);
        throw error;
    }
}
