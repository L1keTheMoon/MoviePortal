import { useRef } from 'react';
import { MovieFromFavorites, MovieFull } from '../../types/types';
import { IconButton, Rating, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Favorite, Star } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';
import { useAppSelector } from '../../hooks/useStore';
import styles from './MovieInfo.module.css';

export default function MovieInfo(movie: MovieFull) {
	const user = useAppSelector(state => state.user);
	const iconRef = useRef(null);
	const navigate = useNavigate();
	const location = useLocation();

	function addToFavorites() {
		if (!user?.isLogin) {
			navigate('/Authorization', {
				state: {
					referrer: location.pathname,
					registration: false
				}
			})
		} else {
			const favorites: MovieFromFavorites[] = JSON.parse(localStorage.getItem(user.name + '-Favorites'));
			let newFavorites: MovieFromFavorites[];
			if (favorites.find(e => e.kinopoiskId === movie.kinopoiskId)) {
				newFavorites = favorites.filter(e => e.kinopoiskId !== movie.kinopoiskId);
				iconRef.current.style.fill = 'var(--background-dark)';
			} else {
				newFavorites = [...favorites, { kinopoiskId: movie.kinopoiskId }];
				iconRef.current.style.fill = 'var(--primary)';
			}
			localStorage.setItem(user.name + '-Favorites', JSON.stringify(newFavorites));
		}
	}

	return (
		<div className={styles.container}>
			<div>
				<img className={styles.poster} src={movie.posterUrl} alt="poster" />
			</div>
			<div className={styles.wrapper}>
				<div className={styles.name}>
					{Boolean(movie.logoUrl) === false ?
						<Typography
							variant='h1'
							sx={{ fontWeight: 500, fontSize: 80 }}
							style={{ maxWidth: '90%' }}
						>
							{movie.nameRu}
						</Typography>
						:
						<img className={styles.logo} src={movie.logoUrl} alt="logo" />}
					<div>
						<IconButton
							title='Добавить в избранное'
							color="primary"
							onClick={addToFavorites}
						>
							<Favorite
								ref={iconRef}
								style={{
									color: (
										user && JSON.parse(localStorage.getItem(user?.name + '-Favorites')).find((e: MovieFromFavorites) => {
											return e.kinopoiskId === movie.kinopoiskId;
										}) ? 'var(--primary)' : 'var(--background-dark)'
									)
								}} />
						</IconButton>
					</div>
				</div>
				<div className={styles.info}>
					<TableContainer>
						<Table sx={{ minWidth: 650 }}>
							<TableBody>
								<TableRow>
									<TableCell component="th" scope="row">
										{'Рейтинг ' + (movie.type === 'FILM' ? 'фильма' : 'сериала')}
									</TableCell>
									<TableCell align="left" style={{ display: 'flex', alignItems: 'center' }}>
										<Rating defaultValue={movie.ratingKinopoisk}
											max={10}
											precision={0.1}
											size="large"
											readOnly
											emptyIcon={<Star style={{ fill: 'var(--gray-dark)' }} fontSize="inherit" />}
											style={{ marginRight: '5px' }}
										/>
										{`(${movie.ratingKinopoisk}/10)`}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										{movie.type === 'FILM' ? 'Год выхода' : 'Период трансляции'}
									</TableCell>
									<TableCell align="left">
										{movie.type === 'FILM' ? movie.year : `(${movie.startYear} – ${movie.endYear})`}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										Страна
									</TableCell>
									<TableCell align="left">
										{movie.countries.map(e => e.country).join(', ')}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										Жанр
									</TableCell>
									<TableCell align="left">
										{movie.genres.map(e => e.genre).join(', ')}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										Оригинальное название
									</TableCell>
									<TableCell align="left">
										{movie.nameOriginal}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										Слоган
									</TableCell>
									<TableCell align="left">
										{movie.slogan}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										{movie.type === 'FILM' ? 'Длительность' : 'Время серии'}
									</TableCell>
									<TableCell align="left">
										{`${Math.floor(movie.filmLength / 60)} ч. ${movie.filmLength % 60 !== 0 ? movie.filmLength % 60 + ' мин.' : ''}`}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell component="th" scope="row">
										Возрастной рейтинг
									</TableCell>
									<TableCell align="left">
										<span className={styles.limit}>{movie.ratingAgeLimits.slice(3) + '+'}</span>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div >
		</div >
	)
}