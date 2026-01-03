import { ReactNode } from 'react'
import {
    PiSquaresFourDuotone,
    PiStorefrontDuotone,
    PiHouseDuotone,
    PiClipboardTextDuotone,
    PiScrollDuotone,
    PiTableDuotone,
    PiUsersDuotone,
    PiCookingPotDuotone,
    PiReceiptDuotone,
    PiUserListDuotone,
    PiChartLineUpDuotone,
} from 'react-icons/pi'

export type NavigationIcons = Record<string, ReactNode>

const navigationIcon: NavigationIcons = {
    home: <PiHouseDuotone />,
    dashboard: <PiSquaresFourDuotone />,
    orders: <PiClipboardTextDuotone />,
    menu: <PiScrollDuotone />,
    tableManagement: <PiTableDuotone />,
    staffs: <PiUsersDuotone />,
    kitchenManagement: <PiCookingPotDuotone />,
    expenseTracker: <PiReceiptDuotone />,
    customers: <PiUserListDuotone />,
    report: <PiChartLineUpDuotone />,
    singleMenu: <PiSquaresFourDuotone />,
    collapseMenu: <PiSquaresFourDuotone />,
    groupSingleMenu: <PiSquaresFourDuotone />,
    groupCollapseMenu: <PiSquaresFourDuotone />,
    groupMenu: <PiSquaresFourDuotone />,
}

export default navigationIcon
