import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    apiGetOnlineOrders,
    apiGetOnlineOrderById,
    apiGetOnlineOrderStats,
    apiAcceptOnlineOrder,
    apiStartPreparingOnlineOrder,
    apiMarkOnlineOrderReady,
    apiCancelOnlineOrder,
    apiPrintOnlineOrder,
    apiPrintOnlineOrderKOT,
} from '@/services/tenant_admin/online_orders'
import type { OnlineOrder, OnlineOrderStats, OnlineOrderFilterStatus } from '@/@types/onlineorder'

export const useOnlineOrders = (status: OnlineOrderFilterStatus = 'all', search = '') => {
    return useQuery<OnlineOrder[]>({
        queryKey: ['onlineOrders', status, search],
        queryFn: () => apiGetOnlineOrders(status, search),
        staleTime: 30_000,
    })
}

export const useOnlineOrderDetail = (orderId: string | null) => {
    return useQuery<OnlineOrder | null>({
        queryKey: ['onlineOrder', orderId],
        queryFn: () => (orderId ? apiGetOnlineOrderById(orderId) : null),
        enabled: !!orderId,
        staleTime: 30_000,
    })
}

export const useOnlineOrderStats = () => {
    return useQuery<OnlineOrderStats>({
        queryKey: ['onlineOrderStats'],
        queryFn: apiGetOnlineOrderStats,
        staleTime: 60_000,
    })
}

export const useOnlineOrderActions = () => {
    const queryClient = useQueryClient()

    const invalidateOrders = () => {
        queryClient.invalidateQueries({ queryKey: ['onlineOrders'] })
        queryClient.invalidateQueries({ queryKey: ['onlineOrderStats'] })
    }

    const acceptOrderMutation = useMutation({
        mutationFn: (orderId: string) => apiAcceptOnlineOrder(orderId),
        onSuccess: invalidateOrders,
    })

    const startPreparingMutation = useMutation({
        mutationFn: (orderId: string) => apiStartPreparingOnlineOrder(orderId),
        onSuccess: invalidateOrders,
    })

    const markAsReadyMutation = useMutation({
        mutationFn: (orderId: string) => apiMarkOnlineOrderReady(orderId),
        onSuccess: invalidateOrders,
    })

    const cancelOrderMutation = useMutation({
        mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
            apiCancelOnlineOrder(orderId, reason),
        onSuccess: invalidateOrders,
    })

    const printOrderMutation = useMutation({
        mutationFn: (orderId: string) => apiPrintOnlineOrder(orderId),
    })

    const printKOTMutation = useMutation({
        mutationFn: (orderId: string) => apiPrintOnlineOrderKOT(orderId),
    })

    return {
        acceptOrder: acceptOrderMutation.mutate,
        startPreparing: startPreparingMutation.mutate,
        markAsReady: markAsReadyMutation.mutate,
        cancelOrder: cancelOrderMutation.mutate,
        printOrder: printOrderMutation.mutate,
        printKOT: printKOTMutation.mutate,
        isAccepting: acceptOrderMutation.isPending,
        isPreparing: startPreparingMutation.isPending,
        isMarkingReady: markAsReadyMutation.isPending,
        isCancelling: cancelOrderMutation.isPending,
    }
}
