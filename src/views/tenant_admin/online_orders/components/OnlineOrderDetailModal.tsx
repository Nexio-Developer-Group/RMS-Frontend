import { OnlineOrder } from '@/@types/onlineorder'
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { X, Phone, MapPin, CheckCircle2, Printer } from 'lucide-react'
import { cn } from '@/components/shadcn/utils'
import { useState } from 'react'
import CancelOrderDialog from './CancelOrderDialog'
import { useOnlineOrderActions } from '@/hooks/useOnlineOrder'

interface OnlineOrderDetailModalProps {
    order: OnlineOrder | null
    open: boolean
    onClose: () => void
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

const OnlineOrderDetailModal = ({ order, open, onClose }: OnlineOrderDetailModalProps) => {
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const { acceptOrder, startPreparing, markAsReady, printOrder, printKOT } = useOnlineOrderActions()

    if (!order) return null

    const handleAcceptOrder = () => {
        acceptOrder(order.id)
    }

    const handleStartPreparing = () => {
        startPreparing(order.id)
    }

    const handleMarkAsReady = () => {
        markAsReady(order.id)
    }

    const handlePrintKOT = () => {
        printKOT(order.id)
    }

    const handlePrintOrder = () => {
        printOrder(order.id)
    }

    const getTimelineStatus = (status: keyof typeof order.timeline) => {
        return order.timeline[status]
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-2xl p-0 gap-0 bg-card overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b bg-card">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                'w-12 h-12 rounded flex items-center justify-center font-bold',
                                getPlatformColor(order.platform)
                            )}>
                                {order.platform.substring(0, 3).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">{order.orderCode}</h2>
                                <Badge className={cn('mt-1', getStatusColor(order.status))}>
                                    {order.status}
                                </Badge>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-accent rounded-md transition-colors"
                        >
                            <X className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </div>

                    <div className="overflow-y-auto max-h-[70vh]">
                        {/* Customer Info */}
                        <div className="p-4 space-y-3 border-b">
                            <h3 className="font-bold text-foreground">{order.customer.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{order.customer.phone}</span>
                                <span className="ml-auto">●</span>
                                <span>{order.customer.address}, {order.customer.city} {order.customer.zipCode}</span>
                            </div>
                            {order.customer.address && (
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5" />
                                    <span>{order.customer.address}</span>
                                </div>
                            )}
                        </div>

                        {/* Timeline */}
                        <div className="p-4 border-b">
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex flex-col items-center gap-1">
                                    <div className={cn(
                                        'w-8 h-8 rounded-full flex items-center justify-center',
                                        getTimelineStatus('received') ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-900/20'
                                    )}>
                                        <CheckCircle2 className={cn(
                                            'h-5 w-5',
                                            getTimelineStatus('received') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                                        )} />
                                    </div>
                                    <span className="text-xs font-medium text-foreground">Order Received</span>
                                    {getTimelineStatus('received') && (
                                        <span className="text-xs text-muted-foreground">
                                            {getTimelineStatus('received')?.split(' ').slice(-2).join(' ')}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <div className={cn(
                                        'w-8 h-8 rounded-full flex items-center justify-center',
                                        getTimelineStatus('accepted') ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-900/20'
                                    )}>
                                        <CheckCircle2 className={cn(
                                            'h-5 w-5',
                                            getTimelineStatus('accepted') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                                        )} />
                                    </div>
                                    <span className="text-xs font-medium text-foreground">Order Accepted</span>
                                    {getTimelineStatus('accepted') && (
                                        <span className="text-xs text-muted-foreground">
                                            {getTimelineStatus('accepted')?.split(' ').slice(-2).join(' ')}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                    <div className={cn(
                                        'w-8 h-8 rounded-full flex items-center justify-center',
                                        getTimelineStatus('preparing') ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-gray-100 dark:bg-gray-900/20'
                                    )}>
                                        <CheckCircle2 className={cn(
                                            'h-5 w-5',
                                            getTimelineStatus('preparing') ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'
                                        )} />
                                    </div>
                                    <span className="text-xs font-medium text-foreground">Order Prepared</span>
                                    {getTimelineStatus('preparing') && (
                                        <span className="text-xs text-muted-foreground">
                                            {getTimelineStatus('preparing')?.split(' ').slice(-2).join(' ')}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="p-4 border-b">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-foreground">Items</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Qty</span>
                                    <span className="text-sm text-muted-foreground w-20 text-right">Amount</span>
                                    <span className="text-sm text-muted-foreground w-20 text-right">Total</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-foreground">{item.name}</p>
                                                {item.modifiers && item.modifiers.length > 0 && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.modifiers.map(m => m.label).join(', ')} : {item.modifiers.map(m => m.price ? `$${m.price}` : '').join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-foreground w-8 text-center">{item.qty}</span>
                                                <span className="text-foreground w-20 text-right">${item.amount.toFixed(2)}</span>
                                                <span className="font-medium text-foreground w-20 text-right">${item.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="p-4 space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Order Value</span>
                                <span className="font-medium text-foreground">${order.value.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span className="font-medium text-foreground">${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Service Charge</span>
                                <span className="font-medium text-foreground">${order.serviceCharge.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t">
                                <span className="font-bold text-foreground">Total</span>
                                <span className="font-bold text-lg text-foreground">${order.total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="p-4 border-t bg-muted/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Status Payment</p>
                                    <p className="font-medium text-foreground flex items-center gap-2">
                                        <span className={cn(
                                            'w-2 h-2 rounded-full',
                                            order.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'
                                        )} />
                                        {order.paymentStatus}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Payment</p>
                                    <p className="font-medium text-foreground">{order.payment}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-3 p-4 border-t bg-card">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setShowCancelDialog(true)}
                        >
                            <X className="h-4 w-4 mr-2" />
                            Options
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handlePrintOrder}
                        >
                            <Printer className="h-4 w-4 mr-2" />
                            KOT Print
                        </Button>

                        {order.status === 'Pending' && (
                            <Button
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={handleAcceptOrder}
                            >
                                Accept | ${order.total.toFixed(2)}
                            </Button>
                        )}

                        {order.status === 'Accepted' && (
                            <Button
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                                onClick={handleStartPreparing}
                            >
                                Start Preparing
                            </Button>
                        )}

                        {order.status === 'Preparing' && (
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleMarkAsReady}
                            >
                                Mark As Ready
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <CancelOrderDialog
                open={showCancelDialog}
                onClose={() => setShowCancelDialog(false)}
                orderId={order.id}
            />
        </>
    )
}

export default OnlineOrderDetailModal
