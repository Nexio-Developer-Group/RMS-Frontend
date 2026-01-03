import React from 'react'
import Chart from 'react-apexcharts'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { RotateCcw, BarChart3, LineChart } from 'lucide-react'

const DashboardChart = () => {
    const series = [
        {
            name: 'Sales',
            data: [
                3500, 4200, 3800, 5100, 5200, 7800, 6500, 7200, 5800, 8100,
                5500, 5500, 4200, 3800, 4800, 4500, 6000, 4800, 7000, 7000,
            ],
        },
        {
            name: 'Impression',
            data: [
                2500, 3200, 2800, 3100, 3200, 5800, 4500, 5200, 3800, 6100,
                3500, 3500, 2200, 1800, 2800, 2500, 4000, 2800, 5000, 5000,
            ],
        },
    ]

    const options: ApexCharts.ApexOptions = {
        chart: {
            fontFamily: 'Inter, sans-serif',
            type: 'area',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: ['#0EA5E9', '#F97316'], // Sky blue and Orange
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.1,
                stops: [0, 90, 100],
            },
        },
        xaxis: {
            categories: [
                '1 Jan',
                '4 Jan',
                '8 Jan',
                '12 Jan',
                '15 Jan',
                '18 Jan',
                '22 Jan',
                '25 Jan',
                '29 Jan',
                '1 Feb',
                '5 Feb',
                '8 Feb',
                '12 Feb',
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px',
                },
                formatter: (value) => {
                    return value >= 1000 ? `${value / 1000}K` : `${value}`
                },
            },
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -20,
        },
        tooltip: {
            theme: 'light',
        },
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex gap-2">
                    {['Sales', 'Label', 'Label', 'Label', 'Label'].map(
                        (item, index) => (
                            <button
                                key={index}
                                className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                                    index === 0
                                        ? 'bg-white shadow-sm border border-gray-200 font-medium text-gray-900'
                                        : 'text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {item}
                            </button>
                        ),
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        <button className="p-1.5 bg-white shadow-sm rounded-md text-teal-600">
                            <BarChart3 size={16} />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-gray-900">
                            <LineChart size={16} />
                        </button>
                    </div>

                    <Select defaultValue="30days">
                        <SelectTrigger className="w-[140px] h-9">
                            <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="30days">Last 30 Days</SelectItem>
                            <SelectItem value="7days">Last 7 Days</SelectItem>
                        </SelectContent>
                    </Select>

                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div className="h-[400px] w-full">
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height="100%"
                />
            </div>
        </div>
    )
}

export default DashboardChart
