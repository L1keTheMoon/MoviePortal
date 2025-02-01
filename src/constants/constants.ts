import { FilterParams, SortVariant } from '../types/types';

//Значения для поиска (годы, ретинг, тип и сортировка)
const years: FilterParams[] = [];
for (let i = 2026; i >= 1890; i--) {
	const strI = String(i);
	years.push({ id: strI, year: i });
}
const ratings: FilterParams[] = [];
for (let i = 10; i >= 0; i--) {
	const strI = String(i);
	ratings.push({ id: strI, rating: i });
}

const types: FilterParams[] = [{ id: 'FILM', type: 'фильм' }, { id: 'TV_SERIES', type: 'сериал' }];

const orderVariants: FilterParams[] = [{ id: 'YEAR', order: 'дате выхода' }, { id: 'NUM_VOTE', order: 'популярности' }, { id: 'RATING', order: 'рейтингу' }];

const sortVariants: SortVariant[] = [
	{ id: 1, name: 'дате выхода', sortFn: (a, b) => Number(b.year) - Number(a.year) },
	{ id: 2, name: 'алфавиту', sortFn: (a, b) => a.nameRu.localeCompare(b.nameRu) },
	{ id: 3, name: 'рейтингу', sortFn: (a, b) => Number(b.ratingKinopoisk) - Number(a.ratingKinopoisk) }];

export { years, ratings, types, orderVariants, sortVariants };