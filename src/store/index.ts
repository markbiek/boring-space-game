import { configureStore } from '@reduxjs/toolkit';

import { playerReducer, viewReducer } from './reducers';

export const store = configureStore({
	reducer: {
		player: playerReducer,
		view: viewReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
