import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface ViewState {
	current_view: string;
	current_sub_view: string;
}

const initialState = {
	current_view: '',
	current_subview: '',
};

export const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<string>) => {
			state.current_view = action.payload;
		},
		setSubview: (state, action: PayloadAction<string>) => {
			state.current_subview = action.payload;
		},
	},
});

export const { setView, setSubview } = viewSlice.actions;

export const currentView = (state: RootState) => {
	return state.view.current_view;
};
export const currentSubview = (state: RootState) => state.view.current_subview;

export default viewSlice.reducer;
