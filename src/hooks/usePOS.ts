import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { posMockService } from '@/mock/mockServices/posMockService'
import type { POSData, CurrentOrder } from '@/@types/pos'
import type { BaseTable } from '@/@types/shared'

// Get all POS data
export const usePOSData = () => {
    return useQuery<POSData>({
        queryKey: ['posData'],
        queryFn: posMockService.getPOSData,
        staleTime: 1000 * 60 * 10, // 10 minutes
    })
}

// Get menu items by category
export const useMenuItems = (category: string) => {
    return useQuery({
        queryKey: ['menuItems', category],
        queryFn: () => posMockService.getMenuItemsByCategory(category),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

// Get available tables
export const useTables = () => {
    return useQuery<BaseTable[]>({
        queryKey: ['tables'],
        queryFn: posMockService.getTables,
        staleTime: 1000 * 60 * 2, // 2 minutes
    })
}

// Order actions
export const useOrderActions = () => {
    const queryClient = useQueryClient()

    const createKOTMutation = useMutation({
        mutationFn: posMockService.createKOT,
        onSuccess: (data) => {
            console.log('KOT created successfully:', data.kotId)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
    })

    const holdOrderMutation = useMutation({
        mutationFn: posMockService.holdOrder,
        onSuccess: (data) => {
            console.log('Order held successfully:', data.orderId)
            queryClient.invalidateQueries({ queryKey: ['heldOrders'] })
        },
    })

    const saveOrderMutation = useMutation({
        mutationFn: posMockService.saveOrder,
        onSuccess: (data) => {
            console.log('Order saved successfully:', data.orderId)
            queryClient.invalidateQueries({ queryKey: ['savedOrders'] })
        },
    })

    const printOrderMutation = useMutation({
        mutationFn: posMockService.printOrder,
        onSuccess: () => {
            console.log('Order printed successfully')
        },
    })

    const processPaymentMutation = useMutation({
        mutationFn: posMockService.processPayment,
        onSuccess: (data) => {
            console.log('Payment processed successfully:', data.transactionId)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
    })

    return {
        createKOT: createKOTMutation.mutate,
        holdOrder: holdOrderMutation.mutate,
        saveOrder: saveOrderMutation.mutate,
        printOrder: printOrderMutation.mutate,
        processPayment: processPaymentMutation.mutate,
        isCreatingKOT: createKOTMutation.isPending,
        isHoldingOrder: holdOrderMutation.isPending,
        isSavingOrder: saveOrderMutation.isPending,
        isPrintingOrder: printOrderMutation.isPending,
        isProcessingPayment: processPaymentMutation.isPending,
    }
}
