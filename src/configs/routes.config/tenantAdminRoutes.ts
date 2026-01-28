import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const tenantAdminRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/Home')), // Placeholder
        authority: [],
    },
    {
        key: 'orders.panel',
        path: '/orders/panel',
        component: lazy(() => import('@/views/tenant_admin/orders/orderPanel')), // Placeholder
        authority: [],
    },
    {
        key: 'orders.all',
        path: '/orders/all',
        component: lazy(() => import('@/views/tenant_admin/orders/allOrders')), // Placeholder
        authority: [],
    },
    {
        key: 'online_orders',
        path: '/online-orders',
        component: lazy(() => import('@/views/tenant_admin/online_orders')), // Placeholder
        authority: [],
    },
    {
        key: 'menu',
        path: '/menu',
        component: lazy(() => import('@/views/tenant_admin/menu_management')), // Placeholder
        authority: [],
    },
    {
        key: 'tableManagement',
        path: '/table-management',
        component: lazy(() => import('@/views/tenant_admin/table_management')), // Placeholder
        authority: [],
    },
    {
        key: 'staffs',
        path: '/staffs',
        component: lazy(() => import('@/views/tenant_admin/staff_management')), // Placeholder
        authority: [],
    },
    {
        key: 'kitchenManagement',
        path: '/kitchen-management',
        component: lazy(() => import('@/views/tenant_admin/kitchen_management')), // Placeholder
        authority: [],  
    },
    {
        key: 'expenseTracker',
        path: '/expense-tracker',
        component: lazy(() => import('@/views/tenant_admin/expense_tracker')), // Placeholder
        authority: [],
    },
    {
        key: 'customers',
        path: '/customers',
        component: lazy(() => import('@/views/tenant_admin/customers')), // Placeholder
        authority: [],
    },
    {
        key: 'report',
        path: '/report',
        component: lazy(() => import('@/views/tenant_admin/reports')), // Placeholder
        authority: [],
    },
]

export default tenantAdminRoutes
