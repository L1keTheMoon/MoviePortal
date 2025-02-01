import { MovieShortData } from '../types/types';

export function addToFavorites(movie: MovieShortData, userName: string) {
	const favorites: MovieShortData[] = JSON.parse(localStorage.getItem(userName + '-Favorites'));
	favorites.push(movie);
	localStorage.setItem(userName + '-Favorites', JSON.stringify(favorites));
}

export function removeFromFavorites(movieId: number, userName: string) {
	let favorites: MovieShortData[] = JSON.parse(localStorage.getItem(userName + '-Favorites'));
	favorites = favorites.filter(e => e.kinopoiskId !== movieId);
	localStorage.setItem(userName + '-Favorites', JSON.stringify(favorites));
}