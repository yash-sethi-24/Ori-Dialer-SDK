import axios, { AxiosInstance } from 'axios';
import { PhoneNumberService } from './dashboard/phonenumber/PhoneNumberService';
import { SessionsService } from './dashboard/sessions/SessionsService';
import { ApplicationService } from './dashboard/application/ApplicationService';
import { WorkspaceService } from './dashboard/workspace/WorkspaceService';
import { OverviewService } from './dashboard/overview/OverviewService';
import { UsersService } from './dashboard/users/UsersService';
import { PublicNotificationsService } from './dashboard/public-notifications/PublicNotificationsService';
import { PublicStatusService } from './dashboard/public-status/PublicStatusService';
import { TrunkService } from './dashboard/trunk/TrunkService';
import { ServicesService } from './dashboard/services/ServicesService';
import {
    ApiClient,
    OriDialerConfig,
    InitiateCallParams,
    InitiateCallResponse,
    HangupResponse,
} from './types';

export class OriDialer {
    private dashboardAxios: AxiosInstance;
    private dialerAxios: AxiosInstance;

    public phoneNumbers: PhoneNumberService;
    public sessions: SessionsService;
    public applications: ApplicationService;
    public workspaces: WorkspaceService;
    public overview: OverviewService;
    public users: UsersService;
    public publicNotifications: PublicNotificationsService;
    public publicStatus: PublicStatusService;
    public trunks: TrunkService;
    public services: ServicesService;

    constructor(config: OriDialerConfig) {
        const { username, password } = config;

        if (!username || !password) {
            throw new Error('username and password are required');
        }

        const timeout = config.timeout || 30000;
        const auth = { username, password };

        this.dashboardAxios = axios.create({
            baseURL: config.dashboardBaseURL || 'https://api.dialer.oriserve.com',
            timeout,
            auth,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'oriserve_sdk',
            },
        });

        this.dialerAxios = axios.create({
            baseURL: config.dialerBaseURL || 'https://dialer.oriserve.com',
            timeout,
            auth,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (config.workspaceId) {
            this.setWorkspace(config.workspaceId);
        }

        this.addInterceptors(this.dashboardAxios);
        this.addInterceptors(this.dialerAxios);

        const dashboardClient = this.createApiClient(this.dashboardAxios);

        this.phoneNumbers = new PhoneNumberService(dashboardClient);
        this.sessions = new SessionsService(dashboardClient);
        this.applications = new ApplicationService(dashboardClient);
        this.workspaces = new WorkspaceService(dashboardClient);
        this.overview = new OverviewService(dashboardClient);
        this.users = new UsersService(dashboardClient);
        this.publicNotifications = new PublicNotificationsService(dashboardClient);
        this.publicStatus = new PublicStatusService(dashboardClient);
        this.trunks = new TrunkService(dashboardClient);
        this.services = new ServicesService(dashboardClient);
    }

    async initiateCall(params: InitiateCallParams): Promise<InitiateCallResponse> {
        const { userPhoneNumber, botPhoneNumber, callId, additionalDetails, websocketUrlForMediaStream, webhookUrlForCallEvents, maxCallDuration } = params;

        if (!userPhoneNumber || !botPhoneNumber) {
            throw new Error('userPhoneNumber and botPhoneNumber are required');
        }

        if (maxCallDuration && (typeof maxCallDuration !== 'number' || maxCallDuration > 3600)) {
            throw new Error('maxCallDuration must be a number and cannot exceed 3600 seconds');
        }

        const body: Record<string, any> = {
            userPhoneNumber,
            botPhoneNumber,
            additionalDetails,
            websocketUrlForMediaStream: websocketUrlForMediaStream || '',
            webhookUrlForCallEvents: webhookUrlForCallEvents || '',
            maxCallDuration: maxCallDuration || 900,
        };
        if (callId) body.callId = callId;

        const res = await this.dialerAxios.post<InitiateCallResponse>('/initiateCall', body);
        return res.data;
    }

    async hangup(callId: string): Promise<HangupResponse> {
        if (!callId) {
            throw new Error('callId is required');
        }

        const res = await this.dialerAxios.post<HangupResponse>('/hangup', { callId });
        return res.data;
    }

    setWorkspace(workspaceId: string): void {
        this.dashboardAxios.defaults.headers.common['x-workspace-id'] = workspaceId;
    }

    private createApiClient(instance: AxiosInstance): ApiClient {
        return {
            get: async <T>(path: string, params?: any): Promise<T> => {
                const res = await instance.get(path, { params });
                return res.data;
            },
            post: async <T>(path: string, data?: any): Promise<T> => {
                const res = await instance.post(path, data);
                return res.data;
            },
            put: async <T>(path: string, data?: any): Promise<T> => {
                const res = await instance.put(path, data);
                return res.data;
            },
            delete: async <T>(path: string): Promise<T> => {
                const res = await instance.delete(path);
                return res.data;
            },
            getBuffer: async (path: string, params?: any) => {
                const res = await instance.get(path, { params, responseType: 'arraybuffer' });
                return { data: Buffer.from(res.data), headers: res.headers as Record<string, string> };
            },
            setWorkspaceId: (id: string) => {
                instance.defaults.headers.common['x-workspace-id'] = id;
            },
        };
    }

    private addInterceptors(instance: AxiosInstance): void {
        instance.interceptors.response.use(
            (res) => {
                if (res.data && typeof res.data === 'object' && res.data.success === false) {
                    const error = new Error(res.data.message || 'Request failed') as any;
                    error.status = res.data.status;
                    error.code = res.data.code;
                    error.data = res.data.data;
                    throw error;
                }
                return res;
            },
            (error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        const errorData = error.response.data as any;
                        const apiError = new Error(errorData?.message || error.message || 'API request failed') as any;
                        apiError.status = error.response.status;
                        apiError.code = errorData?.code;
                        apiError.details = errorData?.details;
                        throw apiError;
                    }

                    if (error.request || error.message === 'Network Error') {
                        const networkError = new Error('Network error: No response received') as any;
                        networkError.code = 'NETWORK_ERROR';
                        throw networkError;
                    }
                }

                throw error instanceof Error ? error : new Error('Unknown error occurred');
            }
        );
    }
}

export default OriDialer;
export * from './types';
