import { useEffect, useState } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import useDebounce from '../../hooks/useDebounce';
import { useGetMoviesQuickQuery } from '../../api/api';
import { Link } from 'react-router';
import { Search, Star } from '@mui/icons-material';
import styles from './QuickSearch.module.css';

export default function QuickSearch() {
	const [value, setValue] = useState('');
	const [skip, setSkip] = useState(true);
	const debouncedValue = useDebounce(value);
	const { data, isFetching, isSuccess, isError } = useGetMoviesQuickQuery(debouncedValue, { skip });

	useEffect(() => {
		if (debouncedValue) {
			setSkip(false);
		}
	}, [debouncedValue]);

	return (
		<Autocomplete
			forcePopupIcon={false}
			value={null}
			onInputChange={(event, newInputValue) => {
				setValue(newInputValue);
			}}
			sx={{ width: 400 }}
			style={{ backgroundColor: 'var(--background)' }}
			options={data?.films || []}
			getOptionLabel={(option) => value}
			renderOption={(props, option) => {

				return (
					<li {...props} style={{ padding: '0' }} key={option.kinopoiskId}>
						<Link
							to={'/movies/' + option.filmId}
							className={styles.link}
						>
							<img src={option.posterUrlPreview} alt="poster" />
							<div>
								<h6>{option.nameRu || option.nameEn}</h6>
								<span className={styles.rating}>
									<Star />
									{option.rating === 'null' ? 'Нет оценок' : option.rating || 'Нет оценок'}
								</span>
								<span className={styles.year}>
									{(option.type === 'FILM' ? 'фильм, ' : 'сериал, ') + option.year}
								</span>
							</div>
						</Link>
					</li>
				)
			}}
			noOptionsText={isError ? 'Произошла ошибка' : isFetching ? 'Идет поиск...' : isSuccess ? 'Ничего не найдено' : 'Введите название'}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						placeholder='Быстрый поиск'
						slotProps={{
							input: {
								...params.InputProps,
								endAdornment: (
									isFetching ? <CircularProgress color="inherit" size={30} /> : <Search color="inherit" fontSize='large' />
								),
								style: { fontSize: '20px', padding: '6px' }
							},
						}}
					/>
				)
			}}
		/>
	)
}
