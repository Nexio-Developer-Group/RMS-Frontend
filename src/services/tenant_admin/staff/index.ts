import ApiService from "@/services/ApiService";

//============================== Interfaces ===================================//

export interface Role {
    id: string;
    name: string;
    description?: string;
}

export interface Permission {
    id: string;
    name: string;
    description?: string;
    enabled: boolean;
}

export interface Staff {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    role_id?: string;
    department?: string;
    position?: string;
    status: 'active' | 'inactive';
    avatar?: string;
    salary?: number;
    hire_date?: string;
    created_at?: string;
    updated_at?: string;
}

export interface StaffDetail extends Staff {
    permissions: Permission[];
}

export interface ActivityLog {
    id: string;
    action: string;
    description: string;
    timestamp: string;
    ip_address?: string;
    metadata?: Record<string, string>;
}

export interface StaffDocument {
    id: string;
    name: string;
    document_type: string;
    url: string;
    size?: number;
    mime_type?: string;
    uploaded_at: string;
    uploaded_by?: string;
}

export interface CreateStaffDto {
    name: string;
    email: string;
    phone?: string;
    role_id: string;
    department?: string;
    position?: string;
    status?: 'active' | 'inactive';
}

export interface UpdateStaffDto {
    name?: string;
    email?: string;
    phone?: string;
    role_id?: string;
    department?: string;
    position?: string;
    status?: 'active' | 'inactive';
}

//============================== Roles ===================================//

export async function apiGetRoles(): Promise<Role[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<Role[]>({
            url: '/users/roles',
            method: 'get',
        });
        return response;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
}

//============================== Staff ===================================//

export async function apiGetStaff(): Promise<Staff[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<any>({
            url: '/users/staff',
            method: 'get',
        });
        // Backend returns { staff: [...], stats: {} } — unwrap the array
        return Array.isArray(response) ? response : (response?.staff ?? []);
    } catch (error) {
        console.error('Error fetching staff:', error);
        throw error;
    }
}

export async function apiGetStaffById(id: string): Promise<StaffDetail> {
    try {
        const response = await ApiService.fetchDataWithAxios<StaffDetail>({
            url: `/users/${id}`,
            method: 'get',
        });
        return response;
    } catch (error) {
        console.error('Error fetching staff by ID:', error);
        throw error;
    }
}

export async function apiCreateStaff(data: CreateStaffDto): Promise<StaffDetail> {
    try {
        const response = await ApiService.fetchDataWithAxios<StaffDetail, CreateStaffDto>({
            url: '/users',
            method: 'post',
            data,
        });
        return response;
    } catch (error) {
        console.error('Error creating staff:', error);
        throw error;
    }
}

export async function apiUpdateStaff(id: string, data: UpdateStaffDto): Promise<StaffDetail> {
    try {
        const response = await ApiService.fetchDataWithAxios<StaffDetail, UpdateStaffDto>({
            url: `/users/${id}`,
            method: 'patch',
            data,
        });
        return response;
    } catch (error) {
        console.error('Error updating staff:', error);
        throw error;
    }
}

export async function apiDeleteStaff(id: string): Promise<void> {
    try {
        await ApiService.fetchDataWithAxios<void>({
            url: `/users/${id}`,
            method: 'delete',
        });
    } catch (error) {
        console.error('Error deleting staff:', error);
        throw error;
    }
}

//============================== Permissions ===================================//

export async function apiTogglePermission(userId: string, permissionId: string): Promise<void> {
    try {
        await ApiService.fetchDataWithAxios<void>({
            url: `/users/${userId}/permissions/${permissionId}`,
            method: 'post',
        });
    } catch (error) {
        console.error('Error toggling permission:', error);
        throw error;
    }
}

//============================== Activity ===================================//

export async function apiGetStaffActivity(id: string): Promise<ActivityLog[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<ActivityLog[]>({
            url: `/users/${id}/activity`,
            method: 'get',
        });
        return response;
    } catch (error) {
        console.error('Error fetching staff activity:', error);
        throw error;
    }
}

//============================== Documents ===================================//

export async function apiGetStaffDocuments(id: string): Promise<StaffDocument[]> {
    try {
        const response = await ApiService.fetchDataWithAxios<StaffDocument[]>({
            url: `/users/${id}/documents`,
            method: 'get',
        });
        return response;
    } catch (error) {
        console.error('Error fetching staff documents:', error);
        throw error;
    }
}

export async function apiUploadDocument(
    id: string,
    file: File,
    documentType: string,
): Promise<StaffDocument> {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('document_type', documentType);

        const response = await ApiService.fetchDataWithAxios<StaffDocument>({
            url: `/users/${id}/documents`,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.error('Error uploading document:', error);
        throw error;
    }
}

export async function apiDeleteDocument(docId: string): Promise<void> {
    try {
        await ApiService.fetchDataWithAxios<void>({
            url: `/users/documents/${docId}`,
            method: 'delete',
        });
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}
