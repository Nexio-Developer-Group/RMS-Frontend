import { Customer } from '@/@types/customers'
import { Badge } from '@/components/shadcn/ui/badge'
import { MoreVertical, ArrowUpDown } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { cn } from '@/components/shadcn/utils'

interface CustomerTableProps {
    customers: Customer[]
    onSelectCustomer: (customer: Customer) => void
}

const getStatusColor = (status: string) => {
    return status === 'Active'
        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
}

const CustomerTable = ({ customers, onSelectCustomer }: CustomerTableProps) => {
    if (customers.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No customers found</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto bg-card rounded-lg border">
            <table className="min-w-full text-sm">
                <thead className="border-b bg-muted/50">
                    <tr className="text-muted-foreground">
                        <th className="p-3 text-left font-medium">
                            <div className="flex items-center gap-1">
                                Cust. ID
                            </div>
                        </th>
                        <th className="p-3 text-left font-medium">
                            <div className="flex items-center gap-1">
                                Customer Name
                                <ArrowUpDown className="h-3 w-3" />
                            </div>
                        </th>
                        <th className="p-3 text-left font-medium">
                            Phone no.
                        </th>
                        <th className="p-3 text-left font-medium">
                            <div className="flex items-center gap-1">
                                Orders
                                <ArrowUpDown className="h-3 w-3" />
                            </div>
                        </th>
                        <th className="p-3 text-left font-medium">
                            Status
                        </th>
                        <th className="p-3 text-left font-medium">
                            <div className="flex items-center gap-1">
                                Total Amount
                                <ArrowUpDown className="h-3 w-3" />
                            </div>
                        </th>
                        <th className="p-3 text-left font-medium">
                            <div className="flex items-center gap-1">
                                Last Order On
                                <ArrowUpDown className="h-3 w-3" />
                            </div>
                        </th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr
                            key={customer.id}
                            className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                            onClick={() => onSelectCustomer(customer)}
                        >
                            <td className="p-3 font-medium text-foreground">
                                {customer.customerId}
                            </td>
                            <td className="p-3 text-foreground">
                                {customer.name}
                            </td>
                            <td className="p-3 text-foreground">
                                {customer.phoneNumber}
                            </td>
                            <td className="p-3">
                                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                                    {customer.totalOrders}
                                </button>
                            </td>
                            <td className="p-3">
                                <Badge className={cn('font-medium', getStatusColor(customer.status))}>
                                    {customer.status}
                                </Badge>
                            </td>
                            <td className="p-3 font-medium text-foreground">
                                ₹{customer.totalTransaction.toLocaleString()}
                            </td>
                            <td className="p-3 text-muted-foreground">
                                {customer.lastOrderedOn}
                            </td>
                            <td className="p-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1 hover:bg-accent rounded"
                                    >
                                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable
