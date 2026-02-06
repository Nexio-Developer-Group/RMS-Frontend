import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { TableStatus } from '@/services/tenant_admin/types'
import type { TableModel, FloorModel, CreateTableInput } from '@/services/tenant_admin/table_management/types'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'

type AddTableDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (input: CreateTableInput) => Promise<void>
    floors: FloorModel[]
    editTable?: TableModel | null
    onDelete?: (id: string) => Promise<void>
}

const AddTableDialog = ({
    isOpen,
    onClose,
    onSubmit,
    floors,
    editTable,
    onDelete,
}: AddTableDialogProps) => {
    const [number, setNumber] = useState('')
    const [capacity, setCapacity] = useState('4')
    const [floorId, setFloorId] = useState('')
    const [status, setStatus] = useState<TableStatus>('available')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (editTable) {
            setNumber(editTable.number)
            setCapacity(editTable.capacity.toString())
            setFloorId(editTable.floorId)
            setStatus(editTable.status)
        } else {
            setNumber('')
            setCapacity('4')
            setFloorId(floors[0]?.id || '')
            setStatus('available')
        }
    }, [editTable, floors, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!number || !floorId) return

        setIsSubmitting(true)
        try {
            await onSubmit({
                number,
                name: `${number}`,
                floorId,
                capacity: parseInt(capacity),
                status,
                enabled: true,
            })
            onClose()
        } catch (error) {
            console.error('Error submitting table:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!editTable || !onDelete) return
        setIsSubmitting(true)
        try {
            await onDelete(editTable.id)
            onClose()
        } catch (error) {
            console.error('Error deleting table:', error)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-lg bg-card">
                <DialogHeader>
                    <DialogTitle>
                        {editTable ? 'Edit Table' : 'Add Table'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="table-number" className="text-sm font-semibold">Table Number or Name *</Label>
                            <Input
                                id="table-number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="Table_12"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label htmlFor="capacity" className="text-sm font-semibold">Capacity (Seats)</Label>
                            <Input
                                id="capacity"
                                type="number"
                                min="1"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                                placeholder="4"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-4">
                            <Label className="text-sm font-semibold">Floor *</Label>
                            <Select
                                value={floorId}
                                onValueChange={setFloorId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a floor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {floors.map((floor) => (
                                        <SelectItem key={floor.id} value={floor.id}>
                                            {floor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-sm font-semibold">Status</Label>
                            <Select
                                value={status}
                                onValueChange={(value) => setStatus(value as TableStatus)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="occupied">Occupied</SelectItem>
                                    <SelectItem value="reserved">Reserved</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="flex sm:justify-between items-center gap-2">
                        {editTable && onDelete && (
                            <div className="flex-1 flex justify-start">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                >
                                    Delete Table
                                </Button>
                            </div>
                        )}
                        <div className="flex items-center gap-2 ml-auto">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex-1 sm:flex-none"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 sm:flex-none"
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddTableDialog
