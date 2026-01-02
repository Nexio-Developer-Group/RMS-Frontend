import { lazy } from 'react'
import { TENANT_ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const tenantAdminRoutes: Routes = [
    {
        key: 'tenantAdmin.dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/Home')), // Placeholder
        authority: [TENANT_ADMIN],
    },
]

export default tenantAdminRoutes
