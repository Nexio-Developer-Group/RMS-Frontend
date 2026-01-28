/**
 * Permission Configuration
 * 
 * This file maps permissions to the routes and navigation items they grant access to.
 * The API determines which permissions a user has, and this config defines what access
 * each permission provides.
 * 
 * Structure:
 * - Each permission key maps to an object with:
 *   - routes: Array of route paths the permission grants access to
 *   - navigation: Array of navigation item keys the permission makes visible
 *   - description: Human-readable description of what the permission allows
 */

export type PermissionConfig = {
    routes?: string[]
    navigation?: string[]
    description: string
}

export type PermissionMapping = {
    [permissionKey: string]: PermissionConfig
}

/**
 * Permission to Access Mapping
 * 
 * Define what each permission grants access to in terms of routes and navigation.
 * Permissions are returned from the API based on user's role.
 */
const permissionConfig: PermissionMapping = {
    // ==================== POS MODULE ====================

    use_pos: {
        routes: ['/orders/panel','/orders/all'],
        navigation: ['POS', 'orders.panel', 'orders.all'],
        description: 'Access to POS module and order management',
    },

    place_order: {
        description: 'Ability to place new orders in POS',
    },

    apply_promotion: {
        description: 'Apply promotions and discounts to orders',
    },

    override_pricing: {
        description: 'Override item prices in orders',
    },

    cancel_order: {
        description: 'Cancel existing orders',
    },

    collect_payment: {
        description: 'Collect payments from customers',
    },

    generate_bill: {
        description: 'Generate bills for orders',
    },

    view_menu: {
        description: 'View menu items in POS',
    },

    view_placed_orders: {
        description: 'View orders that have been placed',
    },

    update_item_status: {
        description: 'Update status of order items (e.g., cooking, ready)',
    },

    priortize_order: {
        description: 'Mark orders as priority',
    },

    view_online_order: {
        routes: ['/online-orders'],
        navigation: ['online_orders'],
        description: 'View online orders',
    },

    manage_online_order: {
        description: 'Manage and process online orders',
    },

    // ==================== MENU MANAGEMENT ====================

    use_menu_management: {
        routes: ['/menu'],
        navigation: ['menu'],
        description: 'Access to menu management module',
    },

    manage_menu_category: {
        description: 'Create, edit, and delete menu categories',
    },

    manage_menu_items: {
        description: 'Create, edit, and delete menu items',
    },

    manage_menu_modifiers: {
        description: 'Manage item modifiers and customizations',
    },

    manage_menu_combos: {
        description: 'Create and manage combo meals',
    },

    // ==================== TABLE/SITTING MANAGEMENT ====================

    use_sitting_management: {
        routes: ['/table-management'],
        navigation: ['tableManagement'],
        description: 'Access to table/sitting management',
    },

    manage_table_structure: {
        description: 'Create, edit, and delete table layouts',
    },

    table_view_order_history: {
        description: 'View order history for tables',
    },

    // ==================== STAFF MANAGEMENT ====================

    use_staff_management: {
        routes: ['/staffs'],
        navigation: ['staffs'],
        description: 'Access to staff management module',
    },

    view_staff: {
        description: 'View staff members and their details',
    },

    manage_staff_profile: {
        description: 'Create, edit, and manage staff profiles',
    },

    manage_staff_salary: {
        description: 'Manage staff salaries and compensation',
    },

    view_staff_document: {
        description: 'View staff documents',
    },

    manage_staff_document: {
        description: 'Upload and manage staff documents',
    },

    manage_staff_access: {
        description: 'Manage staff permissions and access levels',
    },

    view_staff_salary_history: {
        description: 'View historical salary information',
    },

    // ==================== CUSTOMER MANAGEMENT ====================

    use_customer_management: {
        routes: ['/customers'],
        navigation: ['customers'],
        description: 'Access to customer management module',
    },

    view_customers: {
        description: 'View customer list and details',
    },

    manage_customer_profile: {
        description: 'Create and edit customer profiles',
    },

    view_customer_order_history: {
        description: 'View customer order history',
    },

    // ==================== EXPENSE TRACKER ====================

    use_expense_tracker: {
        routes: ['/expense-tracker'],
        navigation: ['expenseTracker'],
        description: 'Access to expense tracking module',
    },

    view_expenses: {
        description: 'View expense records',
    },

    manage_expenses: {
        description: 'Create, edit, and delete expenses',
    },

    // ==================== KITCHEN MANAGEMENT ====================

    use_kitchen_management: {
        routes: ['/kitchen-management'],
        navigation: ['kitchenManagement'],
        description: 'Access to kitchen management module',
    },

    // ==================== REPORTS ====================

    use_reports: {
        routes: ['/report'],
        navigation: ['report'],
        description: 'Access to reports and analytics',
    },

    // ==================== DASHBOARD ====================

    use_dashboard: {
        routes: ['/dashboard', '/home'],
        navigation: ['home'],
        description: 'Access to main dashboard',
    },
}

/**
 * Get all routes accessible with a given permission
 */
export function getRoutesForPermission(permission: string): string[] {
    return permissionConfig[permission]?.routes || []
}

/**
 * Get all navigation items accessible with a given permission
 */
export function getNavigationForPermission(permission: string): string[] {
    return permissionConfig[permission]?.navigation || []
}

/**
 * Get all routes a user can access based on their permissions
 */
export function getAccessibleRoutes(userPermissions: string[]): string[] {
    const routes = new Set<string>()

    userPermissions.forEach((permission) => {
        const permRoutes = getRoutesForPermission(permission)
        permRoutes.forEach((route) => routes.add(route))
    })

    return Array.from(routes)
}

/**
 * Get all navigation items a user can see based on their permissions
 */
export function getAccessibleNavigation(userPermissions: string[]): string[] {
    const navItems = new Set<string>()

    userPermissions.forEach((permission) => {
        const permNav = getNavigationForPermission(permission)
        permNav.forEach((nav) => navItems.add(nav))
    })

    return Array.from(navItems)
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(userPermissions: string[], routePath: string): boolean {
    const accessibleRoutes = getAccessibleRoutes(userPermissions)
    return accessibleRoutes.includes(routePath)
}

/**
 * Check if user can see a navigation item
 */
export function canSeeNavigation(userPermissions: string[], navKey: string): boolean {
    const accessibleNav = getAccessibleNavigation(userPermissions)
    return accessibleNav.includes(navKey)
}

/**
 * Get permission description
 */
export function getPermissionDescription(permission: string): string {
    return permissionConfig[permission]?.description || ''
}

/**
 * Get all available permissions
 */
export function getAllPermissions(): string[] {
    return Object.keys(permissionConfig)
}

export default permissionConfig
