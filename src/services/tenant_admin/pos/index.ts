import ApiService from '@/services/ApiService'
import { MenuListResponse } from './types'


export async function apiGetMenuList() {
    try {
        const response = ApiService.fetchDataWithAxios<MenuListResponse>({
            url: '/pos/menu-list',
            method: 'get',
        })
        return response
    } catch (error) {
        throw error
    }
}
