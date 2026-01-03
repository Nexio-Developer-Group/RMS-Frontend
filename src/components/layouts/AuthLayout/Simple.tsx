import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import authImg from '@/assets/mockup/hero-illustration.png'

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {
    return (
        <div className="grid lg:grid-cols-2 min-h-screen bg-white dark:bg-gray-900">
            <div className="hidden lg:flex flex-col justify-center items-center bg-teal-50 dark:bg-gray-800 p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 text-center max-w-md">
                    <img
                        src={authImg}
                        alt="Resto Flow"
                        className="w-full h-auto mb-8 rounded-2xl shadow-2xl"
                    />
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        Master your restaurant operations
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        The complete operating system for your culinary
                        business. Manage orders, inventory, and staff with ease.
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center p-8 lg:p-24 relative">
                <div className="w-full max-w-[400px]">
                    <div className="mb-8 lg:hidden flex justify-center">
                        {/* Logo can go here for mobile */}
                    </div>
                    {content}
                    {children
                        ? cloneElement(children as ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Simple
