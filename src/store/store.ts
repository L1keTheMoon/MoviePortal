import { configureStore, Middleware } from '@reduxjs/toolkit';
import { kinopoiskApi } from '../api/api';
import { userSlice } from './userSlice';
import { filtesSlice } from './filtersSlice';
import { pageSlice } from './pageSlice';

const logger: Middleware = (store) => (next) => (action) => {
	console.log('dispatching:', action);
	console.log('next state:', store.getState());
	const result = next(action);
	return result;
};

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		page: pageSlice.reducer,
		filters: filtesSlice.reducer,
		[kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(kinopoiskApi.middleware, logger),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;