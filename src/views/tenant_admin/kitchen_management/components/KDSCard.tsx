import type { Order } from '@/@types/kds'
import { KDSItemRow } from '../components/KDSItemRow'
import { cn } from '@/components/shadcn/utils'
import { Badge } from '@/components/shadcn/ui/badge'
import { CardHeader } from '@/components/shadcn/ui/card'

type KDSCardProps = {
    order: Order
    onApproveItem: (orderId: string, itemId: string) => void
    onCompleteOrder: (orderId: string) => void
}

const KDSCard = ({ order, onApproveItem, onCompleteOrder }: KDSCardProps) => {
    return (
        <div className="rounded-xl border bg-card shadow-sm flex flex-col">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-teal-50 px-4 py-3 rounded-t-xl dark:bg-card">
                {/* Left */}
                <div className="flex items-center gap-2 min-w-0">
                    <Badge className='w-6 h-6 flex items-center justify-center'>X</Badge>
                    <span className="text-lg font-semibold text-foreground">
                        {order.orderNumber}
                    </span>

                    <Badge
                        variant="outline"
                        className="rounded-full text-sm font-semibold "
                    >
                        {order.type}
                    </Badge>

                    <Badge
                        variant="outline"
                        className="rounded-full text-sm font-semibold"
                    >
                        {order.table}
                    </Badge>
                </div>

                {/* Right */}
                <Badge
                    className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700"
                >
                    {order.time}
                </Badge>
            </CardHeader>

            {/* Items */}
            <div className="px-4 py-3 flex-1">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                    Order Items
                </p>

                <div className="divide-y">
                    {order.items.map((item) => (
                        <KDSItemRow
                            key={item.id}
                            item={item}
                            onApprove={() => onApproveItem(order.id, item.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t">
                <button
                    onClick={() => onCompleteOrder(order.id)}
                    className={cn(
                        'w-full rounded-md border py-2 text-sm font-medium',
                        'text-green-600 border-green-300 hover:bg-green-50'
                    )}
                >
                    ✓ Make as Completed
                </button>
            </div>
        </div>
    )
}

export default KDSCard
