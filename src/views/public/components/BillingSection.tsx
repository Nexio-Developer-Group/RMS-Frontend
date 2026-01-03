import { ArrowRight, Check } from 'lucide-react'
import billingMockup from '@/assets/mockup/billing-mockup.png'
import { Button } from '@/components/shadcn/ui/button'

const BillingSection = () => {
    const features = [
        'Take orders and punch bills instantly',
        'Generate KOT automatically',
        'Split bills or merge tables easily',
        'Apply discounts and coupons',
        'Accept all payment methods',
    ]

    return (
        <section id="billing" className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -left-4 -top-4 w-72 h-72 bg-teal-200/50 rounded-full blur-3xl" />
                        <div className="relative bg-teal-50 dark:bg-teal-950/20 rounded-2xl p-6 lg:p-10">
                            <img
                                src={billingMockup}
                                alt="Restaurant Billing Software"
                                className="w-full rounded-xl shadow-xl"
                            />
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            Billing Software
                        </span>
                        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                            A quick 3-click restaurant{' '}
                            <span className="text-primary">billing</span>{' '}
                            software
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Take orders, punch bills and generate KOT. Accept
                            payments either by splitting bill or merging tables.
                            Easily apply discounts and coupons. All of this, and
                            more, is easy and quick with RestoPOS.
                        </p>

                        {/* Feature List */}
                        <ul className="space-y-4 mb-8">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Button size="sm" className="gap-2">
                            Explore Billing Features
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BillingSection
