import { Typography, TextField, Button, Slider } from '@mui/material';
import { Select } from '../Select/Select';
import { years, ratings, types } from '../../constants/index';
import { useGetFilterOptionsQuery } from '../../api/api';
import { FiltersType } from '../../types/types';
import styles from './Filters.module.css';
import { useState } from 'react';

interface FiltersProps {
	handleChange: (fieldName: string, value: string | number) => void,
	resetFilters: () => void,
	search: () => void,
	filters: FiltersType
}

export function Filters({ handleChange, resetFilters, search, filters }: FiltersProps) {
	const { data, isSuccess } = useGetFilterOptionsQuery('');

	// const [value1, setValue1] = useState(2);
	// const [value2, setValue2] = useState(5);

	// const handleChange1 = (
	// 	event: Event,
	// 	newValue: number | number[],
	// 	activeThumb: number,
	// ) => {
	// 	if (!Array.isArray(newValue)) {
	// 		return;
	// 	}

	// 	if (activeThumb === 0) {
	// 		setValue1(Math.max(newValue[0], 1));
	// 	} else {
	// 		setValue2(Math.min(newValue[1], 10));
	// 	}
	// };

	// const sliderHandleChange = (
	// 	event: Event,
	// 	newValue: number | number[],
	// 	activeThumb: number,
	// ) => {
	// 	if (!Array.isArray(newValue)) {
	// 		return;
	// 	}

	// 	if (activeThumb === 0) {
	// 		handleChange('yearFrom', Math.max(newValue[0], years.at(-1).year));
	// 	} else {
	// 		handleChange('yearTo', Math.min(newValue[1], years[0].year));
	// 	}
	// };

	// const sliderHandleChange2 = (
	// 	event: Event,
	// 	newValue: number | number[],
	// 	activeThumb: number,
	// ) => {
	// 	if (!Array.isArray(newValue)) {
	// 		return;
	// 	}

	// 	if (activeThumb === 0) {
	// 		handleChange('ratingFrom', Math.max(newValue[0], ratings.at(-1).rating));
	// 	} else {
	// 		handleChange('ratingTo', Math.min(newValue[1], ratings[0].rating));
	// 	}
	// };

	return (
		<form className={styles.form}>
			<div className={styles.group}>
				<TextField
					label="Название фильма или сериала"
					value={filters.keyword || ''}
					variant="outlined"
					onChange={(event) => handleChange('keyword', event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") search();
					}}
				/>
				<Select
					value={filters.type}
					variants={types}
					variantName='type'
					handleChange={handleChange}
					name='type'
					label='Тип'
					labelMinWidth={80}
				/>
				<Select
					value={filters.countries}
					variants={isSuccess && data.countries}
					variantName='country'
					handleChange={handleChange}
					name='countries'
					label='Страна'
					labelMinWidth={80}
				/>
				<Select
					value={filters.genres}
					variants={isSuccess && data.genres}
					variantName='genre'
					handleChange={handleChange}
					name='genres'
					label='Жанр'
					labelMinWidth={80}
				/>
			</div>
			<div className={styles.group}>
				<Typography
					variant="h5"
					component="h5"
					noWrap
					sx={{ color: 'var(--primary)', fontWeight: 500 }}
				>
					Год выхода:
				</Typography>
				<div className={styles.inputs}>
					<Select
						value={filters.yearFrom}
						variantName='year'
						variants={years}
						handleChange={handleChange}
						name='yearFrom'
						label='с'
						labelMinWidth={30}
						width={125}
					/>
					<Select
						value={filters.yearTo}
						variantName='year'
						variants={years}
						handleChange={handleChange}
						name='yearTo'
						label='по'
						labelMinWidth={30}
						width={125}
					/>
				</div>
				{/* <Slider
					value={[(filters.yearFrom || years.at(-1).year), (filters.yearTo || years[0].year)]}
					onChange={sliderHandleChange}
					valueLabelDisplay="auto"
					min={years.at(-1).year}
					max={years[0].year}
					disableSwap
				/> */}
			</div>
			<div className={styles.group}>
				<Typography
					variant="h5"
					component="h5"
					noWrap
					sx={{ color: 'var(--primary)', fontWeight: 500 }}
				>
					Рейтинг:
				</Typography>
				<div className={styles.inputs}>
					<Select
						value={filters.ratingFrom}
						variantName='rating'
						variants={ratings}
						handleChange={handleChange}
						name='ratingFrom'
						label='от'
						labelMinWidth={30}
						width={125}
					/>
					<Select
						value={filters.ratingTo}
						variantName='rating'
						variants={ratings}
						handleChange={handleChange}
						name='ratingTo'
						label='до'
						labelMinWidth={30}
						width={125}
					/>
				</div>
				{/* <Slider
					value={[(filters.ratingFrom || ratings.at(-1).rating), (filters.ratingTo || ratings[0].rating)]}
					onChange={sliderHandleChange2}
					valueLabelDisplay="auto"
					min={ratings.at(-1).rating}
					max={ratings[0].rating}
					disableSwap
				/>
				<Slider
					value={[value1, value2]}
					onChange={handleChange1}
					valueLabelDisplay="auto"
					min={1}
					max={10}
					disableSwap
				/> */}
			</div>
			<Button
				variant='outlined'
				onClick={resetFilters}
			>
				Сбросить фильтры
			</Button>
			<Button
				variant='contained'
				onClick={search}
			>Пиоск</Button>
		</form>
	)
};
