import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    apiGetCustomers,
    apiGetCustomerById,
    apiGetCustomerStats,
    apiGetCampaigns,
    apiGetCustomerOrders,
    apiCreateCustomer,
    apiUpdateCustomerStatus,
    apiUpdateCampaignStatus,
    type CreateCustomerDto,
} from '@/services/tenant_admin/customers'
import type { Customer, CustomerStats, Campaign, CustomerOrder } from '@/@types/customers'

export const useCustomers = (search = '') => {
    return useQuery<Customer[]>({
        queryKey: ['customers', search],
        queryFn: () => apiGetCustomers(search),
        staleTime: 30_000,
    })
}

export const useCustomerDetail = (customerId: string | null) => {
    return useQuery<Customer | null>({
        queryKey: ['customer', customerId],
        queryFn: () => (customerId ? apiGetCustomerById(customerId) : null),
        enabled: !!customerId,
        staleTime: 30_000,
    })
}

export const useCustomerStats = () => {
    return useQuery<CustomerStats>({
        queryKey: ['customerStats'],
        queryFn: apiGetCustomerStats,
        staleTime: 60_000,
    })
}

export const useCampaigns = (search = '') => {
    return useQuery<Campaign[]>({
        queryKey: ['campaigns', search],
        queryFn: () => apiGetCampaigns(search),
        staleTime: 30_000,
    })
}

export const useCustomerOrders = (customerId: string | null) => {
    return useQuery<CustomerOrder[]>({
        queryKey: ['customerOrders', customerId],
        queryFn: () => (customerId ? apiGetCustomerOrders(customerId) : []),
        enabled: !!customerId,
        staleTime: 30_000,
    })
}

export const useCustomerActions = () => {
    const queryClient = useQueryClient()

    const addCustomerMutation = useMutation({
        mutationFn: (data: CreateCustomerDto) => apiCreateCustomer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['customerStats'] })
        },
    })

    const updateStatusMutation = useMutation({
        mutationFn: ({ customerId, status }: { customerId: string; status: 'active' | 'inactive' }) =>
            apiUpdateCustomerStatus(customerId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            queryClient.invalidateQueries({ queryKey: ['customer'] })
        },
    })

    const updateCampaignMutation = useMutation({
        mutationFn: ({
            customerId,
            campaignStatus,
        }: {
            customerId: string
            campaignStatus: 'active' | 'inactive' | 'scheduled'
        }) => apiUpdateCampaignStatus(customerId, campaignStatus),
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
