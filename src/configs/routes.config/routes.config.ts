import authRoute from './authRoute'
import openRoutes from './openRoutes'
import adminRoutes from './adminRoutes'
import tenantAdminRoutes from './tenantAdminRoutes'
import userRoutes from './userRoutes'
import commonRoutes from './commonRoutes'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute, ...openRoutes]

export const protectedRoutes: Routes = [
    ...adminRoutes,
    ...tenantAdminRoutes,
    ...userRoutes,
    ...commonRoutes,
]
