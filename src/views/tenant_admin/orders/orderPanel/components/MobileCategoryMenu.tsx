import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import type { MenuCategory } from '@/@types/pos'

type MobileCategoryMenuProps = {
    categories: MenuCategory[]
    selectedCategory: string
    onCategorySelect: (categoryId: string) => void
}

const MobileCategoryMenu = ({
    categories,
    selectedCategory,
    onCategorySelect,
}: MobileCategoryMenuProps) => {
    const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

    return (
        <div className="md:hidden bg-card border-b px-4 py-3">
            <Select value={selectedCategory} onValueChange={onCategorySelect}>
                <SelectTrigger className="w-full">
                    <SelectValue>
                        <div className="flex items-center gap-2">
                            <span>{selectedCategoryData?.icon}</span>
                            <span>{selectedCategoryData?.name}</span>
                        </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default MobileCategoryMenu
