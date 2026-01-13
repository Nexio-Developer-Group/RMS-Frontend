import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/components/shadcn/utils'

interface StatCardProps {
  title: string
  value: string | number
  trend?: { value: number; isPositive: boolean }
  subtitle?: string
  className?: string
}

const StatCard = ({ title, value, trend, subtitle, className }: StatCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center px-3 py-3 md:px-4 md:py-4 min-h-0 overflow-hidden', // contain content
        className
      )}
    >
      <p className="mb-1 text-sm font-normal text-teal-600 truncate">{title}</p>

      <div className="flex items-baseline gap-2 overflow-hidden min-w-0">
        {/* numeric value */}
        <h3
          className="text-lg md:text-2xl font-bold text-blue-800 dark:text-blue-400 shrink-0"
          title={String(value)}
        >
          {value}
        </h3>

        {/* growth trend */}
        {trend && (
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs shrink-0',
              trend.isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
            )}
            title={`${trend.isPositive ? '+' : ''}${trend.value}%`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
        )}

        {/* subtitle — may truncate */}
        {subtitle && (
          <p
            className="text-xs text-muted-foreground truncate"
            title={subtitle}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard
