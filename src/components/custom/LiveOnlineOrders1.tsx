import React, { memo } from "react";
import { Check, Timer, X } from "lucide-react";

export type OrderItem = {
    name: string;
    quantity: number;
    price: number;
};

export type OnlineCardProps = {
    orderId: string;
    platform: string;
    amount: number;
    currency?: string;
    items: OrderItem[];
    placedAgo: string;
    onAccept: (orderId: string) => void;
    onReject: (orderId: string) => void;
    className?: string;
}

const LiveOnlineOrders1: React.FC<OnlineCardProps> = memo(
    ({ orderId,
        platform,
        amount,
        currency = "$",
        items,
        placedAgo,
        onAccept,
        onReject,
        className = "" }) => {
        const itemSummary = items.map((i) => `${i.quantity} x ${i.name}`).join(", ");
        return (
            <div className={`border rounded-xl p-4 shadow-sm bg-white border-emerald-300 w-100 ${className}`}>

                {/* Card Header */}
                <div className="card-header">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold capitalize text-lg text-gray-900">{orderId}</span>
                            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">{platform}</span>
                        </div>
                        <div className="font-bold text-xl text-gray-900">
                            {currency}
                            {amount.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="border-t border-emerald-300 pb-4 mb-4 py-0 -mx-4 px-4">
                        <div className="text-emerald-500 mb-2">
                            {itemSummary}
                        </div>
                    </div>
                </div>

                <div className="card-footer border-t border-emerald-300 pt-4 justify-between items-center -mx-4 px-4">
                    <div className="flex items-center justify-content-between">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <span> <Timer /> </span>
                            <span>{placedAgo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => onReject(orderId)}
                                className={"bg-red-100 text-red-400 px-2 py-2 rounded-lg"}
                            > <X /></button>

                            <button onClick={() => onAccept(orderId)}
                                className={"bg-emerald-500 flex items-center gap-2 text-emerald-100 px-4 py-2 rounded-lg"}>
                                <Check /> Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

export default LiveOnlineOrders1;