import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/components/shadcn/utils'

interface StatCardProps {
    title: string
    value: string | number
    trend?: {
        value: number
        isPositive: boolean
    }
    subtitle?: string
    className?: string
}

const StatCard = ({ title, value, trend, subtitle, className }: StatCardProps) => {
    return (
        <div className={cn("px-4 py-4 min-h-0 justify-center flex flex-col", className)}>
            <div>
                <p className="text-sm text-muted-foreground font-normal mb-1">{title}</p>
                <div className='flex gap-2 items-baseline '>

                    <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-lg md:text-2xl font-bold text-blue-800 dark:text-blue-400">{value}</h3>
                        {trend && (
                            <span
                                className={cn(
                                    "text-xs flex items-center gap-0.5",
                                    trend.isPositive
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-red-600 dark:text-red-400"
                                )}
                            >
                                {trend.isPositive ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : (
                                    <TrendingDown className="h-3 w-3" />
                                )}
                                {trend.isPositive ? '+' : ''}{trend.value}% vs goal
                                
                            </span>
                        )}
                        {subtitle && (
                            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatCard
