import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import type { OrderType } from '@/@types/pos'
import { cn } from '@/components/shadcn/utils'

type OrderTypeHeaderProps = {
    orderType: OrderType
    onOrderTypeChange: (type: OrderType) => void
    className?: string
}

const OrderTypeHeader = ({ orderType, onOrderTypeChange, className }: OrderTypeHeaderProps) => {
    return (
        <div className={cn("bg-card border-b px-4 md:px-3 py-3", className)}>
            <Tabs value={orderType} onValueChange={(value) => onOrderTypeChange(value as OrderType)}>
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                    <TabsTrigger value="dine-in" className="text-xs md:text-sm">
                        Dine-in
                    </TabsTrigger>
                    <TabsTrigger value="takeaway" className="text-xs md:text-sm">
                        Takeaway
                    </TabsTrigger>
                    <TabsTrigger value="delivery" className="text-xs md:text-sm">
                        Delivery
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default OrderTypeHeader
