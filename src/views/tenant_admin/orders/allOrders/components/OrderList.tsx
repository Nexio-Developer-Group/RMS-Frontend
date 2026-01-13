import { Order } from "@/@types/orders";

interface OrderListProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export function OrderList({ orders, onSelectOrder }: OrderListProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Table</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Created By</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="hover:bg-gray-50 cursor-pointer border-b"
            >
              <td className="p-3">#{order.id}</td>
              <td className="p-3">{order.type}</td>
              <td className="p-3">{order.table}</td>
              <td className="p-3">{order.customer}</td>
              <td className="p-3">{order.createdBy}</td>
              <td className="p-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  {order.status}
                </span>
              </td>
              <td className="p-3">{order.time}</td>
              <td className="p-3 text-right">${order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
