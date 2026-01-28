export const signInUserData = [
    {
        id: '1',
        avatar: '',
        userName: 'Admin User',
        email: 'admin@test.com',
        authority: ['ADMIN'],
        password: 'password',
        accountUserName: 'admin',
        // Admin gets all permissions (as a super user)
        permissions: [
            'use_pos', 'place_order', 'apply_promotion', 'override_pricing',
            'cancel_order', 'collect_payment', 'generate_bill', 'view_menu',
            'view_placed_orders', 'update_item_status', 'priortize_order',
            'view_online_order', 'manage_online_order', 'use_menu_management',
            'manage_menu_category', 'manage_menu_items', 'manage_menu_modifiers',
            'manage_menu_combos', 'use_sitting_management', 'manage_table_structure',
            'table_view_order_history', 'use_staff_management', 'view_staff',
            'manage_staff_profile', 'manage_staff_salary', 'view_staff_document',
            'manage_staff_document', 'manage_staff_access', 'view_staff_salary_history',
            'use_customer_management', 'view_customers', 'manage_customer_profile',
            'view_customer_order_history', 'use_expense_tracker', 'view_expenses',
            'manage_expenses'
        ],
    },
    {
        id: '2',
        avatar: '',
        userName: 'Standard User',
        email: 'user@test.com',
        authority: ['USER'],
        password: 'password',
        accountUserName: 'user',
        // Standard user gets limited permissions
        permissions: ['view_menu', 'view_customers'],
    },
    {
        id: '3',
        avatar: '',
        userName: 'Tenant Admin',
        email: 'tenant@test.com',
        authority: ['TENANT_ADMIN'],
        password: 'password',
        accountUserName: 'tenant',
        // Tenant Admin gets owner-level permissions
        permissions: [
            'use_dashboard', 'use_pos', 'place_order', 'apply_promotion', 'override_pricing',
            'cancel_order', 'collect_payment', 'generate_bill', 'view_menu',
            'view_placed_orders', 'update_item_status', 'priortize_order',
            'view_online_order', 'manage_online_order', 'use_menu_management',
            'manage_menu_category', 'manage_menu_items', 'manage_menu_modifiers',
            'manage_menu_combos', 'use_sitting_management', 'manage_table_structure',
            'table_view_order_history', 'use_staff_management', 'view_staff',
            'manage_staff_profile', 'manage_staff_salary', 'view_staff_document',
            'manage_staff_document', 'manage_staff_access', 'view_staff_salary_history',
            'use_customer_management', 'view_customers', 'manage_customer_profile',
            'view_customer_order_history', 'use_expense_tracker', 'view_expenses',
            'manage_expenses', 'use_kitchen_management', 'use_reports'
        ],
    },
    {
        id: '4',
        avatar: '',
        userName: 'Test User',
        email: 'test@test.com',
        authority: ['CASHIER'],
        password: 'password',
        accountUserName: 'test',
        // Tenant Admin gets owner-level permissions from permission config
        permissions: ['use_pos', 'place_order', 'use_sitting_management', 'use_staff_management'],
    },
]

