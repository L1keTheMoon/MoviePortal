import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router';
import MainPage from './pages/MainPage';
import AuthorizationPage from './pages/AuthorizationPage';
import NotFoundPage from './pages/NotFoundPage';
import MoviePage from './pages/MoviePage';
import FavoritesPage from './pages/FavoritesPage';
import styles from './App.module.css';

function App() {

	return (
		<>
			<Header />
			<div className={styles.container}>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/movies/:id' element={<MoviePage />} />
					<Route path='/authorization' element={<AuthorizationPage />} />
					<Route path='/favorites' element={<FavoritesPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
