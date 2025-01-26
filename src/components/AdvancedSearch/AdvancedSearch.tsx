import React, { useState } from 'react'
import { Button, ButtonGroup, Divider, Typography } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { FilterParams } from '../../types/types.ts';
import styles from './AdvancedSearch.module.css';

const orderVariants: FilterParams[] = [{ id: 'NUM_VOTE', order: 'популярности' }, { id: 'RATING', order: 'рейтингу' }, { id: 'YEAR', order: 'дате выхода' }];

export default function AdvancedSearch() {
	const [filters, setFilters] = useState({ order: 'RATING' });

	function handleChange(event) {
		console.log(event);
		setFilters({ ...filters, [event.target.name]: event.target.value });
	}

	return (
		<>
			<Typography component="h3" sx={{ fontSize: 32, fontWeight: 700, mt: 5, mb: 2 }}>Расширенный поиск фильмов и сериалов</Typography>
			<div className={styles['search-field']}>
				<SearchForm handleChange={handleChange} />
				<Divider orientation="vertical" flexItem />
				<div>
					<div style={{ display: 'flex' }}>
						<Typography component="h4" sx={{ fontSize: 32, fontWeight: 700 }}>Сортировать по:</Typography>
						<ButtonGroup
							variant='outlined'
							sx={{ ml: 4 }}
						>
							{orderVariants.map(e => {
								return (
									<Button
										key={e.id}
										variant={filters.order === e.id ? 'contained' : 'outlined'}
										name='order'
										value={e.id}
										onClick={handleChange}
									>
										{e.order}
									</Button>
								)
							})}
						</ButtonGroup>
					</div>
					<div className={styles.results}>

					</div>
				</div>
			</div >
		</>
	)
}
