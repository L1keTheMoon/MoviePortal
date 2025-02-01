import { MovieFromFavorites } from '../types/types';

export function addToFavorites(movie: MovieFromFavorites, userName: string) {
	let favorites: MovieFromFavorites[] = JSON.parse(localStorage.getItem(userName + '-Favorites'));
	let isAdd = true;
	if (favorites.find(e => e.kinopoiskId === movie.kinopoiskId)) {
		favorites = favorites.filter(e => e.kinopoiskId !== movie.kinopoiskId);
		isAdd = false;
	} else {
		favorites.push(movie);
	}
	localStorage.setItem(userName + '-Favorites', JSON.stringify(favorites));
	return isAdd;
}