import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const tenantAdminRoutes: Routes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/tenant_admin/dashboard')),
        authority: [],
    },
    {
        key: 'pos',
        path: '/pos',
        component: lazy(() => import('@/views/tenant_admin/pos')),
        authority: [],
    },
    {
        key: 'orders',
        path: '/orders',
        component: lazy(() => import('@/views/tenant_admin/orders')),
        authority: [],
    },
    {
        key: 'orders.panel',
        path: '/orders/panel',
        component: lazy(() => import('@/views/tenant_admin/orders/orderPanel')),
        authority: [],
    },
    {
        key: 'orders.all',
        path: '/orders/all',
        component: lazy(() => import('@/views/tenant_admin/orders/allOrders')),
        authority: [],
    },
    {
        key: 'online_orders',
        path: '/online-orders',
        component: lazy(() => import('@/views/tenant_admin/online_orders')),
        authority: [],
    },
    {
        key: 'menu',
        path: '/menu',
        component: lazy(() => import('@/views/tenant_admin/menu_management')),
        authority: [],
    },
    {
        key: 'tableManagement',
        path: '/table-management',
        component: lazy(() => import('@/views/tenant_admin/table_management')),
        authority: [],
    },
    {
        key: 'staffs',
        path: '/staffs',
        component: lazy(() => import('@/views/tenant_admin/staff_management')),
        authority: [],
    },
    {
        key: 'kitchenManagement',
        path: '/kitchen-management',
        component: lazy(() => import('@/views/tenant_admin/kitchen_management')),
        authority: [],
    },
    {
        key: 'expenseTracker',
        path: '/expense-tracker',
        component: lazy(() => import('@/views/tenant_admin/expense_tracker')),
        authority: [],
    },
    {
        key: 'customers',
        path: '/customers',
        component: lazy(() => import('@/views/tenant_admin/customers')),
        authority: [],
    },
    {
        key: 'report',
        path: '/report',
        component: lazy(() => import('@/views/tenant_admin/reports')),
        authority: [],
    },
]

export default tenantAdminRoutes
