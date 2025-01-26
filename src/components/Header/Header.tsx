import React, { useEffect, useState } from 'react';
import { AppBar, Button, IconButton, InputBase, Paper, Toolbar, Typography } from '@mui/material';
import { NightsStay, WbSunny, Search } from '@mui/icons-material';

export default function Header() {
	const [theme, setTheme] = useState<'light' | 'dark'>(matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
	useEffect(() => {
		if (theme === 'dark') document.body.classList.add('dark');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const iconSize = { width: 30, height: 30 };
	const user = false;

	return (
		<AppBar position='static' style={{ backgroundColor: 'var(--background-dark)' }}>
			<Toolbar sx={{ gap: '15px' }}>
				<Typography
					variant="h2"
					component="h1"
					noWrap
					sx={{ flexGrow: 1, color: 'var(--primary)', fontWeight: 700 }}
				>
					MoviePortal
				</Typography>
				<Paper
					sx={{ p: '2px', display: 'flex', alignItems: 'center', width: 300 }}
				>
					<InputBase
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
			</Toolbar>
		</AppBar>
	);
}