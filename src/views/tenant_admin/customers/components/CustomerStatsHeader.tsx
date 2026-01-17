import { CustomerStats } from '@/@types/customers'
import { cn } from '@/components/shadcn/utils'

interface StatsCardProps {
    title: string
    value: string | number
    className?: string
}

const StatsCard = ({ title, value, className }: StatsCardProps) => {
    return (
        <div className={cn('p-4 sm:p-6 border-b sm:border-b-0', className)}>
            <p className="text-sm text-muted-foreground mb-2">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
    )
}

interface CustomerStatsHeaderProps {
    stats: CustomerStats
}

const CustomerStatsHeader = ({ stats }: CustomerStatsHeaderProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2">
            <StatsCard
                title="Total Customers"
                value={stats.totalCustomers}
                className="sm:border-r"
            />
            <StatsCard
                title="Active Campaigns"
                value={stats.activeCampaigns}
            />
        </div>
    )
}

export default CustomerStatsHeader
