'use client';

import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { useRouter } from 'next/navigation';

type Props = {
    currentPage: number;
    totalPage: number;
};

export const CoinsPagination = ({ totalPage, currentPage }: Props) => {
    const router = useRouter();

    const handlePageChange = (page: number) => {
        router.push(`/coins?page=${page}`);
    };

    return (
        <ResponsivePagination
            total={totalPage}
            current={currentPage}
            onPageChange={handlePageChange}
            maxWidth={600}
            linkHref={(page) => `/coins?page=${page}`}
        />
    );
};
