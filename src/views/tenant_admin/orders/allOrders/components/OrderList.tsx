import { Order } from "@/@types/orders";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";

interface OrderListProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-700 hover:bg-green-100";
    case "preparing":
      return "bg-orange-50 text-orange-700 hover:bg-orange-100";
    case "pending":
      return "bg-yellow-50 text-yellow-700 hover:bg-yellow-100";
    case "cancelled":
      return "bg-red-50 text-red-700 hover:bg-red-100";
    default:
      return "bg-gray-50 text-gray-700 hover:bg-gray-100";
  }
};

export function OrderList({ orders, onSelectOrder }: OrderListProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="border-b">
          <tr className="text-gray-600">
            <th className="w-12 p-3">
              <Checkbox />
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Order
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Type
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Table / Customers
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Items
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Created By
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-left font-medium">
              <div className="flex items-center gap-1">
                Time
                <ArrowUpDown className="h-3 w-3 text-gray-400" />
              </div>
            </th>
            <th className="p-3 text-right font-medium">Amount</th>
            <th className="w-12 p-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer text-gray-700"
            >
              <td className="p-3">
                <Checkbox />
              </td>
              <td
                className="p-3 font-medium text-gray-900"
                onClick={() => onSelectOrder(order)}
              >
                #{order.orderCode ?? order.id.toString().padStart(4, "0")}
              </td>
              <td
                className="p-3"
                onClick={() => onSelectOrder(order)}
              >
                {order.type}
              </td>
              <td
                className="p-3"
                onClick={() => onSelectOrder(order)}
              >
                {order.table || "—"}
              </td>
              <td
                className="p-3"
                onClick={() => onSelectOrder(order)}
              >
                {order.items.length} Items
              </td>
              <td
                className="p-3"
                onClick={() => onSelectOrder(order)}
              >
                {order.createdBy}
              </td>
              <td
                className="p-3"
                onClick={() => onSelectOrder(order)}
              >
                <Badge className={`${getStatusColor(order.status)} border-0 font-medium`}>
                  {order.status}
                </Badge>
              </td>
              <td
                className="p-3"
                onClick={() => onSelectOrder(order)}
              >
                {order.time}
              </td>
              <td
                className="p-3 text-right font-medium"
                onClick={() => onSelectOrder(order)}
              >
                ${order.total.toFixed(2)}
              </td>
              <td className="p-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onSelectOrder(order)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Order</DropdownMenuItem>
                    <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Cancel Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
