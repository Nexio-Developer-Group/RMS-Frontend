import { useState } from 'react'
import AllOrderTypeHeader from './components/AllOrderTypeHeader'
import SearchBar from '../../components/SearchBar'
import { OrderList } from './components/OrderList'
import OrderDetailModal from '../../components/OrderDetailModal'
import Loading from '@/components/shared/Loading'
import { useOrders } from '@/hooks/useOrder'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'
import StatCard from '../../components/StatCard'
import RefetchLoader from '@/components/custom/RefetchLoader'
import { useTenantDashboard } from '@/hooks/useTenantDashboard'
import { useOrderDetail } from '@/hooks/useOrderDetail'

const AllOrders = () => {
    const [allOrderType, setAllOrderType] = useState<'live-orders' | 'kds-setup'>('live-orders')
    const [search, setSearch] = useState('')

    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

    const { orders, loading } = useOrders(allOrderType, search)
    const { order: selectedOrder, loading: orderDetailLoading } = useOrderDetail(selectedOrderId)
    const { data, refetch } = useTenantDashboard()
    const [isRefetching, setIsRefetching] = useState(false)

    const handleRefetch = () => {
        setIsRefetching(true)
        refetch()
        setTimeout(() => {
            setIsRefetching(false)
        }, 1000)
    }


    const stats = data?.stats || {
        totalRevenue: 0,
        totalRevenueGrowth: 0,
        profitVsGoal: 0,
        profitVsGoalGrowth: 0,
        moneyLost: 0,
        itemSold: 0,
        itemSoldGrowth: 0,
    }

    return (
        <div className="space-y-4">
            <div className="flex min-h-0 h-[70vh] flex-col gap-4 md:h-[60vh] xl:h-[70vh] 2xl:h-[66vh] md:flex-row">
                <div className="hidden h-full min-h-0 flex-1 flex-col gap-4 md:flex">
                    <div className="shrink-0 rounded-md border bg-card">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-4 py-2">
                            <h2 className="text-lg font-bold text-foreground">
                                Order Status
                            </h2>
                            <div className="flex items-center gap-4">
                                <Select defaultValue="30days">
                                    <SelectTrigger className="w-35">
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

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Total Revenue"
                                value={stats.totalRevenue.toLocaleString()}
                                className="border-r"
                                trend={{
                                    value: stats.totalRevenueGrowth,
                                    isPositive: stats.totalRevenueGrowth > 0,
                                }}
                            />

                            <StatCard
                                title="Profit Vs Goal"
                                value={`${stats.profitVsGoal}%`}
                                subtitle="vs goal"
                                className="border-r"
                                trend={{
                                    value: stats.profitVsGoalGrowth,
                                    isPositive:
                                        stats.profitVsGoalGrowth > 0,
                                }}
                            />

                            <StatCard
                                title="Money Lost"
                                value={`₹${(
                                    stats.moneyLost / 100000
                                ).toFixed(1)}L`}
                                subtitle="Stock issues & low traffic"
                                className="border-r"
                            />

                            <StatCard
                                title="Item Sold"
                                value={stats.itemSold.toLocaleString()}
                                trend={{
                                    value: stats.itemSoldGrowth,
                                    isPositive: stats.itemSoldGrowth > 0,
                                }}
                            />
                        </div>
                    </div>

                    <div className="rounded-md border bg-card">
                        <AllOrderTypeHeader
                            allOrderType={allOrderType}
                            onAllOrderTypeChange={setAllOrderType}
                        />

                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Search by order ID or customer"
                        />

                        <div className="p-4">
                            {loading ? (
                                <div className="flex h-full items-center justify-center min-h-100">
                                    <Loading loading={true} />
                                </div>
                            ) : (
                                <OrderList
                                    orders={orders}
                                    onSelectOrder={(order) => setSelectedOrderId(order.id)}
                                />
                            )}
                        </div>

                        <OrderDetailModal
                            order={selectedOrder}
                            orderId={selectedOrderId}
                            loading={orderDetailLoading}
                            onClose={() => setSelectedOrderId(null)}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AllOrders
