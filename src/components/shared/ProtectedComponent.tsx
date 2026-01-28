import { ReactNode } from 'react'
import usePermission from '@/utils/hooks/usePermission'

type ProtectedComponentProps = {
    /**
     * Single permission required to see the component
     */
    requiredPermission?: string

    /**
     * Multiple permissions (user needs at least one unless requireAll is true)
     */
    requiredPermissions?: string[]

    /**
     * If true, user must have ALL permissions in requiredPermissions
     * If false (default), user needs at least ONE permission
     */
    requireAll?: boolean

    /**
     * Component to render when user doesn't have permission
     * If not provided, nothing will be rendered
     */
    fallback?: ReactNode

    /**
     * If true, render children as disabled instead of hiding them
     * Useful for buttons/inputs that should be visible but not clickable
     */
    showDisabled?: boolean

    /**
     * The content to protect with permission checks
     */
    children: ReactNode
}

/**
 * Component wrapper for permission-based rendering
 * 
 * Use this component to conditionally render UI elements based on user permissions.
 * 
 * @example
 * // Single permission check
 * <ProtectedComponent requiredPermission="place_order">
 *   <Button>Place Order</Button>
 * </ProtectedComponent>
 * 
 * @example
 * // Multiple permissions (needs at least one)
 * <ProtectedComponent requiredPermissions={['override_pricing', 'apply_promotion']}>
 *   <PricingControls />
 * </ProtectedComponent>
 * 
 * @example
 * // Multiple permissions (needs all)
 * <ProtectedComponent requiredPermissions={['manage_staff', 'view_staff_salary']} requireAll>
 *   <SalaryManagement />
 * </ProtectedComponent>
 * 
 * @example
 * // Show disabled state instead of hiding
 * <ProtectedComponent requiredPermission="cancel_order" showDisabled>
 *   <Button>Cancel Order</Button>
 * </ProtectedComponent>
 * 
 * @example
 * // With fallback content
 * <ProtectedComponent requiredPermission="manage_staff" fallback={<div>Access Denied</div>}>
 *   <StaffManagement />
 * </ProtectedComponent>
 */
const ProtectedComponent = ({
    requiredPermission,
    requiredPermissions,
    requireAll = false,
    fallback = null,
    showDisabled = false,
    children,
}: ProtectedComponentProps) => {
    const { can, canAny, canAll } = usePermission()

    // Determine if user has the required permission(s)
    let hasAccess = true

    if (requiredPermission) {
        hasAccess = can(requiredPermission)
    } else if (requiredPermissions && requiredPermissions.length > 0) {
        hasAccess = requireAll
            ? canAll(requiredPermissions)
            : canAny(requiredPermissions)
    }

    // If user has access, render children normally
    if (hasAccess) {
        return <>{children}</>
    }

    // If showDisabled is true and children have disabled prop support
    if (showDisabled && children) {
        // Clone the children and add disabled prop
        // This works for most common components like Button, Input, etc.
        try {
            const childElement = children as any
            if (childElement.type && typeof childElement.type !== 'string') {
                const Clone = childElement.type
                return <Clone {...childElement.props} disabled />
            }
        } catch (error) {
            // If cloning fails, just return fallback
            return <>{fallback}</>
        }
    }

    // Otherwise, show fallback or nothing
    return <>{fallback}</>
}

export default ProtectedComponent
