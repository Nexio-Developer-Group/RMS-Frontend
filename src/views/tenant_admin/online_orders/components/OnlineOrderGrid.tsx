import { OnlineOrder, OnlineOrderFilterStatus } from '@/@types/onlineorder'
import OnlineOrderCard from './OnlineOrderCard'

interface OnlineOrderGridProps {
    orders: OnlineOrder[]
    filterStatus: OnlineOrderFilterStatus
    onSelectOrder: (order: OnlineOrder) => void
}

const OnlineOrderGrid = ({ orders, filterStatus, onSelectOrder }: OnlineOrderGridProps) => {
    const getFilteredOrders = () => {
        if (filterStatus === 'all') return orders
        return orders.filter(order => order.status.toLowerCase() === filterStatus)
    }

    const filteredOrders = getFilteredOrders()

    const getSectionTitle = () => {
        switch (filterStatus) {
            case 'pending':
                return 'Pending Orders'
            case 'accepted':
                return 'Order Accepted (Hold)'
            case 'preparing':
                return 'Preparing Orders'
            case 'completed':
                return 'Completed Orders'
            case 'cancelled':
                return 'Cancelled Orders'
            default:
                return 'All Orders'
        }
    }

    if (filteredOrders.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No orders found</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">
                {getSectionTitle()} ({filteredOrders.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map((order) => (
                    <OnlineOrderCard
                        key={order.id}
                        order={order}
                        onClick={() => onSelectOrder(order)}
                    />
                ))}
            </div>
        </div>
    )
}

export default OnlineOrderGrid
