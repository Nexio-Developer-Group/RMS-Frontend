import { Order } from '@/@types/orders'
import { KDSItemRow } from '../components/KDSItemRow'
import { cn } from '@/components/shadcn/utils'
import { Badge } from '@/components/shadcn/ui/badge'
import { CardHeader } from '@/components/shadcn/ui/card'
import { Check, Expand } from 'lucide-react'

type KDSCardProps = {
    order: Order
    onApproveItem: (orderId: string, itemId: string) => void
    onCompleteOrder: (orderId: string) => void
}

const KDSCard = ({ order, onApproveItem, onCompleteOrder }: KDSCardProps) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm flex flex-col w-full overflow-hidden border-teal-300 dark:border-blue-800">
            {/* Header */}
            <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 border-b bg-teal-50 dark:bg-blue-950/70 px-3 sm:px-4 py-3 rounded-t-xl">
                {/* LEFT SIDE (WRAPS BUT STAYS ALIGNED) */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                    <div className="h-8 w-8 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                        <Expand className="w-4 h-4 text-teal-600" />
                    </div>

                    <span className="text-lg font-semibold text-foreground truncate max-w-35 sm:max-w-none">
                        {order.orderNumber}
                    </span>

                    {/* GROUPED: Dine In + Table (still never splits) */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Badge
                            variant="outline"
                            className="rounded-full text-xs sm:text-sm font-semibold"
                        >
                            {order.type}
                        </Badge>

                        <Badge
                            variant="outline"
                            className="rounded-full text-xs sm:text-sm font-semibold"
                        >
                            {order.table}
                        </Badge>
                    </div>
                </div>

                {/* RIGHT SIDE (STAYS ALIGNED EVEN WHEN LEFT WRAPS) */}
                <div className="flex items-center self-start sm:self-center shrink-0">
                    <Badge variant='secondary' className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                        {order.time}
                    </Badge>
                </div>
            </CardHeader>

            {/* Items */}
            <div className="px-3 sm:px-4 py-3 flex-1 min-h-0">
                <p className="text-md pt-1 text-teal-600">
                    Order Items
                </p>

                <div className="divide-y">
                    {order.items.map((item: Order['items'][number], index: number) => (
                        <KDSItemRow
                            key={item.id || `item-${index}`}
                            item={item}
                            onApprove={() => onApproveItem(String(order.id), item.id || String(index))}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-teal-50 px-3 sm:px-4 py-3 border-t dark:bg-blue-950/70">
                <button
                    onClick={() => onCompleteOrder(String(order.id))}
                    className={cn(
                        'w-full rounded-md bg-card border py-2.5 sm:py-2 text-sm font-medium',
                        'text-green-600 border-green-300 hover:bg-green-200'
                    )}
                >
                    <span className="flex items-center justify-center">
                        <Check className="w-4 h-4" />
                        <span className="ml-1">Make as Completed</span>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default KDSCard
