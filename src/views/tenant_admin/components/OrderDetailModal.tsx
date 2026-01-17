import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import StatCard from "./StatCard";
import { Order, OrderChargeLine } from "@/@types/orders";

interface Props {
  orderId: number | null;
  order: Order | null;
  loading?: boolean;
  onClose: () => void;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const formatMoney = (value: number) => currencyFormatter.format(value);

const resolveCharges = (order: Order): OrderChargeLine[] =>
  order.charges ?? [
    { label: "Order Value", amount: order.value },
    { label: "Tax", amount: order.tax },
    { label: "Service Charge", amount: order.serviceCharge },
    { label: "Total", amount: order.total, emphasized: true },
  ];

export function OrderDetailModal({ orderId, order, loading, onClose }: Props) {
  const isOpen = !!orderId;

  if (!isOpen) return null;

  const chargeLines = order ? resolveCharges(order) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-3xl lg:max-w-5xl max-h-[90vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Order detail</DialogTitle>
        </DialogHeader>

        {loading && !order ? (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            Loading order details...
          </div>
        ) : order ? (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 border-b bg-teal-50 px-4 sm:px-6 py-3 sm:py-4 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <DialogTitle className="text-base sm:text-lg font-bold text-slate-900">
                  #{order.orderCode ?? order.id.toString().padStart(4, "0")}
                </DialogTitle>
                <Badge className="rounded-md border border-teal-200 bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-teal-800">
                  {order.type}
                </Badge>
              </div>

              <Badge className="rounded-full bg-orange-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-orange-800">
                {order.status}
              </Badge>
            </div>

            <div className="space-y-4 sm:space-y-6 bg-white px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <StatCard
                  title="Created by"
                  value={order.createdBy}
                  subtitle={order.customer}
                  className="h-full rounded-lg border bg-white shadow-sm"
                />
                <StatCard
                  title="Times"
                  value={order.time}
                  className="h-full rounded-lg border bg-white shadow-sm"
                />
                <StatCard
                  title="Payment"
                  value={order.paymentNote || order.paymentStatus || order.payment}
                  subtitle={order.payment}
                  className="h-full rounded-lg border bg-white shadow-sm"
                />
                <StatCard
                  title="Seating"
                  value={order.table || "—"}
                  subtitle={order.seatingArea}
                  className="h-full rounded-lg border bg-white shadow-sm"
                />
              </div>

              <div className="overflow-hidden rounded-lg border">
                {/* Desktop header */}
                <div className="hidden sm:grid grid-cols-12 bg-slate-50 px-3 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <div className="col-span-6">Items</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-center">Amount</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="divide-y">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="px-3 sm:px-4 py-3"
                    >
                      {/* Desktop grid layout */}
                      <div className="hidden sm:grid grid-cols-12 items-start text-sm text-slate-800">
                        <div className="col-span-6 space-y-1">
                          <p className="font-semibold">{item.name}</p>
                          {item.modifiers && item.modifiers.length > 0 && (
                            <p className="text-xs text-slate-500">
                              {item.modifiers
                                .map((mod) =>
                                  `${mod.label}${typeof mod.price === "number" ? ` : ${formatMoney(mod.price)}` : ""}`
                                )
                                .join(", ")}
                            </p>
                          )}
                          {item.note && (
                            <p className="text-xs text-slate-500">{item.note}</p>
                          )}
                        </div>

                        <div className="col-span-2 text-center font-medium text-slate-700">
                          {item.qty}
                        </div>
                        <div className="col-span-2 text-center font-medium text-slate-700">
                          {formatMoney(item.amount)}
                        </div>
                        <div className="col-span-2 text-right font-semibold text-slate-900">
                          {formatMoney(item.total)}
                        </div>
                      </div>

                      {/* Mobile stacked layout */}
                      <div className="sm:hidden space-y-2 text-sm text-slate-800">
                        <div className="space-y-1">
                          <p className="font-semibold">{item.name}</p>
                          {item.modifiers && item.modifiers.length > 0 && (
                            <p className="text-xs text-slate-500">
                              {item.modifiers
                                .map((mod) =>
                                  `${mod.label}${typeof mod.price === "number" ? ` : ${formatMoney(mod.price)}` : ""}`
                                )
                                .join(", ")}
                            </p>
                          )}
                          {item.note && (
                            <p className="text-xs text-slate-500">{item.note}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                          <div className="flex gap-4">
                            <span className="text-slate-500">Qty: <span className="font-medium text-slate-700">{item.qty}</span></span>
                            <span className="text-slate-500">Amount: <span className="font-medium text-slate-700">{formatMoney(item.amount)}</span></span>
                          </div>
                          <span className="font-semibold text-slate-900">{formatMoney(item.total)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border bg-white px-3 sm:px-4 py-3 text-xs sm:text-sm text-slate-800">
                <div className="divide-y">
                  {chargeLines.map((charge) => (
                    <div
                      key={charge.label}
                      className="flex items-center justify-between py-1.5 sm:py-2"
                    >
                      <span
                        className={charge.emphasized ? "font-semibold" : "font-medium"}
                      >
                        {charge.label}
                      </span>
                      <span
                        className={
                          charge.emphasized
                            ? "text-base font-semibold text-blue-700"
                            : "text-sm font-medium"
                        }
                      >
                        {formatMoney(charge.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col gap-2 sm:gap-3 border-t bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 shrink-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2 order-2 sm:order-1">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Edit
                </Button>
              </div>

              <div className="flex items-center gap-2 order-1 sm:order-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Hold
                </Button>
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                  Print
                </Button>
                <Button size="sm" className="flex-1 sm:flex-none">Pay Now</Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            Order not found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
