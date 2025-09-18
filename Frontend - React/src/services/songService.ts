import api from "../api/api";
import type { ApiResponse } from "./types";

const URL = 'songs';

// Function - Handle Errors
const handleError = (error: any): ApiResponse => ({
    success: false,
    message: error.response?.data?.message || 'Something went wrong',
    statusCode: error.response?.status || 500,
});


// API Request - Upload CSV File
export const uploadCsvFile = async (file: File): Promise<ApiResponse> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post(`${URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return {
            success: true,
            data: response.data.data,
            count: response.data.count,
            statusCode: response.status,
        };
    }
    catch (error: any) {
        return handleError(error);
    }
};

// API Request - Get All Songs
export const getAllSongs = async (): Promise<any> => {
    try {
        const response = await api.get(`${URL}`);
        return {
            success: true,
            data: response.data.data,
            count: response.data.count,
            statusCode: response.status,
        };
    }
    catch (error: any) {
        return handleError(error);
    }
};