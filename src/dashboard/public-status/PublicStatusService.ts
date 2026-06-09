import {
    ApiClient,
    PaginationParams,
    IncidentListParams,
    PublicServiceListResponse,
    UptimeResponse,
    IncidentListResponse,
} from '../../types';

export class PublicStatusService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async live(serviceType: string, params: PaginationParams = {}): Promise<PublicServiceListResponse> {
        if (!serviceType) {
            throw new Error('serviceType is required');
        }

        return this.client.get<PublicServiceListResponse>(`/api/public/services/${serviceType}/live`, params);
    }

    async uptime(serviceType: string, id: string, days?: number): Promise<UptimeResponse> {
        if (!serviceType || !id) {
            throw new Error('serviceType and id are required');
        }

        return this.client.get<UptimeResponse>(
            `/api/public/services/${serviceType}/${id}/uptime`,
            days !== undefined ? { days } : undefined
        );
    }

    async incidents(serviceType: string, id: string, params: IncidentListParams = {}): Promise<IncidentListResponse> {
        if (!serviceType || !id) {
            throw new Error('serviceType and id are required');
        }

        return this.client.get<IncidentListResponse>(`/api/public/services/${serviceType}/${id}/incidents`, params);
    }
}
