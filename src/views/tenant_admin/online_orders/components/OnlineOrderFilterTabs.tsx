import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { OnlineOrderFilterStatus } from '@/@types/onlineorder'
import { cn } from '@/components/shadcn/utils'

interface OnlineOrderFilterTabsProps {
    filterStatus: OnlineOrderFilterStatus
    onFilterChange: (status: OnlineOrderFilterStatus) => void
    stats?: {
        all: number
        pending: number
        accepted: number
        preparing: number
        completed: number
        cancelled: number
    }
    className?: string
}

const OnlineOrderFilterTabs = ({
    filterStatus,
    onFilterChange,
    stats,
    className,
}: OnlineOrderFilterTabsProps) => {
    return (
        <div className={cn('bg-card border-b px-4 py-3', className)}>
            <Tabs value={filterStatus} onValueChange={(v) => onFilterChange(v as OnlineOrderFilterStatus)}>
                <TabsList className="flex-wrap h-auto">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                        All Orders
                        {stats && (
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                {stats.all}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                        Pending Orders
                        {stats && stats.pending > 0 && (
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                {stats.pending}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="accepted" className="flex items-center gap-2">
                        Order Accepted (Hold)
                        {stats && stats.accepted > 0 && (
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                {stats.accepted}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="preparing" className="flex items-center gap-2">
                        Preparing
                        {stats && stats.preparing > 0 && (
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                                {stats.preparing}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex items-center gap-2">
                        Completed Orders
                        {stats && stats.completed > 0 && (
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                {stats.completed}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" className="flex items-center gap-2">
                        Cancelled Orders
                        {stats && stats.cancelled > 0 && (
                            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                {stats.cancelled}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default OnlineOrderFilterTabs
