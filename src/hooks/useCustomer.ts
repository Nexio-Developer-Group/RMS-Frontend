import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customerMockService } from '@/mock/mockServices/customerMockService'
import type { Customer, CustomerStats, Campaign, CustomerOrder } from '@/@types/customers'

// Get all customers
export const useCustomers = (search = '') => {
    return useQuery<Customer[]>({
        queryKey: ['customers', search],
        queryFn: () => customerMockService.getCustomers(search),
    })
}

// Get single customer by ID
export const useCustomerDetail = (customerId: string | null) => {
    return useQuery<Customer | null>({
        queryKey: ['customer', customerId],
        queryFn: () => customerId ? customerMockService.getCustomerById(customerId) : null,
        enabled: !!customerId,
    })
}

// Get customer statistics
export const useCustomerStats = () => {
    return useQuery<CustomerStats>({
        queryKey: ['customerStats'],
        queryFn: customerMockService.getCustomerStats,
    })
}

// Get all campaigns
export const useCampaigns = (search = '') => {
    return useQuery<Campaign[]>({
        queryKey: ['campaigns', search],
        queryFn: () => customerMockService.getCampaigns(search),
    })
}

// Get customer orders
export const useCustomerOrders = (customerId: string | null) => {
    return useQuery<CustomerOrder[]>({
        queryKey: ['customerOrders', customerId],
        queryFn: () => customerId ? customerMockService.getCustomerOrders(customerId) : [],
        enabled: !!customerId,
    })
}

// Customer action mutations
export const useCustomerActions = () => {
    const queryClient = useQueryClient()

    const addCustomerMutation = useMutation({
        mutationFn: customerMockService.addCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['customerStats'] })
        },
    })

    const updateStatusMutation = useMutation({
        mutationFn: ({ customerId, status }: { customerId: string; status: 'active' | 'inactive' }) =>
            customerMockService.updateCustomerStatus(customerId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })

    const updateCampaignMutation = useMutation({
        mutationFn: ({ customerId, campaignStatus }: { customerId: string; campaignStatus: 'active' | 'inactive' | 'scheduled' }) =>
            customerMockService.updateCampaignStatus(customerId, campaignStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })

    return {
        addCustomer: addCustomerMutation.mutate,
        updateStatus: updateStatusMutation.mutate,
        updateCampaign: updateCampaignMutation.mutate,
        isAdding: addCustomerMutation.isPending,
        isUpdatingStatus: updateStatusMutation.isPending,
        isUpdatingCampaign: updateCampaignMutation.isPending,
    }
}
