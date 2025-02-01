import { Typography, TextField, Button } from '@mui/material';
import { Select } from '../Select/Select';
import { years, ratings, types } from '../../constants/constants';
import { useGetFilterOptionsQuery } from '../../api/api';
import { FiltersType } from '../../types/types';
import styles from './Filters.module.css';

interface FiltersProps {
	handleChange: (fieldName: string, value: string | number) => void,
	resetFilters: () => void,
	search: () => void,
	filters: FiltersType
}

export function Filters({ handleChange, resetFilters, search, filters }: FiltersProps) {
	const { data, isSuccess } = useGetFilterOptionsQuery('');

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
