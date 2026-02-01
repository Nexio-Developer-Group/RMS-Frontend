import { Pencil, Trash2 } from 'lucide-react'
import type { Modifier } from '@/@types/menu'

type ModifierCardProps = {
    modifier: Modifier
    onEdit: (modifier: Modifier) => void
    onDelete: (id: string) => void
}

const ModifierCard = ({ modifier, onEdit, onDelete }: ModifierCardProps) => {
    const maxVisibleOptions = 3

    return (
        <div className="bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-border shadow-sm overflow-hidden w-full max-w-md">

            {/* Header */}
            <div className="px-5 py-4 bg-slate-200 dark:bg-slate-900/70 border-b border-gray-200 dark:border-border">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 leading-tight">
                            {modifier.name}
                        </h3>
                        <p className="text-sm text-teal-600 mt-1">Size</p>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full dark:text-foreground border border-gray-300 dark:border-border">
                        Required
                    </span>
                </div>
            </div>

            {/* Options List */}
            <div className='border-b'>
                {modifier.options.slice(0, maxVisibleOptions).map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center justify-between px-5 py-2 text-base"
                    >
                        <span className="text-gray-900 dark:text-foreground font-medium">
                            {option.name}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-foreground">
                            {option.price === 0 ? 'Free' : `+$${option.price.toFixed(2)}`}
                        </span>
                    </div>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between px-4 py-4">
                <button
                    onClick={() => onDelete(modifier.id)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                    <Trash2 className="w-5 h-5" />
                </button>

                <button
                    onClick={() => onEdit(modifier)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                    <Pencil className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ModifierCard
