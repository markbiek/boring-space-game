import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface ViewState {
	current_view: string;
}

const initialState = {
	current_view: '',
};

export const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<string>) => {
			state.current_view = action.payload;
		},
	},
});

export const { setView } = viewSlice.actions;

export const currentView = (state: RootState) => {
	return state.view.current_view;
};

export default viewSlice.reducer;
