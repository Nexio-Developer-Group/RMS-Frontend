import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { posMockService } from '@/mock/mockServices/posMockService'
import type { POSData, MenuItem } from '@/services/tenant_admin/pos/types'
import type { BaseTable } from '@/services/tenant_admin/types'

/**
 * Hook to fetch all POS-related data
 * Includes categories, items, tables, and addons
 */
export const usePOSData = () => {
    return useQuery<POSData>({
        queryKey: ['posData'],
        queryFn: posMockService.getPOSData,
    })
}

/**
 * Hook to fetch menu items filtered by category
 * @param category Category name to filter by
 */
export const useMenuItems = (category: string) => {
    return useQuery<MenuItem[]>({
        queryKey: ['menuItems', category],
        queryFn: () => posMockService.getMenuItemsByCategory(category),
    })
}

/**
 * Hook to fetch available tables for POS
 */
export const useTables = () => {
    return useQuery<BaseTable[]>({
        queryKey: ['tables'],
        queryFn: posMockService.getTables,
    })
}

/**
 * Hook for POS order actions
 * Handles KOT creation, holding orders, saving orders, printing, and payments
 */
export const useOrderActions = () => {
    const queryClient = useQueryClient()

    // Mutation to create a Kitchen Order Ticket (KOT)
    const createKOTMutation = useMutation({
        mutationFn: posMockService.createKOT,
        onSuccess: (data) => {
            console.log('KOT created successfully:', data.kotId)
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
    })

    // Mutation to hold an order for later
    const holdOrderMutation = useMutation({
        mutationFn: posMockService.holdOrder,
        onSuccess: (data) => {
            console.log('Order held successfully:', data.orderId)
            queryClient.invalidateQueries({ queryKey: ['heldOrders'] })
        },
    })

    // Mutation to save an order (finalize for billing)
    const saveOrderMutation = useMutation({
        mutationFn: posMockService.saveOrder,
        onSuccess: (data) => {
            console.log('Order saved successfully:', data.orderId)
            queryClient.invalidateQueries({ queryKey: ['savedOrders'] })
        },
    })

    // Mutation to print an order receipt
    const printOrderMutation = useMutation({
        mutationFn: posMockService.printOrder,
        onSuccess: () => {
            console.log('Order printed successfully')
        },
    })

    // Mutation to process payment for an order
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
