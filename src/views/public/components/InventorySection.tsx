import { ArrowRight, Check } from 'lucide-react'
import inventoryMockup from '@/assets/mockup/inventory-mockup.png'
import { Button } from '@/components/shadcn/ui/button'

const InventorySection = () => {
    const features = [
        'Item-wise auto deduction on sales',
        'Low stock alerts and notifications',
        'Day-end inventory reports',
        'Raw material tracking',
        'Purchase order management',
    ]

    return (
        <section
            id="inventory"
            className="py-16 lg:py-24 bg-teal-50 dark:bg-gray-900"
        >
            <div className="px-4 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Content */}
                    <div>
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            Inventory Management
                        </span>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                            Restaurant{' '}
                            <span className="text-primary">Inventory</span>{' '}
                            management made easier
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Do inventory management the smart way. Put your
                            inventory on the item-wise auto deduction, get
                            low-stock alerts, day-end inventory reports and more
                            with RestoPOS restaurant POS.
                        </p>

                        {/* Feature List */}
                        <ul className="space-y-4 mb-8">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Button size="lg" className="gap-2">
                            Explore All Features
                            <ArrowRight size={18} />
                        </Button>
                    </div>

                    {/* Right - Image */}
                    <div className="relative">
                        <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-white border-2 border-gray-500 rounded-full blur-3xl" />
                        <div className="relative bg-white dark:bg-white rounded-2xl p-6 lg:p-10">
                            <img
                                src={inventoryMockup}
                                alt="Restaurant Inventory Management"
                                className="w-full rounded-xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InventorySection
