import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const commonRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
]

export default commonRoutes
