import { fetcher } from '@/lib/coingecko.actions';
import { CoinDetailsData, OHLCData } from '@/type';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Chart } from '@/components/Chart';

export const CoinOverview = async () => {
    let coin;
    let coinOHLData;

    try {
        [coin, coinOHLData] = await Promise.all([
            fetcher<CoinDetailsData>('/coins/bitcoin', {
                dex_pair_format: 'symbol',
            }),

            fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
                days: 1,
                precision: 'full',
                vs_currency: 'usd',
            }),
        ]);
    } catch (error) {
        console.error(error);
        return null;
    }

    return (
        <Chart data={coinOHLData} coinId={'bitcoin'}>
            <div id={'coin-overview'}>
                <div className="header pt-2">
                    <Image src={coin.image.large} width={56} height={56} alt={coin.name} />
                    <div className="info">
                        <p>
                            {coin.name} / {coin.symbol.toUpperCase()}
                        </p>
                        <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
                    </div>
                </div>
            </div>
        </Chart>
    );
};
