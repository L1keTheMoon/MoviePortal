import { HTMLAttributes, JSX, RefObject, useRef, useState } from 'react'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { MovieFromSearch } from '../../types/types';
import styles from './Carousel.module.css';

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	header: string,
	list: MovieFromSearch[],
	ListItem: (data: MovieFromSearch & { ref: RefObject<HTMLLIElement> }) => JSX.Element
}

export default function Carousel({ header, list, ListItem, ...props }: CarouselProps) {
	const [slide, setSlide] = useState<number>(0);
	const liRef = useRef<HTMLLIElement>(null);
	const iconStyle = { color: '#DF2144', width: 32, height: 32 };

	function handleClick(number: number) {
		if (slide + number < 0) {
			setSlide(list.length - 6);
		} else if (slide + number > list.length - 6) {
			setSlide(0);
		} else {
			setSlide(slide + number);
		}
	}

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
					style={{ backgroundColor: 'var(--background-dark)' }}
					onClick={() => handleClick(-1)}
				>
					<ArrowBackIosNew sx={iconStyle} />
				</IconButton >
				<IconButton
					color='primary'
					style={{ backgroundColor: 'var(--background-dark)' }}
					onClick={() => handleClick(1)}
				>
					<ArrowForwardIos sx={iconStyle} />
				</IconButton>
			</div>
			<div className={styles.content}>
				<ul className={styles.list} style={{ right: `${slide * liRef.current?.offsetWidth}px` }}>
					{list.map((e, i) => {
						return <ListItem {...e} key={i} ref={liRef} />
					})}
				</ul>
			</div>
		</div>
	)
}
