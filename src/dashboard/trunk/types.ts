import { DashboardResponse } from '../types';

export interface Trunk {
    _id: string;
    name: string;
    channelLimit: number;
    currentRingingCalls: number;
    currentRunningCalls: number;
    active: boolean;
    cpsCapacityInPercent: number;
    updatedAt: string;
}

export interface TrunkLiveData {
    trunks: Trunk[];
}

export type TrunkLiveResponse = DashboardResponse<TrunkLiveData>;
export type TrunkCpsResponse = DashboardResponse<{}>;
