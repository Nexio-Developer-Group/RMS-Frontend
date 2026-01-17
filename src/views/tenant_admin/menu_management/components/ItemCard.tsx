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
        <div className="bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Section */}
            <div className="aspect-square bg-linear-to-br from-teal-100 to-teal-200 p-4 flex items-center justify-center">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-full h-full"
                    />
                ) : (
                    <span className="text-5xl">🍕</span>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-foreground text-base line-clamp-1">
                        {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.categoryName}</p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">${item.price}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                            {item.available ? 'Available' : 'Unavailable'}
                        </span>
                        <Switch
                            checked={item.available}
                            onCheckedChange={() => onToggleAvailability(item.id)}
                        />
                    </div>
                </div>

                {/* Edit Button */}
                <button
                    onClick={() => onEdit(item)}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <Pencil size={16} />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    )
}

export default ItemCard
