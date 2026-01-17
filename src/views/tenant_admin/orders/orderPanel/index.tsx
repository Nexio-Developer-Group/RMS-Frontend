import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcn/ui/sheet'
import { Button } from '@/components/shadcn/ui/button'
import { ShoppingCart } from 'lucide-react'
import { usePOSData, useMenuItems } from '@/hooks/usePOS'
import Loading from '@/components/shared/Loading'
import CategorySidebar from './components/CategorySidebar'
import MobileCategoryMenu from './components/MobileCategoryMenu'
import OrderTypeHeader from './components/OrderTypeHeader'
import SearchBar from '../../components/SearchBar'
import MenuGrid from './components/MenuGrid'
import CurrentOrderPanel from './components/CurrentOrderPanel'
import CustomizeItemModal from './components/CustomizeItemModal'
import PaymentModal from './components/PaymentModal'
import type { OrderItem, MenuItem, OrderType, Table, Addon } from '@/@types/pos'
import { Badge } from '@/components/shadcn/ui/badge'

const OrderPanel = () => {
    const [orderType, setOrderType] = useState<OrderType>('dine-in')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
    const [selectedTable, setSelectedTable] = useState<Table | undefined>()
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false)
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [editingOrderItem, setEditingOrderItem] = useState<OrderItem | null>(null)

    const { data: posData, isLoading } = usePOSData()
    const { data: menuItems = [] } = useMenuItems(selectedCategory)

    const handleAddToOrder = (menuItem: MenuItem) => {
        // Open customize modal for item customization
        setSelectedMenuItem(menuItem)
        setIsCustomizeModalOpen(true)
    }

    const handleCustomizeComplete = (
        menuItem: MenuItem,
        quantity: number,
        size: string,
        selectedAddons: Addon[]
    ) => {
        const newOrderItem: OrderItem = {
            id: `${menuItem.id}-${Date.now()}`,
            menuItem,
            quantity,
            size,
            addons: selectedAddons,
        }
        setCurrentOrder([...currentOrder, newOrderItem])

        // Auto-open cart on mobile when item is added
        if (window.innerWidth < 768) {
            setIsMobileCartOpen(true)
        }
    }

    const handleCustomizeUpdate = (
        itemId: string,
        quantity: number,
        size: string,
        selectedAddons: Addon[]
    ) => {
        setCurrentOrder(
            currentOrder.map((item) =>
                item.id === itemId
                    ? { ...item, quantity, size, addons: selectedAddons }
                    : item
            )
        )
    }

    const handleEditOrderItem = (orderItem: OrderItem) => {
        setSelectedMenuItem(orderItem.menuItem)
        setEditingOrderItem(orderItem)
        setIsCustomizeModalOpen(true)
    }

    const handleUpdateOrderItem = (itemId: string, updates: Partial<OrderItem>) => {
        setCurrentOrder(
            currentOrder.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item,
            ),
        )
    }

    const handleRemoveOrderItem = (itemId: string) => {
        setCurrentOrder(currentOrder.filter((item) => item.id !== itemId))
    }

    const handleClearOrder = () => {
        setCurrentOrder([])
        setSelectedTable(undefined)
    }

    const handleProcessPayment = (paymentMethod: 'Cash' | 'Card' | 'UPI') => {
        console.log('Processing payment with method:', paymentMethod)
        // Clear order after payment
        handleClearOrder()
    }

    const filteredMenuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const totalItems = currentOrder.reduce((sum, item) => sum + item.quantity, 0)

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center min-h-[100]">
                <Loading loading={true} />
            </div>
        )
    }

    return (
        <div className="flex max-h-screen gap-3">

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-card min-h-0 ">

                {/* Order Type Tabs */}
                <OrderTypeHeader orderType={orderType} onOrderTypeChange={setOrderType} className="shrink-0" />

                {/* Mobile Category Menu */}
                {posData?.categories && (
                    <MobileCategoryMenu
                        categories={posData.categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                    />
                )}

                {/* Main Content Flex Container */}
                <div className='flex flex-1 min-h-0 overflow-hidden '>

                    {/* Desktop Category Sidebar */}
                    {posData?.categories && (
                        <CategorySidebar
                            categories={posData.categories}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                        />
                    )}

                    {/* Menu Content Area */}
                    <div className='flex-1 flex flex-col min-h-0 overflow-hidden '>

                        {/* Search Bar */}
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />

                        {/* Product Grid - Scrollable */}
                        <div className="flex-1 dark:bg-gray-950 bg-gray-50 overflow-y-auto p-4 md:p-6 min-h-0">
                            <MenuGrid items={filteredMenuItems} onItemSelect={handleAddToOrder} />
                        </div>

                    </div>

                </div>


                {/* Mobile Floating Cart Button */}
                <div className="md:hidden fixed bottom-4 right-4 z-40">
                    <Sheet open={isMobileCartOpen} onOpenChange={setIsMobileCartOpen}>
                        <SheetTrigger asChild>
                            <Button
                                size="lg"
                                className="rounded-full h-14 w-14 shadow-lg bg-orange-500 hover:bg-orange-600 relative"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-red-500">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:max-w-md p-0">
                            <CurrentOrderPanel
                                orderItems={currentOrder}
                                orderType={orderType}
                                selectedTable={selectedTable}
                                onTableSelect={setSelectedTable}
                                onUpdateItem={handleUpdateOrderItem}
                                onRemoveItem={handleRemoveOrderItem}
                                onClearOrder={handleClearOrder}
                                onPayClick={() => {
                                    setIsMobileCartOpen(false)
                                    setIsPaymentModalOpen(true)
                                }}
                                onEditItem={handleEditOrderItem}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Desktop Right Sidebar - Current Order */}
            <div className="hidden md:flex w-[30%] min-h-0 rounded-md">
                <CurrentOrderPanel
                    orderItems={currentOrder}
                    orderType={orderType}
                    selectedTable={selectedTable}
                    onTableSelect={setSelectedTable}
                    onUpdateItem={handleUpdateOrderItem}
                    onRemoveItem={handleRemoveOrderItem}
                    onClearOrder={handleClearOrder}
                    onPayClick={() => setIsPaymentModalOpen(true)}
                    onEditItem={handleEditOrderItem}
                />
            </div>

            {/* Customize Item Modal */}
            <CustomizeItemModal
                item={selectedMenuItem}
                open={isCustomizeModalOpen}
                onClose={() => {
                    setIsCustomizeModalOpen(false)
                    setSelectedMenuItem(null)
                    setEditingOrderItem(null)
                }}
                onAddToOrder={handleCustomizeComplete}
                onUpdateOrder={handleCustomizeUpdate}
                availableAddons={posData?.availableAddons || []}
                existingOrderItem={editingOrderItem}
            />

            {/* Payment Modal */}
            <PaymentModal
                open={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                totalAmount={currentOrder.reduce((sum, item) => {
                    const itemPrice = item.menuItem.price
                    const addonsPrice = item.addons.reduce((addonSum, addon) => addonSum + addon.price, 0)
                    return sum + (itemPrice + addonsPrice) * item.quantity
                }, 0)}
                onProcessPayment={handleProcessPayment}
            />
        </div>
    )
}

export default OrderPanel
