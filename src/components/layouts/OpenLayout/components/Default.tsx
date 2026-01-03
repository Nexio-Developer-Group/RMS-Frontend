import { ReactNode } from 'react'
import Logo from '@/components/template/Logo'
import { Link } from 'react-router-dom'
import Footer from '@/components/template/Footer'
import { Button } from '@/components/shadcn/ui/button'

interface OpenLayoutProps {
    children?: ReactNode
}

const OpenLayout = ({ children }: OpenLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex sticky top-0 z-50 items-center justify-between h-16 px-4 sm:px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center">
                    <Link to="/">
                        <Logo logoWidth={120} />
                    </Link>
                </div>
                <div className="flex items-center gap-8">
                    <a
                        href="#features"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#billing"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Billing
                    </a>
                    <a
                        href="#inventory"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Inventory
                    </a>
                    <a
                        href="#integrations"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Integrations
                    </a>
                    <a
                        href="#pricing"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Pricing
                    </a>
                    <Link to="/sign-in">
                        <Button variant="default">Sign In</Button>
                    </Link>
                </div>
            </header>
            <main className="grow">{children}</main>
            <Footer className="mt-32" />
        </div>
    )
}

export default OpenLayout
