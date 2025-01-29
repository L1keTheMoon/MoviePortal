import { useParams } from 'react-router';
import { MovieFull } from '../types/types';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import { Typography } from '@mui/material';

export default function MoviePage(movie: MovieFull) {
	//const { id } = useParams();

	return (
		<div>
			<MovieInfo {...movie} />
			<Typography
				variant='h3'
				component='h2'
				sx={{ mt: 2, mb: 1, fontWeight: 500 }}
			>
				Сюжет:
			</Typography>
			<Typography
				component='p'
				fontSize={20}
			>
				{movie.description + ' ' + movie.shortDescription}
			</Typography>
		</div>
	)
}
