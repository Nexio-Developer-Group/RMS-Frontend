import { Pencil } from 'lucide-react'
import { Switch } from '@/components/shadcn/ui/switch'
import type { MenuItem } from '@/@types/menu'

type ItemCardProps = {
    item: MenuItem
    onEdit: (item: MenuItem) => void
    onToggleAvailability: (id: string) => void
}

const ItemCard = ({ item, onEdit, onToggleAvailability }: ItemCardProps) => {
    return (
        <div className="bg-card rounded-xl border overflow-hidden hover:shadow-md transition-shadow w-full max-w-md">

            {/* Header Background */}
            <div className="relative h-35 bg-teal-100 flex items-center justify-center overflow-hidden">
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-35 w-full object-contain drop-shadow-md z-10"
                    />
                )}
            </div>

            {/* Content */}
            <div className="p-4 pt-4 space-y-3">

                {/* Title + Price */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg text-blue-700 leading-tight">
                            {item.name}
                        </h3>
                        <p className="text-sm text-teal-600">{item.categoryName}</p>
                    </div>

                    <span className="text-lg font-bold text-orange-600">
                        ${item.price}
                    </span>
                </div>

                <hr className="border-border" />

                {/* Availability Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={item.available}
                            onCheckedChange={() => onToggleAvailability(item.id)}
                            className="data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100"
                        />
                        <span className="text-sm text-foreground">
                            {item.available ? 'Available' : 'Unavailable'}
                        </span>
                    </div>

                    {/* Edit Icon Button */}
                    <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                    >
                        <Pencil size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard
