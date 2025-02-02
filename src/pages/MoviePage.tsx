import { useParams } from 'react-router';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import { CircularProgress, Typography } from '@mui/material';
import { useGetMovieQuery, useGetStraffQuery } from '../api/api';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import CaroulelStaffItem from '../components/CaroulelStaffItem/CaroulelStaffItem';
import Carousel from '../components/Carousel/Carousel';

export default function MoviePage() {
	const { id } = useParams();
	const { data, isFetching, isError } = useGetMovieQuery(id);
	const staff = useGetStraffQuery(id);

	return (
		<>
			{isError ? <ErrorMessage />
				:
				isFetching ? <CircularProgress size={300} style={{ display: 'block', margin: '30px auto 0' }} />
					:
					data ? <MovieInfo {...data} director={staff.data?.filter(e => e.professionKey === 'DIRECTOR')} /> : <ErrorMessage />}
			{staff.data ?
				<Carousel
					header='В главных ролях'
					list={staff.data.filter(e => e.professionKey !== 'DIRECTOR')}
					ListItem={CaroulelStaffItem}
				/> : null}
			{data ?
				<div>
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
						{data.description + ' ' + data.shortDescription}
					</Typography>
				</div>
				: null}
		</>
	)
}
