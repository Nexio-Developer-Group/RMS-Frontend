"use client"

import { useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { BarChart3, LineChart as LineChartIcon } from 'lucide-react'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/shadcn/ui/chart"
import RefetchLoader from '@/components/custom/RefetchLoader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs"
import { cn } from '@/components/shadcn/utils'

const chartData = [
    { name: '1 Jan', sales: 3500, profit: 7000 },
    { name: '8 Jan', sales: 4200, profit: 7800 },
    { name: '15 Jan', sales: 5100, profit: 9200 },
    { name: '22 Jan', sales: 8100, profit: 10500 },
    { name: '29 Jan', sales: 6500, profit: 9800 },
    { name: '5 Feb', sales: 7200, profit: 6500 },
    { name: '12 Feb', sales: 6500, profit: 6800 },
]

const chartConfig = {
    sales: {
        label: "Sales",
        color: "var(--blue-500)", // Now you can use var(--) syntax!
    },
    profit: {
        label: "Profit",
        color: "var(--orange-500)", // Any Tailwind color works!
    },
} satisfies ChartConfig

const DashboardChart = ({ className }: { className?: string }) => {
    const [chartType, setChartType] = useState<'bar' | 'line'>('line')
    const [isRefetching, setIsRefetching] = useState(false)

    const handleRefetch = () => {
        setIsRefetching(true)
        setTimeout(() => {
            setIsRefetching(false)
        }, 1000)
    }

    return (
        <div className={cn("bg-card rounded-lg flex flex-col h-full min-h-0", className)}>
            <div className="flex items-center border-b px-4 py-2 justify-between shrink-0">
                <div className="flex gap-2 flex-wrap">
                    <Tabs defaultValue="sales" className="w-full">
                        <TabsList className="flex gap-1">
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="profit">Profit</TabsTrigger>
                            <TabsTrigger value="label">Label</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex items-center gap-4">
                    <Tabs defaultValue="line" className="w-full">
                        <TabsList className="flex gap-1">
                            <TabsTrigger
                                value="line"
                                className="
                                p-1.5
                                rounded-md
                                text-blue-500
                                data-[state=active]:text-blue-500
                              "
                            >
                                <BarChart3 size={16} />
                            </TabsTrigger>

                            <TabsTrigger
                                value="bar"
                                className="
                                p-1.5
                                rounded-md
                                text-blue-500
                                data-[state=active]:text-blue-500
                              "
                            >
                                <LineChartIcon size={16} />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>


                    <Select defaultValue="30days">
                        <SelectTrigger>
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="7days">Last 7 Days</SelectItem>
                            <SelectItem value="90days">Last 90 Days</SelectItem>
                        </SelectContent>
                    </Select>

                    <RefetchLoader isRefetching={isRefetching} handleRefetch={handleRefetch} />
                </div>
            </div>

            <div className="flex-1 p-4 min-h-0">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value / 1000}K`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="sales"
                            type="monotone"
                            stroke="var(--color-sales)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="profit"
                            type="monotone"
                            stroke="var(--color-profit)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </div>
    )
}

export default DashboardChart
