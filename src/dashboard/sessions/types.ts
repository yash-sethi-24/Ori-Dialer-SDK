import { DashboardResponse } from '../types';

export interface SessionListParams {
    limit?: number;
    skip?: number;
    timezone?: string;
    startDate?: string;
    endDate?: string;
    direction?: 'INBOUND' | 'OUTBOUND';
    status?: 'COMPLETED' | 'BUSY' | 'NO-ANSWER' | 'INITIATED' | 'RINGING';
    botPhone?: string;
    userPhone?: string;
    callId?: string;
    duration?: number;
    durationOption?: 'greater_than' | 'less_than' | 'equal_to';
}

export interface Session {
    _id: string;
    callId: string;
    botPhoneNumber: string;
    userPhoneNumber: string;
    callingDirection: string;
    callStatus: string;
    callDuration: number;
    callStartTime: string;
    callEndTime: string;
    callRingingTime: string;
    callRingingDuration: number;
    callHangupSource: string;
    callHangupDescription: string;
    callRecordingUrl: string;
    originateChannelId: string;
    createdAt: string;
    updatedAt: string;
}

export interface SessionListData {
    sessions: Session[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
    timezone: string;
}

export type SessionListResponse = DashboardResponse<SessionListData>;
export type SessionGetResponse = DashboardResponse<Session>;
