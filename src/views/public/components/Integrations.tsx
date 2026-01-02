import { Button } from "@/components/shadcn/ui/button";
import { ArrowRight } from "lucide-react";

const Integrations = () => {
    const integrations = [
        { name: "Swiggy", category: "Delivery" },
        { name: "Zomato", category: "Delivery" },
        { name: "Razorpay", category: "Payments" },
        { name: "Paytm", category: "Payments" },
        { name: "PhonePe", category: "Payments" },
        { name: "Google Pay", category: "Payments" },
        { name: "Tally", category: "Accounting" },
        { name: "WhatsApp", category: "Communication" },
    ];

    return (
        <section id="integrations" className="py-16 lg:py-24">
            <div className="px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                    <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                        Integrations
                    </span>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
                        Multiple integrations - single dashboard
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Integrate with all your favorite apps and manage everything from one place
                    </p>
                </div>

                {/* Integrations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 mb-12">
                    {integrations.map((integration, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-xl bg-card border border-border hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/30 mx-auto mb-4 flex items-center justify-center group-hover:bg-teal-100 dark:group-hover:bg-teal-900/50 transition-colors">
                                <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                                    {integration.name.charAt(0)}
                                </span>
                            </div>
                            <h3 className="font-semibold text-foreground">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground">{integration.category}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button size="lg" variant="outline" className="gap-2">
                        View All Integrations
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Integrations;