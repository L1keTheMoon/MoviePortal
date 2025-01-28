import { Typography, TextField, Button } from '@mui/material';
import Select from '../Select/Select.tsx';
import { years, ratings, types } from '../../constants/index.ts';
import styles from './SearchForm.module.css';

interface SearchFormProps {
	handleChange: (fieldName: string, value: string) => void,
	resetFilters: () => void,
	filters: { [key: string]: string }
}

export default function SearchForm({ handleChange, resetFilters, filters }: SearchFormProps) {

	return (
		<form className={styles.form}>
			<div className={styles.group}>
				<TextField
					label="Название фильма или сериала"
					value={filters.keyword || ''}
					variant="outlined"
					size='small'
					onChange={(event) => handleChange('keyword', event.target.value)}
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
					variants={ratings}
					variantName='rating'
					handleChange={handleChange}
					name='countries'
					label='Страна'
					labelMinWidth={80}
				/>
				<Select
					value={filters.genres}
					variants={ratings}
					variantName='rating'
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
						width={100}
					/>
					<Select
						value={filters.yearTo}
						variantName='year'
						variants={years}
						handleChange={handleChange}
						name='yearTo'
						label='по'
						labelMinWidth={30}
						width={100}
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
						width={100}
					/>
					<Select
						value={filters.ratingTo}
						variantName='rating'
						variants={ratings}
						handleChange={handleChange}
						name='ratingTo'
						label='до'
						labelMinWidth={30}
						width={100}
					/>
				</div>
			</div>
			<Button
				variant='outlined'
				onClick={resetFilters}
			>
				Сбросить фильтры
			</Button>
			<Button variant='contained'>Пиоск</Button>
		</form>
	)
}
