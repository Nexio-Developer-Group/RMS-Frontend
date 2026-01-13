import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Order } from "@/@types/orders";

interface Props {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: Props) {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            #{order.id} — {order.type}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Customer:</strong> {order.customer}
          </p>
          <p>
            <strong>Payment:</strong> {order.payment}
          </p>
          <p>
            <strong>Seating:</strong> {order.table}
          </p>
        </div>

        <div className="mt-4">
          <table className="w-full text-sm border-t">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Item</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Amount</th>
                <th className="p-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((i) => (
                <tr key={i.name} className="border-t">
                  <td className="p-2">{i.name}</td>
                  <td className="p-2 text-center">{i.qty}</td>
                  <td className="p-2 text-center">${i.amount}</td>
                  <td className="p-2 text-right">${i.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t pt-4 text-sm space-y-1">
          <p>Order Value: ${order.value}</p>
          <p>Tax: ${order.tax}</p>
          <p>Service Charge: ${order.serviceCharge}</p>
          <p className="font-semibold">Total: ${order.total}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
