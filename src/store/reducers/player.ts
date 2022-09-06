import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface PlayerState {
	player_name: string;
	ship_name: string;
	ship_type: 'shuttle';
	location: string;
}

const initialState = {
	name: '',
	ship_name: '',
	ship_type: 'shuttle',
	location: 'azura',
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
	},
});

export const { setPlayerName, setShipName, setShipType, setLocation } = playerSlice.actions;

export const playerName = (state: RootState) => state.player.name;
export const playerLocation = (state: RootState) => state.player.location;

export default playerSlice.reducer;
