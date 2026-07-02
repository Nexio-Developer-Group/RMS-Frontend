import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGetOrderStats, apiUpdateOrderStatus } from '@/services/tenant_admin/orders'
import type { DashboardData } from '@/@types/dashboard'
import type { OrderStats } from '@/services/tenant_admin/orders'

function mapStatsToDashboard(stats: OrderStats): DashboardData {
    const byStatus = stats.by_status || {}
    const paidCount = byStatus['paid'] ?? 0
    const totalRevenue = stats.revenue?.this_month ?? 0

    return {
        stats: {
            totalRevenue,
            totalRevenueGrowth: 0,
            profitVsGoal: 0,
            profitVsGoalGrowth: 0,
            moneyLost: 0,
            itemSold: paidCount,
            itemSoldGrowth: 0,
        },
        onlineOrders: [],
        recentOrders: [],
    }
}

export const useTenantDashboard = () => {
    return useQuery<DashboardData>({
        queryKey: ['tenantAdminDashboard'],
        queryFn: async () => {
            const stats = await apiGetOrderStats()
            return mapStatsToDashboard(stats)
        },
        staleTime: 60_000,
    })
}

export const useOrderActions = () => {
    const queryClient = useQueryClient()

    const acceptOrderMutation = useMutation({
        mutationFn: (orderId: string) => apiUpdateOrderStatus(orderId, 'confirmed'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['tenantAdminDashboard'] })
        },
    })

    const rejectOrderMutation = useMutation({
        mutationFn: (orderId: string) => apiUpdateOrderStatus(orderId, 'cancelled'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['tenantAdminDashboard'] })
        },
    })

    return {
        acceptOrder: (orderId: string) => acceptOrderMutation.mutate(orderId),
        rejectOrder: (orderId: string) => rejectOrderMutation.mutate(orderId),
        isAccepting: acceptOrderMutation.isPending,
        isRejecting: rejectOrderMutation.isPending,
    }
}
