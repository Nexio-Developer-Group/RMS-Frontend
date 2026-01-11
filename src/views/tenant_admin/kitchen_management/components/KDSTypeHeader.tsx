import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs'
import type { KDSType } from '@/@types/kds'
import { cn } from '@/components/shadcn/utils'

type Props = {
    kdsType: KDSType
    onKDSTypeChange: (type: KDSType) => void
    className?: string
}

const KDSTypeHeader = ({ kdsType, onKDSTypeChange, className }: Props) => {
    return (
        <div className={cn('bg-card border-b px-4 py-3', className)}>
            <Tabs value={kdsType} onValueChange={v => onKDSTypeChange(v as KDSType)}>
                <TabsList>
                    <TabsTrigger value="live-orders">Live Orders</TabsTrigger>
                    <TabsTrigger value="kds-setup">KDS Setup</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default KDSTypeHeader
