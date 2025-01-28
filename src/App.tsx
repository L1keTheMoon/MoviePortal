import React from 'react';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main.tsx';
import Authorization from './pages/Authorization.tsx';
import NotFound from './pages/NotFound.tsx';
import styles from './App.module.css';

function App() {

	return (
		<>
			<Header />
			<div className={styles.container}>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/authorization' element={<Authorization />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
