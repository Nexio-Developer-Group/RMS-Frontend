import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    apiGetStaff,
    apiGetStaffById,
    apiGetRoles,
    apiCreateStaff,
    apiUpdateStaff,
    apiDeleteStaff,
    apiTogglePermission,
    apiGetStaffActivity,
    apiGetStaffDocuments,
    apiUploadDocument,
    apiDeleteDocument,
    type Staff,
    type StaffDetail,
    type Role,
    type CreateStaffDto,
    type UpdateStaffDto,
    type ActivityLog,
    type StaffDocument,
} from '@/services/tenant_admin/staff'

export type { Staff, StaffDetail, Role, CreateStaffDto, UpdateStaffDto, ActivityLog, StaffDocument }

export const useStaff = () => {
    return useQuery<Staff[]>({
        queryKey: ['staff'],
        queryFn: apiGetStaff,
        staleTime: 30_000,
    })
}

export const useStaffDetail = (staffId: string | null) => {
    return useQuery<StaffDetail>({
        queryKey: ['staff', staffId],
        queryFn: () => apiGetStaffById(staffId!),
        enabled: !!staffId,
        staleTime: 30_000,
    })
}

export const useRoles = () => {
    return useQuery<Role[]>({
        queryKey: ['roles'],
        queryFn: apiGetRoles,
        staleTime: 300_000,
    })
}

export const useStaffActivity = (staffId: string | null) => {
    return useQuery<ActivityLog[]>({
        queryKey: ['staffActivity', staffId],
        queryFn: () => apiGetStaffActivity(staffId!),
        enabled: !!staffId,
        staleTime: 60_000,
    })
}

export const useStaffDocuments = (staffId: string | null) => {
    return useQuery<StaffDocument[]>({
        queryKey: ['staffDocuments', staffId],
        queryFn: () => apiGetStaffDocuments(staffId!),
        enabled: !!staffId,
        staleTime: 60_000,
    })
}

export const useStaffActions = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: (data: CreateStaffDto) => apiCreateStaff(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
        },
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateStaffDto }) =>
            apiUpdateStaff(id, data),
        onSuccess: (_result, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
            queryClient.invalidateQueries({ queryKey: ['staff', id] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (id: string) => apiDeleteStaff(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
        },
    })

    const togglePermissionMutation = useMutation({
        mutationFn: ({ userId, permissionId }: { userId: string; permissionId: string }) =>
            apiTogglePermission(userId, permissionId),
        onSuccess: (_result, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ['staff', userId] })
        },
    })

    const uploadDocumentMutation = useMutation({
        mutationFn: ({
            staffId,
            file,
            documentType,
        }: {
            staffId: string
            file: File
            documentType: string
        }) => apiUploadDocument(staffId, file, documentType),
        onSuccess: (_result, { staffId }) => {
            queryClient.invalidateQueries({ queryKey: ['staffDocuments', staffId] })
        },
    })

    const deleteDocumentMutation = useMutation({
        mutationFn: (docId: string) => apiDeleteDocument(docId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffDocuments'] })
        },
    })

    return {
        createStaff: createMutation.mutate,
        updateStaff: updateMutation.mutate,
        deleteStaff: deleteMutation.mutate,
        togglePermission: togglePermissionMutation.mutate,
        uploadDocument: uploadDocumentMutation.mutate,
        deleteDocument: deleteDocumentMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isTogglingPermission: togglePermissionMutation.isPending,
        isUploadingDocument: uploadDocumentMutation.isPending,
        isDeletingDocument: deleteDocumentMutation.isPending,
    }
}
