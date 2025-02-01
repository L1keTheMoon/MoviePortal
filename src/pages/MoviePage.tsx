import { useParams } from 'react-router';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import { CircularProgress, Typography } from '@mui/material';
import { useGetMovieQuery } from '../api/api';

export default function MoviePage() {
	const { id } = useParams();
	const { data, isFetching, isError } = useGetMovieQuery(id);

	return (
		<>
			{isError ? <Typography variant='h1'>Ошибка!!!</Typography>
				:
				isFetching ? <CircularProgress size={300} style={{ display: 'block', margin: '30px auto 0' }} />
					:
					data ? <MovieInfo {...data} /> : null}
		</>
	)
}
