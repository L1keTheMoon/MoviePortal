import { HTMLAttributes, JSX } from 'react'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { MovieFromList } from '../../types/types';
import styles from './Carousel.module.css';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	header: string,
	list: MovieFromList[],
	handleClick: (number: number) => void,
	slide: number,
	ListItem: (data: MovieFromList) => JSX.Element
}

export default function Carousel({ header, handleClick, list, slide, ListItem, ...props }: CarouselProps) {
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
						return <ListItem {...e} key={i} />
					})}
				</ul>
			</div>
		</div>
	)
}
