import type { MenuTab } from '@/@types/menu'

type MenuHeaderProps = {
    activeTab: MenuTab
    onTabChange: (tab: MenuTab) => void
    onAddClick: () => void
}

const MenuHeader = ({ activeTab, onTabChange, onAddClick }: MenuHeaderProps) => {
    const tabs: { id: MenuTab; label: string }[] = [
        { id: 'items', label: 'Items' },
        { id: 'modifiers', label: 'Modifiers' },
        { id: 'combos', label: 'Combos' },
    ]

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6 bg-card border-b">
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <button
                onClick={onAddClick}
                className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
                + Add
            </button>
        </div>
    )
}

export default MenuHeader
