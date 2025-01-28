export interface FilterParams {
	id: string,
	[key: string]: string
}
export interface MovieFromList {
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

export interface Country {
	country: string
}

export interface Genre {
	genre: string
}