'use client';

import { CandlestickChartProps, OHLCData, Period } from '@/type';
import { useEffect, useRef, useState, useTransition } from 'react';
import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG } from '@/constants';
import { cn, convertOHLCData } from '@/lib/utils';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { fetcher } from '@/lib/coingecko.actions';

export const Chart = ({ coinId, initialPeriod = 'daily', height = 360, data, children }: CandlestickChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi>(null);
    const candleSeriesRef = useRef<ISeriesApi<'Candlestick'>>(null);

    const [isPending, startTransition] = useTransition();

    const [period, setPeriod] = useState<Period>(initialPeriod);
    const [OHLCData, setOHLCData] = useState<OHLCData[]>(data ?? []);

    const fetchOHLCData = async (selectedPeriod: Period) => {
        try {
            const { days } = PERIOD_CONFIG[selectedPeriod];

            const newData = await fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
                vs_currency: 'usd',
                days,
                precision: 'full',
            });

            setOHLCData(newData);
        } catch (error) {
            console.error('Failed to fetch OHLCData', error);
        }
    };

    const handlePeriodChange = (newPeriod: Period) => {
        if (newPeriod === period) return;

        setPeriod(newPeriod);
        startTransition(async () => {
            fetchOHLCData(newPeriod);
        });
    };

    useEffect(() => {
        const container = chartContainerRef.current;

        if (!container) return;

        const showTime = ['daily', 'weekly', 'monthly'].includes(period);

        const chart = createChart(container, {
            ...getChartConfig(height, showTime),
            width: container.clientWidth,
        });

        const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

        const convertedToSeconds = OHLCData.map(
            (item) => [Math.floor(item[0] / 1000), item[1], item[2], item[3], item[4]] as OHLCData,
        );

        series.setData(convertOHLCData(convertedToSeconds));
        chart.timeScale().fitContent();

        chartRef.current = chart;

        candleSeriesRef.current = series;

        const observer = new ResizeObserver((entries) => {
            if (!entries.length) return;

            chart.applyOptions({
                width: entries[0].contentRect.width,
            });
        });

        observer.observe(container);

        return () => {
            observer.disconnect();
            chart.remove();
            chartRef.current = null;
            candleSeriesRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, period]);

    useEffect(() => {
        if (!candleSeriesRef.current) return;

        const convertedToSeconds = OHLCData.map(
            (item) => [Math.floor(item[0] / 1000), item[1], item[2], item[3], item[4]] as OHLCData,
        );

        const converted = convertOHLCData(convertedToSeconds);

        candleSeriesRef.current.setData(converted);
        chartRef.current?.timeScale().fitContent();
    }, [OHLCData, period]);

    return (
        <div id={'candlestick-chart'} key={coinId}>
            <div className={'chart-header'}>
                <div className={'flex-1'}>{children}</div>
                <div className={'button-group'}>
                    <span className={'text-sm mx-2 font-medium text-purple-100/50'}>Period</span>
                    {PERIOD_BUTTONS.map(({ value, label }) => (
                        <button
                            key={value}
                            className={cn(period === value ? 'config-button-active' : 'config-button')}
                            disabled={isPending}
                            onClick={() => handlePeriodChange(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div ref={chartContainerRef} className={'chart'} style={{ height: `${height}px` }} />
        </div>
    );
};
