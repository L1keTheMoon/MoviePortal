import { ChangeEvent } from 'react';
import { MovieFromSearch } from '../../types/types';
import { Pagination, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Link } from 'react-router';
import styles from './MovieList.module.css';

interface MovieListProps {
	totalPages: number,
	page: number,
	handlePageChange: (event: ChangeEvent<unknown>, value: number) => void,
	list: MovieFromSearch[]
}

export default function MovieList({ totalPages, page, handlePageChange, list }: MovieListProps) {

	return (
		<div className={styles.container}>
			<ul className={styles.list}>
				{list.map(e => {
					return (
						<Link to={`/movies/${e.kinopoiskId}`} key={e.kinopoiskId}>
							<li className={styles.movie}>
								<div className={styles.container}>
									<img src={e.posterUrl} alt="poster" />
								</div>
								<div className={styles.info}>
									<Typography
										variant='h3'
										sx={{ fontSize: 36 }}
										style={{ textDecoration: 'underline' }}
									>
										{e.nameRu || e.nameOriginal}
									</Typography>
									<Typography
										variant='h4'
										sx={{ fontSize: 28 }}
										style={{ color: 'var(--fontcolor-gray)' }}
									>
										{(e.nameOriginal ? e.nameOriginal + ', ' : '') + (e.type === 'FILM' ? 'фильм, ' : 'сериал, ') + e.year}
									</Typography>
									{e.ratingKinopoisk ?
										<span className={styles.rating}>
											<Star sx={{ mr: 1 }} fontSize='large' />
											{e.ratingKinopoisk}
										</span> :
										<Typography
											variant='h4'
											sx={{ fontSize: 28 }}
											style={{ color: 'var(--fontcolor-gray)' }}
										>
											Нет оценок
										</Typography>}
									<Typography
										variant='h4'
										sx={{ fontSize: 28 }}
										style={{ color: 'var(--fontcolor-gray)' }}
									>
										{e.countries.map(e => e.country).join(', ')}
									</Typography>
									<Typography
										variant='h4'
										sx={{ fontSize: 28 }}
										style={{ color: 'var(--fontcolor-gray)' }}
									>
										{e.genres.map(e => e.genre).join(', ')}
									</Typography>
								</div>
							</li>
						</Link>
					)
				})}
			</ul>
			<Pagination
				count={totalPages}
				page={page}
				onChange={handlePageChange}
				showFirstButton
				showLastButton
				shape="rounded"
				size='large'
				color="primary"
			/>
		</div>

	)
}
