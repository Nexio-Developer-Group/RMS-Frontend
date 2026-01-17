import { Pencil, Trash2 } from 'lucide-react'
import type { Modifier } from '@/@types/menu'

type ModifierCardProps = {
    modifier: Modifier
    onEdit: (modifier: Modifier) => void
    onDelete: (id: string) => void
}

const ModifierCard = ({ modifier, onEdit, onDelete }: ModifierCardProps) => {
    return (
        <div className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-base">
                        {modifier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {modifier.description || 'No description'}
                    </p>
                </div>
                <span
                    className={`px-2 py-1 text-xs rounded-full ${modifier.required
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                >
                    {modifier.required ? 'Required' : 'Optional'}
                </span>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
                {modifier.options.slice(0, 3).map((option) => (
                    <div
                        key={option.id}
                        className="flex items-center justify-between text-sm bg-muted/50 rounded px-3 py-2"
                    >
                        <span className="text-foreground">{option.name}</span>
                        <span className="font-medium text-orange-600">
                            {option.price === 0 ? 'Free' : `+$${option.price.toFixed(2)}`}
                        </span>
                    </div>
                ))}
                {modifier.options.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                        +{modifier.options.length - 3} more options
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(modifier)}
                    className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Pencil size={16} />
                    <span>Edit</span>
                </button>
                <button
                    onClick={() => onDelete(modifier.id)}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    )
}

export default ModifierCard
