import { ChangeEvent, HTMLAttributes } from 'react';
import { MovieShortData } from '../../types/types';
import { IconButton, Pagination, Typography } from '@mui/material';
import { Delete, Star } from '@mui/icons-material';
import { Link } from 'react-router';
import styles from './MovieList.module.css';

interface MovieListProps extends HTMLAttributes<HTMLDivElement> {
	totalPages: number,
	page: number,
	handlePageChange: (event: ChangeEvent<unknown>, value: number) => void,
	list: MovieShortData[],
	removeButton?: boolean,
	handleRemove?: (id: number) => void
}

export default function MovieList({ totalPages, page, handlePageChange, list, removeButton, handleRemove, ...props }: MovieListProps) {

	return (
		<div className={styles.container} {...props}>
			<ul className={styles.list}>
				{list.map(e => {
					return (
						<li className={styles.item} key={e.kinopoiskId}>
							<Link to={`/movies/${e.kinopoiskId}`} className={styles.movie}>
								<div className={styles.container}>
									<img src={e.posterUrl} alt="poster" />
								</div>
								<div className={styles.info}>
									<div>
										<Typography
											variant='h3'
											sx={{ fontSize: 36 }}
											style={{ textDecoration: 'underline' }}
										>
											{e.nameRu || e.nameOriginal}
										</Typography>
										{removeButton &&
											<IconButton
												title='Удалить из избранного'
												onClick={(event) => {
													event.preventDefault();
													handleRemove(e.kinopoiskId);
												}}
											>
												<Delete
													fontSize='large'
												/>
											</IconButton>}
									</div>
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
							</Link>
						</li>
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
