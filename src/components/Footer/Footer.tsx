import React from 'react'
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span className={styles.decoration}>
				<a href="https://github.com/RomanBurlakov/MoviePortal" target='_blank' rel='noreferrer'>GitHub Проекта</a>
			</span>
			<span className={styles.decoration}>
				<a href="https://kinopoiskapiunofficial.tech/" target='_blank' rel='noreferrer'>Ссылка на использованное API</a>
			</span>
		</footer>
	)
}
