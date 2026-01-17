import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useOnlineOrderActions } from '@/hooks/useOnlineOrder'

interface CancelOrderDialogProps {
    open: boolean
    onClose: () => void
    orderId: string
}

const CANCEL_REASONS = [
    'Customer Request',
    'Item Not Available',
    'Kitchen Overloaded',
    'Payment Issue',
    'Delivery Address Issue',
    'Restaurant Closing',
    'Other',
]

const CancelOrderDialog = ({ open, onClose, orderId }: CancelOrderDialogProps) => {
    const [selectedReason, setSelectedReason] = useState('')
    const [additionalNotes, setAdditionalNotes] = useState('')
    const { cancelOrder, isCancelling } = useOnlineOrderActions()

    const handleConfirmCancellation = () => {
        if (!selectedReason) return

        const reason = additionalNotes
            ? `${selectedReason}: ${additionalNotes}`
            : selectedReason

        cancelOrder({ orderId, reason })
        onClose()
        setSelectedReason('')
        setAdditionalNotes('')
    }

    const handleGoBack = () => {
        onClose()
        setSelectedReason('')
        setAdditionalNotes('')
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 gap-0 bg-card">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold text-foreground">Cancel Order</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Please provide a reason for cancelling this order. This will be recorded for tracking purposes.
                    </p>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Cancellation Reason <span className="text-red-500">*</span>
                        </label>
                        <Select value={selectedReason} onValueChange={setSelectedReason}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Reason" />
                            </SelectTrigger>
                            <SelectContent>
                                {CANCEL_REASONS.map((reason) => (
                                    <SelectItem key={reason} value={reason}>
                                        {reason}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Additional Notes
                        </label>
                        <Textarea
                            placeholder="Type your message here..."
                            value={additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 p-4 border-t">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleGoBack}
                        disabled={isCancelling}
                    >
                        Go Back
                    </Button>
                    <Button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={handleConfirmCancellation}
                        disabled={!selectedReason || isCancelling}
                    >
                        {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CancelOrderDialog
