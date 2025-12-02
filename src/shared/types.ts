interface ImageData {
	thumb: string;
	small: string;
	large: string;
}

interface Price {
	usd: number;
	rub: string;
}

interface MarketData {
	current_price: Price;
	market_cap: Price;
	market_cap_change_24h: number;
	total_supply: number;
	total_volume: Price;
	market_cap_rank: number;
	high_24h: Price;
	low_24h: Price;
	ath: Price;
	atl: Price;
	ath_date: Price;
	atl_date: Price;
	ath_change_percentage: Price;
	atl_change_percentage: Price;
}

interface Links {
	homepage: [0];
}

export interface CoinTypes {
	id: string;
	name: string;
	image: ImageData | string;
	current_price: number;
	market_cap: number;
	total_volume: number;
	total_supply: number;
	symbol: string;
	market_data: MarketData;
	links: Links;
}

export interface CryptoState {
	list: CoinTypes[];
	overview: CoinTypes | null;
	totalPages: number;
	loading: boolean;
	error: string | null;
}

interface User {
	email?: string;
	id?: string;
}

export interface AuthState {
	user: User | null;
	checkingAuth: boolean;
	error: string | null;
}

export interface AuthFormState {
	email: string;
	password: string;
	confirmPassword: string;
	showPassword: boolean;
}

export interface SearchCoin {
	id: string;
	name: string;
	symbol: string;
	large: string;
}
