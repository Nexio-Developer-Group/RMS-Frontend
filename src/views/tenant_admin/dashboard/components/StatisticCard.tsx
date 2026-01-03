import React from 'react'
import classNames from 'classnames'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface StatisticCardProps {
    title: string
    value: string | number
    growth?: number
    growthText?: string // e.g. "vs goal", "Stock issues..."
    growthType?: 'positive' | 'negative' | 'neutral'
    className?: string
}

const StatisticCard = ({
    title,
    value,
    growth,
    growthText,
    growthType = 'positive',
    className,
}: StatisticCardProps) => {
    return (
        <div
            className={classNames(
                'bg-white p-6 rounded-2xl border border-gray-100 shadow-sm',
                className,
            )}
        >
            <h4 className="text-teal-500 font-medium text-sm mb-2">{title}</h4>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">
                    {value}
                </span>
                {growth !== undefined && (
                    <div
                        className={classNames(
                            'flex items-center text-xs font-semibold mb-1',
                            {
                                'text-green-500': growthType === 'positive',
                                'text-red-500': growthType === 'negative',
                                'text-gray-500': growthType === 'neutral',
                            },
                        )}
                    >
                        {growth > 0 ? (
                            <TrendingUp size={14} className="mr-1" />
                        ) : (
                            <TrendingDown size={14} className="mr-1" />
                        )}
                        <span>{Math.abs(growth)}%</span>
                    </div>
                )}
                {growthText && (
                    <span className="text-xs text-gray-400 mb-1 ml-1">
                        {growthText}
                    </span>
                )}
            </div>
        </div>
    )
}

export default StatisticCard
