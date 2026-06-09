import { DashboardResponse } from '../types';

export interface Application {
    _id: string;
    name: string;
    workspace: string;
    primaryUrl: string;
    fallbackUrl: string;
    status: string;
    createdBy: string | { _id: string; firstName: string; lastName: string };
    updatedBy: string | { _id: string; firstName: string; lastName: string };
    createdAt: string;
    updatedAt: string;
    linkedPhoneNumbers?: string[];
}

export interface ApplicationListData {
    applications: Application[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
}

export interface CreateApplicationParams {
    name: string;
    primaryUrl: string;
    fallbackUrl?: string;
    phoneNumbers?: string[];
}

export interface UpdateApplicationParams {
    name?: string;
    primaryUrl?: string;
    fallbackUrl?: string;
    phoneNumbers?: string[];
}

export type ApplicationListResponse = DashboardResponse<ApplicationListData>;
export type ApplicationGetResponse = DashboardResponse<Application>;
export type ApplicationCreateResponse = DashboardResponse<Application>;
export type ApplicationUpdateResponse = DashboardResponse<Application>;
export type ApplicationDeleteResponse = DashboardResponse<{}>;
