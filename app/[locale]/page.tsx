import { Suspense } from 'react';
import { CoinOverview } from '@/components/home/CoinOverview';
import { TrendingCoins } from '@/components/home/TrandingCoins';
import { TrendingCoinsSkeleton } from '@/components/home/TrendingCoinsSkeleton';
import { CoinOverviewSkeleton } from '@/components/home/CoinOverviewSkeleton';
import { Categories } from '@/components/home/Categories';

const Page = async () => {
    return (
        <main className="main-container">
            <section className="home-grid">
                <Suspense fallback={<CoinOverviewSkeleton />}>
                    <CoinOverview />
                </Suspense>
                <Suspense fallback={<TrendingCoinsSkeleton />}>
                    <TrendingCoins />
                </Suspense>
            </section>
            <section className="w-full mt-7 space-y-4">
                <Suspense>
                    <Categories />
                </Suspense>
            </section>
        </main>
    );
};

export default Page;
