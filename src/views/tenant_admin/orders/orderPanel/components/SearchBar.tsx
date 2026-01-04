import { Search } from 'lucide-react'
import { Input } from '@/components/shadcn/ui/input'

type SearchBarProps = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Search Anything' }: SearchBarProps) => {
    return (
        <div className="bg-card w-full px-2 py-2 border-b">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="pl-9 md:pl-10 h-10 md:h-11 text-sm md:text-base"
                />
            </div>
        </div>
    )
}

export default SearchBar
