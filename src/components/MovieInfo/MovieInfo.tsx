import { useEffect, useState } from 'react';
import { MovieShortData, MovieFull, Staff } from '../../types/types';
import { IconButton, Rating, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Favorite, Star } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';
import { useAppSelector } from '../../hooks/useStore';
import { addToFavorites, removeFromFavorites } from '../../helpers/favorite';
import styles from './MovieInfo.module.css';

interface MovieInfoProps extends MovieFull {
	director: Staff[]
}

export default function MovieInfo({ nameRu, serial, startYear, endYear, year, kinopoiskId, posterUrl, type, ratingKinopoisk, ratingImdb, countries, genres, nameOriginal, slogan, filmLength, ratingAgeLimits, director }: MovieInfoProps) {
	const user = useAppSelector(state => state.user);
	const [isFavorite, setIsFavorite] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.title = `${nameRu} (${serial ? (startYear + ' – ' + endYear) : year})`;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kinopoiskId]);

	useEffect(() => {
		if (user?.isLogin) {
			setIsFavorite(JSON.parse(localStorage.getItem(user.name + '-Favorites')).find((e: MovieShortData) => e.kinopoiskId === kinopoiskId));
		}
	}, [kinopoiskId, user])

	function handleClick() {
		if (!user?.isLogin) {
			navigate('/Authorization', {
				state: {
					referrer: location.pathname,
					registration: false
				}
			})
		} else {
			if (isFavorite) {
				removeFromFavorites(kinopoiskId, user.name);
			} else {
				addToFavorites({
					kinopoiskId,
					posterUrl,
					countries,
					genres,
					year,
					type,
					nameRu: nameRu || nameOriginal,
					ratingKinopoisk: ratingKinopoisk || ratingImdb,
				}, user.name);
			}
			setIsFavorite((prev) => !prev);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles['poster-wrapper']}>
				<img className={styles.poster} src={posterUrl} alt="poster" />
			</div>
			<div className={styles['info-wrapper']}>
				<div className={styles.name}>
					<Typography
						variant='h1'
						sx={{ fontWeight: 500, fontSize: 80 }}
						style={{ maxWidth: '90%' }}
					>
						{nameRu || nameOriginal}
					</Typography>
					<div>
						<IconButton
							title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
							color="primary"
							onClick={handleClick}
						>
							<Favorite
								style={{ color: isFavorite ? 'var(--primary)' : 'var(--background-dark)' }}
							/>
						</IconButton>
					</div>
				</div>
				<TableContainer sx={{ mt: 2 }}>
					<Table sx={{ minWidth: 650 }}>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row">
									{'Рейтинг ' + (type === 'FILM' ? 'фильма' : 'сериала')}
								</TableCell>
								<TableCell align="left" style={{ display: 'flex', alignItems: 'center' }}>
									<Rating defaultValue={ratingKinopoisk || ratingImdb}
										max={10}
										precision={0.1}
										size="large"
										readOnly
										emptyIcon={<Star fontSize="inherit" />}
										style={{ marginRight: '5px' }}
									/>
									{ratingKinopoisk || ratingImdb ? `(${ratingKinopoisk || ratingImdb}/10)` : '(Нет оценок)'}
								</TableCell>
							</TableRow>
							{director &&
								<TableRow>
									<TableCell component="th" scope="row">
										Режиссер
									</TableCell>
									<TableCell align="left">
										{director.map(e => e.nameRu || e.nameRu).join(', ')}
									</TableCell>
								</TableRow>
							}
							<TableRow></TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									{type === 'FILM' ? 'Год выхода' : 'Период трансляции'}
								</TableCell>
								<TableCell align="left">
									{type === 'FILM' ? year : `(${startYear} – ${endYear})`}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Страна
								</TableCell>
								<TableCell align="left">
									{countries.map(e => e.country).join(', ')}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Жанр
								</TableCell>
								<TableCell align="left">
									{genres.map(e => e.genre).join(', ')}
								</TableCell>
							</TableRow>
							{nameOriginal &&
								<>
									<TableRow>
										<TableCell component="th" scope="row">
											Оригинальное название
										</TableCell>
										<TableCell align="left">
											{nameOriginal}
										</TableCell>
									</TableRow>
								</>
							}
							<TableRow>
								{slogan &&
									<>
										<TableCell component="th" scope="row">
											Слоган
										</TableCell>
										<TableCell align="left">
											{slogan}
										</TableCell>
									</>
								}
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									{'Длительность' + (type === 'FILM' ? '' : ' серии')}
								</TableCell>
								<TableCell align="left">
									{`${filmLength >= 60 ? Math.floor(filmLength / 60) + 'ч.' : ''} ${filmLength % 60 !== 0 ? filmLength % 60 + ' мин.' : ''}`}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component="th" scope="row">
									Возрастной рейтинг
								</TableCell>
								<TableCell align="left">
									<span className={styles.limit}>
										{ratingAgeLimits ? ratingAgeLimits.slice(3) + '+' : 'Неизвестен'}
									</span>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div >
		</div >
	)
}