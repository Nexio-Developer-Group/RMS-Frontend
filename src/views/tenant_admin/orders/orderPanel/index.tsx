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
import type { OrderItem, MenuItem, OrderType, Table } from '@/@types/pos'
import { Badge } from '@/components/shadcn/ui/badge'

const OrderPanel = () => {
    const [orderType, setOrderType] = useState<OrderType>('dine-in')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
    const [selectedTable, setSelectedTable] = useState<Table | undefined>()
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false)

    const { data: posData, isLoading } = usePOSData()
    const { data: menuItems = [] } = useMenuItems(selectedCategory)

    const handleAddToOrder = (menuItem: MenuItem) => {
        const existingItemIndex = currentOrder.findIndex(
            (item) => item.menuItem.id === menuItem.id,
        )

        if (existingItemIndex > -1) {
            const updatedOrder = [...currentOrder]
            updatedOrder[existingItemIndex].quantity += 1
            setCurrentOrder(updatedOrder)
        } else {
            const newOrderItem: OrderItem = {
                id: `${menuItem.id}-${Date.now()}`,
                menuItem,
                quantity: 1,
                size: 'Small',
                addons: [],
            }
            setCurrentOrder([...currentOrder, newOrderItem])
        }

        // Auto-open cart on mobile when item is added
        if (window.innerWidth < 768) {
            setIsMobileCartOpen(true)
        }
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
                />
            </div>
        </div>
    )
}

export default OrderPanel
