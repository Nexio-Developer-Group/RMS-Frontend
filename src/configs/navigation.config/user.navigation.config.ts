import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import { USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const userNavigationConfig: NavigationTree[] = [
    {
        key: 'user.home',
        path: '/user/home',
        title: 'User Home',
        translateKey: 'nav.user.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [USER],
        subMenu: [],
    },
]

export default userNavigationConfig
