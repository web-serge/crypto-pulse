import { Skeleton } from '@/components/ui/skeleton';
import { tradeColumns } from '@/components/home/TrandingCoins';
import { DataTable } from '@/components/DataTable';

export const TrendingCoinsSkeleton = () => {
    return (
        <div id="trending-coins" className="w-full flex flex-col justify-center h-full py-4 bg-dark-500 rounded-xl">
            <h4 className="text-xl md:text-2xl font-semibold mb-2 px-5">Trending Coins</h4>
            <DataTable
                data={[]}
                columns={tradeColumns}
                rowKey={(coin) => coin.item.id}
                tableClassName="trending-coins-table"
                bodyCellClassName="py-2!"
            />
            <div className="bg-dark-500 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between px-5 py-2 border-b border-dark-400 last:border-0"
                    >
                        <div className="flex items-center gap-3">
                            <Skeleton className="rounded-full size-8 md:size-9" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
    );
};
