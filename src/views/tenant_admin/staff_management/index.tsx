import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Eye, Trash2, Upload, Download, FileText, Activity, Shield, User, Loader2 } from 'lucide-react'
import {
    apiGetStaff,
    apiGetStaffById,
    apiGetRoles,
    apiCreateStaff,
    apiUpdateStaff,
    apiDeleteStaff,
    apiTogglePermission,
    apiGetStaffActivity,
    apiGetStaffDocuments,
    apiUploadDocument,
    apiDeleteDocument,
} from '@/services/tenant_admin/staff'
import type {
    Staff,
    StaffDetail,
    Role,
    CreateStaffDto,
    UpdateStaffDto,
    ActivityLog,
    StaffDocument,
} from '@/services/tenant_admin/staff'
import { Button } from '@/components/shadcn/ui/button'
import { Badge } from '@/components/shadcn/ui/badge'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/ui/dialog'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/shadcn/ui/sheet'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/shadcn/ui/tabs'
import { Switch } from '@/components/shadcn/ui/switch'
import { Separator } from '@/components/shadcn/ui/separator'

//============================== Helpers ===================================//

function showToast(message: string) {
    // Simple toast via a temporary DOM element — works without external deps
    const el = document.createElement('div')
    el.textContent = message
    el.style.cssText =
        'position:fixed;bottom:24px;right:24px;background:#1e293b;color:#f8fafc;padding:12px 20px;border-radius:8px;font-size:14px;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.3);max-width:360px;'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 3500)
}

function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    return status === 'active' ? 'default' : 'secondary'
}

//============================== Skeleton ===================================//

