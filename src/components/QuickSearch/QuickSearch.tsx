import { useEffect, useState } from 'react'
import { Autocomplete, CircularProgress, IconButton, TextField } from '@mui/material';
import useDebounce from '../../hooks/useDebounce';
import { useGetMoviesQuickQuery } from '../../api/api';
import { Link } from 'react-router';
import { Search, Star } from '@mui/icons-material';
import styles from './QuickSearch.module.css';

export default function QuickSearch() {
	const [value, setValue] = useState('');
	const [querry, setQuerry] = useState('');
	const [skip, setSkip] = useState(true);
	const debouncedValue = useDebounce(value);
	const { data, isFetching, isSuccess, isError } = useGetMoviesQuickQuery(querry, { skip });

	useEffect(() => {
		if (debouncedValue) {
			startQuerry(debouncedValue);
		}
	}, [debouncedValue]);

	function startQuerry(params: string) {
		setSkip(false);
		setQuerry(params);
	}

	return (
		<Autocomplete
			forcePopupIcon={false}
			clearOnBlur={false}
			value={null}
			onInputChange={(event, newInputValue) => {
				setValue(newInputValue);
			}}
			inputValue={value}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					startQuerry(value);
				}
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
									isFetching ? <CircularProgress color="inherit" size={30} />
										:
										<IconButton sx={{ p: 0.5 }} onClick={() => startQuerry(value)}>
											<Search color="inherit" fontSize='large' />
										</IconButton>
								),
								style: { fontSize: '20px', padding: '6px' },
							},
						}}
					/>
				)
			}}
		/>
	)
}
