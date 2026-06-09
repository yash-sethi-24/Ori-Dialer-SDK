import { DashboardResponse } from '../types';
import { IncidentUpdate } from '../public-status/types';

export interface ServiceStatusData {
    status: 'healthy' | 'partial_outage' | 'full_outage';
}

export interface CreateIncidentParams {
    title: string;
    status: 'healthy' | 'partial_outage' | 'full_outage';
    description?: string;
}

export interface UpdateIncidentParams {
    message: string;
    status?: 'partial_outage' | 'full_outage';
}

export interface Incident {
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
    endTime?: string | null;
    createdAt: string;
    updatedAt: string;
}

export type ServiceStatusResponse = DashboardResponse<ServiceStatusData>;
export type CreateIncidentResponse = DashboardResponse<{ incident: Incident }>;
export type UpdateIncidentResponse = DashboardResponse<{ incident: Incident }>;
export type ResolveIncidentResponse = DashboardResponse<{ incident: Incident }>;
