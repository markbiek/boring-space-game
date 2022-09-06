export interface State {}

export interface ViewProps {}

export interface CargoItem {
	weight: number;
	name: string;
}

export interface Ship {
	fuel: number; // 5 fuel per hop
	fuel_size: number;
	cargo_size: number;
	cargo: CargoItem[] | null;
}

export interface Player {
	name: string;
	ship: Ship;
	credits: number;
	current_solar_system: string;
	missions: Mission[];
}

export interface TradeItem {
	name: string;
	weight: number;
	purchase_price: number;
	// 1 is least available
	availability: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
	quantity?: number;
}

export interface Mission {
	description: string;
	type: string;
	amount: number;
	source: Planet;
	destination: Planet;
}

export interface Planet {
	name: string;
	description: string;
	has_fuel: boolean;
	has_missions: boolean;
	has_trade: boolean;
	has_gambling: boolean;
	trade_items?: TradeItem[];
	missions?: Mission[];
}

export interface SolarSystem {
	name: string;
	description: string;
	planets: Planet[] | null;
	connected_systems: string[];
}

export interface Universe {
	solar_systems: {
		[index: string]: SolarSystem;
	};
	trade_items: TradeItem[];
}
