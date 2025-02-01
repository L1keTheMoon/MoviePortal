import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, CircularProgress, Divider, Typography } from '@mui/material';
import { Filters } from '../Filters/Filters';
import { orderVariants } from '../../constants/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { setFilters, resetFilters } from '../../store/filtersSlice';
import { changePage } from '../../store/pageSlice';
import MovieList from '../MovieList/MovieList';
import { useGetMoviesQuery } from '../../api/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './AdvancedSearch.module.css';

export default function AdvancedSearch() {
	const filters = useAppSelector(state => state.filters);
	const page = useAppSelector(state => state.page);
	const [queryString, setQueryString] = useState(makeQuerryString);
	const { data, isFetching, isError } = useGetMoviesQuery(queryString);
	const dispatch = useAppDispatch();

	useEffect(() => {
		setQueryString(queryString.slice(0, queryString.lastIndexOf('=') + 1) + Math.ceil(page / 2));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	function makeQuerryString(key: string = undefined, value: string | number = undefined) {
		const newQueryString = Object.entries(filters).reduce((acc, e) => {
			if (e[1] !== 0 && !e[1]) return acc + '';
			if (e[0] === key) e[1] = value;
			return acc + `${e[0]}=${e[1]}&`;
		}, '');
		return newQueryString + 'page=1';
	};

	const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
		dispatch(changePage(value));
	};

	const handleFiltersChange = useCallback((key: string, value: string | number) => {
		dispatch(setFilters({ key, value }));
		if (key === 'order') {
			dispatch(changePage(1));
			setQueryString(makeQuerryString(key, value));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const search = () => {
		dispatch(changePage(1));
		setQueryString(makeQuerryString());
	}

	return (
		<>
			<Typography component="h2" sx={{ fontSize: 48, fontWeight: 700, mb: 1 }}>Расширенный поиск</Typography>
			<div className={styles.search}>
				<Filters filters={filters} handleChange={handleFiltersChange} search={search} resetFilters={() => dispatch(resetFilters(''))} />
				<Divider orientation="vertical" flexItem />
				<div style={{ flexGrow: 1 }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Typography component="h2" sx={{ fontSize: 36, fontWeight: 700 }}>Сортировать по</Typography>
						<ButtonGroup
							variant='outlined'
							sx={{ ml: 4, mt: 0.5 }}
						>
							{orderVariants.map(e => {
								return (
									<Button
										key={e.id}
										variant={filters.order === e.id ? 'contained' : 'outlined'}
										name='order'
										value={e.id}
										onClick={() => handleFiltersChange('order', e.id)}
									>
										{e.order}
									</Button>
								)
							})}
						</ButtonGroup>
					</div>
					{isError ? <ErrorMessage />
						:
						isFetching ? <CircularProgress size={300} style={{ display: 'block', margin: '30px auto 0' }} />
							:
							data?.items.length > 0 ?
								<MovieList
									totalPages={Math.ceil(data.total / 10)}
									page={page}
									handlePageChange={handlePageChange}
									list={data.items.filter((_, i) => {
										if (page % 2 === 0) {
											return i >= 10;
										} else {
											return i < 10;
										}
									})} />
								: <Typography variant='h1'>Ничего не найдено</Typography>}
				</div>
			</div >
		</>
	)
}
