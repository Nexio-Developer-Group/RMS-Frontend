import ApiService from '@/services/ApiService'
import type {
    OnlineOrder,
    OnlineOrderStats,
    OnlineOrderFilterStatus,
} from '@/@types/onlineorder'

export type { OnlineOrder, OnlineOrderStats, OnlineOrderFilterStatus }

export async function apiGetOnlineOrders(
    status?: OnlineOrderFilterStatus,
    search?: string,
): Promise<OnlineOrder[]> {
    try {
        const params: Record<string, string> = {}
        if (status && status !== 'all') params.status = status
        if (search) params.search = search

        const response = await ApiService.fetchDataWithAxios<OnlineOrder[]>({
            url: '/online-orders',
            method: 'get',
            params: Object.keys(params).length ? params : undefined,
        })
        return response
    } catch (error) {
        console.error('Error fetching online orders:', error)
        return []
    }
}

export async function apiGetOnlineOrderById(id: string): Promise<OnlineOrder | null> {
    try {
        const response = await ApiService.fetchDataWithAxios<OnlineOrder>({
            url: `/online-orders/${id}`,
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching online order by ID:', error)
        return null
    }
}

export async function apiGetOnlineOrderStats(): Promise<OnlineOrderStats> {
    try {
        const response = await ApiService.fetchDataWithAxios<OnlineOrderStats>({
            url: '/online-orders/stats',
            method: 'get',
        })
        return response
    } catch (error) {
        console.error('Error fetching online order stats:', error)
        return {
            allOrders: 0,
            pendingOrders: 0,
            acceptedOrders: 0,
            preparingOrders: 0,
            completedOrders: 0,
            cancelledOrders: 0,
            totalRevenue: 0,
        }
    }
}

export async function apiAcceptOnlineOrder(orderId: string): Promise<OnlineOrder> {
    const response = await ApiService.fetchDataWithAxios<OnlineOrder>({
        url: `/online-orders/${orderId}/accept`,
        method: 'patch',
    })
    return response
}

export async function apiStartPreparingOnlineOrder(orderId: string): Promise<OnlineOrder> {
    const response = await ApiService.fetchDataWithAxios<OnlineOrder>({
        url: `/online-orders/${orderId}/preparing`,
        method: 'patch',
    })
    return response
}

export async function apiMarkOnlineOrderReady(orderId: string): Promise<OnlineOrder> {
    const response = await ApiService.fetchDataWithAxios<OnlineOrder>({
        url: `/online-orders/${orderId}/ready`,
        method: 'patch',
    })
    return response
}

export async function apiCancelOnlineOrder(
    orderId: string,
    reason: string,
): Promise<void> {
    await ApiService.fetchDataWithAxios<void, { reason: string }>({
        url: `/online-orders/${orderId}/cancel`,
        method: 'post',
        data: { reason },
    })
}

export async function apiPrintOnlineOrder(orderId: string): Promise<void> {
    await ApiService.fetchDataWithAxios<void>({
        url: `/online-orders/${orderId}/print`,
        method: 'post',
    })
}

export async function apiPrintOnlineOrderKOT(orderId: string): Promise<void> {
    await ApiService.fetchDataWithAxios<void>({
        url: `/online-orders/${orderId}/print-kot`,
        method: 'post',
    })
}
