export type Theme = 'light' | 'dark';

export interface UserData {
	login: string,
	password: string
}

export interface LoginState {
	isLogin: boolean,
	name: string
}

export interface MovieFull {
	kinopoiskId: number
	nameRu: string
	nameOriginal: string
	posterUrl: string
	posterUrlPreview: string
	coverUrl: string
	logoUrl: string
	ratingKinopoisk: number
	webUrl: string
	year: number
	filmLength: number
	slogan: string
	description: string
	shortDescription: string
	type: string
	ratingAgeLimits: string
	countries: Country[]
	genres: Genre[]
	startYear: number | null
	endYear: number | null
	serial: boolean
	shortFilm: boolean
	completed: boolean
}

export interface MovieFromSearch {
	kinopoiskId: number
	nameRu: string
	nameEn: string
	nameOriginal: string
	countries: Country[]
	genres: Genre[]
	ratingKinopoisk: number
	ratingImbd: number
	year: string
	type: string
	posterUrl: string
	posterUrlPreview: string
}

export interface MovieFromFavorites {
	kinopoiskId: number
}

export interface Country {
	country: string
}

export interface Genre {
	genre: string
}

export interface FilterParams {
	id: string,
	[key: string]: string
}
