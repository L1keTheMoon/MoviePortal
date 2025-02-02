import { RefObject } from 'react';
import { Typography } from '@mui/material'
import { Staff } from '../../types/types'
import styles from './CaroulelStaffItem.module.css'

interface CaroulelStaffItemProps extends Staff {
	ref: RefObject<HTMLLIElement>
}

export default function CaroulelStaffItem({ nameRu, nameEn, description, posterUrl, ref }
	: CaroulelStaffItemProps) {

	return (
		<li className={styles.staff} ref={ref}>
			<div className={styles.wrapper}>
				<img className={styles.image} src={posterUrl} alt="poster" />
				<div className={styles.info} >
					<Typography
						variant="h5"
						component="h5"
						align='center'
						sx={{ fontWeight: 500 }}
					>
						{nameRu || nameEn}
					</Typography>
					<Typography
						variant="h6"
						align='center'
						sx={{ color: 'var(--fontcolor-gray)' }}
					>
						{description}
					</Typography>
				</div>
			</div>
		</li>
	)
}
