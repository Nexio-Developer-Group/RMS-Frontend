import { useState } from 'react'
import { Search, MoreVertical } from 'lucide-react'
import { useMenuData, useMenuItemActions, useModifierActions, useComboActions } from '@/hooks/useMenu'
import Loading from '@/components/shared/Loading'
import MenuHeader from './components/MenuHeader'
import ItemCard from './components/ItemCard'
import ModifierCard from './components/ModifierCard'
import ComboCard from './components/ComboCard'
import AddItemDialog from './components/AddItemDialog'
import AddModifierDialog from './components/AddModifierDialog'
import AddComboDialog from './components/AddComboDialog'
import type { MenuTab, MenuItem, Modifier, Combo } from '@/@types/menu'

const MenuManagement = () => {
    const [activeTab, setActiveTab] = useState<MenuTab>('items')
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
    const [editingModifier, setEditingModifier] = useState<Modifier | null>(null)
    const [editingCombo, setEditingCombo] = useState<Combo | null>(null)

    const { data: menuData, isLoading } = useMenuData()
    const itemActions = useMenuItemActions()
    const modifierActions = useModifierActions()
    const comboActions = useComboActions()

    // Filter data based on search
    const filteredItems = menuData?.items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    const filteredModifiers = menuData?.modifiers.filter((modifier) =>
        modifier.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    const filteredCombos = menuData?.combos.filter((combo) =>
        combo.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    // Group items by category for display
    const itemsByCategory = filteredItems.reduce((acc, item) => {
        if (!acc[item.categoryName]) {
            acc[item.categoryName] = []
        }
        acc[item.categoryName].push(item)
        return acc
    }, {} as Record<string, MenuItem[]>)

    const handleAddClick = () => {
        setEditingItem(null)
        setEditingModifier(null)
        setEditingCombo(null)
        setIsAddDialogOpen(true)
    }

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item)
        setIsAddDialogOpen(true)
    }

    const handleEditModifier = (modifier: Modifier) => {
        setEditingModifier(modifier)
        setIsAddDialogOpen(true)
    }

    const handleEditCombo = (combo: Combo) => {
        setEditingCombo(combo)
        setIsAddDialogOpen(true)
    }

    const handleItemSubmit = async (item: Omit<MenuItem, 'id'>) => {
        if (editingItem) {
            await itemActions.updateItem({ id: editingItem.id, updates: item })
        } else {
            await itemActions.addItem(item)
        }
    }

    const handleModifierSubmit = async (modifier: Omit<Modifier, 'id'>) => {
        if (editingModifier) {
            await modifierActions.updateModifier({ id: editingModifier.id, updates: modifier })
        } else {
            await modifierActions.addModifier(modifier)
        }
    }

    const handleComboSubmit = async (combo: Omit<Combo, 'id'>) => {
        if (editingCombo) {
            await comboActions.updateCombo({ id: editingCombo.id, updates: combo })
        } else {
            await comboActions.addCombo(combo)
        }
    }

    const handleCloseDialog = () => {
        setIsAddDialogOpen(false)
        setEditingItem(null)
        setEditingModifier(null)
        setEditingCombo(null)
    }

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center min-h-100">
                <Loading loading={true} />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header with Tabs */}
            <MenuHeader
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onAddClick={handleAddClick}
            />

            {/* Search and View Options */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 md:p-6 bg-card border-b">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search Anything"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2 border rounded-lg hover:bg-muted transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground">
                            <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode(viewMode === 'cards' ? 'list' : 'cards')}
                        className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors text-foreground font-medium text-sm"
                    >
                        Cards
                    </button>
                    <button className="p-2 border rounded-lg hover:bg-muted transition-colors">
                        <MoreVertical size={20} className="text-foreground" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
                {activeTab === 'items' && (
                    <div className="space-y-8">
                        {Object.entries(itemsByCategory).map(([categoryName, items]) => (
                            <div key={categoryName}>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-foreground">
                                        {categoryName}
                                        <span className="text-sm text-muted-foreground ml-2">
                                            {items.length} Items
                                        </span>
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {items.map((item) => (
                                        <ItemCard
                                            key={item.id}
                                            item={item}
                                            onEdit={handleEditItem}
                                            onToggleAvailability={itemActions.toggleItemAvailability}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No items found</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'modifiers' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredModifiers.map((modifier) => (
                            <ModifierCard
                                key={modifier.id}
                                modifier={modifier}
                                onEdit={handleEditModifier}
                                onDelete={modifierActions.deleteModifier}
                            />
                        ))}
                        {filteredModifiers.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">No modifiers found</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'combos' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCombos.map((combo) => (
                            <ComboCard
                                key={combo.id}
                                combo={combo}
                                onEdit={handleEditCombo}
                                onToggleAvailability={comboActions.toggleComboAvailability}
                            />
                        ))}
                        {filteredCombos.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">No combos found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Dialogs */}
            {activeTab === 'items' && (
                <AddItemDialog
                    isOpen={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleItemSubmit}
                    categories={menuData?.categories || []}
                    editItem={editingItem}
                />
            )}

            {activeTab === 'modifiers' && (
                <AddModifierDialog
                    isOpen={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleModifierSubmit}
                    editModifier={editingModifier}
                />
            )}

            {activeTab === 'combos' && (
                <AddComboDialog
                    isOpen={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleComboSubmit}
                    menuItems={menuData?.items || []}
                    editCombo={editingCombo}
                />
            )}
        </div>
    )
}

export default MenuManagement