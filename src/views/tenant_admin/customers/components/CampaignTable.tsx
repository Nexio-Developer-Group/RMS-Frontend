import { Campaign } from '@/@types/customers'
import { Badge } from '@/components/shadcn/ui/badge'
import { MoreVertical, Calendar, Users } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu'
import { cn } from '@/components/shadcn/utils'

interface CampaignTableProps {
    campaigns: Campaign[]
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Active':
            return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
        case 'Scheduled':
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
        case 'Inactive':
            return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
}

const getTypeColor = (type: string) => {
    switch (type) {
        case 'Discount':
            return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
        case 'Cashback':
            return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
        case 'Offer':
            return 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
        case 'Loyalty':
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
}

const CampaignTable = ({ campaigns }: CampaignTableProps) => {
    if (campaigns.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No campaigns found</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((campaign) => (
                <div
                    key={campaign.id}
                    className="bg-card border rounded-lg p-4 hover:shadow-md transition-all"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">{campaign.description}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="p-1 hover:bg-accent rounded">
                                <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <Badge className={cn('font-medium', getTypeColor(campaign.type))}>
                            {campaign.type}
                        </Badge>
                        <Badge className={cn('font-medium', getStatusColor(campaign.status))}>
                            {campaign.status}
                        </Badge>
                        {campaign.discount && (
                            <Badge className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 font-bold">
                                {campaign.discount}% OFF
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{campaign.customersEnrolled} customers enrolled</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CampaignTable
