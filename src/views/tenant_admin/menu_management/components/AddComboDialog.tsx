import { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Checkbox } from '@/components/shadcn/ui/checkbox'
import type { Combo, MenuItem } from '@/@types/menu'

type AddComboDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (combo: Omit<Combo, 'id'>) => Promise<void>
    menuItems: MenuItem[]
    editCombo?: Combo | null
}

const AddComboDialog = ({
    isOpen,
    onClose,
    onSubmit,
    menuItems,
    editCombo,
}: AddComboDialogProps) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [useTimeSchedule, setUseTimeSchedule] = useState(false)
    const [specificMonth, setSpecificMonth] = useState('All')
    const [specificDay, setSpecificDay] = useState('All')
    const [fromTime, setFromTime] = useState('12:00 PM')
    const [toTime, setToTime] = useState('12:00 AM')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (editCombo) {
            setName(editCombo.name)
            setPrice(editCombo.price.toString())
            setSelectedItems(editCombo.items.map((item) => item.itemId))
            setShowAdvanced(false)
            setUseTimeSchedule(false)
        } else {
            setName('')
            setPrice('')
            setSelectedItems([])
            setShowAdvanced(false)
            setUseTimeSchedule(false)
            setSpecificMonth('All')
            setSpecificDay('All')
            setFromTime('12:00 PM')
            setToTime('12:00 AM')
        }
    }, [editCombo, isOpen])

    const handleItemToggle = (itemId: string) => {
        setSelectedItems((prev) =>
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !price || selectedItems.length === 0) return

        setIsSubmitting(true)
        try {
            const comboItems = selectedItems.map((itemId) => {
                const item = menuItems.find((mi) => mi.id === itemId)
                return {
                    itemId,
                    itemName: item?.name || 'Classic Burger',
                    size: 'Small',
                    quantity: 3,
                }
            })

            await onSubmit({
                name,
                price: parseFloat(price),
                description: 'Margherita Pizza',
                items: comboItems,
                available: editCombo?.available ?? true,
                schedule: useTimeSchedule
                    ? {
                        specificMonth: specificMonth !== 'All' ? specificMonth : undefined,
                        specificDay: specificDay !== 'All' ? specificDay : undefined,
                        fromTime,
                        toTime,
                    }
                    : undefined,
            })
            onClose()
        } catch (error) {
            console.error('Error submitting combo:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-card z-10">
                    <h2 className="text-lg font-semibold text-foreground">
                        {editCombo ? 'Edit Combo' : 'Add Combo'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Name and Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter"
                                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter"
                                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Add Items */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Add Items
                        </label>
                        <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                            {menuItems.slice(0, 5).map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded"
                                >
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={() => handleItemToggle(item.id)}
                                    />
                                    <div className="flex items-center gap-2 flex-1">
                                        <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs">
                                            A
                                        </span>
                                        <span className="text-sm text-foreground">{item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectedItems.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-2">
                                {selectedItems.length} item(s) selected
                            </p>
                        )}
                    </div>

                    {/* Advanced Schedule */}
                    <div className="border rounded-lg">
                        <button
                            type="button"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="w-full flex items-center justify-between p-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                        >
                            <span>Advance Schedule</span>
                            {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {showAdvanced && (
                            <div className="p-4 border-t space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Schedule your combo in specific days and time
                                </p>

                                {/* Month and Day */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Specific Month
                                        </label>
                                        <select
                                            value={specificMonth}
                                            onChange={(e) => setSpecificMonth(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option>All</option>
                                            <option>January</option>
                                            <option>February</option>
                                            <option>March</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Specific Day
                                        </label>
                                        <select
                                            value={specificDay}
                                            onChange={(e) => setSpecificDay(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option>All</option>
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Time Schedule Checkbox */}
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={useTimeSchedule}
                                        onCheckedChange={(checked) =>
                                            setUseTimeSchedule(checked as boolean)
                                        }
                                    />
                                    <label className="text-sm text-foreground">
                                        If you want specific time to schedule
                                    </label>
                                </div>

                                {/* Time Range */}
                                {useTimeSchedule && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">
                                                From *
                                            </label>
                                            <select
                                                value={fromTime}
                                                onChange={(e) => setFromTime(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option>12:00 PM</option>
                                                <option>1:00 PM</option>
                                                <option>2:00 PM</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-1">
                                                To *
                                            </label>
                                            <select
                                                value={toTime}
                                                onChange={(e) => setToTime(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option>12:00 AM</option>
                                                <option>1:00 AM</option>
                                                <option>2:00 AM</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-4 border rounded-lg text-foreground hover:bg-muted transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : editCombo ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddComboDialog
