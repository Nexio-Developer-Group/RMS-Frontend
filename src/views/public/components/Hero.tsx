import { ArrowRight, Play } from 'lucide-react'
import heroImage from '@/assets/mockup/hero-illustration.png'
import { Button } from '@/components/shadcn/ui/button'

const Hero = () => {
    return (
        <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Trusted by 1,00,000+ Restaurants
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                            Restaurant POS software{' '}
                            <span className="text-primary">made simple!</span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                            A quick and easy-to-use restaurant billing software
                            that makes managing high order volumes butter
                            smooth. Take orders, generate KOT, and accept
                            payments effortlessly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="gap-2">
                                Start Free Trial
                                <ArrowRight size={18} />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2"
                            >
                                <Play size={18} />
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-foreground">
                                    1L+
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Restaurants
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-foreground">
                                    50Cr+
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Orders/Month
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl lg:text-3xl font-bold text-foreground">
                                    200+
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Cities
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-teal-200/50 to-teal-100/30 rounded-3xl blur-3xl" />
                        <img
                            src={heroImage}
                            alt="Restaurant POS Dashboard"
                            className="relative z-10 w-full rounded-2xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
