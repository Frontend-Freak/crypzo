export interface CoinTypes {
	id: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	total_volume: number;
	total_supply: number;
	symbol: string;
}

export interface CryptoState{
    list: CoinTypes[],
    overview: CoinTypes | null;
    totalPages: number
    loading: boolean,
    error: string | null
}