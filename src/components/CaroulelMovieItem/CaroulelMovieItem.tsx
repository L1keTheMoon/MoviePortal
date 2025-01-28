import { Star, CalendarMonth } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { MovieFromList } from '../../types/types'
import styles from './CaroulelMovieItem.module.css'

interface CaroulelMovieItemProps extends MovieFromList { }

export default function CaroulelMovieItem({ nameRu, countries, genres, ratingKinopoisk, year, posterUrl }: CaroulelMovieItemProps) {
	return (
		<li className={styles.movie}>
			<div className={styles.poster}>
				<img className={styles.image} src={posterUrl} alt="poster" />
				<div className={styles.info}>
					<div><Star sx={{ color: '#FFD600' }} />{ratingKinopoisk}</div>
					<div><CalendarMonth sx={{ color: '#FFD600' }} />{year}</div>
				</div>
			</div>
			<Typography
				variant="h5"
				component="h5"
				align='center'
				sx={{ fontWeight: 500 }}
			>
				{nameRu}
			</Typography>
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
