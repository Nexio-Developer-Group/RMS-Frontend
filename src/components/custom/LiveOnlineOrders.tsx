import React, { memo } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/shadcn/ui/card'
import { Separator } from '@/components/shadcn/ui/separator'
import { Badge } from '@/components/shadcn/ui/badge'
import { Check, Timer, X } from 'lucide-react'
import { cn } from '../shadcn/utils'
import { Button } from '../ui'

export type OrderItem = {
    name: string
    quantity: number
}

export type OnlineCardProps = {
    orderId: string
    platform: string
    amount: number
    currency?: string
    items: OrderItem[]
    placedAgo: string
    onAccept: (orderId: string) => void
    onReject: (orderId: string) => void
    className?: string
}

const LiveOnlineOrders1: React.FC<OnlineCardProps> = memo(
    ({
        orderId,
        platform,
        amount,
        currency = '$',
        items,
        placedAgo,
        onAccept,
        onReject,
        className = '',
    }) => {
        const itemSummary = items
            .map((i) => `${i.quantity}X ${i.name}`)
            .join(', ')
        return (
            <>
                <Card className={cn("rounded-xl shadow-sm border border-teal-200",
                    "hover:shadow-md transition-shadow",
                    className)}>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg text-gray-900">
                                {orderId}
                            </span>
                        </div>

                        <Badge
                            variant="outline"
                            className="bg-red-100 text-red-600">
                            {platform}
                        </Badge>

                        <div className="font-bold text-xl text-gray-900">
                            {currency}
                            {amount.toFixed(2)}
                        </div>
                    </CardHeader>

                    <Separator />

                    <CardContent className="py-4">
                        <p className="text-teal-600 text-sm font-medium">
                            {itemSummary}
                        </p>
                    </CardContent>

                    <Separator />

                    <CardFooter className="flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2 text-teal-600">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm">
                                {placedAgo}
                            </span>
                        </div>

                        <div className="flex gap-2">

                            <Button
                                variant="default"
                                className="bg-red-100 text-red-600"
                                onClick={() => onReject(orderId)}>
                                <X className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="default"
                                className="bg-green-100 text-green-600"
                                onClick={() => onAccept(orderId)}>
                                <span className="flex items-center gap-1">
                                    <Check className="w-4 h-4" />
                                    Accept
                                </span>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </>
        )
    },
)

export default LiveOnlineOrders1
