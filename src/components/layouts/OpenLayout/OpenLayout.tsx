import { lazy, Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import type { CommonProps } from '@/@types/common'
import type { LazyExoticComponent, ReactNode } from 'react'

type Layouts = Record<
    string,
    LazyExoticComponent<<T extends CommonProps>(props: T) => ReactNode>
>

const layouts: Layouts = {
    default: lazy(() => import('./components/Default')),
}

const OpenLayout = ({ children }: CommonProps) => {
    const AppLayout = layouts['default']

    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-screen">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout>{children}</AppLayout>
        </Suspense>
    )
}

export default OpenLayout
