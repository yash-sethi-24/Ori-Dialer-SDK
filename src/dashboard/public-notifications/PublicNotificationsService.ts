import {
    ApiClient,
    OtpRequestParams,
    SubscribeParams,
    OtpRequestResponse,
    SubscribeResponse,
    UnsubscribeRequestResponse,
} from '../../types';

export class PublicNotificationsService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async otpRequest(params: OtpRequestParams): Promise<OtpRequestResponse> {
        if (!params.email || !params.type) {
            throw new Error('email and type are required');
        }

        return this.client.post<OtpRequestResponse>('/api/public/notifications/otp/request', params);
    }

    async subscribe(params: SubscribeParams): Promise<SubscribeResponse> {
        if (!params.email || !params.otp) {
            throw new Error('email and otp are required');
        }

        return this.client.post<SubscribeResponse>('/api/public/notifications/subscribe', params);
    }

    async unsubscribeRequest(email: string): Promise<UnsubscribeRequestResponse> {
        if (!email) {
            throw new Error('email is required');
        }

        return this.client.post<UnsubscribeRequestResponse>('/api/public/notifications/unsubscribe/request', { email });
    }
}
