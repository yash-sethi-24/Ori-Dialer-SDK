import { DashboardResponse } from '../types';

export interface PhoneNumber {
    _id: string;
    phoneNumber: string;
    providerName: string;
    providerPhoneNumber: string;
    sipEndpointNameForAsterisk: string;
    sipDriver: string;
    workspace: { _id: string; name: string; domain: string } | null;
    application: { _id: string; name: string; primaryUrl: string } | null;
    currentTransaction: PhoneNumberTransaction | null;
    createdAt: string;
    updatedAt: string;
}

export interface PhoneNumberTransaction {
    _id: string;
    phoneNumber: string;
    transactionType: 'rent' | 'unrent';
    workspace: string;
    userId: string | { _id: string; email: string; firstName: string; lastName: string };
    reason: string;
    description: string;
    transactionDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface PhoneNumberListData {
    phoneNumbers: PhoneNumber[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
}

export interface RentParams {
    phoneNumber: string;
    reason: string;
    description: string;
    applicationId?: string;
}

export interface UnrentParams {
    phoneNumber: string;
    reason?: string;
    description?: string;
}

export interface RentUnrentData {
    phoneNumber: PhoneNumber;
    transaction: PhoneNumberTransaction;
}

export type PhoneNumberListResponse = DashboardResponse<PhoneNumberListData>;
export type RentResponse = DashboardResponse<RentUnrentData>;
export type UnrentResponse = DashboardResponse<RentUnrentData>;

export interface RentedPhoneNumberParams extends PaginationParams {
    location?: string;
}

export interface AvailablePhoneNumberParams extends RentedPhoneNumberParams {
    includeMultiRent?: boolean;
}

import { PaginationParams } from '../types';
