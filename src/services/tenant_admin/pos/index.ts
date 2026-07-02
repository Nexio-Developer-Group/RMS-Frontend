import ApiService from '@/services/ApiService'

// ============================== Interfaces ===================================//

export interface Cart {
    id: string
    tenant_id: string
    table_id: string
    waiter_id: string
    status: 'active' | 'converted' | 'cancelled'
    notes?: string
    items: CartItem[]
    created_at: string
    updated_at: string
}

export interface CartItem {
    id: string
    cart_id: string
    item_id?: string
    combo_id?: string
    name: string
    unit_price: number
    quantity: number
    notes?: string
}

export interface CreateCartDto {
    /** Table (floor node) id — omit for takeaway/delivery */
    table_id?: string
    /** Waiter user id — backend defaults to the authenticated user */
    waiter_id?: string
    notes?: string
}

export interface AddCartItemDto {
    item_id?: string
    combo_id?: string
    name: string
    unit_price: number
    quantity: number
    notes?: string
}

export interface UpdateCartItemDto {
    quantity?: number
    notes?: string
}

// ============================== Carts ===================================//

export async function apiCreateCart(data: CreateCartDto): Promise<Cart> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart, CreateCartDto>({
            url: '/carts',
            method: 'post',
            data,
        })
        return response
    } catch (error) {
        console.error('Error creating cart:', error)
        throw error
    }
}

export async function apiGetCarts(): Promise<Cart[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart[]>({
            url: '/carts',
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching carts:', error)
        throw error
    }
}

export async function apiGetCartById(id: string): Promise<Cart> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart>({
            url: `/carts/${id}`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching cart by ID:', error)
        throw error
    }
}

export async function apiUpdateCart(id: string, data: Partial<CreateCartDto>): Promise<Cart> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart, Partial<CreateCartDto>>({
            url: `/carts/${id}`,
            method: 'patch',
            data,
        })
        return response
    } catch (error) {
        console.error('Error updating cart:', error)
        throw error
    }
}

export async function apiDeleteCart(id: string): Promise<void> {
    try {
        await ApiService.fetchDataWithAxios<void>({
            url: `/carts/${id}`,
            method: 'delete',
        })
    } catch (error) {
        console.error('Error deleting cart:', error)
        throw error
    }
}

// ============================== Cart Items ===================================//

export async function apiAddCartItem(cartId: string, data: AddCartItemDto): Promise<Cart> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart, AddCartItemDto>({
            url: `/carts/${cartId}/items`,
            method: 'post',
            data,
        })
        return response
    } catch (error) {
        console.error('Error adding cart item:', error)
        throw error
    }
}

export async function apiUpdateCartItem(
    cartId: string,
    itemId: string,
    data: UpdateCartItemDto,
): Promise<Cart> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart, UpdateCartItemDto>({
            url: `/carts/${cartId}/items/${itemId}`,
            method: 'patch',
            data,
        })
        return response
    } catch (error) {
        console.error('Error updating cart item:', error)
        throw error
    }
}

export async function apiRemoveCartItem(cartId: string, itemId: string): Promise<Cart> {
    try {
        const response = await ApiService.fetchDataWithAxios<Cart>({
            url: `/carts/${cartId}/items/${itemId}`,
            method: 'delete',
        })
        return response
    } catch (error) {
        console.error('Error removing cart item:', error)
        throw error
    }
}

// ============================== Convert Cart ===================================//

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiConvertCart(cartId: string): Promise<any> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await ApiService.fetchDataWithAxios<any>({
            url: `/carts/${cartId}/convert`,
            method: 'post',
        })
        return response
    } catch (error) {
        console.error('Error converting cart to order:', error)
        throw error
    }
}
