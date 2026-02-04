import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true, // Refetch when window is focused
            retry: false, // Don't retry on error for now
            staleTime: 0, // No caching - always fetch fresh data
            gcTime: 0, // No cache retention
        },
    },
})
