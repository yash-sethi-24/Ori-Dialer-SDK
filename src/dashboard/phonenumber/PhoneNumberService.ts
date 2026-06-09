import {
    ApiClient,
    PaginationParams,
    RentParams,
    UnrentParams,
    PhoneNumberListResponse,
    RentResponse,
    UnrentResponse,
    AvailablePhoneNumberParams,
    RentedPhoneNumberParams,
} from '../../types';

export class PhoneNumberService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async available(params: AvailablePhoneNumberParams = {}): Promise<PhoneNumberListResponse> {
        return this.client.get<PhoneNumberListResponse>('/api/phoneNumbers/available', params);
    }

    async list(params: RentedPhoneNumberParams = {}): Promise<PhoneNumberListResponse> {
        return this.client.get<PhoneNumberListResponse>('/api/phoneNumbers', params);
    }

    async rent(params: RentParams): Promise<RentResponse> {
        const { phoneNumber, reason, description, applicationId } = params;

        if (!phoneNumber) {
            throw new Error('phoneNumber is required');
        }
        if (!reason || !description) {
            throw new Error('reason and description are required');
        }

        return this.client.post<RentResponse>(`/api/phoneNumbers/${phoneNumber}/rent`, {
            reason,
            description,
            ...(applicationId && { applicationId }),
        });
    }

    async unrent(params: UnrentParams): Promise<UnrentResponse> {
        const { phoneNumber, reason, description } = params;

        if (!phoneNumber) {
            throw new Error('phoneNumber is required');
        }

        return this.client.put<UnrentResponse>(`/api/phoneNumbers/${phoneNumber}/unrent`, {
            ...(reason && { reason }),
            ...(description && { description }),
        });
    }
}
