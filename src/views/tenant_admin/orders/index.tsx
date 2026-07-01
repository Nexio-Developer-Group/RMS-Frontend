import { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { Eye, Clock, ChefHat, CheckCircle2, DollarSign, Loader2, UtensilsCrossed } from 'lucide-react'
import {
    apiGetOrders,
    apiGetOrderStats,
    apiGetOrderById,
    apiUpdateOrderStatus,
    apiUpdateOrderItemStatus,
    apiCancelOrder,
} from '@/services/tenant_admin/orders'
import type { Order, OrderStatus, OrderItemStatus } from '@/services/tenant_admin/orders'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/shadcn/ui/sheet'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Separator } from '@/components/shadcn/ui/separator'
import { useOrderSocket } from '@/hooks/useOrderSocket'

// ======================== Helpers ======================== //

function timeAgo(dateStr: string): string {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
}

function showToast(message: string) {
    const el = document.createElement('div')
    el.textContent = message
    el.style.cssText =
        'position:fixed;bottom:24px;right:24px;background:#1e293b;color:#f8fafc;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);max-width:360px;'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3500)
}

const STATUS_BADGE_VARIANTS: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    preparing: 'bg-orange-100 text-orange-800 border-orange-200',
    ready: 'bg-green-100 text-green-800 border-green-200',
    served: 'bg-teal-100 text-teal-800 border-teal-200',
    paid: 'bg-gray-100 text-gray-700 border-gray-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
}

function StatusBadge({ status }: { status: OrderStatus }) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_BADGE_VARIANTS[status]}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}

const ITEM_STATUS_BADGE: Record<OrderItemStatus, string> = {
    pending: 'bg-yellow-50 text-yellow-700',
    preparing: 'bg-orange-50 text-orange-700',
    ready: 'bg-green-50 text-green-700',
    served: 'bg-teal-50 text-teal-700',
    cancelled: 'bg-red-50 text-red-700',
}

// ======================== Skeletons ======================== //

function StatSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-4 space-y-2">
            <div className="h-3 w-20 bg-muted rounded animate-pulse" />
            <div className="h-7 w-16 bg-muted rounded animate-pulse" />
        </div>
    )
}

function TableSkeleton() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                    {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j} className="px-4 py-3">
                            <div className="h-4 bg-muted rounded animate-pulse" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}

// ======================== Order Detail Sheet ======================== //

interface OrderDetailSheetProps {
    orderId: string | null
    open: boolean
    onClose: () => void
}

