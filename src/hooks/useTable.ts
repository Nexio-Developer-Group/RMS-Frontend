import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    apiGetFloors,
    apiGetTables,
    apiCreateTable,
    apiUpdateTable,
    apiDeleteTable,
    apiGetTableById,
} from '@/services/tenant_admin/table_management'

import type {
    FloorTableNodeDto,
    FloorModel,
    TableModel,
    CreateTableInput,
    UpdateTableInput,
    CreateFloorInput,
    UpdateFloorInput,
} from '@/services/tenant_admin/table_management/types'

/* ---------------- QUERY KEYS ---------------- */

const keys = {
    root: ['floor-table'] as const,
    floors: () => [...keys.root, 'floors'] as const,
    tables: () => [...keys.root, 'tables'] as const,
}

/* ---------------- MAPPERS ---------------- */

const mapNodeToFloor = (node: FloorTableNodeDto): FloorModel => ({
    id: node.floor_id,
    name: node.name,
    tableCount: node.children?.length || 0,
    isActive: node.is_active,
    createdAt: node.created_at,
})

const mapNodeToTable = (node: FloorTableNodeDto, floorName = ''): TableModel => ({
    id: node.floor_id,
    number: node.name.replace('Table ', '').replace('Table-', ''),
    name: node.name,
    floorId: String(node.parent_id),
    floorName,
    capacity: 4,
    status: node.is_active ? 'available' : 'inactive',
    enabled: node.is_active,
    totalRevenue: 0,
    totalOrders: 0,
    createdAt: node.created_at,
    updatedAt: node.updated_at,
})

/* ---------------- QUERIES ---------------- */

export const useFloors = () => {
    const query = useQuery({
        queryKey: keys.floors(),
        queryFn: apiGetFloors,
        staleTime: 0,
    })

    return {
        data: useMemo(() => query.data?.map(mapNodeToFloor) ?? [], [query.data]),
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }
}

export const useTables = () => {
    const tablesQuery = useQuery({
        queryKey: keys.tables(),
        queryFn: apiGetTables,
        staleTime: 0,
    })

    const floorsQuery = useQuery({
        queryKey: keys.floors(),
        queryFn: apiGetFloors,
        staleTime: 0,
    })

    const tables = useMemo(() => {
        if (!tablesQuery.data || !floorsQuery.data) return []

        const floorMap = new Map<string, string>()
        floorsQuery.data.forEach(f => floorMap.set(f.floor_id, f.name))

        return tablesQuery.data.map(t =>
            mapNodeToTable(t, floorMap.get(String(t.parent_id)) || 'Unknown Floor')
        )
    }, [tablesQuery.data, floorsQuery.data])

    return {
        data: tables,
        isLoading: tablesQuery.isLoading || floorsQuery.isLoading,
        isError: tablesQuery.isError || floorsQuery.isError,
        error: tablesQuery.error || floorsQuery.error,
    }
}

/* ---------------- STATS ---------------- */

export const useTableStats = () => {
    const { data: tables } = useTables()
    const { data: floors } = useFloors()

    return {
        data: {
            totalFloors: floors.length,
            totalTables: tables.length,
            availableTables: tables.filter(t => t.enabled).length,
            inactiveTables: tables.filter(t => !t.enabled).length,
            occupiedTables: 0,
        },
    }
}

/* ---------------- HELPERS ---------------- */

const prepareTablePayload = async (id: string, enabled?: boolean) => {
    const data = await apiGetTableById(id, 'table')
    return {
        type: 'table' as const,
        name: data.name,
        parent_id: data.parent_id,
        is_active: enabled ?? data.is_active,
    }
}

/* ---------------- TABLE ACTIONS ---------------- */

export const useTableActions = () => {
    const qc = useQueryClient()
    const invalidate = () => {
        qc.invalidateQueries({ queryKey: keys.floors() })
        qc.invalidateQueries({ queryKey: keys.tables() })
    }

    const createTable = useMutation({
        mutationFn: (input: CreateTableInput) =>
            apiCreateTable({ name: input.name, type: 'table', parent_id: input.floorId }),
        onSuccess: invalidate,
    })

    const updateTable = useMutation({
        mutationFn: (input: UpdateTableInput) =>
            apiUpdateTable(input.id, 'table', {
                type: 'table',
                name: input.name,
                parent_id: input.floorId,
                is_active: input.enabled,
            }),
        onSuccess: invalidate,
    })

    const deleteTable = useMutation({
        mutationFn: (id: string) => apiDeleteTable(id, 'table'),
        onSuccess: invalidate,
    })

    const toggleStatus = useMutation({
        mutationFn: async (id: string) => {
            const payload = await prepareTablePayload(id)
            return apiUpdateTable(id, 'table', { ...payload, is_active: !payload.is_active })
        },
        onSuccess: invalidate,
    })

    return {
        createTable: createTable.mutateAsync,
        updateTable: updateTable.mutateAsync,
        deleteTable: deleteTable.mutateAsync,
        toggleStatus: toggleStatus.mutateAsync,
        isCreating: createTable.isPending,
        isUpdating: updateTable.isPending,
        isDeleting: deleteTable.isPending,
        isToggling: toggleStatus.isPending,
    }
}

/* ---------------- FLOOR ACTIONS ---------------- */

export const useFloorActions = () => {
    const qc = useQueryClient()
    const invalidate = () => {
        qc.invalidateQueries({ queryKey: keys.floors() })
        qc.invalidateQueries({ queryKey: keys.tables() })
    }

    const createFloor = useMutation({
        mutationFn: (input: CreateFloorInput) =>
            apiCreateTable({ name: input.name, type: 'floor', parent_id: null }),
        onSuccess: invalidate,
    })

    const updateFloor = useMutation({
        mutationFn: (input: UpdateFloorInput) =>
            apiUpdateTable(input.id, 'floor', { type: 'floor', name: input.name }),
        onSuccess: invalidate,
    })

    const deleteFloor = useMutation({
        mutationFn: (id: string) => apiDeleteTable(id, 'floor'),
        onSuccess: invalidate,
    })

    return {
        createFloor: createFloor.mutateAsync,
        updateFloor: updateFloor.mutateAsync,
        deleteFloor: deleteFloor.mutateAsync,
        isCreating: createFloor.isPending,
        isUpdating: updateFloor.isPending,
        isDeleting: deleteFloor.isPending,
    }
}

/* ---------------- COMPATIBILITY EXPORTS ---------------- */

export const useCreateTable = () => {
    const { createTable, isCreating } = useTableActions()
    return { mutateAsync: createTable, isPending: isCreating }
}

export const useUpdateTable = () => {
    const { updateTable, isUpdating } = useTableActions()
    return { mutateAsync: updateTable, isPending: isUpdating }
}

export const useDeleteTable = () => {
    const { deleteTable, isDeleting } = useTableActions()
    return { mutateAsync: deleteTable, isPending: isDeleting }
}

export const useToggleTableStatus = () => {
    const { toggleStatus, isToggling } = useTableActions()
    return { mutateAsync: toggleStatus, isPending: isToggling }
}

export const useCreateFloor = () => {
    const { createFloor, isCreating } = useFloorActions()
    return { mutateAsync: createFloor, isPending: isCreating }
}

export const useUpdateFloor = () => {
    const { updateFloor, isUpdating } = useFloorActions()
    return { mutateAsync: updateFloor, isPending: isUpdating }
}

export const useDeleteFloor = () => {
    const { deleteFloor, isDeleting } = useFloorActions()
    return { mutateAsync: deleteFloor, isPending: isDeleting }
}
