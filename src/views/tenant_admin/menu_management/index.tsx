import { useState } from 'react'
import { ListFilter, MoreVertical, Plus } from 'lucide-react'
import { useMenuData, useMenuItemActions, useModifierActions, useComboActions, useCategoryActions } from '@/hooks/useMenu'
import Loading from '@/components/shared/Loading'
import TabsHeader from '../components/TabHeader'
import ItemCard from './components/ItemCard'
import ModifierCard from './components/ModifierCard'
import ComboCard from './components/ComboCard'
import AddItemDialog from './components/AddItemDialog'
import AddModifierDialog from './components/AddModifierDialog'
import AddComboDialog from './components/AddComboDialog'
import SearchBar from '@/views/tenant_admin/components/SearchBar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import type { MenuTab, MenuItem, Modifier, Combo } from '@/services/tenant_admin/menu_management/types'

const MenuManagement = () => {
    const [menuTab, setMenuTab] = useState<MenuTab>('items')
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
    const [editingModifier, setEditingModifier] = useState<Modifier | null>(null)
    const [editingCombo, setEditingCombo] = useState<Combo | null>(null)

    const [menuId] = useState("1") // Default menu ID
    const { data: menuData, isLoading } = useMenuData(menuId)
    const itemActions = useMenuItemActions()
    const modifierActions = useModifierActions()
    const comboActions = useComboActions()
    const categoryActions = useCategoryActions()

    const MENU_TABS = [
        { label: 'Items', value: 'items' },
        { label: 'Modifiers', value: 'modifiers' },
        { label: 'Combos', value: 'combos' },
    ] satisfies { label: string; value: MenuTab }[]

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

    const handleDeleteCategory = async (categoryId: string) => {
        if (window.confirm('Are you sure you want to delete this category? All items in it will also be affected.')) {
            await categoryActions.deleteCategory({ categoryId, menuId })
        }
    }

    const handleDeleteModifier = async (id: string, modifier: Modifier) => {
        if (window.confirm('Are you sure you want to delete this modifier?')) {
            await modifierActions.deleteModifier(id, modifier.menuId || '', modifier.categoryId || '')
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center min-h-100">
                <Loading loading={true} />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-background rounded-lg overflow-hidden">
            {/* Header with Tabs */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
                <TabsHeader<MenuTab>
                    value={menuTab}
                    onChange={setMenuTab}
                    tabs={MENU_TABS}
                />
                <button
                    onClick={handleAddClick}
                    className="flex items-center px-4 py-2 bg-slate-900 dark:bg-slate-100 text-primary-foreground rounded-lg hover:bg-slate-800 transition-colors font-medium"
                >
                    <Plus className="mr-2" /> Add {MENU_TABS.find(tab => tab.value === menuTab)?.label}
                </button>
            </div>

            {/* Search and View Options */}
            {menuTab === 'items' && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-3 py-3 bg-card border-b">
                    <div className="flex items-center gap-2 flex-1 max-w-md h-10 ">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search Anything"
                        />
                        <button className="h-10 px-3 border rounded-lg hover:bg-muted transition-colors flex items-center justify-center">
                            <ListFilter className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select
                            value={viewMode}
                            onValueChange={(value) => setViewMode(value as 'cards' | 'list')}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="View Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cards">Cards</SelectItem>
                                <SelectItem value="list">List</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-card p-4 md:p-6">
                {menuTab === 'items' && (
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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-10 h-10 p-0 border rounded-lg hover:bg-muted transition-colors flex items-center justify-center">
                                            <MoreVertical className="w-4 h-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => {
                                                // Handle edit category if needed
                                                console.log('Edit category', items[0]?.categoryId)
                                            }}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => handleDeleteCategory(items[0]?.categoryId)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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

                {menuTab === 'modifiers' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {filteredModifiers.map((modifier) => (
                            <ModifierCard
                                key={modifier.id}
                                modifier={modifier}
                                onEdit={handleEditModifier}
                                onDelete={(id) => handleDeleteModifier(id, modifier)}
                            />
                        ))}
                        {filteredModifiers.length === 0 && (
                            <div className="col-span-full text-center py-12">
                                <p className="text-muted-foreground">No modifiers found</p>
                            </div>
                        )}
                    </div>
                )}

                {menuTab === 'combos' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-col-3 2xl:grid-cols-4 gap-4">
                        {filteredCombos.map((combo) => (
                            <ComboCard
                                key={combo.id}
                                combo={combo}
                                onEdit={handleEditCombo}
                                onToggleAvailability={(id) => comboActions.toggleComboAvailability(String(id))}
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
            {menuTab === 'items' && (
                <AddItemDialog
                    isOpen={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleItemSubmit}
                    categories={menuData?.categories || []}
                    editItem={editingItem}
                />
            )}

            {menuTab === 'modifiers' && (
                <AddModifierDialog
                    isOpen={isAddDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleModifierSubmit}
                    editModifier={editingModifier}
                />
            )}

            {menuTab === 'combos' && (
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