function OrderDetailSheet({ orderId, open, onClose }: OrderDetailSheetProps) {
    const queryClient = useQueryClient()

    const { data: order, isLoading } = useQuery({
        queryKey: ['orders', orderId],
        queryFn: () => apiGetOrderById(orderId!),
        enabled: !!orderId,
    })

    const statusMutation = useMutation({
        mutationFn: (status: OrderStatus) => apiUpdateOrderStatus(orderId!, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', orderId] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['order-stats'] })
            showToast('Order status updated')
        },
        onError: () => showToast('Failed to update order status'),
    })

    const itemStatusMutation = useMutation({
        mutationFn: ({ itemId, status }: { itemId: string; status: OrderItemStatus }) =>
            apiUpdateOrderItemStatus(orderId!, itemId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', orderId] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            showToast('Item status updated')
        },
        onError: () => showToast('Failed to update item status'),
    })

    const cancelMutation = useMutation({
        mutationFn: () => apiCancelOrder(orderId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['order-stats'] })
            showToast('Order cancelled')
            onClose()
        },
        onError: () => showToast('Failed to cancel order'),
    })

    const ITEM_STATUS_OPTIONS: OrderItemStatus[] = ['pending', 'preparing', 'ready', 'served']
    const canCancel = order && !['served', 'paid', 'cancelled'].includes(order.status)

    return (
        <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                {isLoading || !order ? (
                    <div className="space-y-4 mt-6">
                        <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                        <div className="h-64 bg-muted rounded animate-pulse" />
                    </div>
                ) : (
                    <>
                        <SheetHeader className="mb-4">
                            <SheetTitle className="flex items-center gap-2 flex-wrap">
                                <span>#{order.order_number}</span>
                                <Badge variant="outline">Table {order.table_id}</Badge>
                                <StatusBadge status={order.status} />
                            </SheetTitle>
                            <p className="text-sm text-muted-foreground">{timeAgo(order.created_at)}</p>
                        </SheetHeader>

                        {/* Items */}
                        <div className="space-y-2 mb-4">
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Items</p>
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-card"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            x{item.quantity} · ${item.unit_price.toFixed(2)}
                                        </p>
                                        {item.notes && (
                                            <p className="text-xs text-muted-foreground italic mt-0.5">
                                                {item.notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded font-medium ${ITEM_STATUS_BADGE[item.status]}`}
                                        >
                                            {item.status}
                                        </span>
                                        {item.status !== 'cancelled' && item.status !== 'served' && (
                                            <Select
                                                value={item.status}
                                                onValueChange={(v) =>
                                                    itemStatusMutation.mutate({
                                                        itemId: item.id,
                                                        status: v as OrderItemStatus,
                                                    })
                                                }
                                            >
                                                <SelectTrigger className="h-7 w-28 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {ITEM_STATUS_OPTIONS.map((s) => (
                                                        <SelectItem key={s} value={s} className="text-xs">
                                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="my-4" />

                        {/* Totals */}
                        <div className="space-y-1 text-sm mb-4">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Tax</span>
                                <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Order-level status actions */}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                Actions
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {order.status === 'pending' && (
                                    <Button
                                        size="sm"
                                        onClick={() => statusMutation.mutate('confirmed')}
                                        disabled={statusMutation.isPending}
                                    >
                                        {statusMutation.isPending && (
                                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                        )}
                                        Confirm Order
                                    </Button>
                                )}
                                {(order.status === 'confirmed') && (
                                    <Button
                                        size="sm"
                                        onClick={() => statusMutation.mutate('preparing')}
                                        disabled={statusMutation.isPending}
                                    >
                                        {statusMutation.isPending && (
                                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                        )}
                                        Mark Preparing
                                    </Button>
                                )}
                                {order.status === 'preparing' && (
                                    <Button
                                        size="sm"
                                        onClick={() => statusMutation.mutate('ready')}
                                        disabled={statusMutation.isPending}
                                    >
                                        {statusMutation.isPending && (
                                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                        )}
                                        Mark Ready
                                    </Button>
                                )}
                                {order.status === 'ready' && (
                                    <Button
                                        size="sm"
                                        onClick={() => statusMutation.mutate('served')}
                                        disabled={statusMutation.isPending}
                                    >
                                        {statusMutation.isPending && (
                                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                        )}
                                        Mark Served
                                    </Button>
                                )}
                                {order.status === 'served' && (
                                    <Button
                                        size="sm"
                                        onClick={() => statusMutation.mutate('paid')}
                                        disabled={statusMutation.isPending}
                                    >
                                        {statusMutation.isPending && (
                                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                        )}
                                        Mark Paid
                                    </Button>
                                )}
                                {canCancel && (
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {
                                            if (window.confirm('Cancel this order?')) cancelMutation.mutate()
                                        }}
                                        disabled={cancelMutation.isPending}
                                    >
                                        {cancelMutation.isPending && (
                                            <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                        )}
                                        Cancel Order
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}

// ======================== Tab definitions ======================== //

type TabKey = 'all' | OrderStatus

const TABS: { label: string; value: TabKey }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Preparing', value: 'preparing' },
    { label: 'Ready', value: 'ready' },
    { label: 'Served', value: 'served' },
    { label: 'Paid / Cancelled', value: 'paid' },
]

// ======================== Main View ======================== //

const OrdersManagement = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('all')
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)

    // Wire WebSocket — queryClient invalidation happens inside the hook
    useOrderSocket()

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['order-stats'],
        queryFn: apiGetOrderStats,
    })

    const { data: orders = [], isLoading: ordersLoading } = useQuery({
        queryKey: ['orders', activeTab],
        queryFn: () =>
            apiGetOrders(
                activeTab === 'all'
                    ? undefined
                    : activeTab === 'paid'
                    ? undefined // fetch all and show paid+cancelled
                    : { status: activeTab as OrderStatus },
            ),
        refetchInterval: 30000,
    })

    // For the Paid/Cancelled tab, filter client-side
    const displayedOrders =
        activeTab === 'paid'
            ? orders.filter((o) => o.status === 'paid' || o.status === 'cancelled')
            : orders

    const handleViewOrder = (id: string) => {
        setSelectedOrderId(id)
        setSheetOpen(true)
    }

    const handleCloseSheet = () => {
        setSheetOpen(false)
        setSelectedOrderId(null)
    }

    return (
        <div className="space-y-4">
            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statsLoading ? (
                    <>
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                    </>
                ) : (
                    <>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                <Clock className="w-3.5 h-3.5" />
                                Pending
                            </div>
                            <p className="text-2xl font-bold">{stats?.by_status?.pending ?? 0}</p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                <ChefHat className="w-3.5 h-3.5" />
                                Preparing
                            </div>
                            <p className="text-2xl font-bold">{stats?.by_status?.preparing ?? 0}</p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Ready
                            </div>
                            <p className="text-2xl font-bold">{stats?.by_status?.ready ?? 0}</p>
                        </div>
                        <div className="rounded-lg border bg-card p-4">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                                <DollarSign className="w-3.5 h-3.5" />
                                Revenue Today
                            </div>
                            <p className="text-2xl font-bold">
                                ${(stats?.revenue?.today ?? 0).toLocaleString()}
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Main card */}
            <div className="rounded-md border bg-card">
                {/* Tabs */}
                <div className="flex items-center gap-1 px-4 pt-3 border-b overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-3 py-2 text-sm font-medium rounded-t transition-colors whitespace-nowrap ${
                                activeTab === tab.value
                                    ? 'border-b-2 border-primary text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Order #</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Table</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Time</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Items</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Total</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersLoading ? (
                                <TableSkeleton />
                            ) : displayedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <UtensilsCrossed className="h-10 w-10 text-muted-foreground" />
                                            <p className="text-muted-foreground">No orders found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                displayedOrders.map((order: Order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                                        onClick={() => handleViewOrder(order.id)}
                                    >
                                        <td className="px-4 py-3 font-medium">#{order.order_number}</td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            Table {order.table_id}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {timeAgo(order.created_at)}
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {order.items.length}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            ${order.total.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td
                                            className="px-4 py-3 text-right"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewOrder(order.id)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!ordersLoading && displayedOrders.length > 0 && (
                    <div className="px-4 py-2 text-xs text-muted-foreground border-t">
                        {displayedOrders.length} order{displayedOrders.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {/* Order detail sheet */}
            <OrderDetailSheet
                orderId={selectedOrderId}
                open={sheetOpen}
                onClose={handleCloseSheet}
            />
        </div>
    )
}

export default OrdersManagement
