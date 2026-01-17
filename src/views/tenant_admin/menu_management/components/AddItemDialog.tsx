import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { MenuItem, MenuCategory } from '@/@types/menu'

type AddItemDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (item: Omit<MenuItem, 'id'>) => Promise<void>
    categories: MenuCategory[]
    editItem?: MenuItem | null
}

const AddItemDialog = ({
    isOpen,
    onClose,
    onSubmit,
    categories,
    editItem,
}: AddItemDialogProps) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [image, setImage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (editItem) {
            setName(editItem.name)
            setPrice(editItem.price.toString())
            setCategoryId(editItem.categoryId)
            setImage(editItem.image || null)
        } else {
            setName('')
            setPrice('')
            setCategoryId(categories[0]?.id || '')
            setImage(null)
        }
    }, [editItem, categories, isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !price || !categoryId) return

        setIsSubmitting(true)
        try {
            const categoryName = categories.find((c) => c.id === categoryId)?.name || ''
            await onSubmit({
                name,
                price: parseFloat(price),
                categoryId,
                categoryName,
                available: editItem?.available ?? true,
                image: image || undefined,
            })
            onClose()
        } catch (error) {
            console.error('Error submitting item:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-card">
                    <h2 className="text-lg font-semibold text-foreground">
                        {editItem ? 'Edit Menu Item' : 'Add Menu Item'}
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
                    {/* Name */}
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

                    {/* Price */}
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

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Category *
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Upload Image (Optional)
                        </label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <div className="text-blue-500 mb-2">
                                <svg
                                    className="mx-auto h-12 w-12"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Drag your file(s) or{' '}
                                <label className="text-blue-500 cursor-pointer">
                                    browse
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                // In a real app, you'd upload this to a server
                                                setImage('/img/menu/pizza.jpg')
                                            }
                                        }}
                                    />
                                </label>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Max 10 MB files are allowed
                            </p>
                        </div>
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
                            {isSubmitting ? 'Saving...' : editItem ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItemDialog
