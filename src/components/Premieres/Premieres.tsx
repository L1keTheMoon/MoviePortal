import { useState } from 'react'
import Carousel from '../Carousel/Carousel.tsx';
import CaroulelMovieItem from '../CaroulelMovieItem/CaroulelMovieItem.tsx';

const film = {
	kinopoiskId: 155,
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
const data = Array(10).fill(film);

export default function Premieres() {
	const [slide, setSlide] = useState(0);

	function handleClick(number: number) {
		if (slide + number < 0) {
			setSlide(4);
		} else if (slide + number > 4) {
			setSlide(0);
		} else {
			setSlide(slide + number);
		}
	}

	return (
		<Carousel
			header='Предлагаемые фильмы'
			list={data}
			handleClick={handleClick}
			slide={slide}
			ListItem={CaroulelMovieItem}
		/>
	)
}
