import { useState } from 'react'
import { Button, ButtonGroup, Divider, Typography } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { orderVariants } from '../../constants/index.ts';
import styles from './AdvancedSearch.module.css';

export default function AdvancedSearch() {
	const [filters, setFilters] = useState<{ [key: string]: string }>({ order: 'NUM_VOTE' });

	function handleChange(fieldName: string, value: string) {
		setFilters({ ...filters, [fieldName]: value || undefined });
	}
	console.log(filters);
	function resetFilters() {
		setFilters({ order: 'NUM_VOTE' });
	}

	return (
		<>
			<Typography component="h3" sx={{ fontSize: 32, fontWeight: 700, mt: 5, mb: 2 }}>Расширенный поиск фильмов и сериалов</Typography>
			<div className={styles['search-field']}>
				<SearchForm filters={filters} handleChange={handleChange} resetFilters={resetFilters} />
				<Divider orientation="vertical" flexItem />
				<div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
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
										onClick={() => handleChange('order', e.id)}
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
