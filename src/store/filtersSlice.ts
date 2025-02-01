import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersType } from '../types/types';

const initialState: FiltersType = { order: 'NUM_VOTE' };

export const filtesSlice = createSlice({
	name: 'filtes',
	initialState,
	reducers: {
		setFilters(state, action: PayloadAction<{ key: string, value: string | number }>) {
			const { key, value } = action.payload;
			state[key] = value;
		},
		resetFilters(state, action: PayloadAction<FiltersType>) {
			return { order: state.order };
		}
	}
})

export const { setFilters, resetFilters } = filtesSlice.actions;