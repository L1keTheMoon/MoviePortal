import React, { HTMLAttributes } from 'react'
import { CalendarMonth, ArrowBackIosNew, ArrowForwardIos, Star } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import styles from './Carousel.module.css';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	header: string,
	list: {
		name: string,
		poster: string,
		rating: number,
		year: string,
		countries: [
			{
				country: string
			}
		],
		genres: [
			{
				genre: string
			}
		]
	}[],
	handleClick: (number: number) => void,
	slide: number
}

export default function Carousel({ header, handleClick, list, slide, ...props }: CarouselProps) {
	const iconStyle = { color: '#DF2144', width: 32, height: 32 };

	return (
		<div className={styles.carousel} {...props}>
			<div className={styles.header}>
				<Typography
					variant="h4"
					sx={{ flexGrow: 1, fontWeight: 700 }}
				>
					{header}
				</Typography>
				<IconButton
					color='primary'
					sx={{ bgcolor: '#1E1E1E' }}
					onClick={() => handleClick(-1)}
				>
					<ArrowBackIosNew sx={iconStyle} />
				</IconButton >
				<IconButton
					color='primary'
					sx={{ bgcolor: '#1E1E1E' }}
					onClick={() => handleClick(1)}
				>
					<ArrowForwardIos sx={iconStyle} />
				</IconButton>
			</div>
			<div className={styles.content}>
				<ul className={styles.list} style={{ right: `${slide * 262}px` }}>
					{list.map((e, i) => {
						return (
							<li className={styles.movie} key={i}>
								<div className={styles.poster}>
									<img className={styles.image} src={e.poster} alt="poster" />
									<div className={styles.info}>
										<div><Star sx={{ color: '#FFD600' }} />{e.rating}</div>
										<div><CalendarMonth sx={{ color: '#FFD600' }} />{e.year}</div>
									</div>
								</div>
								<Typography
									variant="h5"
									component="h5"
									align='center'
									sx={{ fontWeight: 500 }}
								>
									{e.name}
								</Typography>
								<Typography
									variant="body1"
									align='center'
									sx={{ color: 'var(--fontcolor-gray)' }}
								>
									{e.countries[0].country + ', ' + e.genres[0].genre}
								</Typography>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
