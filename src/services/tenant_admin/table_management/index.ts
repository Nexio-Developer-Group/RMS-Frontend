import ApiService from "@/services/ApiService";
import { CreateFloorTableDto, FloorTableNodeDto, UpdateFloorTableDto } from "./types";

export async function apiGetFloors() {
    try {
        const response = await ApiService.fetchDataWithAxios<FloorTableNodeDto[]>({
            url: '/floors',
            method: 'get'
        });
        return response;
    } catch (error) {
        console.error('Error fetching floors:', error);
        throw error;
    }
}

export async function apiGetTables() {
    try {
        const response = await ApiService.fetchDataWithAxios<FloorTableNodeDto[]>({
            url: '/floors/tables',
            method: 'get'
        });
        return response;
    } catch (error) {
        console.error('Error fetching tables:', error);
        throw error;
    }
}

export async function apiCreateTable(data: CreateFloorTableDto) {
    try {
        const requestData: CreateFloorTableDto = {
            ...data,
        };

        if (requestData.type === 'table') {
            if (requestData.parent_id !== undefined && requestData.parent_id !== null) {
                requestData.parent_id = Number(requestData.parent_id);
            }
        } else {
            // For floors, root level nodes usually have null parent_id
            requestData.parent_id = null;
        }

        const response = await ApiService.fetchDataWithAxios<FloorTableNodeDto, CreateFloorTableDto>({
            url: '/floors',
            method: 'post',
            data: requestData
        });
        return response;
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

export async function apiGetTableById(id: string, type?: 'floor' | 'table') {
    try {
        const response = await ApiService.fetchDataWithAxios<FloorTableNodeDto>({
            url: `/floors/${id}`,
            method: 'get'
        });
        return response;
    } catch (error) {
        console.error('Error fetching table by ID:', error);
        throw error;
    }
}

export async function apiUpdateTable(id: string, type: 'floor' | 'table', data: UpdateFloorTableDto) {
    try {
        const requestData: UpdateFloorTableDto = {
            ...data,
            type: data.type || type,
        };

        if (requestData.type === 'table') {
            if (requestData.parent_id !== undefined && requestData.parent_id !== null) {
                requestData.parent_id = Number(requestData.parent_id);
            }
        } else {
            // For floors, we should send null for parent_id or omit it. 
            // Given the number constraint, null is the standard representation for "no parent".
            requestData.parent_id = null;
        }

        const response = await ApiService.fetchDataWithAxios<FloorTableNodeDto, UpdateFloorTableDto>({
            url: `/floors/${id}`,
            method: 'patch',
            data: requestData
        });
        return response;
    } catch (error) {
        console.error('Error updating table:', error);
        throw error;
    }
}

export async function apiDeleteTable(id: string, type: 'floor' | 'table') {
    try {
        const response = await ApiService.fetchDataWithAxios<void>({
            url: `/floors/${id}`,
            method: 'delete',
        });
        return response;
    } catch (error) {
        console.error('Error deleting table:', error);
        throw error;
    }
}
