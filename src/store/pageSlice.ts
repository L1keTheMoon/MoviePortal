import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
	name: 'page',
	initialState: 1,
	reducers: {
		changePage(state, action: PayloadAction<number>) {
			return action.payload;
		}
	}
})

export const { changePage } = pageSlice.actions;