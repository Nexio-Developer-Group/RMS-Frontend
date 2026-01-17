import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button'
import { X, Banknote } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/components/shadcn/utils'

interface PaymentModalProps {
    open: boolean
    onClose: () => void
    totalAmount: number
    onProcessPayment: (paymentMethod: 'Cash' | 'Card' | 'UPI') => void
}

const PAYMENT_METHODS = [
    { id: 'Cash', label: 'Cash', icon: '💵' },
    { id: 'Card', label: 'Card', icon: '💳' },
    { id: 'UPI', label: 'UPI', icon: '📱' },
] as const

const PaymentModal = ({
    open,
    onClose,
    totalAmount,
    onProcessPayment,
}: PaymentModalProps) => {
    const [selectedMethod, setSelectedMethod] = useState<'Cash' | 'Card' | 'UPI'>('UPI')
    const [selectedAddons, setSelectedAddons] = useState<string[]>([])

    const handlePay = () => {
        onProcessPayment(selectedMethod)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 gap-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">Customize Classic Burger</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Total Amount Display */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                            <Banknote className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                            <p className="text-3xl font-bold text-green-600">
                                ${totalAmount.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* OFF/Coupon Section */}
                    <div>
                        <p className="text-sm text-teal-600 mb-3">OFF/ Coupon</p>
                        <details className="border rounded-lg">
                            <summary className="p-4 cursor-pointer font-medium">
                                Add-ons
                            </summary>
                            <div className="px-4 pb-4 text-sm text-gray-500">
                                No coupons available
                            </div>
                        </details>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <p className="text-sm text-teal-600 mb-3">Payment</p>
                        <div className="grid grid-cols-3 gap-4">
                            {PAYMENT_METHODS.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={cn(
                                        'flex flex-col items-center gap-3 p-6 rounded-lg border-2 transition-all',
                                        selectedMethod === method.id
                                            ? 'border-slate-900 bg-slate-900 text-white'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}
                                >
                                    <span className="text-4xl">{method.icon}</span>
                                    <span className="font-medium">{method.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer - No action buttons as per design */}
            </DialogContent>
        </Dialog>
    )
}

export default PaymentModal
