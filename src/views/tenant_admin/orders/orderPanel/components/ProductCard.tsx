import { Card } from '@/components/shadcn/ui/card'
import type { MenuItem } from '@/@types/pos'

type ProductCardProps = {
    item: MenuItem
    onSelect: (item: MenuItem) => void
}

const ProductCard = ({ item, onSelect }: ProductCardProps) => {
    return (
        <div
            onClick={() => onSelect(item)}
            className="cursor-pointer bg-card rounded hover:shadow-md transition-all duration-200 overflow-hidden border"
        >
            <div className="aspect-square bg-linear-to-br from-teal-100 to-teal-200 p-3 flex items-center justify-center">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-full h-full"
                    />
                ) : (
                    <span className="text-4xl md:text-5xl lg:text-6xl">🍕</span>
                )}
            </div>
            <div className="p-3 md:p-4">
                <h3 className="font-semibold mb-1 text-sm xl:text-xs 2xl:text-base line-clamp-2">
                    {item.name}
                </h3>
                <p className="text-base xl:text-xs 2xl:text-lg font-bold text-orange-600">
                    ${item.price}
                </p>
            </div>
        </div>
    )
}

export default ProductCard
