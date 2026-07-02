import ApiService from '@/services/ApiService'
import type {
    Customer,
    CustomerStats,
    Campaign,
    CustomerOrder,
} from '@/@types/customers'

export type { Customer, CustomerStats, Campaign, CustomerOrder }

export interface CreateCustomerDto {
    name: string
    phoneNumber: string
    email?: string
    address?: string
    city?: string
}

export interface UpdateCustomerStatusDto {
    status: 'active' | 'inactive'
}

export interface UpdateCampaignStatusDto {
    campaignStatus: 'active' | 'inactive' | 'scheduled'
}

export async function apiGetCustomers(search?: string): Promise<Customer[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<Customer[]>({
            url: '/customers',
            method: 'get',
            params: search ? { search } : undefined,
        })
        return response
    } catch (error) {
        console.error('Error fetching customers:', error)
        return []
    }
}

export async function apiGetCustomerById(id: string): Promise<Customer | null> {
    try {
        const response = await ApiService.fetchDataWithAxios<Customer>({
            url: `/customers/${id}`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching customer by ID:', error)
        return null
    }
}

export async function apiGetCustomerStats(): Promise<CustomerStats> {
    try {
        const response = await ApiService.fetchDataWithAxios<CustomerStats>({
            url: '/customers/stats',
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching customer stats:', error)
        return {
            totalCustomers: 0,
            activeCampaigns: 0,
            inactiveCustomers: 0,
            totalRevenue: 0,
        }
    }
}

export async function apiGetCustomerOrders(id: string): Promise<CustomerOrder[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<CustomerOrder[]>({
            url: `/customers/${id}/orders`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching customer orders:', error)
        return []
    }
}

export async function apiGetCampaigns(search?: string): Promise<Campaign[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<Campaign[]>({
            url: '/campaigns',
            method: 'get',
            params: search ? { search } : undefined,
        })
        return response
    } catch (error) {
        console.error('Error fetching campaigns:', error)
        return []
    }
}

export async function apiCreateCustomer(data: CreateCustomerDto): Promise<Customer> {
    const response = await ApiService.fetchDataWithAxios<Customer, CreateCustomerDto>({
        url: '/customers',
        method: 'post',
        data,
    })
    return response
}

export async function apiUpdateCustomerStatus(
    id: string,
    status: 'active' | 'inactive',
): Promise<Customer> {
    const response = await ApiService.fetchDataWithAxios<Customer, UpdateCustomerStatusDto>({
        url: `/customers/${id}/status`,
        method: 'patch',
        data: { status },
    })
    return response
}

export async function apiUpdateCampaignStatus(
    id: string,
    campaignStatus: 'active' | 'inactive' | 'scheduled',
): Promise<Customer> {
    const response = await ApiService.fetchDataWithAxios<Customer, UpdateCampaignStatusDto>({
        url: `/customers/${id}/campaign`,
        method: 'patch',
        data: { campaignStatus },
    })
    return response
}
