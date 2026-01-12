import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import UserProfileDropdown from '@/components/template/UserProfileDropdown'
import LayoutBase from '@/components/template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import Button from '@/components/ui/Button'
import {
    PiBellDuotone,
    PiArrowClockwiseBold,
    PiSunDuotone,
    PiMoonDuotone,
} from 'react-icons/pi'
import { TbChevronDown } from 'react-icons/tb'
import useDarkMode from '@/utils/hooks/useDarkMode'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { useEffect, useState } from 'react'

const CollapsibleSide = ({ children }: CommonProps) => {
    const { larger, smaller } = useResponsive()
    const [isDark, setIsDark] = useDarkMode()
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(interval) // cleanup
    }, [])

    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col"
        >
            <Header
                className="shadow-sm dark:shadow-2xl bg-white dark:bg-gray-900 z-30"
                headerStart={
                    <div className="flex items-center gap-4">
                        {smaller.lg && <MobileNav />}
                        {/* {larger.lg && <SideNavToggle />} */}

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 shrink-0 bg-[#EA580C] rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full text-white"
                                >
                                    <path
                                        d="M7 17L17 7M10 17L17 10"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-semibold leading-none mb-0.5">
                                    Somi
                                </span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                                    Restaurant
                                </span>
                            </div>
                        </div>

                        <div className="h-7 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

                        <div className="text-xs text-teal-500 dark:text-teal-400 font-medium hidden md:block">
                            {/* Update: 11/12/2025, 12:33 PM */}
                            {time.toLocaleString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </div>
                    </div>
                }
                headerEnd={
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Select  defaultValue="ahmedabad-1">
                            <SelectTrigger className="w-[57.5] hidden md:flex h-9 text-xs font-semibold">
                                <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ahmedabad-1">
                                    Ahmedabad - Devendra Nagar
                                </SelectItem>
                                <SelectItem value="ahmedabad-2">
                                    Ahmedabad - Prahlad Nagar
                                </SelectItem>
                                <SelectItem value="ahmedabad-3">
                                    Ahmedabad - Satellite Area
                                </SelectItem>
                                <SelectItem value="ahmedabad-4">
                                    Ahmedabad - Bodakdev
                                </SelectItem>
                                <SelectItem value="ahmedabad-5">
                                    Ahmedabad - Vastrapur
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select defaultValue="last-30-days">
                            <SelectTrigger className="w-[35] hidden md:flex h-9 text-xs font-semibold">
                                <SelectValue placeholder="Select Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="yesterday">
                                    Yesterday
                                </SelectItem>
                                <SelectItem value="last-7-days">
                                    Last 7 Days
                                </SelectItem>
                                <SelectItem value="last-30-days">
                                    Last 30 Days
                                </SelectItem>
                                <SelectItem value="this-month">
                                    This Month
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-1.5 sm:gap-2 ml-1">
                            <Button
                                size="sm"
                                shape="circle"
                                variant="plain"
                                className="w-9 h-9 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                onClick={() =>
                                    setIsDark(isDark ? 'light' : 'dark')
                                }
                                icon={
                                    isDark ? (
                                        <PiMoonDuotone className="text-xl" />
                                    ) : (
                                        <PiSunDuotone className="text-xl" />
                                    )
                                }
                            />
                            <Button
                                size="sm"
                                shape="circle"
                                variant="plain"
                                className="w-9 h-9 border hidden md:flex border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                icon={
                                    <PiArrowClockwiseBold className="text-lg text-slate-600 dark:text-slate-400" />
                                }
                            />
                            <Button
                                size="sm"
                                shape="circle"
                                variant="plain"
                                className="w-9 h-9 border hidden md:flex border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                icon={
                                    <PiBellDuotone className="text-xl text-slate-600 dark:text-slate-400" />
                                }
                            />
                        </div>

                        <div className="pl-1 border-l border-slate-100 dark:border-slate-800 ml-1">
                            <UserProfileDropdown hoverable={false} />
                        </div>
                    </div>
                }
            />
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <div className="h-full flex flex-auto flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide