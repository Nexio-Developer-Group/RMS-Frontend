import { Pencil } from 'lucide-react'
import { Switch } from '@/components/shadcn/ui/switch'
import type { Combo } from '@/@types/menu'

interface ComboCardProps {
    combo: Combo
    onEdit: (combo: Combo) => void
    onToggleAvailability: (id: string | number) => void
}

const ComboCard = ({ combo, onEdit, onToggleAvailability }: ComboCardProps) => {
    return (
        <div className="bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-border overflow-hidden shadow-sm">

            {/* Header */}
            <div className="px-5 py-4 bg-slate-200 dark:bg-slate-900/70 border-b border-gray-200 dark:border-border">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-blue-600 leading-tight">
                            {combo.name}
                        </h3>
                        <p className="text-sm text-teal-600 mt-1">
                            {combo.description || 'Margherita Pizza'}
                        </p>
                    </div>

                    <span className="text-lg font-bold text-orange-600">
                        ${combo.price}
                    </span>
                </div>
            </div>

            {/* Items List */}
            <div className='border-b'>
                {combo.items.map((item, index) => (
                    <div
                        key={index}
                        className="px-5 py-2"
                    >
                        {/* Row 1: Name + Price */}
                        <div className="flex items-center justify-between">
                            <p className="text-base font-medium text-gray-900 dark:text-foreground">
                                {item.itemName}
                            </p>
                            <span className="text-base font-semibold text-orange-600">
                                ${combo.price}
                            </span>
                        </div>

                        {/* Row 2: Size */}
                        <p className="text-sm text-teal-600 mt-1">
                            {item.size}
                        </p>
                    </div>
                ))}
            </div>


            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-card">
                <div className="flex items-center gap-3">
                    <Switch
                        checked={combo.available}
                        onCheckedChange={() => onToggleAvailability(combo.id)}
                        className="data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-foreground">
                        Available
                    </span>
                </div>

                <button
                    onClick={() => onEdit(combo)}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                    <Pencil className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default ComboCard