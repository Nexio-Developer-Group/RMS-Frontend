import BillingSection from './components/BillingSection'
import BusinessTypes from './components/BusinessTypes'
import CTA from './components/CTA'
import Features from './components/Features'
import Hero from './components/Hero'
import Integrations from './components/Integrations'
import InventorySection from './components/InventorySection'

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Hero />
            <Features />
            <BillingSection />
            <InventorySection />
            <Integrations />
            <BusinessTypes />
            <CTA />
        </div>
    )
}

export default LandingPage
