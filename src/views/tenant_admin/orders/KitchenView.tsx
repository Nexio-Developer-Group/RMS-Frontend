import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiGetOrders, apiUpdateOrderItemStatus } from '@/services/tenant_admin/orders'
import type { Order, OrderItem, OrderItemStatus } from '@/services/tenant_admin/orders'
import { useOrderSocket } from '@/hooks/useOrderSocket'
import { Loader2 } from 'lucide-react'

// ======================== Helpers ======================== //

function timeAgo(dateStr: string): string {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
}

function showToast(message: string) {
    const el = document.createElement('div')
    el.textContent = message
    el.style.cssText =
        'position:fixed;bottom:24px;right:24px;background:#1e293b;color:#f8fafc;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);max-width:360px;'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3500)
}

const NEXT_STATUS: Record<string, OrderItemStatus> = {
    pending: 'preparing',
    preparing: 'ready',
}

function itemStatusIcon(status: OrderItemStatus): string {
    if (status === 'pending') return '●'
    if (status === 'preparing') return '↻'
    if (status === 'ready') return '✓'
    return '–'
}

function allItemsReady(items: OrderItem[]): boolean {
    return items.every((i) => i.status === 'ready' || i.status === 'served' || i.status === 'cancelled')
}

function cardHeaderColor(order: Order): string {
    if (allItemsReady(order.items)) return 'bg-green-100 dark:bg-green-950/60 border-green-200 dark:border-green-800'
    if (order.status === 'preparing' || order.items.some((i) => i.status === 'preparing'))
        return 'bg-orange-100 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800'
    return 'bg-yellow-100 dark:bg-yellow-950/60 border-yellow-200 dark:border-yellow-800'
}

// ======================== Order Card ======================== //

interface OrderCardProps {
    order: Order
}

function OrderCard({ order }: OrderCardProps) {
    const queryClient = useQueryClient()

    const advanceMutation = useMutation({
        mutationFn: ({ itemId, status }: { itemId: string; status: OrderItemStatus }) =>
            apiUpdateOrderItemStatus(order.id, itemId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders-kitchen'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: () => showToast('Failed to update item status'),
    })

    const headerColor = cardHeaderColor(order)
    const ready = allItemsReady(order.items)

    const quickActionLabel = ready
        ? 'All Ready'
        : order.status === 'preparing' || order.items.some((i) => i.status === 'preparing')
        ? 'In Progress'
        : 'Start'

    const handleStart = () => {
        order.items
            .filter((i) => i.status === 'pending')
            .forEach((item) => {
                advanceMutation.mutate({ itemId: item.id, status: 'preparing' })
            })
    }

    return (
        <div className={`rounded-lg border overflow-hidden ${headerColor}`}>
            {/* Card Header */}
            <div className={`px-4 py-3 border-b ${headerColor}`}>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">#{order.order_number}</span>
                    <span className="text-xs text-muted-foreground">{timeAgo(order.created_at)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Table {order.table_id}</p>
            </div>

            {/* Items */}
            <div className="bg-card px-4 py-3 space-y-1.5">
                {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span
                                className={`text-sm font-mono shrink-0 ${
                                    item.status === 'ready' || item.status === 'served'
                                        ? 'text-green-600'
                                        : item.status === 'preparing'
                                        ? 'text-orange-500'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {itemStatusIcon(item.status)}
                            </span>
                            <span className="text-sm truncate">
                                {item.name} x{item.quantity}
                            </span>
                        </div>
                        {NEXT_STATUS[item.status] && (
                            <button
                                className="text-xs px-2 py-0.5 rounded bg-muted hover:bg-muted/70 transition-colors shrink-0"
                                onClick={() =>
                                    advanceMutation.mutate({
                                        itemId: item.id,
                                        status: NEXT_STATUS[item.status],
                                    })
                                }
                                disabled={advanceMutation.isPending}
                            >
                                {advanceMutation.isPending ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    '→'
                                )}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Quick Action */}
            <div className="px-4 py-2 bg-card border-t">
                <button
                    className={`w-full text-xs py-1.5 rounded font-medium transition-colors ${
                        ready
                            ? 'bg-green-100 text-green-800 cursor-default'
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                    onClick={!ready ? handleStart : undefined}
                    disabled={ready || advanceMutation.isPending}
                >
                    {ready ? 'All Ready ✓' : quickActionLabel}
                </button>
            </div>
        </div>
    )
}

// ======================== Main Kitchen View ======================== //

const KITCHEN_STATUSES = new Set(['pending', 'confirmed', 'preparing'])

const KitchenView = () => {
    useOrderSocket()

    const { data: allOrders = [], isLoading } = useQuery({
        queryKey: ['orders-kitchen'],
        queryFn: () => apiGetOrders(),
        refetchInterval: 20000,
    })

    const kitchenOrders = (allOrders as Order[])
        .filter((o) => KITCHEN_STATUSES.has(o.status))
        .sort((a, b) => {
            const priority: Record<string, number> = { preparing: 0, confirmed: 1, pending: 2 }
            const pa = priority[a.status] ?? 3
            const pb = priority[b.status] ?? 3
            if (pa !== pb) return pa - pb
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-lg border h-48 bg-muted animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="rounded-md border bg-card px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">Kitchen Display</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
                        Pending
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-orange-400" />
                        Preparing
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
                        Ready
                    </span>
                    <span className="font-medium text-foreground">
                        {kitchenOrders.length} active
                    </span>
                </div>
            </div>

            {kitchenOrders.length === 0 ? (
                <div className="rounded-md border bg-card py-16 text-center">
                    <p className="text-muted-foreground text-lg">No active orders in kitchen</p>
                    <p className="text-muted-foreground text-sm mt-1">Orders will appear here in real-time</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {kitchenOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default KitchenView
