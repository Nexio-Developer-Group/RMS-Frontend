import { lazy } from 'react'
import { ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const adminRoutes: Routes = [
    {
        key: 'admin.dashboard',
        path: '/admin/dashboard',
        component: lazy(() => import('@/views/Home')), // Placeholder
        authority: [ADMIN],
    },
]

export default adminRoutes
