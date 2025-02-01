import { Typography } from '@mui/material';
import { Link } from 'react-router';

export default function NotFoundPage() {
	return (
		<>
			<img src={process.env.PUBLIC_URL + '/404.png'} alt="404" />
			<Link to='/'><Typography variant='h1'>На главную страницу</Typography></Link>
		</>
	)
}
