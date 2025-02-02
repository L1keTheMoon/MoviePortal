import Carousel from '../Carousel/Carousel.tsx';
import CaroulelMovieItem from '../CaroulelMovieItem/CaroulelMovieItem.tsx';
import { CircularProgress } from '@mui/material';
import { useGetPremieresQuery } from '../../api/api.ts';

// const film = {
// 	kinopoiskId: 1219417,
// 	nameRu: 'Дитя погоды',
// 	posterUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/10671298/29fba789-ebae-411d-8bec-ab7d62203b89/x1000',
// 	ratingKinopoisk: 7.9,
// 	year: '2019',
// 	countries: [
// 		{
// 			country: "Япония"
// 		}
// 	],
// 	genres: [
// 		{
// 			genre: "фантастика"
// 		}
// 	]
// }
// const data = Array(20).fill(film);

export default function Premieres() {
	const { data, isFetching, isError } = useGetPremieresQuery(`year=2025&month=JANUARY`);

	return (
		<>
			{
				isError ? null
					:
					isFetching ? <CircularProgress size={300} style={{ display: 'block', margin: '30px auto 0' }} />
						:
						data ? <Carousel
							header='Премьеры января 2025'
							list={data.items.filter((_, i) => i < 20)}
							ListItem={CaroulelMovieItem}
						/> : null
			}
		</>
	)
}
