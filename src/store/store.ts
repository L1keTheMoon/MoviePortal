import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, LoginState } from '../types/types';

const initialState: LoginState | null = null;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		createUser(state, action: PayloadAction<UserData>) {
			const { login, password } = action.payload;
			localStorage.setItem(login + '-PW', password);
			localStorage.setItem(login + '-Favorites', JSON.stringify([]));
			return { isLogin: true, name: login };
		},
		logIn(state, action: PayloadAction<UserData>) {
			const { login, password } = action.payload;
			if (localStorage.getItem(login + '-PW') === password) {
				return { isLogin: true, name: login };
			}
			throw Error('Wrong login or password');
		},
		logOut() {
			return initialState;
		}
	}
})

export const store = configureStore({
	reducer: {
		user: userSlice.reducer
	}
})

export const { createUser, logIn, logOut } = userSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;