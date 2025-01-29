import { RefObject } from 'react';
import { Star, CalendarMonth } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { MovieFromSearch } from '../../types/types'
import { Link } from 'react-router';
import styles from './CaroulelMovieItem.module.css'

interface CaroulelMovieItemProps extends MovieFromSearch {
	ref: RefObject<HTMLLIElement>
}

export default function CaroulelMovieItem({ kinopoiskId, nameRu, countries, genres, ratingKinopoisk, year, posterUrl, ref }
	: CaroulelMovieItemProps) {

	return (
		<li className={styles.movie} ref={ref}>
			<div className={styles.poster}>
				<Link to={'/movie/' + kinopoiskId}>
					<img className={styles.image} src={posterUrl} alt="poster" />
				</Link>
				<div className={styles.info}>
					<div><Star sx={{ color: '#FFD600' }} />{ratingKinopoisk}</div>
					<div><CalendarMonth sx={{ color: '#FFD600' }} />{year}</div>
				</div>
			</div>
			<Link to={'/movie/' + kinopoiskId}>
				<Typography
					variant="h5"
					component="h5"
					align='center'
					sx={{ fontWeight: 500 }}
				>
					{nameRu}
				</Typography>
			</Link>
			<Typography
				variant="body1"
				align='center'
				sx={{ color: 'var(--fontcolor-gray)' }}
			>
				{countries[0].country + ', ' + genres[0].genre}
			</Typography>
		</li>
	)
}
