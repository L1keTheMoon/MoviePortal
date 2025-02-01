import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { CircularProgress } from '@mui/material';
import styles from './App.module.css';

const MainPage = lazy(() => import('./pages/MainPage'));
const AuthorizationPage = lazy(() => import('./pages/AuthorizationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {

	return (
		<ErrorBoundary>
			<Suspense fallback={<CircularProgress size={500} style={{ margin: '50px auto' }} />}>
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
			</Suspense>
		</ErrorBoundary>
	);
}

export default App;
