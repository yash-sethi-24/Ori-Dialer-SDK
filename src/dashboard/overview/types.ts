import { DashboardResponse } from '../types';

export interface OverviewParams {
    startDate?: string;
    endDate?: string;
    timezone?: string;
    applicationId?: string;
    phoneNumber?: string;
    direction?: 'inbound' | 'outbound';
}

export interface ComparisonMetric {
    current: number;
    previous: number;
    changePercent: number;
}

export interface DayComparison {
    currentDate: string;
    previousDate: string;
    dayLabel: string;
    currentPeriod: number;
    previousPeriod: number;
}

export interface DurationDistribution {
    range: string;
    count: number;
}

export interface HourlyBreakdown {
    date: string;
    hour: number;
    totalDialed: number;
    completed: number;
    busy: number;
    noAnswer: number;
    ringing: number;
}

export interface OverviewData {
    primaryKPIs: {
        totalSessions: number;
        totalCallDuration: number;
        totalCallDurationMinutes: string;
        totalCallDurationHours: string;
        averageCallDuration: number;
        avgConnectedCallDuration: number;
        activePhoneNumbers: number;
        successRate: number;
    };
    callStatus: {
        completed: number;
        busy: number;
        noAnswer: number;
        failedOther: number;
    };
    direction: {
        inbound: number;
        outbound: number;
    };
    quality: {
        shortCalls: number;
        longCalls: number;
        avgRingingDuration: number;
    };
    resources: {
        totalApplications: number;
        applicationsWithCalls: number;
        phoneNumbersWithActivity: number;
        phoneNumbersIdle: number;
    };
    comparison: {
        totalSessions: ComparisonMetric;
        totalCallDuration: ComparisonMetric;
        averageCallDuration: ComparisonMetric;
        avgConnectedCallDuration: ComparisonMetric;
        completedCalls: ComparisonMetric;
        busyCalls: ComparisonMetric;
        noAnswerCalls: ComparisonMetric;
        failedOtherCalls: ComparisonMetric;
        inboundCalls: ComparisonMetric;
        outboundCalls: ComparisonMetric;
    };
    charts: {
        dailyComparison: DayComparison[];
        durationDistribution: DurationDistribution[];
        hourlyBreakdown: HourlyBreakdown[];
    };
    metadata: {
        startDate: string;
        endDate: string;
        timezone: string;
        workspaceId: string;
        appliedFilters: {
            applicationId: string | null;
            phoneNumber: string | null;
            direction: string;
        };
        generatedAt: string;
    };
}
export type OverviewResponse = DashboardResponse<OverviewData>;
