import React, { memo } from 'react'
import { Timer } from 'lucide-react'

export type OrderItem = {
    name: string
    quantity: number
}

export type RecentOrders1Props = {
    orderId: string
    orderType: string
    tableNumber: string
    amount: number
    currency?: string
    items: OrderItem[]
    status: string
    placedAgo: string
    className?: string
}

const RecentOrders1: React.FC<RecentOrders1Props> = memo(
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
            <div
                className={`bg-white border border-teal-300 w-100 rounded-2xl shadow-[4px_0_0_0_#0000001A] px-5 py-4 ${className}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                            #{orderId}
                        </span>

                        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden ">
                            <span className="px-3 py-1 text-sm font-semibold text-gray-800">
                                Dine-in
                            </span>
                            <span className="border-l border-slate-200 h-7" />
                            <span className="px-3 py-1 text-sm font-semibold text-blue-600">
                                Table 12
                            </span>
                        </div>
                    </div>

                    {/* Status pill */}
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                        {status}
                    </span>
                </div>

                {/* Items */}
                <p className="mt-3 text-sm leading-relaxed text-teal-500 border-t border-b border-teal-300 py-3 -mx-5 px-5">
                    {itemSummary}
                </p>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-teal-500">
                        <Timer className="w-4 h-4" />
                        <span>{placedAgo}</span>
                    </div>

                    <span className="text-lg font-semibold text-gray-900">
                        {currency}
                        {amount.toFixed(2)}
                    </span>
                </div>
            </div>
        )
    },
)

export default RecentOrders1
