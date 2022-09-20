import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface UniverseState {
	systems: SystemVisibilityList;
}

interface SystemVisibilityList {
	[index: string]: boolean;
}

interface VisibilityAction {
	system: string;
	visible: boolean;
}

const initialState: UniverseState = {
	systems: {},
};

export const universeSlice = createSlice({
	name: 'universe',
	initialState,
	reducers: {
		loadSystems: (state, action: PayloadAction<string[]>) => {
			for (const system of action.payload) {
				state.systems[system] = false;
			}
		},
		setVisibility: (state, action: PayloadAction<VisibilityAction>) => {
			const { system, visible } = action.payload;

			state.systems[system] = visible;
		},
	},
});

export const { loadSystems, setVisibility } = universeSlice.actions;

export const systemVisibilityList = (state: RootState): SystemVisibilityList => {
	return state.universe.systems;
};

export default universeSlice.reducer;
