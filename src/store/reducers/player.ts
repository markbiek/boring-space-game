import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

import { HOP_FUEL } from '../../constants';
import { CargoItem } from '../../types';

export interface PlayerState {
	player_name: string;
	ship_name: string;
	ship_type: 'shuttle';
	location: string;
	credits: number;
}

const initialState = {
	name: '',
	ship_name: '',
	ship_type: 'shuttle',
	location: 'azura',
	credits: 100,
	ship: {
		fuel: 10,
		fuel_size: 10,
		cargo_size: 50,
		cargo: [] as CargoItem[],
	},
};

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setPlayerName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setShipName: (state, action: PayloadAction<string>) => {
			state.ship_name = action.payload;
		},
		setShipType: (state, action: PayloadAction<string>) => {
			state.ship_type = action.payload;
		},
		setLocation: (state, action: PayloadAction<string>) => {
			state.location = action.payload;
		},
		setCredits: (state, action: PayloadAction<number>) => {
			state.credits = action.payload;
		},
		useFuel: (state) => {
			state.ship.fuel -= HOP_FUEL;
		},
		refuel: (state) => {
			const {
				ship: { fuel_size, fuel },
				credits,
			} = state;
			const fuelAmount = fuel_size - fuel;

			// They don't actually need fuel
			if (fuelAmount <= 0) {
				return;
			}

			// They don't have enough money to refuel
			if (credits - fuelAmount < 0) {
				// TODO - Need to display a message or something
				return;
			}

			state.ship.fuel = state.ship.fuel_size;
			state.credits = credits - fuelAmount;
		},
		addCargo: (state, action: PayloadAction<CargoItem>) => {
			const {
				ship: { cargo_size },
			} = state;

			if (cargo_size - action.payload.weight < 0) {
				// TODO - Need to display a message or something
				return;
			}

			if (!action.payload.item.current_price) {
				// TODO - Need to display a message or something
				return;
			}

			state.ship.cargo_size -= action.payload.weight;
			state.ship.cargo.push(action.payload);
			state.credits -= action.payload.item.current_price;
		},
		removeCargo: (state, action: PayloadAction<CargoItem>) => {
			if (!action.payload.item.current_price) {
				// TODO - Need to display a message or something
				return;
			}

			state.ship.cargo_size += action.payload.weight;
			state.credits += action.payload.item.current_price;

			for (let i = 0; i < state.ship.cargo.length; i++) {
				const cargoItem = state.ship.cargo[i];

				if (cargoItem.item.name === action.payload.name) {
					state.ship.cargo.splice(i, 1);
					break;
				}
			}
		},
	},
});

export const {
	setCredits,
	setPlayerName,
	setShipName,
	setShipType,
	setLocation,
	useFuel,
	refuel,
	addCargo,
	removeCargo,
} = playerSlice.actions;

export const playerName = (state: RootState) => state.player.name;
export const playerLocation = (state: RootState) => state.player.location;
export const playerCredits = (state: RootState) => state.player.credits;
export const playerShip = (state: RootState) => state.player.ship;
export const playerAvailableCargo = (state: RootState) => state.player.ship.cargo_size;
export const playerHopsRemaining = (state: RootState) => Math.floor(state.player.ship.fuel / 5);

export default playerSlice.reducer;
