export interface State {}

export interface ViewProps {}

export interface CargoItem {
	weight: number;
	name: string;
}

export interface Ship {
	fuel: number;
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
	quantity: number;
	weight: number;
	purchase_price: number;
}

export interface Mission {
	description: string;
	type: 'trade';
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
}

export interface SolarSystem {
	name: string;
	description: string;
	planets: Planet[] | null;
	connected_systems: string[];
}

export interface Universe {
	[index: string]: SolarSystem;
}
