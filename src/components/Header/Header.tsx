import { useContext, useState } from 'react';
import { Button, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { NightsStay, WbSunny, Search, AccountCircle } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router';
import Decoration from '../Decoration/Decoration';
import { ThemeContext } from '../../context/ThemeContext';
import { useAppSelector } from '../../hooks/useStore';
import styles from './Header.module.css';

const iconStyle = { color: 'white', width: 40, height: 40 };

export default function Header() {
	const [search, setSearch] = useState('');
	const { theme, changeTheme } = useContext(ThemeContext);
	const user = useAppSelector(state => state.user);
	const navigate = useNavigate();
	const location = useLocation();

	function handleClick(registration: number) {
		navigate('/Authorization', {
			state: {
				referrer: location.pathname,
				registration
			}
		})
	}

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
				sx={{ p: '2px', display: 'flex', alignItems: 'center', width: 300, borderRadius: 1 }}
			>
				<InputBase
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
				onClick={changeTheme}
			>
				{theme === 'light' ? <WbSunny sx={iconStyle} /> : <NightsStay sx={iconStyle} />}
			</IconButton>
			{user?.isLogin ?
				<span className={styles.user}>
					{user.name}
					<AccountCircle sx={iconStyle} />
				</span>
				:
				<>
					<Button
						variant="contained"
						size='large'
						onClick={() => handleClick(0)}
					>
						Войти
					</Button>
					<Button
						variant="outlined"
						size='large'
						onClick={() => handleClick(1)}
					>
						Зарегистрироваться
					</Button>
				</>}
		</header>
	);
}