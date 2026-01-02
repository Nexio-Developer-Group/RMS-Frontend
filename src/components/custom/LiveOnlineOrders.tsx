import React, { memo } from "react";
import { Check, Timer, X } from "lucide-react";

export type OrderItem = {
    name: string;
    quantity: number;
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
        const itemSummary = items.map((i) => `${i.quantity}X ${i.name}`).join(", ");
        return (
            <div className={`border rounded-xl p-4 bg-white border-teal-300 ${className} shadow-[0_4px_0_0_#0000001A]`}>

                {/* Card Header */}
                <div className="card-header">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold capitalize text-lg text-gray-900">{orderId}</span>
                            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">{platform}</span>
                        </div>
                        <div className="font-bold text-xl text-gray-900">
                            {currency}
                            {amount.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="border-t border-teal-300 py-4 -mx-4 px-4">
                        <div className="text-teal-500">
                            {itemSummary}
                        </div>
                    </div>
                </div>

                <div className="card-footer border-t border-teal-300 pt-3 justify-between items-center -mx-4 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-teal-500">
                            <span> <Timer className="w-4 h-4 align-items-center"/> </span>
                            <span>{placedAgo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => onReject(orderId)}
                                className={"bg-red-100 text-red-600 px-2 py-2 rounded-lg w-8 h-8 flex items-center"}
                            > <X /></button>

                            <button onClick={() => onAccept(orderId)}
                                className={"bg-green-600 flex items-center gap-2 text-green-100 px-4 py-2 rounded-lg w-auto h-8"}>
                                <Check className="w-4"/> Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

export default LiveOnlineOrders1;