import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardMockService } from '@/mock/mockServices/dashboardMockService'
import type { DashboardData } from '@/@types/dashboard'

export const useTenantDashboard = () => {
    return useQuery<DashboardData>({
        queryKey: ['tenantAdminDashboard'],
        queryFn: dashboardMockService.getDashboardData,
    })
}

export const useOrderActions = () => {
    const queryClient = useQueryClient()

    const acceptOrderMutation = useMutation({
        mutationFn: dashboardMockService.acceptOrder,
        onSuccess: (data) => {
            // In a real app, you might optimistically update the list or invalidate the query
            // queryClient.invalidateQueries({ queryKey: ['tenantAdminDashboard'] })
            console.log('Order accepted:', data.orderId)
        }
    })

    const rejectOrderMutation = useMutation({
        mutationFn: dashboardMockService.rejectOrder,
        onSuccess: (data) => {
            console.log('Order rejected:', data.orderId)
        }
    })

    return {
        acceptOrder: acceptOrderMutation.mutate,
        rejectOrder: rejectOrderMutation.mutate,
        isAccepting: acceptOrderMutation.isPending,
        isRejecting: rejectOrderMutation.isPending
    }
}
