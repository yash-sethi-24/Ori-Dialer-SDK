import { DashboardResponse } from '../types';

export interface OtpRequestParams {
    email: string;
    type: string;
}

export interface SubscribeParams {
    email: string;
    otp: string;
}

export interface OtpRequestData {
    otpExpires?: string;
    alreadyActive?: boolean;
}

export type OtpRequestResponse = DashboardResponse<OtpRequestData>;
export type SubscribeResponse = DashboardResponse<{}>;
export type UnsubscribeRequestResponse = DashboardResponse<{}>;
