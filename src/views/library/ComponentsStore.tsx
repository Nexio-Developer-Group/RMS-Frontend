import React from 'react'
import LiveOnlineOrders1 from '@/components/custom/LiveOnlineOrders'
import RecentOrders1 from '@/components/custom/RecentOrders'

export type ComponentsData = {
    id: string
    name: string
    tags: string
    preview: () => React.ReactNode
}

export const componentsStore: ComponentsData[] = [
    {
        id: 'comp1',
        name: 'Live Online Orders #1',
        tags: 'Order POS',
        preview: () => (
            <LiveOnlineOrders1
                orderId="ZOM-4335"
                platform="Zomato"
                amount={99.99}
                items={[
                    { name: 'Butter Chicken', quantity: 1 },
                    { name: 'Naan Bread', quantity: 2 },
                    { name: 'Biryani', quantity: 1 },
                    { name: 'Butter Chicken', quantity: 1 },
                    { name: 'Naan Bread', quantity: 2 },
                    { name: 'Biryani', quantity: 1 },
                ]}
                placedAgo="5 minutes ago"
                onAccept={() => {}}
                onReject={() => {}}
            />
        ),
    },
    {
        id: 'comp2',
        name: 'Recent Orders #1',
        tags: 'Dashboard',
        preview: () => (
            <RecentOrders1
                orderId="0042"
                orderType="Dine-In"
                tableNumber="12"
                amount={23.98}
                items={[
                    { name: 'Butter Chicken', quantity: 1 },
                    { name: 'Naan Bread', quantity: 2 },
                    { name: 'Biryani', quantity: 1 },
                    { name: 'Butter Chicken', quantity: 1 },
                    { name: 'Naan Bread', quantity: 2 },
                    { name: 'Biryani', quantity: 1 },
                ]}
                status="Preparing"
                placedAgo="2 minutes ago"
            />
        ),
    },
    {
        id: 'comp1',
        name: 'Live Online Orders #1',
        tags: 'Order POS',
        preview: () => (
            <LiveOnlineOrders1
                orderId="SWI-3325"
                platform="Swiggy"
                amount={99.99}
                items={[
                    { name: 'Product A', quantity: 1 },
                    { name: 'Product B', quantity: 2 },
                ]}
                placedAgo="5 minutes ago"
                onAccept={() => {}}
                onReject={() => {}}
            />
        ),
    },
]
