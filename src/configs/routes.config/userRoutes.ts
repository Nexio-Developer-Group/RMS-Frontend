import { lazy } from 'react'
import { USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const userRoutes: Routes = [
    {
        key: 'library',
        path: '/library',
        component: lazy(() => import('@/views/library/Components')),
        authority: [USER],
    },
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [USER],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [USER],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [USER],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [USER],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView1')),
        authority: [USER],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/GroupCollapseMenuItemView2')),
        authority: [USER],
    },
]

export default userRoutes
