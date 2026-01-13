import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import type { AllOrderType } from '@/@types/orders'
import { cn } from '@/components/shadcn/utils'

type Props = {
    allOrderType: AllOrderType
    onAllOrderTypeChange: (type: AllOrderType) => void
    className?: string
}

const AllOrderTypeHeader = ({ allOrderType, onAllOrderTypeChange, className }: Props) => {
    return (
        <div className={cn('bg-card border-b px-4 py-3', className)}>
            <Tabs value={allOrderType} onValueChange={v => onAllOrderTypeChange(v as AllOrderType)}>
                <TabsList>
                    <TabsTrigger value="live-orders">Live Orders</TabsTrigger>
                    <TabsTrigger value="kds-setup">KDS Setup</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default AllOrderTypeHeader
