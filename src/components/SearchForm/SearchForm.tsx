import React from 'react'
import { Typography, TextField, Button } from '@mui/material';
import Select from '../Select/Select.tsx';
import { FilterParams } from '../../types/types.ts';
import styles from './SearchForm.module.css';

interface SearchFormProps {
	handleChange: (event) => void
}

//Значения для поиска (годы, ретинг и тип)
const years: FilterParams[] = [];
for (let i = 2026; i >= 1890; i--) {
	const strI = String(i);
	years.push({ id: strI, year: strI });
}
const ratings: FilterParams[] = [];
for (let i = 10; i >= 0; i--) {
	const strI = String(i);
	ratings.push({ id: strI, rating: strI });
}
const types: FilterParams[] = [{ id: 'FILM', type: 'фильм' }, { id: 'TV_SERIES', type: 'сериал' }];

export default function SearchForm({ handleChange }: SearchFormProps) {
	return (
		<form className={styles.form}>
			<div className={styles.group}>
				<TextField
					id="outlined-basic"
					label="Название фильма или сериала"
					variant="outlined"
					size='small'
				/>
				<Select
					variants={types}
					variantName='type'
					handleChange={handleChange}
					name='type'
					label='Тип'
					labelMinWidth={80}
				/>
				<Select
					variants={ratings}
					variantName='rating'
					handleChange={handleChange}
					name='countries'
					label='Страна'
					labelMinWidth={80}
				/>
				<Select
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
						variantName='year'
						variants={years}
						handleChange={handleChange}
						name='yearFrom'
						label='с'
						labelMinWidth={30}
						width={80}
					/>
					<Select
						variantName='year'
						variants={years}
						handleChange={handleChange}
						name='yearTo'
						label='по'
						labelMinWidth={30}
						width={80}
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
						variantName='rating'
						variants={ratings}
						handleChange={handleChange}
						name='ratingFrom'
						label='от'
						labelMinWidth={30}
						width={80}
					/>
					<Select
						variantName='rating'
						variants={ratings}
						handleChange={handleChange}
						name='ratingTo'
						label='до'
						labelMinWidth={30}
						width={80}
					/>
				</div>
			</div>
			<Button variant='contained'>Пиоск</Button>
		</form>
	)
}
