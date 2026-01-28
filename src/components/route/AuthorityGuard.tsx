import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthority from '@/utils/hooks/useAuthority'
import { hasPermission, hasAnyPermission } from '@/utils/permissionUtils'
import { useSessionUser } from '@/store/authStore'

type AuthorityGuardProps = PropsWithChildren<{
    userAuthority?: string[]
    authority?: string[]
    /**
     * Single permission required to access the route
     */
    requiredPermission?: string
    /**
     * Multiple permissions (user needs at least one)
     */
    requiredPermissions?: string[]
}>

const AuthorityGuard = (props: AuthorityGuardProps) => {
    const {
        userAuthority = [],
        authority = [],
        requiredPermission,
        requiredPermissions,
        children,
    } = props

    // Get user permissions from store
    const userPermissions = useSessionUser((state) => state.user.permissions ?? [])

    // Check authority (legacy system)
    const roleMatched = useAuthority(userAuthority, authority)

    // Check permissions (new system)
    let permissionMatched = true
    if (requiredPermission) {
        permissionMatched = hasPermission(userPermissions, requiredPermission)
    } else if (requiredPermissions && requiredPermissions.length > 0) {
        permissionMatched = hasAnyPermission(userPermissions, requiredPermissions)
    }

    // Allow access if either authority or permission check passes
    // This provides backward compatibility while supporting the new permission system
    const hasAccess = roleMatched && permissionMatched

    return <>{hasAccess ? children : <Navigate to="/access-denied" />}</>
}

export default AuthorityGuard
