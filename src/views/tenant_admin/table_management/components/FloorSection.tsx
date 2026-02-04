import { MoreVertical } from 'lucide-react'
import { FloorModel, TableModel } from '@/services/tenant_admin/table_management/types'
import TableCard from './TableCard'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { Edit2, Trash2 } from 'lucide-react'

type FloorSectionProps = {
    floor: FloorModel
    tables: TableModel[]
    onEditTable: (table: TableModel) => void
    onToggleTableStatus: (id: string) => void
    onTableClick: (table: TableModel) => void
    onEditFloor?: (floor: FloorModel) => void
    onDeleteFloor?: (id: string) => void
    onDeleteTable: (id: string) => void
}

const FloorSection = ({
    floor,
    tables,
    onEditTable,
    onToggleTableStatus,
    onTableClick,
    onEditFloor,
    onDeleteFloor,
    onDeleteTable,
}: FloorSectionProps) => {
    return (
        <div className="mb-8">
            {/* Floor Header */}
            <div className="flex items-center justify-between mb-4 px-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-foreground">{floor.name}</h2>
                    <Badge variant="outline" className="font-normal">
                        {floor.tableCount} Tables
                    </Badge>
                    <Badge
                        variant={floor.isActive ? 'default' : 'secondary'}
                        className={floor.isActive ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                    >
                        {floor.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
                {(onEditFloor || onDeleteFloor) && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 border border-border"
                            >
                                <MoreVertical size={20} className="text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {onEditFloor && (
                                <DropdownMenuItem onClick={() => onEditFloor(floor)}>
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    <span>Edit Floor</span>
                                </DropdownMenuItem>
                            )}
                            {onDeleteFloor && (
                                <DropdownMenuItem
                                    onClick={() => onDeleteFloor(floor.id)}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete Floor</span>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-3 2xl:grid-cols-4 gap-4 px-4">
                {tables.map((table) => (
                    <TableCard
                        key={table.id}
                        table={table}
                        onEdit={onEditTable}
                        onDelete={onDeleteTable}
                        onToggleStatus={onToggleTableStatus}
                        onClick={onTableClick}
                    />
                ))}
            </div>
        </div>
    )
}

export default FloorSection
