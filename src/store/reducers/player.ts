import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

import { HOP_FUEL } from '../../constants';

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
		cargo_size: 25,
		cargo: null,
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
	},
});

export const { setCredits, setPlayerName, setShipName, setShipType, setLocation, useFuel } =
	playerSlice.actions;

export const playerName = (state: RootState) => state.player.name;
export const playerLocation = (state: RootState) => state.player.location;
export const playerCredits = (state: RootState) => state.player.credits;
export const playerShip = (state: RootState) => state.player.ship;
export const playerHopsRemaining = (state: RootState) => Math.floor(state.player.ship.fuel / 5);

export default playerSlice.reducer;
