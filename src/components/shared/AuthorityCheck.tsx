import useAuthority from '@/utils/hooks/useAuthority'
import { hasPermission, hasAnyPermission } from '@/utils/permissionUtils'
import { useSessionUser } from '@/store/authStore'
import type { CommonProps } from '@/@types/common'

// Stable empty array reference to avoid infinite loops
const EMPTY_PERMISSIONS: string[] = []

interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
    requiredPermission?: string // Single permission check
    requiredPermissions?: string[] // Multiple permissions (OR logic - user needs at least one)
}

const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority = [], authority = [], requiredPermission, requiredPermissions, children } = props

    // Get user permissions from store
    const permissions = useSessionUser((state) => state.user?.permissions)
    const userPermissions = permissions ?? EMPTY_PERMISSIONS

    // Check authority (legacy system)
    const roleMatched = useAuthority(userAuthority, authority)

    // Check permission (new system)
    let permissionMatched = true

    if (requiredPermission) {
        // Single permission check
        permissionMatched = hasPermission(userPermissions, requiredPermission)
    } else if (requiredPermissions && requiredPermissions.length > 0) {
        // Multiple permissions - user needs at least one
        permissionMatched = hasAnyPermission(userPermissions, requiredPermissions)
    }

    // Both checks must pass
    return <>{roleMatched && permissionMatched ? children : null}</>
}

export default AuthorityCheck
