# Permission System Documentation

## Overview

The RMS-Frontend application uses a comprehensive permission system that provides fine-grained access control at both the page/route level and component/button level. This system allows you to control user access based on permissions returned from the authentication API.

## Key Concepts

### Permission Types

1. **Page-Level Permissions**: Prefixed with `use_` (e.g., `use_pos`, `use_menu_management`)
   - Control access to entire modules or pages
   - Example: Only users with `use_staff_management` can access the Staff Management module

2. **Component/Button-Level Permissions**: Specific action permissions (e.g., `place_order`, `apply_promotion`)
   - Control visibility and accessibility of specific UI elements
   - Example: Only users with `override_pricing` can see the price override button

### Permission Configuration

All permissions are defined in `src/configs/permissions.config.ts`. This file maps permissions to roles:

```typescript
POS: {
    use_pos: ['OWNER', 'OUTLET_MANAGER', 'CASHIER', 'WAITER'],
    place_order: ['OWNER', 'OUTLET_MANAGER', 'CASHIER', 'WAITER'],
    apply_promotion: ['OWNER', 'OUTLET_MANAGER', 'CASHIER'],
    override_pricing: ['OWNER', 'OUTLET_MANAGER'],
    // ...
}
```

## Using the Permission System

### 1. **For Component/Button Protection**

Use the `ProtectedComponent` wrapper to conditionally render UI elements:

#### Basic Usage - Single Permission

```tsx
import ProtectedComponent from '@/components/shared/ProtectedComponent'

function OrderPanel() {
  return (
    <div>
      <ProtectedComponent requiredPermission="place_order">
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </ProtectedComponent>
      
      <ProtectedComponent requiredPermission="cancel_order">
        <Button onClick={handleCancelOrder}>Cancel Order</Button>
      </ProtectedComponent>
    </div>
  )
}
```

#### Multiple Permissions (Any)

User needs at least ONE of the specified permissions:

```tsx
<ProtectedComponent requiredPermissions={['override_pricing', 'apply_promotion']}>
  <PricingControls />
</ProtectedComponent>
```

#### Multiple Permissions (All)

User needs ALL of the specified permissions:

```tsx
<ProtectedComponent 
  requiredPermissions={['manage_staff', 'view_staff_salary']} 
  requireAll
>
  <SalaryManagement />
</ProtectedComponent>
```

#### Show Disabled State

Instead of hiding the element, show it as disabled:

```tsx
<ProtectedComponent requiredPermission="cancel_order" showDisabled>
  <Button>Cancel Order</Button>
</ProtectedComponent>
```

#### With Fallback Content

Show alternative content when permission is denied:

```tsx
<ProtectedComponent 
  requiredPermission="manage_staff" 
  fallback={<div className="text-gray-400">Access Denied</div>}
>
  <StaffManagement />
</ProtectedComponent>
```

### 2. **Using the usePermission Hook**

For more complex permission logic in components:

```tsx
import usePermission from '@/utils/hooks/usePermission'

function MyComponent() {
  const { can, canAny, canAll, permissions } = usePermission()
  
  // Check single permission
  if (can('place_order')) {
    // Show place order UI
  }
  
  // Check if user has any of these permissions
  if (canAny(['override_pricing', 'apply_promotion'])) {
    // Show pricing controls
  }
  
  // Check if user has all of these permissions
  if (canAll(['manage_staff', 'view_staff_salary'])) {
    // Show full staff management
  }
  
  // Access raw permissions array
  console.log('User permissions:', permissions)
  
  return (
    <div>
      {can('view_menu') && <MenuDisplay />}
      <Button disabled={!can('place_order')}>Place Order</Button>
    </div>
  )
}
```

### 3. **Using Permission Utilities Directly**

For use outside of React components:

```typescript
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permissionUtils'

const userPermissions = ['use_pos', 'place_order', 'view_menu']

// Check single permission
const canPlaceOrder = hasPermission(userPermissions, 'place_order') // true

// Check any permission
const canManagePricing = hasAnyPermission(userPermissions, ['override_pricing', 'apply_promotion']) // false

// Check all permissions
const canManageOrders = hasAllPermissions(userPermissions, ['use_pos', 'place_order']) // true
```

### 4. **Route-Level Protection (Advanced)**

The `AuthorityGuard` component supports both the legacy authority system and the new permission system:

```tsx
import { Routes } from '@/@types/routes'

const routes: Routes = [
  {
    key: 'pos',
    path: '/pos',
    component: lazy(() => import('@/views/pos')),
    authority: [], // Keep empty for now (legacy system)
    // In the future, you can add permission checks in the component itself
  }
]
```

