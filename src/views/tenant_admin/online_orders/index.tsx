import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'
import RefetchLoader from '@/components/custom/RefetchLoader'
import Loading from '@/components/shared/Loading'
import OnlineOrderStatsHeader from './components/OnlineOrderStatsHeader'
import OnlineOrderFilterTabs from './components/OnlineOrderFilterTabs'
import OnlineOrderSearchBar from './components/OnlineOrderSearchBar'
import OnlineOrderGrid from './components/OnlineOrderGrid'
import OnlineOrderDetailModal from './components/OnlineOrderDetailModal'
import { useOnlineOrders, useOnlineOrderStats, useOnlineOrderDetail } from '@/hooks/useOnlineOrder'
import { OnlineOrderFilterStatus } from '@/@types/onlineorder'

const OnlineOrders = () => {
    const [filterStatus, setFilterStatus] = useState<OnlineOrderFilterStatus>('all')
    const [search, setSearch] = useState('')
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
    const [isRefetching, setIsRefetching] = useState(false)

    // Fetch data
    const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useOnlineOrders(filterStatus, search)
    const { data: stats, refetch: refetchStats } = useOnlineOrderStats()
    const { data: selectedOrder, isLoading: orderDetailLoading } = useOnlineOrderDetail(selectedOrderId)

    const handleRefetch = () => {
        setIsRefetching(true)
        Promise.all([refetchOrders(), refetchStats()]).finally(() => {
            setTimeout(() => {
                setIsRefetching(false)
            }, 1000)
        })
    }

    const defaultStats = {
        allOrders: 0,
        pendingOrders: 0,
        acceptedOrders: 0,
        preparingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
    }

    const orderStats = stats || defaultStats

    const tabStats = {
        all: orderStats.allOrders,
        pending: orderStats.pendingOrders,
        accepted: orderStats.acceptedOrders,
        preparing: orderStats.preparingOrders,
        completed: orderStats.completedOrders,
        cancelled: orderStats.cancelledOrders,
    }

    return (
        <div className="space-y-4 p-4 md:p-6">
            {/* Stats Header */}
            <div className="rounded-md border bg-card overflow-hidden">
                <div className="flex items-center justify-between border-b px-4 py-3 bg-card">
                    <h2 className="text-lg font-bold text-foreground">Order Status</h2>
                    <div className="flex items-center gap-4">
                        <Select defaultValue="30days">
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="yesterday">Yesterday</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="30days">Last 30 Days</SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <RefetchLoader isRefetching={isRefetching} handleRefetch={handleRefetch} />
                    </div>
                </div>
                <OnlineOrderStatsHeader stats={orderStats} />
            </div>

            {/* Orders List */}
            <div className="rounded-md border bg-card overflow-hidden">
                <OnlineOrderFilterTabs
                    filterStatus={filterStatus}
                    onFilterChange={setFilterStatus}
                    stats={tabStats}
                />

                <OnlineOrderSearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search by order ID, customer name, or phone"
                />

                <div className="p-4">
                    {ordersLoading ? (
                        <div className="flex h-full items-center justify-center min-h-100">
                            <Loading loading={true} />
                        </div>
                    ) : (
                        <OnlineOrderGrid
                            orders={orders}
                            filterStatus={filterStatus}
                            onSelectOrder={(order) => setSelectedOrderId(order.id)}
                        />
                    )}
                </div>
            </div>

            {/* Order Detail Modal */}
            <OnlineOrderDetailModal
                order={selectedOrder || null}
                open={!!selectedOrderId}
                onClose={() => setSelectedOrderId(null)}
            />
        </div>
    )
}

export default OnlineOrders