import { FilterParams } from '../types/types';

//Значения для поиска (годы, ретинг, тип и сортировка)
const years: FilterParams[] = [];
for (let i = 2026; i >= 1890; i--) {
	const strI = String(i);
	years.push({ id: strI, year: strI });
}
const ratings: FilterParams[] = [];
for (let i = 10; i >= 0; i--) {
	const strI = String(i);
	ratings.push({ id: strI, rating: strI });
}

const types: FilterParams[] = [{ id: 'FILM', type: 'фильм' }, { id: 'TV_SERIES', type: 'сериал' }];

const orderVariants: FilterParams[] = [{ id: 'YEAR', order: 'дате выхода' }, { id: 'NUM_VOTE', order: 'популярности' }, { id: 'RATING', order: 'рейтингу' }];

export { years, ratings, types, orderVariants };