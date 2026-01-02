import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const openRoutes: Routes = [
    {
        key: 'public.landing',
        path: '/',
        component: lazy(() => import('@/views/public')),
        authority: [],
    },
    {
        key: 'public.privacyPolicy',
        path: '/privacy-policy',
        component: lazy(() => import('@/views/public/PrivacyPolicy')),
        authority: [],
    },
    {
        key: 'public.termsConditions',
        path: '/terms-and-conditions',
        component: lazy(() => import('@/views/public/TermsConditions')),
        authority: [],
    },
    {
        key: 'public.cookiePolicy',
        path: '/cookie-policy',
        component: lazy(() => import('@/views/public/CookiePolicy')),
        authority: [],
    },
]

export default openRoutes
