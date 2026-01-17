import { Check, MoreVertical } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { Badge } from "@/components/shadcn/ui/badge"
import type { OrderItem } from "@/@types/kds"

type Props = {
  item: OrderItem
  onApprove: () => void
}

export const KDSItemRow = ({ item, onApprove }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-b-0">
      {/* Left: Item Info */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex gap-1">
          <span className="font-medium text-teal-600">
            {item.quantity} ×
          </span>
          <span className="text-md font-semibold text-foreground">
            {item.name}
          </span>
        </div>
        <span className="text-md font-semibold text-foreground">
          ${item.price}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {item.status === "prepared" ? (
          <Badge
            variant="secondary"
            className="rounded-full bg-green-100 text-green-600 font-medium"
          >
            Prepared
          </Badge>
        ) : (
          <Button
            size="icon"
            onClick={onApprove}
            className="h-8 w-8 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button size="icon" variant="ghost" className="h-8 w-8 border">
          <MoreVertical className="h-4 w-4" />
        </Button>

      </div>
    </div>
  )
}

export default KDSItemRow
