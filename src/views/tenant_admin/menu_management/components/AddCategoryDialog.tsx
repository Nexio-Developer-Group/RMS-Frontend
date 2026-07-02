import { useState } from 'react'
import { X } from 'lucide-react'

type AddCategoryDialogProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (name: string) => Promise<void>
}

const AddCategoryDialog = ({ isOpen, onClose, onSubmit }: AddCategoryDialogProps) => {
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return
        setIsSubmitting(true)
        setError(null)
        try {
            await onSubmit(name.trim())
            setName('')
            onClose()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create category')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setName('')
        setError(null)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-card rounded-lg w-full max-w-sm">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-foreground">Create Category</h2>
                    <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Starters, Main Course"
                            className="w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            autoFocus
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-2 px-4 border rounded-lg text-foreground hover:bg-muted transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                            disabled={isSubmitting || !name.trim()}
                        >
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategoryDialog
