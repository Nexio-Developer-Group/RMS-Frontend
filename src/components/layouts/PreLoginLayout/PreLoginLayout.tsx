import authRoute from '@/configs/routes.config/authRoute'
import openRoutes from '@/configs/routes.config/openRoutes'
import { useLocation } from 'react-router-dom'
import AuthLayout from '../AuthLayout'
import OpenLayout from '../OpenLayout'
import type { CommonProps } from '@/@types/common'

const PreLoginLayout = ({ children }: CommonProps) => {
    const location = useLocation()

    const { pathname } = location

    const isAuthPath = authRoute.some((route) => route.path === pathname)
    const isOpenPath = openRoutes.some((route) => route.path === pathname)

    if (isAuthPath) {
        return <AuthLayout>{children}</AuthLayout>
    }

    if (isOpenPath) {
        return <OpenLayout>{children}</OpenLayout>
    }

    return <div className="flex flex-auto flex-col h-screen">{children}</div>
}

export default PreLoginLayout
