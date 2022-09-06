import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export type AvailableViews = 'start' | 'solarsystem';

export interface ViewState {
	current_view: AvailableViews;
}

const initialState: ViewState = {
	current_view: 'start',
};

export const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<AvailableViews>) => {
			state.current_view = action.payload;
		},
	},
});

export const { setView } = viewSlice.actions;

export const currentView = (state: RootState): AvailableViews => {
	return state.view.current_view;
};

export default viewSlice.reducer;
