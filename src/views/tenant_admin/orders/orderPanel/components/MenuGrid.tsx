import type { MenuItem } from '@/@types/pos'
import ProductCard from './ProductCard'

type MenuGridProps = {
    items: MenuItem[]
    onItemSelect: (item: MenuItem) => void
}

const MenuGrid = ({ items, onItemSelect }: MenuGridProps) => {
    if (items.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 min-w-full text-slate-400">
                <div className="text-center w-full">
                    <p className="text-lg font-medium">No items found</p>
                    <p className="text-sm mt-1">Try searching for something else</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 overflow-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4">
            {items.map((item) => (
                <ProductCard key={item.id} item={item} onSelect={onItemSelect} />
            ))}
        </div>
    )
}

export default MenuGrid
