import { cn } from '@/components/shadcn/utils'
import type { MenuCategory } from '@/@types/pos'

type CategorySidebarProps = {
    categories: MenuCategory[]
    selectedCategory: string
    onCategorySelect: (categoryId: string) => void
}

const CategorySidebar = ({
    categories,
    selectedCategory,
    onCategorySelect,
}: CategorySidebarProps) => {
    return (
        <div className="hidden md:flex md:w-36 lg:w-40 xl:w-24 2xl:w-24 shrink-0 bg-card border-r flex-col items-center overflow-y-auto">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    className={cn(
                        'w-full p-6 flex flex-col items-center border-b justify-center text-xs gap-1 transition-all duration-200',
                        selectedCategory === category.id
                            ? 'bg-orange-50 dark:bg-gray-950 text-orange-600 dark:text-orange-400 border-r-2 border-r-orange-600 dark:border-r-orange-400'
                            : 'bg-card hover:bg-slate-50 dark:hover:bg-gray-900 text-slate-700 dark:text-slate-400',
                    )}
                >
                    <img src={category.icon} alt={category.name} className="text-xl lg:text-2xl" />
                    <span className="font-medium text-[10px] lg:text-xs">
                        {category.name}
                    </span>
                </button>
            ))}
        </div>
    )
}

export default CategorySidebar
