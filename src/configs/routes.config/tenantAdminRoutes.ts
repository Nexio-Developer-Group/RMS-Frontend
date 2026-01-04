import { lazy } from 'react'
import { TENANT_ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const tenantAdminRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/Home')), // Placeholder
        authority: [TENANT_ADMIN],
    },
    {
        key: 'orders.panel',
        path: '/orders/panel',
        component: lazy(() => import('@/views/tenant_admin/orders/orderPanel')), // Placeholder
        authority: [TENANT_ADMIN],
    },
    {
        key: 'orders.all',
        path: '/orders/all',
        component: lazy(() => import('@/views/tenant_admin/orders/allOrders')), // Placeholder
        authority: [TENANT_ADMIN],
    },
]

export default tenantAdminRoutes
