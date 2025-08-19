import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieSearchRequest, MovieFull, FilterParams, MovieQuickSearchRequest, Staff } from '../types/types';
import { apiKey } from '../apiKey';

export const kinopoiskApi = createApi({
	reducerPath: 'movies',
	keepUnusedDataFor: Infinity,
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://kinopoiskapiunofficial.tech/api/', headers: {
			'Content-Type': 'application/json',
			'X-API-KEY': apiKey
		}
	}),
	endpoints: (builder) => ({
		getMovie: builder.query<MovieFull, string>({
			query: (id: string) => 'v2.2/films/' + id,
		}),
		getMovies: builder.query<MovieSearchRequest, string>({
			query: (querry: string) => 'v2.2/films?' + querry,
		}),
		getMoviesQuick: builder.query<MovieQuickSearchRequest, string>({
			query: (keyword: string) => `v2.1/films/search-by-keyword?keyword=${keyword}&page=1`,
		}),
		getStraff: builder.query<Staff[], string>({
			query: (id: string) => 'v1/staff?filmId=' + id,
		}),
		getPremieres: builder.query<MovieSearchRequest, string>({
			query: (params: string) => `v2.2/films/premieres?` + params,
		}),
		getFilterOptions: builder.query<{ genres: FilterParams[], countries: FilterParams[] }, string>({
			query: () => 'v2.2/films/filters',
			transformResponse: (response: { genres: FilterParams[], countries: FilterParams[] }) => {
				response.countries = response.countries.filter(e => e.country !== '');
				response.genres = response.genres.filter(e => e.genre !== '');
				response.countries.sort((a, b) => {
					if (a.country === 'Россия' || a.country === 'США' || a.country === 'СССР') {
						return -1
					} else if (b.country === 'Россия' || b.country === 'США' || b.country === 'СССР') {
						return 1
					} else {
						return a.country.localeCompare(b.country);
					}
				});
				response.genres.sort((a, b) => a.genre.localeCompare(b.genre));
				return response;
			}
		}),
	}),
});

export const {
	useGetMovieQuery,
	useGetMoviesQuery,
	useGetFilterOptionsQuery,
	useGetMoviesQuickQuery,
	useGetStraffQuery,
	useGetPremieresQuery
} = kinopoiskApi;