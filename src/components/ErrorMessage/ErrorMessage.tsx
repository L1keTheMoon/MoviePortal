import { Typography } from '@mui/material';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage() {
	return (
		<div className={styles.error}>
			<img src={process.env.PUBLIC_URL + '/error.png'} alt="error" />
			<Typography variant='h3' color='error'>
				Произошла ошибка! Обновите страницу или вернитесь на главную!
			</Typography>
		</div>
	)
}

