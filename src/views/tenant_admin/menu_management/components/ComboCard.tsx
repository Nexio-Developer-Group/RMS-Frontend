import { Pencil } from 'lucide-react'
import { Switch } from '@/components/shadcn/ui/switch'
import type { Combo } from '@/@types/menu'

type ComboCardProps = {
    combo: Combo
    onEdit: (combo: Combo) => void
    onToggleAvailability: (id: string) => void
}

const ComboCard = ({ combo, onEdit, onToggleAvailability }: ComboCardProps) => {
    return (
        <div className="bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
            {/* Header with Price */}
            <div className="p-4 border-b">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-base">
                            {combo.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {combo.description || 'Margherita Pizza'}
                        </p>
                    </div>
                    <span className="text-lg font-bold text-orange-600">${combo.price}</span>
                </div>
            </div>

            {/* Items List */}
            <div className="p-4 space-y-2">
                {combo.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-sm bg-muted/50 rounded px-3 py-2"
                    >
                        <span className="text-foreground">{item.itemName}</span>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-teal-600">{item.size}</span>
                            <span>x{item.quantity}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer with Actions */}
            <div className="p-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {combo.available ? 'Available' : 'Unavailable'}
                    </span>
                    <Switch
                        checked={combo.available}
                        onCheckedChange={() => onToggleAvailability(combo.id)}
                    />
                </div>

                <button
                    onClick={() => onEdit(combo)}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Pencil size={16} />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    )
}

export default ComboCard
