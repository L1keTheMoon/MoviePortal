import React from 'react';
import Header from './components/Header/Header.tsx';
import Premieres from './components/Premieres/Premieres.tsx';
import AdvancedSearch from './components/AdvancedSearch/AdvancedSearch.tsx';
import Footer from './components/Footer/Footer.tsx';
import styles from './App.module.css';

function App() {

	return (
		<>
			<Header />
			<div className={styles.container}>
				<Premieres />
				<AdvancedSearch />
			</div>
			<Footer />
		</>
	);
}

export default App;
