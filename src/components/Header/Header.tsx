import { useEffect, useState } from 'react';
import { Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import { NightsStay, WbSunny, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Decoration from '../Decoration/Decoration.tsx';
import styles from './Header.module.css';

export default function Header() {
	const [theme, setTheme] = useState<'light' | 'dark'>(matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
	const [search, setSearch] = useState('');

	useEffect(() => {
		if (theme === 'dark') document.body.classList.add('dark');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const iconSize = { width: 30, height: 30 };
	const user = false;

	return (
		<header className={styles.header}>
			<Decoration style={{ marginRight: 'auto' }}>
				<Typography
					variant="h2"
					component="h1"
					noWrap
					sx={{ fontWeight: 700 }}
				>
					<Link to='/'>MoviePortal</Link>
				</Typography>
			</Decoration>
			<Paper
				sx={{ p: '2px', display: 'flex', alignItems: 'center', width: 300 }}
			>
				<TextField
					value={search}
					onChange={e => setSearch(e.target.value)}
					sx={{ ml: 1, flex: 1 }}
					placeholder='Поиск...'
				/>
				<IconButton
					type="button"
					aria-label="search"
				>
					<Search />
				</IconButton>
			</Paper>
			<IconButton
				size="small"
				color="inherit"
				onClick={() => {
					setTheme(theme === 'light' ? 'dark' : 'light');
					document.body.classList.toggle('dark');
				}}
			>
				{theme === 'light' ? <WbSunny sx={iconSize} /> : <NightsStay sx={iconSize} />}
			</IconButton>
			{user ||
				<>
					<Button variant="contained">
						Войти
					</Button>
					<Button variant="outlined">
						Зарегистрироваться
					</Button>
				</>}
		</header>
	);
}