function TableSkeleton() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                    {Array.from({ length: 6 }).map((__, j) => (
                        <td key={j} className="px-4 py-3">
                            <div className="h-4 bg-muted rounded animate-pulse" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    )
}

//============================== Add Staff Dialog ===================================//

interface AddStaffDialogProps {
    open: boolean
    onClose: () => void
    roles: Role[]
}

function AddStaffDialog({ open, onClose, roles }: AddStaffDialogProps) {
    const queryClient = useQueryClient()
    const [form, setForm] = useState<CreateStaffDto>({
        name: '',
        email: '',
        phone: '',
        role_id: '',
        department: '',
        position: '',
        status: 'active',
    })

    const mutation = useMutation({
        mutationFn: (data: CreateStaffDto) => apiCreateStaff(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
            showToast('Staff member created — a temporary password has been sent to their email')
            onClose()
            setForm({ name: '', email: '', phone: '', role_id: '', department: '', position: '', status: 'active' })
        },
        onError: () => {
            showToast('Failed to create staff member. Please try again.')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate(form)
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Staff Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="space-y-1">
                        <Label htmlFor="staff-name">Full Name</Label>
                        <Input
                            id="staff-name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="staff-email">Email</Label>
                        <Input
                            id="staff-email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="staff-phone">Phone</Label>
                        <Input
                            id="staff-phone"
                            placeholder="+1 555 000 0000"
                            value={form.phone ?? ''}
                            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Role</Label>
                        <Select
                            value={form.role_id}
                            onValueChange={(v) => setForm((f) => ({ ...f, role_id: v }))}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((r) => (
                                    <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <Label htmlFor="staff-dept">Department</Label>
                            <Input
                                id="staff-dept"
                                placeholder="Kitchen"
                                value={form.department ?? ''}
                                onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="staff-position">Position</Label>
                            <Input
                                id="staff-position"
                                placeholder="Head Chef"
                                value={form.position ?? ''}
                                onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={mutation.isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Staff
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

//============================== Profile Tab ===================================//

interface ProfileTabProps {
    staff: StaffDetail
    roles: Role[]
    onDeleted: () => void
}

function ProfileTab({ staff, roles, onDeleted }: ProfileTabProps) {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [form, setForm] = useState<UpdateStaffDto>({
        name: staff.name,
        email: staff.email,
        phone: staff.phone ?? '',
        role_id: staff.role_id ?? '',
        department: staff.department ?? '',
        position: staff.position ?? '',
        status: staff.status,
    })

    const updateMutation = useMutation({
        mutationFn: (data: UpdateStaffDto) => apiUpdateStaff(staff.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
            queryClient.invalidateQueries({ queryKey: ['staff', staff.id] })
            setEditing(false)
            showToast('Staff member updated successfully')
        },
        onError: () => showToast('Failed to update staff member'),
    })

    const deleteMutation = useMutation({
        mutationFn: () => apiDeleteStaff(staff.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
            showToast('Staff member deleted')
            onDeleted()
        },
        onError: () => showToast('Failed to delete staff member'),
    })

    if (editing) {
        return (
            <div className="space-y-4">
                <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input value={form.name ?? ''} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-1">
                    <Label>Email</Label>
                    <Input type="email" value={form.email ?? ''} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="space-y-1">
                    <Label>Phone</Label>
                    <Input value={form.phone ?? ''} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="space-y-1">
                    <Label>Role</Label>
                    <Select value={form.role_id ?? ''} onValueChange={(v) => setForm((f) => ({ ...f, role_id: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                        <SelectContent>
                            {roles.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label>Department</Label>
                        <Input value={form.department ?? ''} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                        <Label>Position</Label>
                        <Input value={form.position ?? ''} onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))} />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label>Status</Label>
                    <Select value={form.status ?? 'active'} onValueChange={(v) => setForm((f) => ({ ...f, status: v as 'active' | 'inactive' }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2 pt-2">
                    <Button onClick={() => updateMutation.mutate(form)} disabled={updateMutation.isPending}>
                        {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditing(false)} disabled={updateMutation.isPending}>Cancel</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Full Name</p>
                    <p className="font-medium">{staff.name}</p>
                </div>
                <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Email</p>
                    <p className="font-medium">{staff.email}</p>
                </div>
                <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Phone</p>
                    <p className="font-medium">{staff.phone || '—'}</p>
                </div>
                <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Role</p>
                    <p className="font-medium">{staff.role}</p>
                </div>
                <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Department</p>
                    <p className="font-medium">{staff.department || '—'}</p>
                </div>
                <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Position</p>
                    <p className="font-medium">{staff.position || '—'}</p>
                </div>
                {staff.hire_date && (
                    <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Hire Date</p>
                        <p className="font-medium">{new Date(staff.hire_date).toLocaleDateString()}</p>
                    </div>
                )}
                {staff.salary !== undefined && (
                    <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Salary</p>
                        <p className="font-medium">${staff.salary.toLocaleString()}</p>
                    </div>
                )}
            </div>

            <Separator />

            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setEditing(true)}>Edit Profile</Button>
                {!confirmDelete ? (
                    <Button variant="destructive" onClick={() => setConfirmDelete(true)}>Delete Staff</Button>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-destructive font-medium">Confirm delete?</span>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMutation.mutate()}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                            Yes, Delete
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

//============================== Permissions Tab ===================================//

interface PermissionsTabProps {
    staffId: string
}

function PermissionsTab({ staffId }: PermissionsTabProps) {
    const queryClient = useQueryClient()
    const [pendingPermId, setPendingPermId] = useState<string | null>(null)

    const { data: staffDetail, isLoading } = useQuery({
        queryKey: ['staff', staffId],
        queryFn: () => apiGetStaffById(staffId),
    })

    const toggleMutation = useMutation({
        mutationFn: (permissionId: string) => apiTogglePermission(staffId, permissionId),
        onMutate: (permissionId) => setPendingPermId(permissionId),
        onSettled: () => {
            setPendingPermId(null)
            queryClient.invalidateQueries({ queryKey: ['staff', staffId] })
        },
        onError: () => showToast('Failed to update permission'),
    })

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                        <div className="h-5 w-10 bg-muted rounded-full animate-pulse" />
                    </div>
                ))}
            </div>
        )
    }

    const permissions = staffDetail?.permissions ?? []

    if (permissions.length === 0) {
        return (
            <div className="text-center py-10">
                <Shield className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No permissions configured for this staff member.</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {permissions.map((perm) => (
                <div key={perm.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                    <div>
                        <p className="text-sm font-medium">{perm.name}</p>
                        {perm.description && <p className="text-xs text-muted-foreground mt-0.5">{perm.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        {pendingPermId === perm.id && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
                        <Switch
                            checked={perm.enabled}
                            onCheckedChange={() => toggleMutation.mutate(perm.id)}
                            disabled={pendingPermId === perm.id}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

//============================== Documents Tab ===================================//

interface DocumentsTabProps {
    staffId: string
}

const DOCUMENT_TYPES = [
    'ID / Passport',
    'Contract',
    'Health Certificate',
    'Training Certificate',
    'Other',
]

function DocumentsTab({ staffId }: DocumentsTabProps) {
    const queryClient = useQueryClient()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [docType, setDocType] = useState(DOCUMENT_TYPES[0])

    const { data: documents = [], isLoading } = useQuery({
        queryKey: ['staff', staffId, 'documents'],
        queryFn: () => apiGetStaffDocuments(staffId),
    })

    const uploadMutation = useMutation({
        mutationFn: ({ file, type }: { file: File; type: string }) =>
            apiUploadDocument(staffId, file, type),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff', staffId, 'documents'] })
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
            showToast('Document uploaded successfully')
        },
        onError: () => showToast('Failed to upload document'),
    })

    const deleteMutation = useMutation({
        mutationFn: (docId: string) => apiDeleteDocument(docId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staff', staffId, 'documents'] })
            showToast('Document deleted')
        },
        onError: () => showToast('Failed to delete document'),
    })

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile) return
        uploadMutation.mutate({ file: selectedFile, type: docType })
    }

    return (
        <div className="space-y-5">
            {/* Upload area */}
            <div className="rounded-lg border border-dashed p-4 bg-muted/30">
                <p className="text-sm font-medium mb-3">Upload New Document</p>
                <form onSubmit={handleUpload} className="space-y-3">
                    <div className="space-y-1">
                        <Label>Document Type</Label>
                        <Select value={docType} onValueChange={setDocType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {DOCUMENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>File</Label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary file:text-primary-foreground cursor-pointer"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                    <Button type="submit" size="sm" disabled={!selectedFile || uploadMutation.isPending}>
                        {uploadMutation.isPending
                            ? <><Loader2 className="mr-2 h-3 w-3 animate-spin" />Uploading…</>
                            : <><Upload className="mr-2 h-3 w-3" />Upload</>}
                    </Button>
                </form>
            </div>

            {/* Document list */}
            {isLoading ? (
                <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-14 bg-muted rounded animate-pulse" />
                    ))}
                </div>
            ) : documents.length === 0 ? (
                <div className="text-center py-8">
                    <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">No documents uploaded yet.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {documents.map((doc: StaffDocument) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                                <div>
                                    <p className="text-sm font-medium">{doc.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {doc.document_type} · {new Date(doc.uploaded_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </a>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => deleteMutation.mutate(doc.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

//============================== Activity Tab ===================================//

interface ActivityTabProps {
    staffId: string
}

function ActivityTab({ staffId }: ActivityTabProps) {
    const { data: activity = [], isLoading } = useQuery({
        queryKey: ['staff', staffId, 'activity'],
        queryFn: () => apiGetStaffActivity(staffId),
    })

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-muted shrink-0" />
                        <div className="flex-1 space-y-1">
                            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                            <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (activity.length === 0) {
        return (
            <div className="text-center py-10">
                <Activity className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No activity recorded yet.</p>
            </div>
        )
    }

    return (
        <div className="space-y-1">
            {activity.map((entry: ActivityLog) => (
                <div key={entry.id} className="flex gap-3 py-2.5 border-b last:border-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium">{entry.action}</p>
                        <p className="text-sm text-muted-foreground">{entry.description}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {new Date(entry.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

//============================== Staff Detail Sheet ===================================//

interface StaffDetailSheetProps {
    staffId: string | null
    open: boolean
    onClose: () => void
    roles: Role[]
}

function StaffDetailSheet({ staffId, open, onClose, roles }: StaffDetailSheetProps) {
    const { data: staffDetail, isLoading } = useQuery({
        queryKey: ['staff', staffId],
        queryFn: () => apiGetStaffById(staffId!),
        enabled: !!staffId,
    })

    return (
        <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                {isLoading || !staffDetail ? (
                    <div className="space-y-4 mt-6">
                        <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                        <div className="h-64 bg-muted rounded animate-pulse" />
                    </div>
                ) : (
                    <>
                        <SheetHeader className="mb-4">
                            <SheetTitle className="flex items-center gap-2 flex-wrap">
                                <span>{staffDetail.name}</span>
                                <Badge variant="outline">{staffDetail.role}</Badge>
                                <Badge variant={getStatusVariant(staffDetail.status)}>
                                    {staffDetail.status === 'active' ? 'Active' : 'Inactive'}
                                </Badge>
                            </SheetTitle>
                            {staffDetail.email && (
                                <p className="text-sm text-muted-foreground">{staffDetail.email}</p>
                            )}
                        </SheetHeader>

                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="w-full grid grid-cols-4 mb-4">
                                <TabsTrigger value="profile" className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="permissions" className="flex items-center gap-1.5">
                                    <Shield className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Permissions</span>
                                </TabsTrigger>
                                <TabsTrigger value="documents" className="flex items-center gap-1.5">
                                    <FileText className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Docs</span>
                                </TabsTrigger>
                                <TabsTrigger value="activity" className="flex items-center gap-1.5">
                                    <Activity className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Activity</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <ProfileTab staff={staffDetail} roles={roles} onDeleted={onClose} />
                            </TabsContent>
                            <TabsContent value="permissions">
                                <PermissionsTab staffId={staffDetail.id} />
                            </TabsContent>
                            <TabsContent value="documents">
                                <DocumentsTab staffId={staffDetail.id} />
                            </TabsContent>
                            <TabsContent value="activity">
                                <ActivityTab staffId={staffDetail.id} />
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}

//============================== Main View ===================================//

const StaffManagement = () => {
    const [addDialogOpen, setAddDialogOpen] = useState(false)
    const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const { data: staffList = [], isLoading, isError } = useQuery({
        queryKey: ['staff'],
        queryFn: apiGetStaff,
    })

    const { data: roles = [] } = useQuery({
        queryKey: ['roles'],
        queryFn: apiGetRoles,
    })

    const handleViewStaff = (id: string) => {
        setSelectedStaffId(id)
        setSheetOpen(true)
    }

    const handleCloseSheet = () => {
        setSheetOpen(false)
        setSelectedStaffId(null)
    }

    const filteredStaff = staffList.filter(
        (s: Staff) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.role.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="space-y-4">
            {/* Header card */}
            <div className="rounded-md border bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b">
                    <h1 className="text-xl font-bold text-foreground">Staff Management</h1>
                    <Button onClick={() => setAddDialogOpen(true)} className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Staff
                    </Button>
                </div>

                {/* Search */}
                <div className="px-4 py-3 border-b">
                    <Input
                        placeholder="Search by name, email, or role…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Name</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Role</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Email</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Phone</th>
                                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <TableSkeleton />
                            ) : isError ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-destructive">
                                        Failed to load staff. Please refresh the page.
                                    </td>
                                </tr>
                            ) : filteredStaff.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <User className="h-10 w-10 text-muted-foreground" />
                                            {searchQuery ? (
                                                <p className="text-muted-foreground">No staff found matching &ldquo;{searchQuery}&rdquo;</p>
                                            ) : (
                                                <>
                                                    <p className="font-medium">No staff members yet</p>
                                                    <p className="text-muted-foreground text-sm">Click &ldquo;Add Staff&rdquo; to get started.</p>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredStaff.map((staff: Staff) => (
                                    <tr
                                        key={staff.id}
                                        className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                                        onClick={() => handleViewStaff(staff.id)}
                                    >
                                        <td className="px-4 py-3 font-medium">{staff.name}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline">{staff.role}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{staff.email}</td>
                                        <td className="px-4 py-3 text-muted-foreground">{staff.phone || '—'}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={getStatusVariant(staff.status)}>
                                                {staff.status === 'active' ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleViewStaff(staff.id)}
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && !isError && filteredStaff.length > 0 && (
                    <div className="px-4 py-2 text-xs text-muted-foreground border-t">
                        Showing {filteredStaff.length} of {staffList.length} staff members
                    </div>
                )}
            </div>

            {/* Dialogs / Sheets */}
            <AddStaffDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
                roles={roles}
            />

            <StaffDetailSheet
                staffId={selectedStaffId}
                open={sheetOpen}
                onClose={handleCloseSheet}
                roles={roles}
            />
        </div>
    )
}

export default StaffManagement
