export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    errors?: any;
    stack?: string;
}
