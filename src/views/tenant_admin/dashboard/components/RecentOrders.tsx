import React, { memo } from 'react'
import { Timer } from 'lucide-react'
import { cn } from '../../../../components/shadcn/utils'
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'

export type OrderItem = {
    name: string
    quantity: number
}

export type RecentOrders1Props = {
    orderId: string
    orderType: string
    tableNumber?: string
    amount: number
    currency?: string
    items: OrderItem[]
    status: string
    placedAgo: string
    className?: string
}

const RecentOrders: React.FC<RecentOrders1Props> = memo(
    ({
        orderId,
        orderType,
        tableNumber,
        amount,
        items,
        currency = '$',
        status,
        placedAgo,
        className = '',
    }) => {
        const itemSummary = items
            .map((i) => `${i.quantity}x ${i.name}`)
            .join(', ')

        return (
            <Card
                className={cn(
                    'w-full min-w-full md:min-w-100 rounded-2xl border border-teal-300 bg-card shadow-[4px_0_0_0_#0000001A]',
                    className,
                )}
            >
                {/* HEADER */}
                <CardHeader className="px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold text-foreground">
                                #{orderId}
                            </span>

                            <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200">
                                <div className={cn(
                                    "px-3 py-0.5 text-sm font-semibold text-foreground",
                                    tableNumber && "border-r border-slate-200"
                                )}>
                                    {orderType}
                                </div>
                                {tableNumber && (
                                    <div className="px-3 py-0.5 text-sm font-semibold text-blue-600">
                                        {tableNumber}
                                    </div>
                                )}
                            </div>

                        </div>

                        <Badge variant="secondary" className="shrink-0 rounded-full bg-orange-200 text-sm font-semibold text-orange-600">
                            {status}
                        </Badge>
                    </div>
                </CardHeader>

                {/* ITEMS (exact border + padding behavior) */}
                <CardContent className="px-4 py-3 border-y">
                    <p className="text-sm leading-relaxed text-teal-600 line-clamp-2 min-h-12 max-h-12">
                        {itemSummary}
                    </p>
                </CardContent>

                {/* FOOTER */}
                <CardFooter className="px-5 py-4">
                    <div className="flex w-full items-center justify-between">
                        {/* Time at left */}
                        <div className="flex items-center gap-2 text-sm text-teal-500">
                            <Timer className="h-4 w-4" />
                            <span>{placedAgo}</span>
                        </div>

                        {/* Amount at right */}
                        <span className="text-lg font-semibold text-foreground">
                            {currency}
                            {amount.toFixed(2)}
                        </span>
                    </div>
                </CardFooter>

            </Card>
        )
    },
)

export default RecentOrders
