export interface MenuListResponse {
    status: string
    data: MenuList[]
}


export interface MenuList {
    item_name: string
    item_id: string
    item_price: number
    item_image: string
    item_description: string
    item_category: string
    item_type: string
    item_stock: number
}