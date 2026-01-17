import { Customer, CustomerOrder } from '@/@types/customers'
import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { X, Phone, MapPin, Calendar, Copy, MoreVertical } from 'lucide-react'
import { cn } from '@/components/shadcn/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'

interface CustomerDetailModalProps {
    customer: Customer | null
    open: boolean
    onClose: () => void
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        case 'preparing':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
        case 'cancelled':
            return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
}

const getCampaignColor = (status: string) => {
    return status === 'Active'
        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
}

const CustomerDetailModal = ({ customer, open, onClose }: CustomerDetailModalProps) => {
    if (!customer) return null

    const handleCopyPhone = () => {
        navigator.clipboard.writeText(customer.phoneNumber)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl p-0 gap-0 bg-card overflow-hidden max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-card sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                {customer.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-foreground">{customer.name}</h2>
                            <p className="text-sm text-muted-foreground">{customer.customerId}</p>
                        </div>
                        <Badge className={getCampaignColor(customer.campaignStatus)}>
                            {customer.campaignStatus}
                        </Badge>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-md transition-colors"
                    >
                        <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="overflow-y-auto">
                    {/* Customer Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-b">
                        <div className="bg-card rounded-lg p-3 border flex items-center gap-3">
                            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground mb-1">Phone Number</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {customer.phoneNumber}
                                    </p>
                                    <button
                                        onClick={handleCopyPhone}
                                        className="p-1 hover:bg-accent rounded shrink-0"
                                    >
                                        <Copy className="h-3 w-3 text-muted-foreground" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-3 border flex items-center gap-3">
                            <div className="h-5 w-5 rounded bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-green-600 dark:text-green-400">₹</span>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Total Transaction</p>
                                <p className="text-sm font-bold text-foreground">
                                    ₹{customer.totalTransaction.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-3 border flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Last Ordered On</p>
                                <p className="text-sm font-medium text-foreground">
                                    {customer.lastOrderedOn}
                                </p>
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-3 border flex items-center gap-3">
                            <div className="h-5 w-5 rounded bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">#</span>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Campaign Status</p>
                                <p className="text-sm font-medium text-foreground">
                                    {customer.campaignStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total Number of Orders */}
                    <div className="p-4 border-b bg-muted/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Number of Orders</p>
                                <p className="text-2xl font-bold text-foreground">{customer.totalOrders}</p>
                            </div>
                            {customer.address && (
                                <div className="flex items-start gap-2 text-sm max-w-md">
                                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                    <span className="text-muted-foreground">{customer.address}, {customer.city}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Previous Orders */}
                    <div className="p-4">
                        <h3 className="font-bold text-foreground mb-4">Previous Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="border-b bg-muted/50">
                                    <tr className="text-muted-foreground">
                                        <th className="p-3 text-left font-medium">Time</th>
                                        <th className="p-3 text-left font-medium">Order</th>
                                        <th className="p-3 text-left font-medium">Items</th>
                                        <th className="p-3 text-left font-medium">Amount</th>
                                        <th className="p-3 text-left font-medium">Created By</th>
                                        <th className="p-3 text-left font-medium">Status</th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                                No orders found
                                            </td>
                                        </tr>
                                    ) : (
                                        customer.orders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="border-b hover:bg-muted/30 transition-colors"
                                            >
                                                <td className="p-3 text-muted-foreground">{order.time}</td>
                                                <td className="p-3 font-medium text-foreground">{order.orderCode}</td>
                                                <td className="p-3 text-foreground">{order.items} Items</td>
                                                <td className="p-3 font-medium text-foreground">
                                                    ${order.amount.toFixed(2)}
                                                </td>
                                                <td className="p-3 text-foreground">{order.createdBy}</td>
                                                <td className="p-3">
                                                    <Badge className={cn('font-medium', getStatusColor(order.status))}>
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className="p-1 hover:bg-accent rounded">
                                                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-4 border-t bg-card sticky bottom-0">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CustomerDetailModal
