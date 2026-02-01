import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { cn } from '@/components/shadcn/utils'

export type ModuleTab = {
    label: string
    value: string
}

type Props<T extends string> = {
    value: T
    onChange: (value: T) => void
    tabs: ModuleTab[]
    className?: string
}

const TabsHeader = <T extends string>({
    value,
    onChange,
    tabs,
    className,
}: Props<T>) => {
    return (
        <div className={cn('bg-card', className)}>
            <Tabs value={value} onValueChange={(v) => onChange(v as T)}>
                <TabsList>
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    )
}

export default TabsHeader
