import adminNavigationConfig from './admin.navigation.config'
import tenantAdminNavigationConfig from './tenantAdmin.navigation.config'
import userNavigationConfig from './user.navigation.config'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    ...adminNavigationConfig,
    ...tenantAdminNavigationConfig,
    ...userNavigationConfig,
]

export default navigationConfig
