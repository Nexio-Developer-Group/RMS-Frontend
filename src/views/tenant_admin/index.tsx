
import React from 'react'
import StatisticCard from '@/components/custom/StatisticCard'
import DashboardChart from '@/components/custom/DashboardChart'
import LiveOnlineOrders1 from '@/components/custom/LiveOnlineOrders'
import RecentOrders1 from '@/components/custom/RecentOrders'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'
import { ChartNoAxesCombined, RotateCcw } from 'lucide-react'


// Mock Data
const onlineOrders = [
    {
        orderId: 'ZOM-4335',
        platform: 'Zomato',
        amount: 23.55,
        items: [
            { name: 'Butter Chicken', quantity: 1 },
            { name: 'Naan Bread', quantity: 2 },
            { name: 'Biryani', quantity: 1 },
        ],
        placedAgo: '2 minutes ago',
    },
    {
        orderId: 'SGY-9921',
        platform: 'Swiggy',
        amount: 45.00,
        items: [
            { name: 'Paneer Tikka', quantity: 2 },
            { name: 'Garlic Naan', quantity: 3 },
        ],
        placedAgo: '5 minutes ago',
    },
    {
        orderId: 'ZOM-4336',
        platform: 'Zomato',
        amount: 12.50,
        items: [
            { name: 'Veg Burger', quantity: 2 },
            { name: 'Fries', quantity: 1 },
        ],
        placedAgo: '8 minutes ago',
    },
]

const recentOrders = [
    {
        orderId: '0042',
        orderType: 'Dine-in',
        tableNumber: 'Table 12',
        amount: 23.98,
        status: 'Preparing',
        placedAgo: '2 minutes ago',
        items: [
            { name: 'Butter Chicken', quantity: 1 },
            { name: 'Naan Bread', quantity: 2 },
            { name: 'Biryani', quantity: 1 },
            { name: 'Butter Chicken', quantity: 1 },
            { name: 'Naan Bread', quantity: 2 },
            { name: 'Biryani', quantity: 1 },
        ]
    },
    {
        orderId: '0043',
        orderType: 'Dine-in',
        tableNumber: 'Table 08',
        amount: 55.20,
        status: 'Preparing',
        placedAgo: '5 minutes ago',
        items: [
            { name: 'Paneer Masala', quantity: 2 },
            { name: 'Roti', quantity: 4 },
        ]
    },
    {
        orderId: '0044',
        orderType: 'Takeaway',
        tableNumber: '-',
        amount: 18.50,
        status: 'Ready',
        placedAgo: '12 minutes ago',
        items: [
            { name: 'Chicken Wrap', quantity: 2 },
            { name: 'Coke', quantity: 2 },
        ]
    },
    {
        orderId: '0042',
        orderType: 'Dine-in',
        tableNumber: 'Table 12',
        amount: 23.98,
        status: 'Preparing',
        placedAgo: '2 minutes ago',
        items: [
            { name: 'Butter Chicken', quantity: 1 },
            { name: 'Naan Bread', quantity: 2 },
            { name: 'Biryani', quantity: 1 },
            { name: 'Butter Chicken', quantity: 1 },
            { name: 'Naan Bread', quantity: 2 },
            { name: 'Biryani', quantity: 1 },
        ]
    },
]

const TenantAdminDashboard = () => {
    return (
        <div className='space-y-6'>
            {/* Main Content: Chart + Online Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Chart Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className='bg-card rounded-lg'>
                        <div className="flex items-center border-b border-gray-200 px-4 py-2 justify-between">
                            <h3 className="text-base font-bold">Status</h3>

                            <div className='flex items-center gap-2'>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Last 30 Days" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="yesterday">Yesterday</SelectItem>
                                    <SelectItem value="this-week">This Week</SelectItem>
                                    <SelectItem value="this-month">This Month</SelectItem>
                                    <SelectItem value="this-year">This Year</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer">
                                <RotateCcw size={18} />
                            </div>
                            </div>

                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {/* Total Revenue */}
                            <div className='p-4'>
                                <p className='text-gray-500 mb-1'>Total Revenue</p>
                                <p className='text-2xl font-bold text-[#1D3582] flex items-center gap-1'>12,000 <span className='text-primary-mild/80 text-xs flex items-center gap-1'><ChartNoAxesCombined size={8} /> + 12%</span></p> 
                            </div>
                            {/* Profit Vs Goal */}
                            <div className='p-4'>
                                <p className='text-gray-500 mb-1'>Profit Vs Goal</p>
                                <p className='text-2xl font-bold text-[#1D3582] flex items-center gap-1'>85% <span className='text-primary-mild/80 text-xs flex items-center gap-1'><ChartNoAxesCombined size={8} /> + 12%</span></p> 
                            </div>
                            {/* Money Lost */}
                            <div className='p-4'>
                                <p className='text-gray-500 mb-1'>Money Lost</p>
                                <p className='text-2xl font-bold text-[#1D3582] flex items-center gap-1'>₹8.9L <span className='text-gray-500 font-normal text-xs flex items-center gap-1'>Stock issues & low traffic</span></p> 
                            </div>
                            {/* Item Sold */}
                            <div className='p-4'>
                                <p className='text-gray-500 mb-1'>Item Sold</p>
                                <p className='text-2xl font-bold text-[#1D3582] flex items-center gap-1'>45,680 <span className='text-primary-mild/80 text-xs flex items-center gap-1'><ChartNoAxesCombined size={8} /> + 12%</span></p> 
                            </div>
                        </div>
                    </div>
                        <DashboardChart />

                </div>

                {/* Right Live Orders Column */}
                <div className="lg:col-span-1 bg-card flex rounded-lg flex-col">
                    <div className="flex items-center p-2 rounded-t-lg  px-4 bg-blue-100 justify-between">
                        <h3 className="text-base font-normal text-gray-900">Live Online Orders</h3>
                        <div className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer">
                            <RotateCcw size={18} />
                        </div>
                    </div>

                    <div className="overflow-x-auto p-4 space-y-4">

                    {onlineOrders.map((order) => (
                        <LiveOnlineOrders1
                            key={order.orderId}
                            {...order}
                            onAccept={(id) => console.log('Accept', id)}
                            onReject={(id) => console.log('Reject', id)}
                        />
                    ))}
                    </div>

                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-900">Recent Orders</h3>
                    <div className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer">
                        <RotateCcw size={18} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto pb-2">
                    {recentOrders.map((order, idx) => (
                        <RecentOrders1
                            key={`${order.orderId}-${idx}`}
                            {...order}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TenantAdminDashboard
