import { useState } from 'react'
import { Button } from '@/components/shadcn/ui/button'
import { Plus } from 'lucide-react'
import Loading from '@/components/shared/Loading'
import CustomerStatsHeader from './components/CustomerStatsHeader'
import CustomerFilterTabs from './components/CustomerFilterTabs'
import CustomerSearchBar from './components/CustomerSearchBar'
import CustomerTable from './components/CustomerTable'
import CampaignTable from './components/CampaignTable'
import CustomerDetailModal from './components/CustomerDetailModal'
import { useCustomers, useCustomerStats, useCampaigns, useCustomerDetail } from '@/hooks/useCustomer'
import { CustomerFilterTab } from '@/@types/customers'

const Customers = () => {
    const [activeTab, setActiveTab] = useState<CustomerFilterTab>('customer-list')
    const [search, setSearch] = useState('')
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

    // Fetch data
    const { data: customers = [], isLoading: customersLoading } = useCustomers(search)
    const { data: campaigns = [], isLoading: campaignsLoading } = useCampaigns(search)
    const { data: stats } = useCustomerStats()
    const { data: selectedCustomer } = useCustomerDetail(selectedCustomerId)

    const defaultStats = {
        totalCustomers: 0,
        activeCampaigns: 0,
        inactiveCustomers: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
    }

    const customerStats = stats || defaultStats

    return (
        <div className="space-y-4 p-4 md:p-6">
            {/* Stats Header */}
            <div className="rounded-md border bg-card overflow-hidden">
                <CustomerStatsHeader stats={customerStats} />
            </div>

            {/* Main Content */}
            <div className="rounded-md border bg-card overflow-hidden">
                <CustomerFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex-1 max-w-md">
                        <CustomerSearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Search Anything"
                            className="p-0"
                        />
                    </div>
                    <Button className="ml-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Customers
                    </Button>
                </div>

                <div className="p-4">
                    {activeTab === 'customer-list' ? (
                        customersLoading ? (
                            <div className="flex h-full items-center justify-center min-h-100">
                                <Loading loading={true} />
                            </div>
                        ) : (
                            <CustomerTable
                                customers={customers}
                                onSelectCustomer={(customer) => setSelectedCustomerId(customer.id)}
                            />
                        )
                    ) : (
                        campaignsLoading ? (
                            <div className="flex h-full items-center justify-center min-h-100">
                                <Loading loading={true} />
                            </div>
                        ) : (
                            <CampaignTable campaigns={campaigns} />
                        )
                    )}
                </div>

                {/* Pagination */}
                {activeTab === 'customer-list' && customers.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t">
                        <p className="text-sm text-muted-foreground">
                            20 of 700 rows are shown.
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Customer Detail Modal */}
            <CustomerDetailModal
                customer={selectedCustomer || null}
                open={!!selectedCustomerId}
                onClose={() => setSelectedCustomerId(null)}
            />
        </div>
    )
}

export default Customers