Currently, route-level permissions should be managed within the page component using `usePermission` or `ProtectedComponent`.

## Permission Naming Conventions

1. **Module Access**: `use_<module_name>` (e.g., `use_pos`, `use_menu_management`)
2. **Actions**: `<verb>_<noun>` (e.g., `place_order`, `manage_staff`, `view_customers`)
3. **Specific Features**: Descriptive names (e.g., `override_pricing`, `priortize_order`)

## Adding New Permissions

To add a new permission:

### Step 1: Update Permission Configuration

Edit `src/configs/permissions.config.ts`:

```typescript
MENU_MANAGEMENT: {
    // ... existing permissions
    
    // Add new permission
    export_menu_report: ['OWNER', 'OUTLET_MANAGER'],
}
```

### Step 2: Ensure API Returns the Permission

The login API should return the new permission in the `permissions` array for users with the appropriate role.

Mock data is in `src/mock/data/authData.ts`:

```typescript
{
    userName: 'Tenant Admin',
    role: 'OWNER',
    permissions: getPermissionsForRole('OWNER'), // Automatically includes new permission
}
```

### Step 3: Use in Components

```tsx
<ProtectedComponent requiredPermission="export_menu_report">
  <Button onClick={handleExportReport}>Export Report</Button>
</ProtectedComponent>
```

## Best Practices

1. **Always use descriptive permission names** that clearly indicate what they control
2. **Use page-level permissions** (prefixed with `use_`) to control access to entire modules
3. **Use component-level permissions** for specific actions within a module
4. **Group related permissions** in the same module section of the configuration
5. **Test permission checks** with different user roles to ensure proper access control
6. **Use `ProtectedComponent`** for simple show/hide logic
7. **Use `usePermission` hook** for complex conditional rendering or multiple permission checks
8. **Document custom permissions** when adding new ones to help team members understand their purpose

## Common Patterns

### Conditional Button Visibility

```tsx
const { can } = usePermission()

return (
  <div className="flex gap-2">
    <Button>View Menu</Button>
    {can('place_order') && <Button>Place Order</Button>}
    {can('cancel_order') && <Button variant="destructive">Cancel</Button>}
  </div>
)
```

### Feature Sections

```tsx
<ProtectedComponent requiredPermission="use_staff_management">
  <Card>
    <CardHeader>Staff Management</CardHeader>
    <CardContent>
      <ProtectedComponent requiredPermission="manage_staff_profile">
        <StaffProfileEditor />
      </ProtectedComponent>
      
      <ProtectedComponent requiredPermission="manage_staff_salary">
        <SalarySettings />
      </ProtectedComponent>
    </CardContent>
  </Card>
</ProtectedComponent>
```

### Progressive Disclosure

```tsx
const { can, canAny } = usePermission()

return (
  <div>
    {/* Everyone with POS access sees this */}
    {can('use_pos') && <OrderList />}
    
    {/* Only specific roles see pricing controls */}
    {canAny(['override_pricing', 'apply_promotion']) && (
      <PricingPanel />
    )}
    
    {/* Only owners see this */}
    {can('override_pricing') && <PriceOverride />}
  </div>
)
```

## API Response Format

The login API should return permissions in this format:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@nexiotech.com",
    "name": "System Admin",
    "role": "OWNER",
    "tenant_id": null,
    "tenant": null
  },
  "permissions": [
    "use_pos",
    "place_order",
    "apply_promotion",
    "override_pricing",
    "cancel_order",
    "collect_payment",
    "generate_bill",
    "..."
  ]
}
```

## Troubleshooting

### Permission Check Always Fails

1. **Check if permissions are loaded**: Use browser DevTools → Application → Local Storage → `sessionUser` to verify permissions are stored
2. **Verify permission name**: Ensure the permission name in your code matches exactly what's in `permissions.config.ts`
3. **Check API response**: Verify the login API returns the expected permissions
4. **Clear storage**: Clear local storage and log in again if permissions seem stale

### Component Not Rendering

1. **Check ProtectedComponent usage**: Ensure you're passing the correct prop (`requiredPermission` vs `requiredPermissions`)
2. **Verify user has permission**: Check the permissions array in localStorage
3. **Check for typos**: Permission names are case-sensitive

### Button Shows but is Not Disabled

If using `showDisabled` prop, ensure the component supports the `disabled` prop. Most standard HTML elements and UI library components support this.

## Migration from Authority-Based System

The permission system works alongside the existing authority-based system:

- **Authority arrays** in route configs remain in place but are set to `[]` (empty)
- **AuthorityGuard** checks both authority AND permissions
- **New components** should use the permission system exclusively
- **Existing components** can gradually migrate to permissions

This allows for a smooth transition without breaking existing functionality.
