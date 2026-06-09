import { DashboardResponse } from '../types';

export interface Workspace {
    _id: string;
    name: string;
    domain: string;
    roleKey: string;
    permissions: string[];
    joinedAt: string;
    lastAccessedAt: string;
}

export interface WorkspaceListData {
    workspaces: Workspace[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
}

export interface WorkspaceSelectData {
    selectedWorkspace: {
        id: string;
        name: string;
        domain: string;
    };
    token: string;
    tokenExpiry: string;
}

export type WorkspaceListResponse = DashboardResponse<WorkspaceListData>;
export type WorkspaceSelectResponse = DashboardResponse<WorkspaceSelectData>;
