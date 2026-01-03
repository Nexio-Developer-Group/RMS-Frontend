import {
    Receipt,
    Package,
    BarChart3,
    Users,
    Smartphone,
    Truck,
    CreditCard,
    Clock,
} from 'lucide-react'

const Features = () => {
    const features = [
        {
            icon: Receipt,
            title: 'Quick Billing',
            description:
                'Generate bills in 3 clicks. Split bills, merge tables, and apply discounts easily.',
        },
        {
            icon: Package,
            title: 'Inventory Management',
            description:
                'Track stock levels, get low-stock alerts, and auto-deduct items on sales.',
        },
        {
            icon: BarChart3,
            title: 'Real-time Analytics',
            description:
                'Get insights on sales, popular items, and peak hours with detailed reports.',
        },
        {
            icon: Users,
            title: 'Staff Management',
            description:
                'Manage roles, track attendance, and monitor performance of your team.',
        },
        {
            icon: Smartphone,
            title: 'Mobile App',
            description:
                'Manage your restaurant from anywhere with our powerful mobile app.',
        },
        {
            icon: Truck,
            title: 'Delivery Integration',
            description:
                'Seamlessly integrate with Swiggy, Zomato, and other delivery platforms.',
        },
        {
            icon: CreditCard,
            title: 'Multiple Payments',
            description:
                'Accept UPI, cards, wallets, and cash payments with ease.',
        },
        {
            icon: Clock,
            title: 'KOT Management',
            description:
                'Automated Kitchen Order Tickets for smooth kitchen operations.',
        },
    ]

    return (
        <section id="features" className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                    <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                        Smart POS Features
                    </span>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
                        A restaurant POS made for all your needs
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A quick and easy-to-use restaurant billing software that
                        makes managing high order volumes butter smooth
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl bg-card border border-border hover:border-teal-500/50 hover:shadow-[0_0_20px_-5px_rgba(20,184,166,0.1)] transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center mb-4 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                                <feature.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
