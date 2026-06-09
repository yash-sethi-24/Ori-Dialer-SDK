import {
    ApiClient,
    PaginationParams,
    CreateApplicationParams,
    UpdateApplicationParams,
    ApplicationListResponse,
    ApplicationGetResponse,
    ApplicationCreateResponse,
    ApplicationUpdateResponse,
    ApplicationDeleteResponse,
} from '../../types';

export class ApplicationService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async list(params: PaginationParams = {}): Promise<ApplicationListResponse> {
        return this.client.get<ApplicationListResponse>('/api/applications', params);
    }

    async get(id: string): Promise<ApplicationGetResponse> {
        if (!id) {
            throw new Error('Application id is required');
        }
        return this.client.get<ApplicationGetResponse>(`/api/applications/${id}`);
    }

    async create(params: CreateApplicationParams): Promise<ApplicationCreateResponse> {
        const { name, primaryUrl } = params;

        if (!name || !primaryUrl) {
            throw new Error('name and primaryUrl are required');
        }

        return this.client.post<ApplicationCreateResponse>('/api/applications', params);
    }

    async update(id: string, params: UpdateApplicationParams): Promise<ApplicationUpdateResponse> {
        if (!id) {
            throw new Error('Application id is required');
        }

        return this.client.put<ApplicationUpdateResponse>(`/api/applications/${id}`, params);
    }

    async delete(id: string): Promise<ApplicationDeleteResponse> {
        if (!id) {
            throw new Error('Application id is required');
        }

        return this.client.delete<ApplicationDeleteResponse>(`/api/applications/${id}`);
    }
}
