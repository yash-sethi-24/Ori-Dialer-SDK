import {
    ApiClient,
    CreateIncidentParams,
    UpdateIncidentParams,
    ServiceStatusResponse,
    CreateIncidentResponse,
    UpdateIncidentResponse,
    ResolveIncidentResponse,
} from '../../types';

export class ServicesService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async status(serviceType: string, id: string): Promise<ServiceStatusResponse> {
        if (!serviceType || !id) {
            throw new Error('serviceType and id are required');
        }

        return this.client.get<ServiceStatusResponse>(`/api/services/${serviceType}/${id}/status`);
    }

    async createIncident(serviceType: string, id: string, params: CreateIncidentParams): Promise<CreateIncidentResponse> {
        if (!serviceType || !id) {
            throw new Error('serviceType and id are required');
        }
        if (!params.title || !params.status) {
            throw new Error('title and status are required');
        }

        return this.client.post<CreateIncidentResponse>(`/api/services/${serviceType}/${id}/incidents`, params);
    }

    async updateIncident(incidentId: string, params: UpdateIncidentParams): Promise<UpdateIncidentResponse> {
        if (!incidentId) {
            throw new Error('incidentId is required');
        }
        if (!params.message) {
            throw new Error('message is required');
        }

        return this.client.put<UpdateIncidentResponse>(`/api/incidents/${incidentId}/update`, params);
    }

    async resolveIncident(incidentId: string, resolutionMessage: string): Promise<ResolveIncidentResponse> {
        if (!incidentId) {
            throw new Error('incidentId is required');
        }
        if (!resolutionMessage) {
            throw new Error('resolutionMessage is required');
        }

        return this.client.put<ResolveIncidentResponse>(`/api/incidents/${incidentId}/resolve`, { resolutionMessage });
    }
}
