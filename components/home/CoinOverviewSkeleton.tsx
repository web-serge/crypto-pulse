import { Skeleton } from '@/components/ui/skeleton';
import { Fragment } from 'react';

export const CoinOverviewSkeleton = () => {
    return (
        <div id={'coin-overview-fallback'}>
            <div className="header pt-2">
                <Skeleton className="header-image" />
                <div className="info">
                    {[...Array(6)].map((_, i) => (
                        <Fragment key={i}>
                            <Skeleton className="header-line-sm" />
                            <Skeleton className="header-line-lg" />
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
