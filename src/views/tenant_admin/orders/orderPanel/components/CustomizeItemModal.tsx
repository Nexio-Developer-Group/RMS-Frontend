
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button'
import { X, Plus, Minus } from 'lucide-react'
import { useState, useEffect } from 'react'
import * as POS from '@/@types/pos'
import { cn } from '@/components/shadcn/utils'
import type { MenuItem, Addon } from '@/@types/pos'


interface CustomizeItemModalProps {
    item: MenuItem | null;
    open: boolean;
    onClose: () => void;
    onAddToOrder: (item: POS.MenuItem, quantity: number, size: string, selectedAddons: POS.Addon[]) => void;
    onUpdateOrder?: (itemId: string, quantity: number, size: string, selectedAddons: Addon[]) => void;
    availableAddons?: POS.Addon[];
    existingOrderItem?: POS.POSOrderItem | null;
}

const SIZES = ['Small', 'Medium', 'Large']

const CustomizeItemModal = ({
    item,
    open,
    onClose,
    onAddToOrder,
    onUpdateOrder,
    availableAddons = [],
    existingOrderItem = null,
}: CustomizeItemModalProps) => {
    const [selectedSize, setSelectedSize] = useState('Large')
    const [quantity, setQuantity] = useState(1)
    const [selectedAddons, setSelectedAddons] = useState<Addon[]>([])

    // Reset or set values when modal opens
    useEffect(() => {
        if (open && existingOrderItem) {
            // Edit mode - load existing values
            setSelectedSize(existingOrderItem.size || 'Large')
            setQuantity(existingOrderItem.quantity)
            setSelectedAddons(existingOrderItem.addons || [])
        } else if (open) {
            // Add mode - reset to defaults
            setSelectedSize('Large')
            setQuantity(1)
            setSelectedAddons([])
        }
    }, [open, existingOrderItem])

    if (!item) return null

    const handleToggleAddon = (addon: Addon) => {
        const exists = selectedAddons.find(a => a.id === addon.id)
        if (exists) {
            setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id))
        } else {
            setSelectedAddons([...selectedAddons, addon])
        }
    }

    const calculateTotal = () => {
        const basePrice = item.price * quantity
        const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0) * quantity
        return basePrice + addonsPrice
    }

    const handleAdd = () => {
        if (existingOrderItem && onUpdateOrder) {
            // Update existing order item
            onUpdateOrder(existingOrderItem.id, quantity, selectedSize, selectedAddons)
        } else {
            // Add new item to order
            onAddToOrder(item, quantity, selectedSize, selectedAddons)
        }
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 gap-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Customize {item.name}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[70vh]">
                    {/* Item Image */}
                    {item.image && (
                        <div className="aspect-[16/9] bg-gradient-to-br from-teal-100 to-teal-200 p-6 flex items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="object-contain w-full h-full max-h-64"
                            />
                        </div>
                    )}

                    <div className="p-6 space-y-6">
                        {/* Item Info */}
                        <div>
                            <p className="text-sm text-teal-600 mb-1">Order items</p>
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold">{item.name}</h3>
                                <p className="text-2xl font-bold text-blue-600">
                                    ${calculateTotal().toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <p className="text-sm text-teal-600 mb-3">Order items</p>
                            <div className="grid grid-cols-3 gap-3">
                                {SIZES.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                                            selectedSize === size
                                                ? 'border-slate-900 bg-slate-900 text-white'
                                                : 'border-gray-200 hover:border-gray-300'
                                        )}
                                    >
                                        {size === 'Small' && (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="w-4 h-6 border-2 border-current rounded"></div>
                                            </div>
                                        )}
                                        {size === 'Medium' && (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="w-5 h-7 border-2 border-current rounded"></div>
                                            </div>
                                        )}
                                        {size === 'Large' && (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <div className="w-6 h-8 border-2 border-current rounded"></div>
                                            </div>
                                        )}
                                        <span className="font-medium text-sm">{size}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add-ons */}
                        {availableAddons.length > 0 && (
                            <div>
                                <p className="text-sm text-teal-600 mb-3">Order items (Optional)</p>
                                <details className="border rounded-lg" open>
                                    <summary className="p-4 cursor-pointer font-medium flex items-center justify-between">
                                        <span>Add-ons</span>
                                        <span className="text-sm text-gray-500">
                                            {selectedAddons.length} selected
                                        </span>
                                    </summary>
                                    <div className="px-4 pb-4 space-y-2">
                                        {availableAddons.map((addon) => {
                                            const isSelected = selectedAddons.find(a => a.id === addon.id)
                                            return (
                                                <button
                                                    key={addon.id}
                                                    onClick={() => handleToggleAddon(addon)}
                                                    className={cn(
                                                        'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all',
                                                        isSelected
                                                            ? 'border-teal-500 bg-teal-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    )}
                                                >
                                                    <span className="font-medium">{addon.name}</span>
                                                    <span className="font-bold text-orange-600">
                                                        ${addon.price.toFixed(2)}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </details>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white rounded-lg border px-3 py-2">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Total:</p>
                            <p className="text-2xl font-bold text-blue-600">
                                ${calculateTotal().toFixed(2)}
                            </p>
                        </div>
                        <Button
                            onClick={handleAdd}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            {existingOrderItem ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomizeItemModal
