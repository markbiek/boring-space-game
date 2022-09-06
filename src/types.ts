export interface State {}

export interface ViewProps {
	subview: string;
}

export interface Ship {
	fuel: number;
	fuel_size: number;
	cargo_size: number;
}

export interface Player {
	name: string;
	ship: Ship;
	credits: number;
	current_location: SolarSystem;
	missions: Mission[];
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
	fuel: boolean;
	trade: boolean;
	gambling: boolean;
}

export interface SolarSystem {
	name: string;
	description: string;
	planets: Planet[] | null;
	connected_systems: SolarSystem[];
}
