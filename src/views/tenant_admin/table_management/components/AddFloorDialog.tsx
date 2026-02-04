import { useState, useEffect } from 'react'
import { useCreateFloor, useUpdateFloor } from '@/hooks/useTable'
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
import type { FloorModel } from '@/services/tenant_admin/table_management/types'

type AddFloorDialogProps = {
    isOpen: boolean
    onClose: () => void
    onFloorCreated?: (floorId: string) => void
    editFloor?: FloorModel | null
    onDelete?: (id: string) => Promise<void>
}

const AddFloorDialog = ({
    isOpen,
    onClose,
    onFloorCreated,
    editFloor,
    onDelete,
}: AddFloorDialogProps) => {
    const [floorName, setFloorName] = useState('')
    const createFloorMutation = useCreateFloor()
    const updateFloorMutation = useUpdateFloor()

    const isPending = createFloorMutation.isPending || updateFloorMutation.isPending

    useEffect(() => {
        if (editFloor) {
            setFloorName(editFloor.name)
        } else {
            setFloorName('')
        }
    }, [editFloor, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!floorName.trim()) return

        try {
            if (editFloor) {
                await updateFloorMutation.mutateAsync({
                    id: editFloor.id,
                    name: floorName.trim()
                })
            } else {
                const result = await createFloorMutation.mutateAsync({
                    name: floorName.trim()
                })

                if (result?.floor_id) {
                    onFloorCreated?.(result.floor_id)
                }
            }

            onClose()
        } catch (error) {
            console.error('Error saving floor:', error)
        }
    }

    const handleDelete = async () => {
        if (!editFloor || !onDelete) return
        try {
            await onDelete(editFloor.id)
            onClose()
        } catch (error) {
            console.error('Error deleting floor:', error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-card">
                <DialogHeader>
                    <DialogTitle>{editFloor ? 'Edit Floor' : 'Add New Floor'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="floor-name" className="text-sm font-semibold">Floor Name *</Label>
                        <Input
                            id="floor-name"
                            value={floorName}
                            onChange={(e) => setFloorName(e.target.value)}
                            placeholder="e.g., Ground Floor, First Floor"
                            autoFocus
                            required
                        />
                    </div>

                    <DialogFooter className="flex sm:justify-between items-center gap-2">
                        {editFloor && onDelete && (
                            <div className="flex-1 flex justify-start">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={handleDelete}
                                    disabled={isPending}
                                >
                                    Delete Floor
                                </Button>
                            </div>
                        )}
                        <div className="flex items-center gap-2 ml-auto">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isPending}
                                className="flex-1 sm:flex-none"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={!floorName.trim() || isPending}
                                className="flex-1 sm:flex-none"
                            >
                                {isPending ? 'Saving...' : editFloor ? 'Update Floor' : 'Create Floor'}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddFloorDialog

