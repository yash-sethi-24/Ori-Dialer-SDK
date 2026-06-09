import {
    ApiClient,
    SessionListParams,
    SessionListResponse,
    SessionGetResponse,
} from '../../types';

export class SessionsService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async list(params: SessionListParams = {}): Promise<SessionListResponse> {
        return this.client.get<SessionListResponse>('/api/sessions', params);
    }

    async get(callId: string): Promise<SessionGetResponse> {
        if (!callId) {
            throw new Error('callId is required');
        }
        return this.client.get<SessionGetResponse>('/api/session', { callId });
    }

    async export(params: SessionListParams = {}): Promise<{ data: Buffer; headers: Record<string, string> }> {
        return this.client.getBuffer('/api/export-sessions', params);
    }

    async downloadRecording(callId: string): Promise<{ data: Buffer; headers: Record<string, string> }> {
        if (!callId) {
            throw new Error('callId is required');
        }
        return this.client.getBuffer(`/api/download-recording/${callId}`);
    }
}
