import { DashboardResponse } from '../types';

export interface PublicService {
    _id: string;
    name: string;
}

export interface PublicServiceListData {
    services: PublicService[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
}

export interface IncidentUpdate {
    timestamp: string;
    message: string;
    status: string;
    ip?: string;
    _id?: string;
}

export interface PublicIncident {
    _id: string;
    serviceType: string;
    serviceId: string;
    serviceName: string;
    status: string;
    title: string;
    description: string;
    isResolved: boolean;
    updates: IncidentUpdate[];
    resolutionMessage?: string;
    resolvedIp?: string;
    startTime: string;
    endTime?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UptimeData {
    serviceId: string;
    incidents: {
        _id: string;
        status: string;
        startTime: string;
        endTime?: string;
        isResolved: boolean;
        initialUpdate: IncidentUpdate;
    }[];
}

export interface IncidentListData {
    incidents: PublicIncident[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
}

export interface IncidentListParams {
    isResolved?: string;
    limit?: number;
    skip?: number;
}

export type PublicServiceListResponse = DashboardResponse<PublicServiceListData>;
export type UptimeResponse = DashboardResponse<UptimeData>;
export type IncidentListResponse = DashboardResponse<IncidentListData>;
