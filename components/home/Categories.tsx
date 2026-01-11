import { fetcher } from '@/lib/coingecko.actions';
import { Category, DataTableColumn } from '@/type';
import { DataTable } from '@/components/DataTable';
import Image from 'next/image';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

const columns: DataTableColumn<Category>[] = [
    {
        header: 'Category',
        cellClassName: 'category-cell',
        cell: ({ name }) => name,
    },
    {
        header: ' Top Gainers',
        cellClassName: 'top-gainers-cell',
        cell: ({ top_3_coins }) =>
            top_3_coins.map((coin) => <Image key={coin} src={coin} alt={coin} width={28} height={28} />),
    },
    {
        header: '24h Change',
        cellClassName: 'change-header-cell',
        cell: ({ market_cap_change_24h }) => {
            const isTrendingUp = market_cap_change_24h > 0;

            return (
                <div className={cn('change-cell flex', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                    {isTrendingUp ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}
                    {formatPercentage(market_cap_change_24h)}
                </div>
            );
        },
    },
    {
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',
        cell: ({ market_cap }) => formatCurrency(market_cap),
    },
    {
        header: '24h Volume',
        cellClassName: 'volume-cell',
        cell: ({ volume_24h }) => formatCurrency(volume_24h),
    },
];

export const Categories = async () => {
    let categories;

    try {
        categories = await fetcher<Category[]>('/coins/categories');
    } catch (error) {
        console.error('Categories not found', error);
    }

    return (
        <div id={'categories'} className={'custom-scrollbar'}>
            <h4>Categories</h4>
            <DataTable
                columns={columns}
                data={categories?.slice(0, 10) ?? []}
                rowKey={(_, index) => index}
                tableClassName="mt-3"
            />
        </div>
    );
};
