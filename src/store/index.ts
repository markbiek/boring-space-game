import { configureStore } from '@reduxjs/toolkit';

import { playerReducer, viewReducer, universeReducer } from './reducers';

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['refuel'],
			},
		}),
	reducer: {
		player: playerReducer,
		view: viewReducer,
		universe: universeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
