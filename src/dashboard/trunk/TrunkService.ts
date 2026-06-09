import { ApiClient, TrunkLiveResponse, TrunkCpsResponse } from '../../types';

export class TrunkService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async live(): Promise<TrunkLiveResponse> {
        return this.client.get<TrunkLiveResponse>('/api/trunks/live');
    }

    async updateCps(id: string, cpsCapacityInPercent: number): Promise<TrunkCpsResponse> {
        if (!id) {
            throw new Error('Trunk id is required');
        }
        if (cpsCapacityInPercent < 3 || cpsCapacityInPercent > 8) {
            throw new Error('cpsCapacityInPercent must be between 3 and 8');
        }

        return this.client.put<TrunkCpsResponse>(`/api/trunks/${id}/cps`, { cpsCapacityInPercent });
    }
}
