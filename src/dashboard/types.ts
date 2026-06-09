export interface DashboardResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface PaginationParams {
    limit?: number;
    skip?: number;
    search?: string;
}
