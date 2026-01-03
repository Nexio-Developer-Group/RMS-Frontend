import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const adminNavigationConfig: NavigationTree[] = [
    {
        key: 'admin.dashboard',
        path: '/admin/dashboard',
        title: 'Admin Dashboard',
        translateKey: 'nav.admin.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
]

export default adminNavigationConfig
