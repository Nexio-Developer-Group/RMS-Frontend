import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { CustomerFilterTab } from '@/@types/customers'
import { cn } from '@/components/shadcn/utils'

interface CustomerFilterTabsProps {
    activeTab: CustomerFilterTab
    onTabChange: (tab: CustomerFilterTab) => void
    className?: string
}

const CustomerFilterTabs = ({ activeTab, onTabChange, className }: CustomerFilterTabsProps) => {
    return (
        <div className={cn('bg-card border-b', className)}>
            <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as CustomerFilterTab)}>
                <TabsList className="h-auto p-0 bg-transparent">
                    <TabsTrigger
                        value="customer-list"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                        Customer List
                    </TabsTrigger>
                    <TabsTrigger
                        value="campaign"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                        Campaign
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default CustomerFilterTabs
