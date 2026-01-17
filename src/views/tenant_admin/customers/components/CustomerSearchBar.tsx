import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/shadcn/ui/input'
import { cn } from '@/components/shadcn/utils'

interface CustomerSearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

const CustomerSearchBar = ({
    value,
    onChange,
    placeholder = 'Search Anything',
    className,
}: CustomerSearchBarProps) => {
    return (
        <div className={cn('flex items-center gap-2 p-4 bg-card', className)}>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-10 bg-background"
                />
            </div>
            <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            </button>
        </div>
    )
}

export default CustomerSearchBar
