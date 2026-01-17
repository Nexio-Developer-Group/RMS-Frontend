import { OnlineOrderStats } from '@/@types/onlineorder'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/components/shadcn/utils'

interface StatsCardProps {
    title: string
    value: string | number
    subtitle?: string
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

const StatsCard = ({ title, value, subtitle, trend, className }: StatsCardProps) => {
    return (
        <div className={cn('p-4 border-b md:border-b-0', className)}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">{title}</p>
                    <p className="text-xl md:text-2xl font-bold text-foreground">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                    )}
                </div>
                {trend && (
                    <div className={cn(
                        'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded',
                        trend.isPositive
                            ? 'text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                            : 'text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
                    )}>
                        {trend.isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                        ) : (
                            <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(trend.value)}%
                    </div>
                )}
            </div>
        </div>
    )
}

interface OnlineOrderStatsHeaderProps {
    stats: OnlineOrderStats
}

const OnlineOrderStatsHeader = ({ stats }: OnlineOrderStatsHeaderProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="All Orders"
                value={stats.allOrders.toLocaleString()}
                className="sm:border-r"
            />
            <StatsCard
                title="Pending Orders"
                value={stats.pendingOrders.toLocaleString()}
                className="lg:border-r"
            />
            <StatsCard
                title="Order Accepted (Hold)"
                value={stats.acceptedOrders.toLocaleString()}
                className="sm:border-r"
            />
            <StatsCard
                title="Completed Orders"
                value={stats.completedOrders.toLocaleString()}
            />
        </div>
    )
}

export default OnlineOrderStatsHeader
