import { Card } from '@/components/shadcn/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { RotateCcw } from 'lucide-react'
import DashboardChart from './components/DashboardChart'
import LiveOnlineOrder from './components/LiveOnlineOrders'
import RecentOrder from './components/RecentOrders'
import StatCard from '../components/StatCard'
import { useTenantDashboard, useOrderActions } from '@/hooks/useTenantDashboard'
import Loading from '@/components/shared/Loading'
import { useState } from 'react'
import RefetchLoader from '@/components/custom/RefetchLoader'

const TenantAdminDashboard = () => {
    const { data, isLoading, isError, refetch } = useTenantDashboard()
    const { acceptOrder, rejectOrder } = useOrderActions()
    const [isRefetching, setIsRefetching] = useState(false)
    const [isOnlineOrdersRefetching, setIsOnlineOrdersRefetching] = useState(false)

    const handleRefetch = () => {
        setIsRefetching(true)
        refetch()
        setTimeout(() => {
            setIsRefetching(false)
        }, 1000)
    }

    const handleOnlineOrdersRefetch = () => {
        setIsOnlineOrdersRefetching(true)
        refetch()
        setTimeout(() => {
            setIsOnlineOrdersRefetching(false)
        }, 1000)
    }

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center min-h-100">
                <Loading loading={true} />
            </div>
        )
    }
    if (isError || !data) {
        return (
            <div className="text-center text-destructive p-10">
                Error loading dashboard data.
            </div>
        )
    }

    const { stats, onlineOrders, recentOrders } = data

    return (
        <div className='space-y-4'>
            <div className="gap-4 flex flex-col h-[70vh] md:h-[60vh]xl:h-[70vh] 2xl:h-[66vh] md:flex-row min-h-0">

                <div className="flex-col w-full hidden md:flex gap-4 flex-1 h-full min-h-0">
                    {/* Status Card */}
                    <div className="bg-card border rounded-md shrink-0">
                        <div className="flex items-center justify-between px-4 py-2 border-b ">
                            <h2 className="text-lg font-bold text-foreground">Status</h2>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Total Revenue"
                                value={stats.totalRevenue.toLocaleString()}
                                className='border-r'
                                trend={{
                                    value: stats.totalRevenueGrowth,
                                    isPositive: stats.totalRevenueGrowth > 0,
                                }}
                            />
                            <StatCard
                                title="Profit Vs Goal"
                                value={`${stats.profitVsGoal}%`}
                                className='border-r'
                                trend={{
                                    value: stats.profitVsGoalGrowth,
                                    isPositive: stats.profitVsGoalGrowth > 0,
                                }}
                                subtitle="vs goal"
                            />
                            <StatCard
                                title="Money Lost"
                                className='border-r'
                                value={`₹${(stats.moneyLost / 100000).toFixed(1)}L`}
                                subtitle="Stock issues & low traffic"
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

                    {/* Dashboard Chart */}
                    <DashboardChart className='border flex-1 min-h-0' />
                </div>

                {/* Live Online Orders */}
                <div className="flex flex-col md:w-[30%] xl:w-[30%] 2xl:w-[28%] bg-card rounded-lg border h-full min-h-0 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between rounded-t-lg p-3 border-b bg-blue-100 dark:bg-blue-950/70">
                        <h3 className="text-base font-semibold text-foreground">
                            Live Online Orders
                        </h3>
                        <RefetchLoader isRefetching={isOnlineOrdersRefetching} handleRefetch={handleOnlineOrdersRefetch} />
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {onlineOrders.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                No online orders at the moment
                            </div>
                        ) : (
                            onlineOrders.map((order) => (
                                <LiveOnlineOrder
                                    key={order.orderId}
                                    {...order}
                                    onAccept={(id) => acceptOrder(id)}
                                    onReject={(id) => rejectOrder(id)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-card border rounded-lg border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between bg-orange-100 dark:bg-orange-950/70 rounded-t-lg p-3 border-b">
                    <h3 className="text-base font-semibold text-foreground">
                        Recent Orders
                    </h3>
                    <RefetchLoader isRefetching={isRefetching} handleRefetch={handleRefetch} />
                </div>

                {recentOrders.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                        No recent orders
                    </div>
                ) : (
                    <div className="p-4 flex flex-row shrink-0 overflow-scroll gap-4">
                        {recentOrders.map((order, idx) => (
                            <RecentOrder key={`${order.orderId}-${idx}`} {...order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TenantAdminDashboard
