import { configureStore } from '@reduxjs/toolkit';
import { kinopoiskApi } from '../api/api';
import { userSlice } from './userSlice';
import { filtesSlice } from './filtersSlice';
import { pageSlice } from './pageSlice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		page: pageSlice.reducer,
		filters: filtesSlice.reducer,
		[kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(kinopoiskApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;