import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router';
import MainPage from './pages/MainPage';
import AuthorizationPage from './pages/AuthorizationPage';
import NotFoundPage from './pages/NotFoundPage';
import MoviePage from './pages/MoviePage';
import { ThemeContextProvider } from './context/ThemeContext';
import styles from './App.module.css';

const movie = {
	"kinopoiskId": 1219417,
	"kinopoiskHDId": "420582e59b0ad54caeb47d0273e6f93d",
	"imdbId": "tt9426210",
	"nameRu": "Дитя погоды",
	"nameEn": null,
	"nameOriginal": "Tenki no ko",
	"posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/1219417.jpg",
	"posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/1219417.jpg",
	"coverUrl": "https://avatars.mds.yandex.net/get-ott/2439731/2a0000017c2d2b60fd33f3892fb0abeb318a/orig",
	"logoUrl": "https://avatars.mds.yandex.net/get-ott/1672343/2a00000172508c8ded8db7400beb99d4e45c/orig",
	"ratingKinopoisk": 8.5,
	"webUrl": "https://www.kinopoisk.ru/film/1219417/",
	"year": 2019,
	"filmLength": 112,
	"slogan": "Это история про тайну мироздания. Секрет, который знаем только мы с ней",
	"description": "16-летний Ходака Морисима убегает из дома в Токио, где у него сразу кончаются деньги. Мало того, что без документов он не может найти работу, так ещё на улице идёт бесконечный дождь, и небо постоянно затянуто тучами. В отчаянии парень обращается к бывшему попутчику, а тот не только берёт его в свой журнал, пишущий о сверхъестественном, но и предоставляет жильё. Однажды Ходака знакомится с девушкой по имени Хина Амано, которая обладает удивительной способностью разгонять тучи и останавливать дождь.",
	"shortDescription": "Любовь и древняя магия в мегаполисе. Аниме-шедевр о ценности солнечного света от автора хита «Твое имя»",
	"editorAnnotation": null,
	"isTicketsAvailable": false,
	"productionStatus": null,
	"type": "FILM",
	"ratingMpaa": "pg13",
	"ratingAgeLimits": "age12",
	"countries": [
		{
			"country": "Япония"
		}
	],
	"genres": [
		{
			"genre": "мелодрама"
		},
		{
			"genre": "фэнтези"
		},
		{
			"genre": "мультфильм"
		},
		{
			"genre": "аниме"
		}
	],
	"startYear": null,
	"endYear": null,
	"serial": false,
	"shortFilm": false,
	"completed": false,
}

const series = {
	"kinopoiskId": 716587,
	"kinopoiskHDId": "4cb40ae7e8e15e68b6e04fc547c405ae",
	"imdbId": null,
	"nameRu": "Острые козырьки",
	"nameEn": null,
	"nameOriginal": "Peaky Blinders",
	"posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/716587.jpg",
	"posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/716587.jpg",
	"coverUrl": "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017c28617e6309e30854de0bc7ea96/orig",
	"logoUrl": "https://avatars.mds.yandex.net/get-ott/200035/2a00000176f154480a993aa50b9ed5615661/orig",
	"ratingKinopoisk": 8.4,
	"webUrl": "https://www.kinopoisk.ru/film/716587/",
	"year": 2013,
	"filmLength": 60,
	"slogan": "The streets are theirs.",
	"description": "Британский сериал о криминальном мире Бирмингема 20-х годов прошлого века, в котором многолюдная семья Шелби стала одной из самых жестоких и влиятельных гангстерских банд послевоенного времени. Фирменным знаком группировки, промышлявшей грабежами и азартными играми, стали зашитые в козырьки лезвия.",
	"shortDescription": "Бывший солдат встает во главе криминального семейного бизнеса. Стильная британская сага с Киллианом Мёрфи",
	"editorAnnotation": null,
	"isTicketsAvailable": false,
	"productionStatus": null,
	"type": "TV_SERIES",
	"ratingMpaa": null,
	"ratingAgeLimits": "age18",
	"countries": [
		{
			"country": "Великобритания"
		}
	],
	"genres": [
		{
			"genre": "драма"
		},
		{
			"genre": "криминал"
		}
	],
	"startYear": 2013,
	"endYear": 2022,
	"serial": true,
	"shortFilm": false,
	"completed": true,
}

function App() {

	return (
		<ThemeContextProvider>
			<Header />
			<div className={styles.container}>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/movie/:id' element={<MoviePage {...movie} />} />
					<Route path='/authorization' element={<AuthorizationPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</div>
			<Footer />
		</ThemeContextProvider>
	);
}

export default App;
