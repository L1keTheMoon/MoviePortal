import Decoration from '../Decoration/Decoration.tsx';
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Decoration>
				<a href="https://github.com/RomanBurlakov/MoviePortal" target='_blank' rel='noreferrer'>GitHub Проекта</a>
			</Decoration>
			<Decoration>
				<a href="https://kinopoiskapiunofficial.tech/" target='_blank' rel='noreferrer'>Использованное API</a>
			</Decoration>
		</footer>
	)
}
