import { useState } from 'react'
import { Download, DollarSign, Clock, Users, MoreVertical } from 'lucide-react'
import { TableModel, TableOrder } from '@/services/tenant_admin/table_management/types'
import { Switch } from '@/components/shadcn/ui/switch'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'

type TableDetailsDialogProps = {
    isOpen: boolean
    onClose: () => void
    table: TableModel
    orders: TableOrder[]
    onToggleStatus: (id: string) => void
}

const TableDetailsDialog = ({
    isOpen,
    onClose,
    table,
    orders,
    onToggleStatus,
}: TableDetailsDialogProps) => {
    const [activeTab, setActiveTab] = useState('orders')

    const handleDownloadQR = () => {
        console.log('Downloading QR code for', table.name)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground font-semibold">
                            {table.number}
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-foreground">
                                {table.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">{table.floorName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mr-8">
                        <div className="flex items-center gap-2">
                            <Switch
                                id="table-enabled"
                                checked={table.enabled}
                                onCheckedChange={() => onToggleStatus(table.id)}
                            />
                            <Label htmlFor="table-enabled" className="text-sm text-muted-foreground">Enabled</Label>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30">
                    <div className="bg-card rounded-lg p-3 flex items-center gap-3 border">
                        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Total Revenue (Till Now)
                            </p>
                            <p className="text-lg font-bold text-foreground">
                                ₹{table.totalRevenue.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg p-3 flex items-center gap-3 border">
                        <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Total Orders (Till Now)
                            </p>
                            <p className="text-lg font-bold text-foreground">
                                {table.totalOrders}
                            </p>
                        </div>
                    </div>
                    <div className="bg-card rounded-lg p-3 flex items-center gap-3 border">
                        <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Capacity</p>
                            <p className="text-lg font-bold text-foreground">{table.capacity}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                        <div className="px-4 border-b">
                            <TabsList className="bg-transparent h-auto p-0 gap-6">
                                <TabsTrigger
                                    value="orders"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3"
                                >
                                    Orders
                                </TabsTrigger>
                                <TabsTrigger
                                    value="details"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3"
                                >
                                    Table Details
                                </TabsTrigger>
                                <TabsTrigger
                                    value="qr"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3"
                                >
                                    QR Details
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <TabsContent value="orders" className="m-0 p-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between pb-2">
                                        <div className="space-y-1">
                                            <Label>Table Status</Label>
                                            <Select value={table.status}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="available">Available</SelectItem>
                                                    <SelectItem value="occupied">Occupied</SelectItem>
                                                    <SelectItem value="reserved">Reserved</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="rounded-md border">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b bg-muted/50">
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Time</th>
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Order</th>
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Customers</th>
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Items</th>
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Amount</th>
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Created By</th>
                                                    <th className="text-left font-medium py-3 px-4 text-muted-foreground">Status</th>
                                                    <th className="w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map((order) => (
                                                    <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                                        <td className="py-3 px-4">{new Date(order.createdAt).toLocaleString()}</td>
                                                        <td className="py-3 px-4">{order.orderId}</td>
                                                        <td className="py-3 px-4 text-primary cursor-pointer hover:underline">Customer_Details</td>
                                                        <td className="py-3 px-4">{order.items.length} Items</td>
                                                        <td className="py-3 px-4">₹{order.totalAmount.toFixed(2)}</td>
                                                        <td className="py-3 px-4">{order.createdBy}</td>
                                                        <td className="py-3 px-4">
                                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                {order.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                                        <span>20 of 700 rows are shown.</span>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Previous</Button>
                                            <Button variant="outline" size="sm">Next</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="details" className="m-0 p-4">
                                <div className="max-w-2xl space-y-6">
                                    <div className="space-y-4 rounded-lg border p-4">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-medium">Table Details</h3>
                                            <p className="text-sm text-muted-foreground">Change the details of table if required</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Select Floor</Label>
                                                <Select value={table.floorId || "none"}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Floor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={table.floorId || "none"}>{table.floorName}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Capacity</Label>
                                                <Input type="number" value={table.capacity} readOnly />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 pt-4">
                                            <Button variant="outline">Cancel</Button>
                                            <Button>Save</Button>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="qr" className="m-0 p-4">
                                <div className="flex flex-col items-center justify-center py-8 text-center max-w-md mx-auto">
                                    <div className="w-64 h-64 mb-6 border-2 border-dashed rounded-xl flex items-center justify-center bg-white shadow-inner">
                                        <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center text-6xl">
                                            📱
                                        </div>
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        <h3 className="text-xl font-bold">QR Menu - {table.name}</h3>
                                        <a href={table.qrCode} className="text-primary hover:underline font-medium break-all">
                                            {table.qrCode}
                                        </a>
                                    </div>
                                    <p className="text-muted-foreground mb-8">
                                        Print this QR code and stick it on {table.name} so customers can scan and place their own orders.
                                    </p>
                                    <Button onClick={handleDownloadQR} size="lg" className="w-full">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download QR
                                    </Button>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TableDetailsDialog
