import type { ReactNode } from 'react'
import Container from '@/components/shared/Container'

interface LegalLayoutProps {
    title: string
    lastUpdated: string
    children: ReactNode
}

const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => {
    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen">
            <div className="bg-slate-50 dark:bg-gray-900 py-16 lg:py-24 border-b border-slate-200 dark:border-gray-800">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-gray-100 mb-4">
                            {title}
                        </h1>
                        <p className="text-slate-500 dark:text-gray-400 font-medium">
                            Last updated: {lastUpdated}
                        </p>
                    </div>
                </Container>
            </div>
            <Container className="py-16 lg:py-24">
                <div className="max-w-3xl prose prose-slate dark:prose-invert prose-headings:font-bold prose-p:text-slate-600 dark:prose-p:text-gray-400 prose-li:text-slate-600 dark:prose-li:text-gray-400">
                    {children}
                </div>
            </Container>
        </div>
    )
}

export default LegalLayout
