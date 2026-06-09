import { DashboardResponse } from '../types';

export interface WorkspaceMembership {
    workspace: {
        _id: string;
        name: string;
        domain: string;
    };
    roleKey: string;
    permissions: string[];
    isActive: boolean;
    joinedAt: string;
}

export interface User {
    _id: string;
    email: string;
    username?: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    workspaceMemberships: WorkspaceMembership[];
    createdBy: string | null;
    createdAt: string;
    updatedAt: string;
    isGlobalActive: boolean;
    metaData: Record<string, any>;
}

export interface WorkspaceUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    phone?: string;
    workspaceMemberships: {
        workspace: string;
        roleKey: string;
        permissions: string[];
        isActive?: boolean;
    }[];
    createdBy?: { _id: string };
    createdAt?: string;
    updatedAt?: string;
}

export interface UserListData {
    users: WorkspaceUser[];
    totalCount: number;
    currentCount: number;
    skip: number;
    limit: number;
}

export interface CreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username?: string;
    phone?: string;
    roleKey?: 'admin' | 'manager' | 'agent' | 'custom' | 'sdk-user';
    permissions?: string[];
}

export interface UpdateUserParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    phone?: string;
    roleKey?: 'admin' | 'manager' | 'agent' | 'custom' | 'sdk-user';
    permissions?: string[];
}

export type UserListResponse = DashboardResponse<UserListData>;
export type UserCreateResponse = DashboardResponse<{ user: WorkspaceUser }>;
export type UserUpdateResponse = DashboardResponse<{ user: WorkspaceUser }>;
export type UserDeleteResponse = DashboardResponse<{}>;
