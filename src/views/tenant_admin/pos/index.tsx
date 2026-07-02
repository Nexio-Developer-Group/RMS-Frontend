import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Minus, X, ChefHat, ShoppingCart, UtensilsCrossed, Search, StickyNote, Clock } from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import { Input } from '@/components/shadcn/ui/input'
import { Separator } from '@/components/shadcn/ui/separator'
import {
    Dialog,
    DialogContent,
} from '@/components/shadcn/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import { useSessionUser } from '@/store/authStore'
import {
    apiCreateCart,
    apiGetCarts,
    apiAddCartItem,
    apiUpdateCartItem,
    apiRemoveCartItem,
    apiConvertCart,
    type Cart,
    type CartItem,
} from '@/services/tenant_admin/pos'
import { apiGetMenus, apiGetCategoriesWithItems, apiGetCombos } from '@/services/tenant_admin/menu_management'
import { apiGetTables } from '@/services/tenant_admin/table_management'
import type { Menu, Category } from '@/services/tenant_admin/menu_management/types'
import type { FloorTableNodeDto } from '@/services/tenant_admin/table_management/types'

// ────────────────────────────── helpers ──────────────────────────────

function formatPrice(amount: number): string {
    return `$${amount.toFixed(2)}`
}

function timeAgo(dateStr: string): string {
    const diffMs = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diffMs / 60000)
    if (mins < 1) return 'just now'
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
}

const TAX_RATE = 0.05

// ────────────────────────────── sub-components ──────────────────────────────

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
    return (
        <div className="mx-3 mt-2 px-4 py-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm flex items-center justify-between">
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-2 underline hover:no-underline text-xs">
                Dismiss
            </button>
        </div>
    )
}

function Skeleton({ className }: { className?: string }) {
    return <div className={`animate-pulse bg-muted rounded ${className ?? ''}`} />
}

// ────────────────────────────── Left Panel: Cart List ──────────────────────────────

interface CartListPanelProps {
    carts: Cart[]
    isLoading: boolean
    selectedCartId: string | null
    onSelectCart: (id: string) => void
    onNewCart: () => void
}

