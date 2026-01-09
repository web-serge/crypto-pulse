export type TrendingCoin = {
    item: {
        id: string;
        name: string;
        symbol: string;
        market_cap_rank: number;
        thumb: string;
        large: string;
        data: {
            price: number;
            price_change_percentage_24h: {
                usd: number;
            };
        };
    };
};

export type Trade = {
    price?: number;
    timestamp?: number;
    type?: string;
    amount?: number;
    value?: number;
};
