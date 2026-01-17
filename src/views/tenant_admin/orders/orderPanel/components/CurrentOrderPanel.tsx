import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import { Separator } from '@/components/shadcn/ui/separator'
import {
    Minus,
    Plus,
    Pencil,
    X,
    FileText,
    Pause,
    Save,
    Printer,
    CreditCard,
    Loader2,
    Trash2,
} from 'lucide-react'
import { useTables, useOrderActions } from '@/hooks/usePOS'
import type { OrderItem, OrderType, Table, CurrentOrder } from '@/@types/pos'
import { cn } from '@/components/shadcn/utils'

type CurrentOrderPanelProps = {
    orderItems: OrderItem[]
    orderType: OrderType
    selectedTable?: Table
    onTableSelect: (table: Table) => void
    onUpdateItem: (itemId: string, updates: Partial<OrderItem>) => void
    onRemoveItem: (itemId: string) => void
    onClearOrder: () => void
    onPayClick?: () => void
    onEditItem?: (orderItem: OrderItem) => void
}

const CurrentOrderPanel = ({
    orderItems,
    orderType,
    selectedTable,
    onTableSelect,
    onUpdateItem,
    onRemoveItem,
    onClearOrder,
    onPayClick,
    onEditItem,
}: CurrentOrderPanelProps) => {
    const { data: tables = [] } = useTables()
    const {
        createKOT,
        holdOrder,
        saveOrder,
        printOrder,
        processPayment,
        isCreatingKOT,
        isHoldingOrder,
        isSavingOrder,
        isPrintingOrder,
        isProcessingPayment,
    } = useOrderActions()

    // Calculate totals
    const subtotal = orderItems.reduce((sum, item) => {
        const itemPrice = item.menuItem.price
        const addonsPrice = item.addons.reduce((addonSum, addon) => addonSum + addon.price, 0)
        return sum + (itemPrice + addonsPrice) * item.quantity
    }, 0)

    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    const currentOrder: CurrentOrder = {
        items: orderItems,
        orderType,
        table: selectedTable,
        offers: [],
        subtotal,
        tax,
        total,
    }

    const handleQuantityChange = (itemId: string, delta: number) => {
        const item = orderItems.find((i) => i.id === itemId)
        if (!item) return

        const newQuantity = item.quantity + delta
        if (newQuantity <= 0) {
            onRemoveItem(itemId)
        } else {
            onUpdateItem(itemId, { quantity: newQuantity })
        }
    }

    const handleRemoveAddon = (itemId: string, addonId: string) => {
        const item = orderItems.find((i) => i.id === itemId)
        if (!item) return

        const updatedAddons = item.addons.filter((addon) => addon.id !== addonId)
        onUpdateItem(itemId, { addons: updatedAddons })
    }

    const handleCreateKOT = () => {
        if (orderItems.length === 0) {
            alert('Please add items to order')
            return
        }
        if (orderType === 'dine-in' && !selectedTable) {
            alert('Please select a table')
            return
        }
        createKOT(currentOrder)
    }

    const availableTables = tables.filter((table) => table.status === 'available')

    return (
        <div className="w-full bg-card md:border-l flex flex-col h-full">
            {/* Header */}
            <div className="p-4 md:p-4 border-b shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base md:text-lg font-bold">
                        Current Order
                    </h2>
                    {orderItems.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearOrder}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>

                {/* Table Selection */}
                {orderType === 'dine-in' && (
                    <Select
                        value={selectedTable?.id}
                        onValueChange={(value) => {
                            const table = tables.find((t) => t.id === value)
                            if (table) onTableSelect(table)
                        }}
                    >
                        <SelectTrigger className="w-full bg-slate-50">
                            <SelectValue placeholder="Select Table" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableTables.length === 0 ? (
                                <div className="p-2 text-sm text-slate-500 text-center">
                                    No tables available
                                </div>
                            ) : (
                                availableTables.map((table) => (
                                    <SelectItem key={table.id} value={table.id}>
                                        {table.number} (Capacity: {table.capacity})
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Order Items List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-4 space-y-3 min-h-0">
                {orderItems.length === 0 ? (
                    <div className="text-center text-slate-400 py-12">
                        <ShoppingCart className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                        <p className="font-medium">No items in order</p>
                        <p className="text-sm mt-1">Add items from menu</p>
                    </div>
                ) : (
                    orderItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-slate-300 transition-colors"
                        >
                            {/* Item Header */}
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-900 text-sm md:text-base truncate">
                                        {item.menuItem.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-sm md:text-base text-orange-600 font-bold">
                                            ${item.menuItem.price}
                                        </p>
                                        {item.size && (
                                            <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded">
                                                {item.size}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => onEditItem?.(item)}
                                    className="text-slate-400 hover:text-slate-600 p-1"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Addons */}
                            {item.addons.length > 0 && (
                                <div className="space-y-1 mb-2">
                                    {item.addons.map((addon) => (
                                        <div
                                            key={addon.id}
                                            className="flex items-center justify-between text-xs bg-white rounded px-2 py-1.5 border border-slate-200"
                                        >
                                            <span className="text-teal-600 font-medium">
                                                {addon.name} · ${addon.price}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => onEditItem?.(item)}
                                                    className="text-slate-400 hover:text-slate-600"
                                                >
                                                    <Pencil className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveAddon(item.id, addon.id)
                                                    }
                                                    className="text-red-400 hover:text-red-600"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="p-2 hover:bg-slate-50 rounded-l-lg transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm font-semibold w-8 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className="p-2 hover:bg-slate-50 rounded-r-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => onRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {/* BOGO Offer Badge */}
                {orderItems.length > 1 && (
                    <Badge className="w-full justify-center py-2 bg-blue-500 hover:bg-blue-600 text-white">
                        🎉 BOGO offer applied
                    </Badge>
                )}
            </div>

            {/* Order Summary */}
            {orderItems.length > 0 && (
                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 shrink-0">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Tax (10%)</span>
                            <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-base">
                            <span className="font-bold text-slate-900">Total</span>
                            <span className="font-bold text-orange-600">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Action Buttons */}
            <div className="p-4 md:p-4 border-t border-slate-200 space-y-3 shrink-0 bg-white">
                {/* Create KOT Button */}
                <Button
                    onClick={handleCreateKOT}
                    disabled={orderItems.length === 0 || isCreatingKOT}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 md:h-12 font-medium"
                >
                    {isCreatingKOT ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                        <FileText className="w-4 h-4 mr-2" />
                    )}
                    Create order for KOT
                </Button>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-5 gap-1.5 md:gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
                        disabled={orderItems.length === 0}
                    >
                        <FileText className="w-4 h-4" />
                        <span className="text-[10px] md:text-xs">More</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => holdOrder(currentOrder)}
                        disabled={orderItems.length === 0 || isHoldingOrder}
                        className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
                    >
                        {isHoldingOrder ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Pause className="w-4 h-4" />
                        )}
                        <span className="text-[10px] md:text-xs">Hold</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => saveOrder(currentOrder)}
                        disabled={orderItems.length === 0 || isSavingOrder}
                        className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
                    >
                        {isSavingOrder ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        <span className="text-[10px] md:text-xs">Save</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => printOrder(currentOrder)}
                        disabled={orderItems.length === 0 || isPrintingOrder}
                        className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs"
                    >
                        {isPrintingOrder ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Printer className="w-4 h-4" />
                        )}
                        <span className="text-[10px] md:text-xs">Print</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPayClick?.()}
                        disabled={orderItems.length === 0}
                        className="flex flex-col items-center gap-1 h-auto py-2 px-1 text-xs bg-slate-900 text-white hover:bg-slate-800 hover:text-white border-slate-900"
                    >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[10px] md:text-xs">Pay</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Add ShoppingCart icon import
import { ShoppingCart } from 'lucide-react'

export default CurrentOrderPanel
