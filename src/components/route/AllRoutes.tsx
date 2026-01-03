import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AuthorityGuard from './AuthorityGuard'
import AppRoute from './AppRoute'
import PageContainer from '@/components/template/PageContainer'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import { lazy } from 'react'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}

type AllRoutesProps = ViewsProps

const { authenticatedEntryPath } = appConfig

const Components = lazy(() => import('@/views/library/Components'))

const AllRoutes = (props: AllRoutesProps) => {
    const { user } = useAuth()

    return (
        <Routes>
            <Route element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/"
                    element={<Navigate replace to={authenticatedEntryPath} />}
                />
                {protectedRoutes.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={
                            <AuthorityGuard
                                userAuthority={user.authority ?? []}
                                authority={route.authority}
                            >
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
            </Route>
            <Route
                path="/components"
                element={
                    <AppRoute routeKey="components" component={Components} />
                }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}

export default AllRoutes
