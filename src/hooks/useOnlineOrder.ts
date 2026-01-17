import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { onlineOrderMockService } from '@/mock/mockServices/onlineOrderMockService'
import type { OnlineOrder, OnlineOrderStats, OnlineOrderFilterStatus } from '@/@types/onlineorder'

// Get all online orders
export const useOnlineOrders = (status: OnlineOrderFilterStatus = 'all', search = '') => {
    return useQuery<OnlineOrder[]>({
        queryKey: ['onlineOrders', status, search],
        queryFn: () => onlineOrderMockService.getOnlineOrders(status, search),
        staleTime: 1000 * 60 * 2, // 2 minutes
    })
}

// Get single online order by ID
export const useOnlineOrderDetail = (orderId: string | null) => {
    return useQuery<OnlineOrder | null>({
        queryKey: ['onlineOrder', orderId],
        queryFn: () => orderId ? onlineOrderMockService.getOnlineOrderById(orderId) : null,
        enabled: !!orderId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Get online order statistics
export const useOnlineOrderStats = () => {
    return useQuery<OnlineOrderStats>({
        queryKey: ['onlineOrderStats'],
        queryFn: onlineOrderMockService.getOnlineOrderStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Order action mutations
export const useOnlineOrderActions = () => {
    const queryClient = useQueryClient()

    const acceptOrderMutation = useMutation({
        mutationFn: onlineOrderMockService.acceptOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['onlineOrders'] })
            queryClient.invalidateQueries({ queryKey: ['onlineOrderStats'] })
        },
    })

    const startPreparingMutation = useMutation({
        mutationFn: onlineOrderMockService.startPreparing,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['onlineOrders'] })
            queryClient.invalidateQueries({ queryKey: ['onlineOrderStats'] })
        },
    })

    const markAsReadyMutation = useMutation({
        mutationFn: onlineOrderMockService.markAsReady,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['onlineOrders'] })
            queryClient.invalidateQueries({ queryKey: ['onlineOrderStats'] })
        },
    })

    const cancelOrderMutation = useMutation({
        mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
            onlineOrderMockService.cancelOrder(orderId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['onlineOrders'] })
            queryClient.invalidateQueries({ queryKey: ['onlineOrderStats'] })
        },
    })

    const printOrderMutation = useMutation({
        mutationFn: onlineOrderMockService.printOrder,
        onSuccess: () => {
            console.log('Order printed successfully')
        },
    })

    const printKOTMutation = useMutation({
        mutationFn: onlineOrderMockService.printKOT,
        onSuccess: () => {
            console.log('KOT printed successfully')
        },
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
