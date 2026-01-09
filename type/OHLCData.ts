import { ReactNode } from 'react';

export type OHLCData = [number, number, number, number, number];

export type Period = 'daily' | 'weekly' | 'monthly' | '3months' | '6months' | 'yearly';

export type CandlestickChartProps = {
    data?: OHLCData[];
    liveOhlcv?: OHLCData | null;
    coinId: string;
    height?: number;
    children?: ReactNode;
    mode?: 'historical' | 'live';
    initialPeriod?: Period;
};
