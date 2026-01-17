import { useState, useEffect } from 'react'
import { X, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Switch } from '@/components/shadcn/ui/switch'
import type { Modifier, ModifierOption } from '@/@types/menu'

type AddModifierDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (modifier: Omit<Modifier, 'id'>) => Promise<void>
    editModifier?: Modifier | null
}

const AddModifierDialog = ({
    isOpen,
    onClose,
    onSubmit,
    editModifier,
}: AddModifierDialogProps) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [required, setRequired] = useState(false)
    const [options, setOptions] = useState<Omit<ModifierOption, 'id'>[]>([
        { name: '', price: 0 },
        { name: '', price: 0 },
        { name: '', price: 0 },
    ])
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (editModifier) {
            setName(editModifier.name)
            setDescription(editModifier.description || '')
            setRequired(editModifier.required)
            setOptions(
                editModifier.options.map((opt) => ({ name: opt.name, price: opt.price }))
            )
        } else {
            setName('')
            setDescription('')
            setRequired(false)
            setOptions([
                { name: '', price: 0 },
                { name: '', price: 0 },
                { name: '', price: 0 },
            ])
        }
        setShowAdvanced(false)
    }, [editModifier, isOpen])

    const handleAddOption = () => {
        setOptions([...options, { name: '', price: 0 }])
    }

    const handleRemoveOption = (index: number) => {
        if (options.length > 1) {
            setOptions(options.filter((_, i) => i !== index))
        }
    }

    const handleOptionChange = (
        index: number,
        field: 'name' | 'price',
        value: string | number
    ) => {
        const newOptions = [...options]
        newOptions[index] = {
            ...newOptions[index],
            [field]: field === 'price' ? parseFloat(value as string) || 0 : value,
        }
        setOptions(newOptions)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || options.some((opt) => !opt.name)) return

        setIsSubmitting(true)
        try {
            await onSubmit({
                name,
                description: description || undefined,
                required,
                options: options.map((opt, index) => ({
                    id: `opt-${Date.now()}-${index}`,
                    ...opt,
                })),
            })
            onClose()
        } catch (error) {
            console.error('Error submitting modifier:', error)
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
                        {editModifier ? 'Edit Modifier' : 'Add Modifier'}
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
                    {/* Description Note */}
                    <p className="text-sm text-muted-foreground">
                        Here description of modifier will be written
                    </p>

                    {/* Options Section */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-foreground">Options</label>
                            <button
                                type="button"
                                onClick={handleAddOption}
                                className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                            >
                                <Plus size={16} />
                                Add Option
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {options.map((option, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={option.name}
                                        onChange={(e) =>
                                            handleOptionChange(index, 'name', e.target.value)
                                        }
                                        placeholder="Enter Name"
                                        className="flex-1 px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={option.price}
                                        onChange={(e) =>
                                            handleOptionChange(index, 'price', e.target.value)
                                        }
                                        placeholder="Enter Price"
                                        className="w-28 px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                    {options.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOption(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Setup */}
                    <div className="border rounded-lg">
                        <button
                            type="button"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="w-full flex items-center justify-between p-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                        >
                            <span>Advance Setup</span>
                            {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>

                        {showAdvanced && (
                            <div className="p-4 border-t space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Here description of modifier will be written
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Category
                                        </label>
                                        <select className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option>All</option>
                                        </select>
                                    </div>

                                    {/* Items */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1">
                                            Items
                                        </label>
                                        <select className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option>All</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Required Toggle */}
                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                    <span className="text-sm font-medium text-foreground">
                                        Required for Ordering
                                    </span>
                                    <Switch checked={required} onCheckedChange={setRequired} />
                                </div>
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
                            {isSubmitting ? 'Saving...' : editModifier ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddModifierDialog
