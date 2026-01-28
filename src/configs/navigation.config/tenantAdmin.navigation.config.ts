import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

/**
 * Tenant Admin Navigation Configuration
 * 
 * Navigation items are now controlled by permissions, not roles.
 * The `requiredPermission` field determines if a navigation item is visible.
 * If a user has the permission, the navigation item will be shown.
 */
const tenantAdminNavigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Dashboard',
        translateKey: 'nav.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [], // Empty authority, controlled by permissions
        requiredPermission: 'use_dashboard', // Permission required to see this item
        subMenu: [],
    },
    {
        key: 'POS',
        path: '',
        title: 'POS',
        translateKey: 'nav.orders.pos',
        icon: 'orders',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        // Show POS menu if user has any POS-related permission
        requiredPermissions: ['use_pos'],
        subMenu: [
            {
                key: 'orders.panel',
                path: '/orders/panel',
                title: 'Order Panel',
                translateKey: 'nav.orders.panel',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                requiredPermission: 'use_pos',
                subMenu: [],
            },
            {
                key: 'orders.all',
                path: '/orders/all',
                title: 'All Orders',
                translateKey: 'nav.orders.all',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                requiredPermission: 'use_pos', // Separate permission for all orders
                subMenu: [],
            },
        ],
    },
    {
        key: 'online_orders',
        path: '/online-orders',
        title: 'Online Orders',
        translateKey: 'nav.onlineOrders',
        icon: 'orders',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'view_online_order',
        subMenu: [],
    },
    {
        key: 'menu',
        path: '/menu',
        title: 'Menu',
        translateKey: 'nav.menu',
        icon: 'menu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_menu_management',
        subMenu: [],
    },
    {
        key: 'tableManagement',
        path: '/table-management',
        title: 'Table Management',
        translateKey: 'nav.tableManagement',
        icon: 'tableManagement',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_sitting_management',
        subMenu: [],
    },
    {
        key: 'staffs',
        path: '/staffs',
        title: 'Staffs',
        translateKey: 'nav.staffs',
        icon: 'staffs',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_staff_management',
        subMenu: [],
    },
    {
        key: 'kitchenManagement',
        path: '/kitchen-management',
        title: 'Kitchen Management',
        translateKey: 'nav.kitchenManagement',
        icon: 'kitchenManagement',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_kitchen_management',
        subMenu: [],
    },
    {
        key: 'expenseTracker',
        path: '/expense-tracker',
        title: 'Expense Tracker',
        translateKey: 'nav.expenseTracker',
        icon: 'expenseTracker',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_expense_tracker',
        subMenu: [],
    },
    {
        key: 'customers',
        path: '/customers',
        title: 'Customers',
        translateKey: 'nav.customers',
        icon: 'customers',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_customer_management',
        subMenu: [],
    },
    {
        key: 'report',
        path: '/report',
        title: 'Report',
        translateKey: 'nav.report',
        icon: 'report',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        requiredPermission: 'use_reports',
        subMenu: [],
    },
]

export default tenantAdminNavigationConfig
