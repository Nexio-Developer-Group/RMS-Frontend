import { Edit2, Trash2 } from 'lucide-react'
import { TableModel } from '@/services/tenant_admin/table_management/types'
import { Switch } from '@/components/shadcn/ui/switch'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import React from 'react'

type TableCardProps = {
    table: TableModel
    onEdit: (table: TableModel) => void
    onDelete: (id: string) => void
    onToggleStatus: (id: string) => void
    onClick: (table: TableModel) => void
}

const statusLabel = (status: TableModel['status']) => {
    switch (status) {
        case 'available':
            return { text: 'Available', classes: 'bg-green-100 text-green-700' }
        case 'occupied':
            return { text: 'Occupied', classes: 'bg-red-100 text-red-700' }
        case 'reserved':
            return { text: 'Reserved', classes: 'bg-yellow-100 text-yellow-700' }
        case 'inactive':
        default:
            return { text: 'Inactive', classes: 'bg-muted text-muted-foreground' }
    }
}

const TableCard = ({ table, onEdit, onDelete, onToggleStatus, onClick }: TableCardProps) => {
    const status = statusLabel(table.status)

    const handleCardClick = () => {
        onClick(table)
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEdit(table)
    }

    const handleToggleChange = (checked: boolean) => {
        // call parent with id — parent will perform fetch-before-mutate as needed
        onToggleStatus(table.id)
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDelete(table.id)
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick()
            }}
            className="w-full rounded-lg border overflow-hidden shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
        >
            {/* Top header (light background) */}
            <div className="flex items-center justify-between bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* small square number */}
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-semibold text-sm">
                        {table.number}
                    </div>

                    <div className="min-w-0">
                        <p className="text-xl font-semibold text-blue-600 truncate">{table.name}</p>
                        {/* optional small floor name subtitle — uncomment if needed */}
                        {/* <p className="text-xs text-muted-foreground truncate">{table.floorName}</p> */}
                    </div>
                </div>

                {/* Pill status */}
                <div>
                    <Badge
                        variant="secondary"
                        className={`px-3 py-1 rounded-full text-xs capitalize font-medium ${status.classes}`}
                    >
                        {status.text}
                    </Badge>
                </div>
            </div>

            {/* Bottom action bar (dark) */}
            <div className="flex items-center justify-between px-4 py-3 bg-card">
                <div
                    className="flex items-center gap-3"
                    onClick={(e) => {
                        // prevent outer onClick when interacting with controls
                        e.stopPropagation()
                    }}
                >
                    <Switch
                        id={`table-enabled-${table.id}`}
                        checked={table.enabled}
                        onCheckedChange={handleToggleChange}
                    />
                    <span className="text-sm text-foreground select-none">Enabled</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleEditClick}
                        aria-label={`Edit ${table.name}`}
                        className="h-8 w-8 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                    >
                        <Edit2 size={16} />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={handleDeleteClick}
                        aria-label={`Delete ${table.name}`}
                        className="h-8 w-8 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TableCard
