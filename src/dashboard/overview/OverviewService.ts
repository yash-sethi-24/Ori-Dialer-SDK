import { ApiClient, OverviewParams, OverviewResponse } from '../../types';

export class OverviewService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async get(params: OverviewParams = {}): Promise<OverviewResponse> {
        return this.client.get<OverviewResponse>('/api/overview', params);
    }
}
