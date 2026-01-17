import { Edit2 } from 'lucide-react'
import { Table } from '@/@types/table'
import { Switch } from '@/components/shadcn/ui/switch'

type TableCardProps = {
    table: Table
    onEdit: (table: Table) => void
    onToggleStatus: (id: string) => void
    onClick: (table: Table) => void
}

const TableCard = ({ table, onEdit, onToggleStatus, onClick }: TableCardProps) => {
    const getStatusColor = () => {
        switch (table.status) {
            case 'available':
                return 'bg-green-100 text-green-700'
            case 'occupied':
                return 'bg-red-100 text-red-700'
            case 'reserved':
                return 'bg-yellow-100 text-yellow-700'
            case 'inactive':
                return 'bg-gray-100 text-gray-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEdit(table)
    }

    const handleToggleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div
            className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onClick(table)}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground font-semibold">
                        {table.number}
                    </div>
                    <div>
                        <p className="font-medium text-blue-600">
                            {table.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{table.floorName}</p>
                    </div>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor()}`}
                >
                    {table.status}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2" onClick={handleToggleClick}>
                    <Switch
                        checked={table.enabled}
                        onCheckedChange={() => onToggleStatus(table.id)}
                    />
                    <span className="text-sm text-muted-foreground">Enabled</span>
                </div>
                <button
                    onClick={handleEditClick}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                    <Edit2 size={16} />
                </button>
            </div>
        </div>
    )
}

export default TableCard
