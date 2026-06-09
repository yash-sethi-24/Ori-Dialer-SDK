import {
    ApiClient,
    PaginationParams,
    CreateUserParams,
    UpdateUserParams,
    UserListResponse,
    UserCreateResponse,
    UserUpdateResponse,
    UserDeleteResponse,
} from '../../types';

export class UsersService {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async list(params: PaginationParams = {}): Promise<UserListResponse> {
        return this.client.get<UserListResponse>('/api/users', params);
    }

    async create(params: CreateUserParams): Promise<UserCreateResponse> {
        const { firstName, lastName, email, password } = params;

        if (!firstName || !lastName || !email || !password) {
            throw new Error('firstName, lastName, email, and password are required');
        }

        return this.client.post<UserCreateResponse>('/api/users', params);
    }

    async update(userId: string, params: UpdateUserParams): Promise<UserUpdateResponse> {
        if (!userId) {
            throw new Error('userId is required');
        }

        return this.client.put<UserUpdateResponse>(`/api/users/${userId}`, params);
    }

    async delete(userId: string): Promise<UserDeleteResponse> {
        if (!userId) {
            throw new Error('userId is required');
        }

        return this.client.delete<UserDeleteResponse>(`/api/users/${userId}`);
    }
}