function CartListPanel({ carts, isLoading, selectedCartId, onSelectCart, onNewCart }: CartListPanelProps) {
    const activeCarts = carts.filter((c) => c.status === 'active')

    return (
        <div className="flex flex-col h-full border-r bg-card">
            <div className="flex items-center justify-between px-3 py-3 border-b">
                <h2 className="font-semibold text-sm text-foreground">Active Carts</h2>
                <Badge variant="secondary">{activeCarts.length}</Badge>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-3 space-y-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                ) : activeCarts.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                        No active carts
                    </div>
                ) : (
                    <div className="p-2 space-y-1">
                        {activeCarts.map((cart) => (
                            <button
                                key={cart.id}
                                onClick={() => onSelectCart(cart.id)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                                    selectedCartId === cart.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-sm truncate">
                                        Table {cart.table_id}
                                    </span>
                                    <Badge
                                        variant={selectedCartId === cart.id ? 'outline' : 'secondary'}
                                        className="text-xs ml-1 shrink-0"
                                    >
                                        {cart.items.length}
                                    </Badge>
                                </div>
                                <div
                                    className={`flex items-center gap-1 mt-0.5 text-xs ${
                                        selectedCartId === cart.id
                                            ? 'text-primary-foreground/70'
                                            : 'text-muted-foreground'
                                    }`}
                                >
                                    <Clock className="w-3 h-3" />
                                    {timeAgo(cart.created_at)}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 border-t">
                <Button onClick={onNewCart} className="w-full" size="sm">
                    <Plus className="w-4 h-4 mr-1" /> New Cart
                </Button>
            </div>
        </div>
    )
}

// ────────────────────────────── Center Panel: Cart Detail ──────────────────────────────

interface CartDetailPanelProps {
    cart: Cart | null
    isLoading: boolean
    error: string | null
    onDismissError: () => void
    onUpdateQty: (item: CartItem, newQty: number) => void
    onUpdateNotes: (item: CartItem, notes: string) => void
    onSendToKitchen: () => void
    isSending: boolean
    successMsg: string | null
    onDismissSuccess: () => void
    isUpdating: boolean
}

function CartDetailPanel({
    cart,
    isLoading,
    error,
    onDismissError,
    onUpdateQty,
    onUpdateNotes,
    onSendToKitchen,
    isSending,
    successMsg,
    onDismissSuccess,
    isUpdating,
}: CartDetailPanelProps) {
    const [editingNotesId, setEditingNotesId] = useState<string | null>(null)
    const [pendingNotes, setPendingNotes] = useState('')

    const subtotal = useMemo(
        () => (cart?.items ?? []).reduce((sum, i) => sum + i.unit_price * i.quantity, 0),
        [cart],
    )
    const tax = subtotal * TAX_RATE
    const total = subtotal + tax

    if (!cart && !isLoading) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground gap-3">
                <ShoppingCart className="w-12 h-12 opacity-30" />
                <p className="text-sm">Select a cart from the left panel</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="px-4 py-3 border-b bg-card">
                <h2 className="font-semibold text-foreground">
                    {cart ? `Table ${cart.table_id}` : '...'}
                </h2>
                {cart?.notes && (
                    <p className="text-xs text-muted-foreground mt-0.5">{cart.notes}</p>
                )}
            </div>

            {/* Banners */}
            {error && <ErrorBanner message={error} onDismiss={onDismissError} />}
            {successMsg && (
                <div className="mx-3 mt-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 rounded-lg text-sm flex items-center justify-between">
                    <span>{successMsg}</span>
                    <button onClick={onDismissSuccess} className="ml-2 underline hover:no-underline text-xs">
                        Dismiss
                    </button>
                </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {isLoading ? (
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                ) : !cart || cart.items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                        <UtensilsCrossed className="w-8 h-8 opacity-30" />
                        <p className="text-sm">Add items from the menu →</p>
                    </div>
                ) : (
                    cart.items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-3 bg-card space-y-2">
                            <div className="flex items-start gap-2">
                                {/* Qty controls */}
                                <div className="flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => onUpdateQty(item, item.quantity - 1)}
                                        disabled={isUpdating}
                                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQty(item, item.quantity + 1)}
                                        disabled={isUpdating}
                                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                {/* Name & price */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatPrice(item.unit_price)} each
                                    </p>
                                </div>
                                {/* Line total */}
                                <span className="text-sm font-semibold shrink-0">
                                    {formatPrice(item.unit_price * item.quantity)}
                                </span>
                                {/* Notes toggle */}
                                <button
                                    onClick={() => {
                                        if (editingNotesId === item.id) {
                                            setEditingNotesId(null)
                                        } else {
                                            setEditingNotesId(item.id)
                                            setPendingNotes(item.notes ?? '')
                                        }
                                    }}
                                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
                                    aria-label="Edit notes"
                                    title="Edit notes"
                                >
                                    <StickyNote className="w-3 h-3" />
                                </button>
                                {/* Remove */}
                                <button
                                    onClick={() => onUpdateQty(item, 0)}
                                    disabled={isUpdating}
                                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors shrink-0 disabled:opacity-50"
                                    aria-label="Remove item"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                            {/* Notes inline editor */}
                            {editingNotesId === item.id && (
                                <div className="flex gap-2">
                                    <Input
                                        value={pendingNotes}
                                        onChange={(e) => setPendingNotes(e.target.value)}
                                        placeholder="Item notes…"
                                        className="h-7 text-xs"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                onUpdateNotes(item, pendingNotes)
                                                setEditingNotesId(null)
                                            }
                                            if (e.key === 'Escape') setEditingNotesId(null)
                                        }}
                                    />
                                    <Button
                                        size="sm"
                                        className="h-7 text-xs px-2"
                                        onClick={() => {
                                            onUpdateNotes(item, pendingNotes)
                                            setEditingNotesId(null)
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            )}
                            {item.notes && editingNotesId !== item.id && (
                                <p className="text-xs text-muted-foreground italic">Note: {item.notes}</p>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cart && cart.items.length > 0 && (
                <div className="p-4 border-t bg-card space-y-3">
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                            <span>{formatPrice(tax)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                    <Button
                        className="w-full"
                        onClick={onSendToKitchen}
                        disabled={isSending || isUpdating}
                    >
                        {isSending ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Sending…
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ChefHat className="w-4 h-4" />
                                Send to Kitchen
                            </span>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}

// ────────────────────────────── Right Panel: Menu Browser ──────────────────────────────

interface AddItemPopoverState {
    itemId?: string
    comboId?: string
    name: string
    unitPrice: number
    quantity: number
    notes: string
}

interface MenuBrowserPanelProps {
    selectedCartId: string | null
    error: string | null
    onDismissError: () => void
    onAddItem: (data: AddItemPopoverState) => void
    isAdding: boolean
}

function MenuBrowserPanel({ selectedCartId, error, onDismissError, onAddItem, isAdding }: MenuBrowserPanelProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedMenuId, setSelectedMenuId] = useState<string>('')
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [expandedCombos, setExpandedCombos] = useState(true)
    const [addPopover, setAddPopover] = useState<AddItemPopoverState | null>(null)
    const [noCartWarning, setNoCartWarning] = useState(false)

    const { data: menus = [], isLoading: menusLoading } = useQuery<Menu[]>({
        queryKey: ['menus-for-pos'],
        queryFn: () => apiGetMenus(),
    })

    // Auto-select first active menu
    const effectiveMenuId = selectedMenuId || menus.find((m) => m.is_active)?.menu_id?.toString() || menus[0]?.menu_id?.toString() || ''

    const { data: categories = [], isLoading: catsLoading } = useQuery<Category[]>({
        queryKey: ['categories-with-items-pos', effectiveMenuId],
        queryFn: () => apiGetCategoriesWithItems(effectiveMenuId, 'ITEM'),
        enabled: !!effectiveMenuId,
    })

    const { data: combos = [], isLoading: combosLoading } = useQuery({
        queryKey: ['combos-pos', effectiveMenuId],
        queryFn: () => apiGetCombos(effectiveMenuId),
        enabled: !!effectiveMenuId,
    })

    const isLoading = menusLoading || catsLoading || combosLoading

    const lowerQuery = searchQuery.toLowerCase()

    const filteredCategories = useMemo(() => {
        if (!lowerQuery) return categories
        return categories
            .map((cat) => ({
                ...cat,
                items: (cat.items ?? []).filter((item: { name: string }) =>
                    item.name.toLowerCase().includes(lowerQuery)
                ),
            }))
            .filter((cat) => cat.items.length > 0)
    }, [categories, lowerQuery])

    const filteredCombos = useMemo(() => {
        if (!lowerQuery) return combos
        return combos.filter((c: { name: string }) => c.name.toLowerCase().includes(lowerQuery))
    }, [combos, lowerQuery])

    const toggleCategory = (id: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const handleAddClick = (itemData: AddItemPopoverState) => {
        if (!selectedCartId) {
            setNoCartWarning(true)
            setTimeout(() => setNoCartWarning(false), 3000)
            return
        }
        setAddPopover(itemData)
    }

    const handleConfirmAdd = () => {
        if (!addPopover) return
        onAddItem(addPopover)
        setAddPopover(null)
    }

    return (
        <div className="flex flex-col h-full border-l bg-card">
            {/* Header */}
            <div className="px-3 py-3 border-b space-y-2">
                <h2 className="font-semibold text-sm text-foreground">Menu</h2>
                {menus.length > 1 && (
                    <Select value={effectiveMenuId} onValueChange={setSelectedMenuId}>
                        <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select menu" />
                        </SelectTrigger>
                        <SelectContent>
                            {menus.map((m) => (
                                <SelectItem key={m.menu_id} value={String(m.menu_id)}>
                                    {m.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search items…"
                        className="pl-8 h-8 text-xs"
                    />
                </div>
            </div>

            {/* Warnings/Errors */}
            {noCartWarning && (
                <div className="mx-3 mt-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-xs">
                    Please select or create a cart first
                </div>
            )}
            {error && <ErrorBanner message={error} onDismiss={onDismissError} />}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {isLoading ? (
                    <div className="space-y-2 p-2">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Categories */}
                        {filteredCategories.map((cat) => {
                            const catId = String(cat.category_id ?? cat.name)
                            const isExpanded = expandedCategories.has(catId)
                            return (
                                <div key={catId} className="border rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleCategory(catId)}
                                        className="w-full flex items-center justify-between px-3 py-2 bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
                                    >
                                        <span>{cat.name}</span>
                                        <span className="text-muted-foreground text-xs">
                                            {isExpanded ? '▲' : '▼'}
                                        </span>
                                    </button>
                                    {isExpanded && (
                                        <div className="divide-y">
                                            {(cat.items ?? []).map((item) => {
                                                const itemId = String(item.item_id ?? '')
                                                const price = Number(item.price ?? 0)
                                                return (
                                                    <div
                                                        key={itemId}
                                                        className="flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="text-sm">{item.name}</p>
                                                            <p className="text-xs text-muted-foreground">{formatPrice(price)}</p>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-7 w-7 p-0"
                                                            onClick={() =>
                                                                handleAddClick({
                                                                    itemId,
                                                                    name: item.name,
                                                                    unitPrice: price,
                                                                    quantity: 1,
                                                                    notes: '',
                                                                })
                                                            }
                                                            title="Add to cart"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </Button>
                                                    </div>
                                                )
                                            })}
                                            {(cat.items ?? []).length === 0 && (
                                                <p className="px-3 py-2 text-xs text-muted-foreground">
                                                    No items
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {/* Combos section */}
                        {filteredCombos.length > 0 && (
                            <div className="border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setExpandedCombos((v) => !v)}
                                    className="w-full flex items-center justify-between px-3 py-2 bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
                                >
                                    <span>Combos</span>
                                    <span className="text-muted-foreground text-xs">
                                        {expandedCombos ? '▲' : '▼'}
                                    </span>
                                </button>
                                {expandedCombos && (
                                    <div className="divide-y">
                                        {filteredCombos.map((combo) => {
                                            const comboId = String(combo.combo_id ?? '')
                                            const price = Number(combo.price ?? 0)
                                            return (
                                                <div
                                                    key={comboId}
                                                    className="flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors"
                                                >
                                                    <div>
                                                        <p className="text-sm">{combo.name}</p>
                                                        <p className="text-xs text-muted-foreground">{formatPrice(price)}</p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-7 w-7 p-0"
                                                        onClick={() =>
                                                            handleAddClick({
                                                                comboId,
                                                                name: combo.name,
                                                                unitPrice: price,
                                                                quantity: 1,
                                                                notes: '',
                                                            })
                                                        }
                                                        title="Add combo to cart"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {filteredCategories.length === 0 && filteredCombos.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-sm">
                                No items match your search
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Add item confirmation dialog */}
            {addPopover && (
                <Dialog open onOpenChange={(open) => !open && setAddPopover(null)}>
                    <DialogContent className="max-w-sm">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-base">{addPopover.name}</h3>
                            <p className="text-sm text-muted-foreground">{formatPrice(addPopover.unitPrice)} each</p>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() =>
                                            setAddPopover((p) => p && { ...p, quantity: Math.max(1, p.quantity - 1) })
                                        }
                                        className="w-8 h-8 rounded border flex items-center justify-center hover:bg-muted"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{addPopover.quantity}</span>
                                    <button
                                        onClick={() =>
                                            setAddPopover((p) => p && { ...p, quantity: p.quantity + 1 })
                                        }
                                        className="w-8 h-8 rounded border flex items-center justify-center hover:bg-muted"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">Notes (optional)</label>
                                <Input
                                    value={addPopover.notes}
                                    onChange={(e) =>
                                        setAddPopover((p) => p && { ...p, notes: e.target.value })
                                    }
                                    placeholder="Special instructions…"
                                    className="h-8"
                                />
                            </div>
                            <p className="text-sm font-semibold">
                                Total: {formatPrice(addPopover.unitPrice * addPopover.quantity)}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setAddPopover(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleConfirmAdd}
                                    disabled={isAdding}
                                >
                                    {isAdding ? (
                                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    ) : (
                                        'Add to Cart'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

// ────────────────────────────── New Cart Dialog ──────────────────────────────

interface NewCartDialogProps {
    open: boolean
    onClose: () => void
    onCreated: (cartId: string) => void
    waiterId: string
}

function NewCartDialog({ open, onClose, onCreated, waiterId }: NewCartDialogProps) {
    const [selectedTableId, setSelectedTableId] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const { data: tables = [], isLoading: tablesLoading } = useQuery<FloorTableNodeDto[]>({
        queryKey: ['tables-for-pos'],
        queryFn: () => apiGetTables(),
        enabled: open,
    })

    const createCart = useMutation({
        mutationFn: (data: { table_id: string; waiter_id: string; notes?: string }) =>
            apiCreateCart(data),
        onSuccess: (cart) => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
            onCreated(cart.id)
            handleClose()
        },
        onError: (err) => {
            setError(err instanceof Error ? err.message : 'Failed to create cart')
        },
    })

    const handleClose = () => {
        setSelectedTableId('')
        setNotes('')
        setError(null)
        onClose()
    }

    const handleSubmit = () => {
        if (!selectedTableId) {
            setError('Please select a table')
            return
        }
        setError(null)
        createCart.mutate({
            table_id: selectedTableId,
            waiter_id: waiterId,
            notes: notes || undefined,
        })
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="max-w-sm">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">New Cart</h3>

                    {error && (
                        <div className="px-3 py-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium mb-1 block">Table</label>
                        {tablesLoading ? (
                            <Skeleton className="h-9 w-full" />
                        ) : (
                            <Select value={selectedTableId} onValueChange={setSelectedTableId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a table" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tables.map((t) => (
                                        <SelectItem key={String(t.floor_id)} value={String(t.floor_id)}>
                                            {t.name || `Table ${t.floor_id}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 block">Notes (optional)</label>
                        <Input
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Special requests…"
                        />
                    </div>

                    <div className="flex gap-2 pt-1">
                        <Button variant="outline" className="flex-1" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={handleSubmit}
                            disabled={createCart.isPending}
                        >
                            {createCart.isPending ? (
                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                'Create Cart'
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// ────────────────────────────── Main POS View ──────────────────────────────

const TAX_RATE_CONST = TAX_RATE
void TAX_RATE_CONST

type MobileTab = 'carts' | 'detail' | 'menu'

const POSView = () => {
    const { user } = useSessionUser()
    const queryClient = useQueryClient()

    const [selectedCartId, setSelectedCartId] = useState<string | null>(null)
    const [newCartOpen, setNewCartOpen] = useState(false)
    const [mobileTab, setMobileTab] = useState<MobileTab>('carts')

    // Panel-level error/success state
    const [centerError, setCenterError] = useState<string | null>(null)
    const [centerSuccess, setCenterSuccess] = useState<string | null>(null)
    const [menuError, setMenuError] = useState<string | null>(null)

    // ── Queries ──
    const { data: carts = [], isLoading: cartsLoading } = useQuery<Cart[]>({
        queryKey: ['carts'],
        queryFn: apiGetCarts,
        refetchInterval: 30000,
    })

    const selectedCart = carts.find((c) => c.id === selectedCartId) ?? null

    // ── Mutations ──

    const updateItemMutation = useMutation({
        mutationFn: ({ cartId, itemId, data }: { cartId: string; itemId: string; data: { quantity?: number; notes?: string } }) =>
            apiUpdateCartItem(cartId, itemId, data),
        onSuccess: (updatedCart) => {
            queryClient.setQueryData<Cart[]>(['carts'], (prev = []) =>
                prev.map((c) => (c.id === updatedCart.id ? updatedCart : c))
            )
            setCenterError(null)
        },
        onError: (err) => {
            setCenterError(err instanceof Error ? err.message : 'Failed to update item')
        },
    })

    const removeItemMutation = useMutation({
        mutationFn: ({ cartId, itemId }: { cartId: string; itemId: string }) =>
            apiRemoveCartItem(cartId, itemId),
        onSuccess: (updatedCart) => {
            queryClient.setQueryData<Cart[]>(['carts'], (prev = []) =>
                prev.map((c) => (c.id === updatedCart.id ? updatedCart : c))
            )
            setCenterError(null)
        },
        onError: (err) => {
            setCenterError(err instanceof Error ? err.message : 'Failed to remove item')
        },
    })

    const addItemMutation = useMutation({
        mutationFn: ({
            cartId,
            data,
        }: {
            cartId: string
            data: {
                item_id?: string
                combo_id?: string
                name: string
                unit_price: number
                quantity: number
                notes?: string
            }
        }) => apiAddCartItem(cartId, data),
        onSuccess: (updatedCart) => {
            queryClient.setQueryData<Cart[]>(['carts'], (prev = []) =>
                prev.map((c) => (c.id === updatedCart.id ? updatedCart : c))
            )
            setMenuError(null)
        },
        onError: (err) => {
            setMenuError(err instanceof Error ? err.message : 'Failed to add item')
        },
    })

    const convertMutation = useMutation({
        mutationFn: (cartId: string) => apiConvertCart(cartId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] })
            setCenterSuccess('Order sent to kitchen!')
            setSelectedCartId(null)
            setCenterError(null)
        },
        onError: (err) => {
            setCenterError(err instanceof Error ? err.message : 'Failed to send to kitchen')
        },
    })

    // ── Handlers ──

    const handleUpdateQty = (item: CartItem, newQty: number) => {
        if (!selectedCartId) return
        if (newQty <= 0) {
            removeItemMutation.mutate({ cartId: selectedCartId, itemId: item.id })
        } else {
            updateItemMutation.mutate({
                cartId: selectedCartId,
                itemId: item.id,
                data: { quantity: newQty },
            })
        }
    }

    const handleUpdateNotes = (item: CartItem, notes: string) => {
        if (!selectedCartId) return
        updateItemMutation.mutate({
            cartId: selectedCartId,
            itemId: item.id,
            data: { notes },
        })
    }

    const handleSendToKitchen = () => {
        if (!selectedCartId) return
        convertMutation.mutate(selectedCartId)
    }

    const handleAddMenuItemToCart = (data: AddItemPopoverState) => {
        if (!selectedCartId) return
        addItemMutation.mutate({
            cartId: selectedCartId,
            data: {
                item_id: data.itemId,
                combo_id: data.comboId,
                name: data.name,
                unit_price: data.unitPrice,
                quantity: data.quantity,
                notes: data.notes || undefined,
            },
        })
    }

    const isUpdating = updateItemMutation.isPending || removeItemMutation.isPending

    const waiterId = user?.userId ?? user?.email ?? 'unknown'

    // ────────────────────────── Render ──────────────────────────────

    return (
        <div className="h-full flex flex-col bg-background">
            {/* Mobile Tab Bar */}
            <div className="md:hidden border-b px-3 py-2 bg-card">
                <Tabs value={mobileTab} onValueChange={(v) => setMobileTab(v as MobileTab)}>
                    <TabsList className="w-full">
                        <TabsTrigger value="carts" className="flex-1">Carts</TabsTrigger>
                        <TabsTrigger value="detail" className="flex-1">Order</TabsTrigger>
                        <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Desktop 3-panel grid / Mobile single-panel */}
            <div className="flex-1 overflow-hidden md:grid" style={{ gridTemplateColumns: '220px 1fr 280px' }}>
                {/* Left: Cart List */}
                <div className={`h-full overflow-hidden ${mobileTab !== 'carts' ? 'hidden md:block' : ''}`}>
                    <CartListPanel
                        carts={carts}
                        isLoading={cartsLoading}
                        selectedCartId={selectedCartId}
                        onSelectCart={(id) => {
                            setSelectedCartId(id)
                            setMobileTab('detail')
                        }}
                        onNewCart={() => setNewCartOpen(true)}
                    />
                </div>

                {/* Center: Cart Detail */}
                <div className={`h-full overflow-hidden ${mobileTab !== 'detail' ? 'hidden md:block' : ''}`}>
                    <CartDetailPanel
                        cart={selectedCart}
                        isLoading={cartsLoading && !selectedCart}
                        error={centerError}
                        onDismissError={() => setCenterError(null)}
                        onUpdateQty={handleUpdateQty}
                        onUpdateNotes={handleUpdateNotes}
                        onSendToKitchen={handleSendToKitchen}
                        isSending={convertMutation.isPending}
                        successMsg={centerSuccess}
                        onDismissSuccess={() => setCenterSuccess(null)}
                        isUpdating={isUpdating}
                    />
                </div>

                {/* Right: Menu Browser */}
                <div className={`h-full overflow-hidden ${mobileTab !== 'menu' ? 'hidden md:block' : ''}`}>
                    <MenuBrowserPanel
                        selectedCartId={selectedCartId}
                        error={menuError}
                        onDismissError={() => setMenuError(null)}
                        onAddItem={handleAddMenuItemToCart}
                        isAdding={addItemMutation.isPending}
                    />
                </div>
            </div>

            {/* New Cart Dialog */}
            <NewCartDialog
                open={newCartOpen}
                onClose={() => setNewCartOpen(false)}
                onCreated={(id) => {
                    setSelectedCartId(id)
                    setMobileTab('detail')
                }}
                waiterId={waiterId}
            />
        </div>
    )
}

export default POSView
