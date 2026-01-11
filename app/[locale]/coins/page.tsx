import { CoinMarketData, DataTableColumn, NextPageProps } from '@/type';
import { fetcher } from '@/lib/coingecko.actions';
import { DataTable } from '@/components/DataTable';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { CoinsPagination } from '@/components/CoinsPagination';

const columns: DataTableColumn<CoinMarketData>[] = [
    {
        header: 'Rank',
        cellClassName: 'rank-cell',
        cell: (coin) => (
            <>
                #{coin.market_cap_rank}
                <Link href={`/coins/${coin.id}`} aria-label="View coin" />
            </>
        ),
    },
    {
        header: 'Token',
        cellClassName: 'token-cell',
        cell: (coin) => (
            <div className="token-info">
                <Image src={coin.image} alt={coin.name} width={36} height={36} />
                <p>
                    {coin.name} ({coin.symbol.toUpperCase()})
                </p>
            </div>
        ),
    },
    {
        header: 'Price',
        cellClassName: 'price-cell',
        cell: ({ current_price }) => formatCurrency(current_price),
    },
    {
        header: '24h Change',
        cellClassName: 'change-cell',
        cell: (coin) => {
            const isTrendingUp = coin.price_change_percentage_24h > 0;

            return (
                <span
                    className={cn('change-value', {
                        'text-green-600': isTrendingUp,
                        'text-red-500': !isTrendingUp,
                    })}
                >
                    {isTrendingUp && '+'}
                    {formatPercentage(coin.price_change_percentage_24h)}
                </span>
            );
        },
    },
    {
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',
        cell: ({ market_cap }) => formatCurrency(market_cap),
    },
];

const Page = async ({ searchParams }: NextPageProps) => {
    const { page } = await searchParams;

    const currentPage = Number(page);
    const per_page = 10;

    const coinsData = await fetcher<CoinMarketData[]>('/coins/markets', {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        sparkline: 'false',
        price_change_percentage: '24h',
        page: currentPage || 1,
        per_page,
    });

    const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

    return (
        <main id="coins-page">
            <div className="content">
                <h4>All Coins</h4>
                <DataTable tableClassName="coins-table" columns={columns} data={coinsData} rowKey={(coin) => coin.id} />
                <CoinsPagination currentPage={currentPage} totalPage={estimatedTotalPages} />
            </div>
        </main>
    );
};

export default Page;
