import Carousel from '../Carousel/Carousel.tsx';
import CaroulelMovieItem from '../CaroulelMovieItem/CaroulelMovieItem.tsx';

const film = {
	kinopoiskId: 1219417,
	nameRu: 'Дитя погоды',
	posterUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/10671298/29fba789-ebae-411d-8bec-ab7d62203b89/x1000',
	ratingKinopoisk: 7.9,
	year: '2019',
	countries: [
		{
			country: "Япония"
		}
	],
	genres: [
		{
			genre: "фантастика"
		}
	]
}
const data = Array(20).fill(film);

export default function Premieres() {

	return (
		<Carousel
			header='Предлагаемые фильмы'
			list={data}
			ListItem={CaroulelMovieItem}
		/>
	)
}
