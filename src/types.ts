// Internal interface for services to make API calls
export interface ApiClient {
    get<T = any>(path: string, params?: any): Promise<T>;
    post<T = any>(path: string, data?: any): Promise<T>;
    put<T = any>(path: string, data?: any): Promise<T>;
    delete<T = any>(path: string): Promise<T>;
    getBuffer(path: string, params?: any): Promise<{ data: Buffer; headers: Record<string, string> }>;
    setWorkspaceId(workspaceId: string): void;
}

// SDK Config
export interface OriDialerConfig {
    username: string;
    password: string;
    dialerBaseURL?: string;
    dashboardBaseURL?: string;
    timeout?: number;
    workspaceId?: string;
}

// Call Types
export interface InitiateCallParams {
    userPhoneNumber: string;
    botPhoneNumber: string;
    callId?: string;
    additionalDetails?: Record<string, any>;
    websocketUrlForMediaStream?: string;
    webhookUrlForCallEvents?: string;
    maxCallDuration?: number;
}

export interface ApiResponse<T = any> {
    status: number;
    success: boolean;
    data: T;
    message: string;
}

export interface InitiateCallData {
    callId: string;
}

export interface HangupData {
    callId: string;
}

export type InitiateCallResponse = ApiResponse<InitiateCallData>;
export type HangupResponse = ApiResponse<HangupData>;

export type CallEventName = 'CALL_START' | 'CALL_TERMINATE';

export interface CallEvent {
    callId: string;
    eventName: CallEventName;
    [key: string]: any;
}

// ─── Re-export Dashboard Types ──────────────────────────────
export * from './dashboard/types';
export * from './dashboard/application/types';
export * from './dashboard/overview/types';
export * from './dashboard/phonenumber/types';
export * from './dashboard/public-notifications/types';
export * from './dashboard/public-status/types';
export * from './dashboard/services/types';
export * from './dashboard/sessions/types';
export * from './dashboard/trunk/types';
export * from './dashboard/users/types';
export * from './dashboard/workspace/types';
