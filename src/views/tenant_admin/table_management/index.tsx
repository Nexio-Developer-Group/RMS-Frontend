import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import {
    useTables,
    useFloors,
    useTableStats,
    useCreateTable,
    useUpdateTable,
    useToggleTableStatus,
    useDeleteFloor,
    useDeleteTable,
} from '@/hooks/useTable'
import { FloorSection, AddTableDialog, TableDetailsDialog, AddFloorDialog } from './components'
import Loading from '@/components/shared/Loading'
import StatCard from '../components/StatCard'
import type { TableModel, FloorModel, CreateTableInput } from '@/services/tenant_admin/table_management/types'
import { Button } from '@/components/shadcn/ui/button'

const TableManagement = () => {
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showFloorDialog, setShowFloorDialog] = useState(false)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)
    const [selectedTable, setSelectedTable] = useState<TableModel | null>(null)
    const [selectedFloor, setSelectedFloor] = useState<FloorModel | null>(null)

    const {
        data: tables = [],
        isLoading: loadingTables,
        isError: tablesError,
    } = useTables()

    const {
        data: floors = [],
        isLoading: loadingFloors,
        isError: floorsError,
    } = useFloors()

    const { data: stats } = useTableStats()

    // Placeholder until orders API is ready
    const orders: any[] = []

    const createTable = useCreateTable()
    const updateTable = useUpdateTable()
    const toggleStatus = useToggleTableStatus()
    const deleteFloor = useDeleteFloor()
    const deleteTable = useDeleteTable()

    const handleAddTable = async (input: CreateTableInput) => {
        try {
            if (selectedTable) {
                await updateTable.mutateAsync({ ...input, id: selectedTable.id })
            } else {
                await createTable.mutateAsync(input)
            }
            handleCloseDialog()
        } catch (error) {
            console.error('Error saving table:', error)
        }
    }

    const handleDeleteFloor = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this floor?')) return
        try {
            await deleteFloor.mutateAsync(id)
        } catch (error) {
            console.error('Error deleting floor:', error)
        }
    }

    const handleDeleteTable = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this table?')) return
        try {
            await deleteTable.mutateAsync(id)
        } catch (error) {
            console.error('Error deleting table:', error)
        }
    }

    const handleToggleStatus = async (id: string) => {
        try {
            await toggleStatus.mutateAsync(id)
        } catch (error) {
            console.error('Error toggling table status:', error)
        }
    }

    const tablesByFloor = useMemo(() => {
        if (!floors.length) return []
        return floors.map((floor) => ({
            floor,
            tables: tables.filter((t) => t.floorId === floor.id),
        }))
    }, [floors, tables])

    const tableStats = stats ?? {
        totalFloors: 0,
        totalTables: 0,
        availableTables: 0,
        occupiedTables: 0,
        inactiveTables: 0,
    }

    /* ---------------- LOADING / ERROR STATES ---------------- */

    if (loadingTables || loadingFloors) {
        return (
            <div className="flex h-full items-center justify-center min-h-100">
                <Loading loading />
            </div>
        )
    }

    if (tablesError || floorsError) {
        return (
            <div className="flex h-full items-center justify-center text-destructive">
                Failed to load table data. Please refresh.
            </div>
        )
    }

    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-4">
            {/* Stats Section */}
            <div className="shrink-0 rounded-md border bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Tables" value={tableStats.totalTables} className="border-r" />
                    <StatCard title="Available Tables" value={tableStats.availableTables} className="border-r" />
                    <StatCard title="Occupied Tables" value={tableStats.occupiedTables} className="border-r" />
                    <StatCard title="Inactive/Disabled" value={tableStats.inactiveTables} />
                </div>
            </div>

            {/* Header + Content Section */}
            <div className="rounded-md border bg-card">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl font-bold text-foreground">Floors</h1>
                    <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
                        <Plus size={20} />
                        Add Table
                    </Button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {tablesByFloor.map(({ floor, tables: floorTables }) => (
                        <FloorSection
                            key={floor.id}
                            floor={floor}
                            tables={floorTables}
                            onEditTable={(t) => {
                                setSelectedTable(t)
                                setShowAddDialog(true)
                            }}
                            onToggleTableStatus={handleToggleStatus}
                            onTableClick={(t) => {
                                setSelectedTable(t)
                                setShowDetailsDialog(true)
                            }}
                            onEditFloor={(f) => {
                                setSelectedFloor(f)
                                setShowFloorDialog(true)
                            }}
                            onDeleteFloor={handleDeleteFloor}
                            onDeleteTable={handleDeleteTable}
                        />
                    ))}
                </div>
            </div>

            {/* Dialogs */}
            <AddTableDialog
                isOpen={showAddDialog}
                onClose={handleCloseDialog}
                onSubmit={handleAddTable}
                onDelete={handleDeleteTable}
                floors={floors}
                editTable={selectedTable}
            />

            {selectedTable && (
                <TableDetailsDialog
                    isOpen={showDetailsDialog}
                    onClose={handleCloseDetailsDialog}
                    table={selectedTable}
                    orders={orders}
                    onToggleStatus={handleToggleStatus}
                />
            )}

            <AddFloorDialog
                isOpen={showFloorDialog}
                onClose={handleCloseFloorDialog}
                editFloor={selectedFloor}
                onDelete={handleDeleteFloor}
            />
        </div>
    )

    function handleCloseDialog() {
        setShowAddDialog(false)
        setSelectedTable(null)
    }

    function handleCloseFloorDialog() {
        setShowFloorDialog(false)
        setSelectedFloor(null)
    }

    function handleCloseDetailsDialog() {
        setShowDetailsDialog(false)
        setSelectedTable(null)
    }
}

export default TableManagement

