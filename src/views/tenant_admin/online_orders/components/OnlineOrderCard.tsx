import { OnlineOrder } from '@/@types/onlineorder'
import { Badge } from '@/components/shadcn/ui/badge'
import { cn } from '@/components/shadcn/utils'

interface OnlineOrderCardProps {
    order: OnlineOrder
    onClick: () => void
}

const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'zomato':
            return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
        case 'swiggy':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
        case 'ubereats':
            return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        default:
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
    }
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
        case 'accepted':
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
        case 'preparing':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
        case 'completed':
            return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        case 'cancelled':
            return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
}

const OnlineOrderCard = ({ order, onClick }: OnlineOrderCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-card border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        'w-10 h-10 rounded flex items-center justify-center font-bold text-sm',
                        getPlatformColor(order.platform)
                    )}>
                        {order.platform.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-foreground">{order.orderCode}</p>
                        <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                    </div>
                </div>
                <Badge className={cn('font-semibold', getStatusColor(order.status))}>
                    {order.status}
                </Badge>
            </div>

            <div className="space-y-2">
                {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="text-foreground font-medium">{item.qty} x</span>
                        <span className="text-foreground flex-1">{item.name}</span>
                        {item.modifiers && item.modifiers.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                                {item.modifiers.length > 1
                                    ? `${item.modifiers.length} modifiers`
                                    : item.modifiers[0].label
                                }
                            </span>
                        )}
                    </div>
                ))}
                {order.items.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                        +{order.items.length - 2} more items
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <span className="text-sm text-muted-foreground">
                    {order.timeline.received.split(' ').slice(1).join(' ')}
                </span>
                <span className="text-lg font-bold text-foreground">
                    ${order.total.toFixed(2)}
                </span>
            </div>
        </div>
    )
}

export default OnlineOrderCard
