import { useMemo } from 'react'
import { useSessionUser } from '@/store/authStore'
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permissionUtils'

// Stable empty array reference to avoid infinite loops
const EMPTY_PERMISSIONS: string[] = []

/**
 * Custom hook for checking user permissions
 * 
 * @returns Object with permission checking utilities
 * 
 * @example
 * function MyComponent() {
 *   const { can, canAny, canAll, permissions } = usePermission()
 *   
 *   if (can('place_order')) {
 *     // Show place order button
 *   }
 *   
 *   if (canAny(['override_pricing', 'apply_promotion'])) {
 *     // Show pricing controls
 *   }
 * }
 */
function usePermission() {
    const permissions = useSessionUser((state) => state.user?.permissions)
    const userPermissions = permissions ?? EMPTY_PERMISSIONS

    const permissionChecks = useMemo(() => {
        return {
            /**
             * Check if user has a specific permission
             * @param permission - The permission to check
             */
            can: (permission: string): boolean => {
                return hasPermission(userPermissions, permission)
            },

            /**
             * Check if user has at least one of the specified permissions
             * @param permissions - Array of permissions (user needs at least one)
             */
            canAny: (permissions: string[]): boolean => {
                return hasAnyPermission(userPermissions, permissions)
            },

            /**
             * Check if user has all of the specified permissions
             * @param permissions - Array of permissions (user needs all)
             */
            canAll: (permissions: string[]): boolean => {
                return hasAllPermissions(userPermissions, permissions)
            },

            /**
             * Get the raw permissions array for the current user
             */
            permissions: userPermissions,
        }
    }, [userPermissions])

    return permissionChecks
}

export default usePermission
