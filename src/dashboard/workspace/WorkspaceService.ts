import {
    ApiClient,
    PaginationParams,
    WorkspaceListResponse,
    WorkspaceSelectResponse,
} from '../../types';

export class WorkspaceService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async list(params: PaginationParams = {}): Promise<WorkspaceListResponse> {
        return this.client.get<WorkspaceListResponse>('/api/workspaces', params);
    }

    async select(workspaceId: string): Promise<WorkspaceSelectResponse> {
        if (!workspaceId) {
            throw new Error('workspaceId is required');
        }

        const response = await this.client.put<WorkspaceSelectResponse>(
            `/api/workspaces/select/${workspaceId}`
        );

        if (response.success && response.data) {
            this.client.setWorkspaceId(response.data.selectedWorkspace.id);
        }

        return response;
    }
}
