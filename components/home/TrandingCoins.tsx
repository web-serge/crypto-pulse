import { fetcher } from '@/lib/coingecko.actions';
import { DataTableColumn, TrendingCoin } from '@/type';
import { Link } from '@/i18n/navigation';
import { Route } from '@/enum';
import Image from 'next/image';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { DataTable } from '@/components/DataTable';

export const tradeColumns: DataTableColumn<TrendingCoin>[] = [
    {
        header: 'Name',
        cellClassName: 'name-cell',
        cell: ({ item }) => (
            <Link href={`${Route.COINS}/${item.id}`}>
                <Image src={item.large} alt={item.name} width={36} height={36} />
                <p>{item.name}</p>
            </Link>
        ),
    },
    {
        header: '24h Change',
        cellClassName: 'name-cell',
        cell: ({ item }) => {
            const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

            return (
                <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                    {isTrendingUp ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}
                    {item.data.price_change_percentage_24h.usd.toFixed(2)}%
                </div>
            );
        },
    },
    {
        header: 'Price',
        cellClassName: 'price-cell',
        cell: ({ item }) => formatCurrency(item.data.price),
    },
];

export const TrendingCoins = async () => {
    const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);

    return (
        <div id={'trending-coins'}>
            <h4>Trending Coins</h4>
            <DataTable
                data={trendingCoins.coins.slice(0, 6) || []}
                columns={tradeColumns}
                rowKey={(coin) => coin.item.id}
                tableClassName="trending-coins-table"
                bodyCellClassName="py-2!"
            />
        </div>
    );
};
