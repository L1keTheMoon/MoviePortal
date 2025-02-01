import { useContext, useState, useEffect } from 'react';
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { NightsStay, WbSunny, AccountCircle, Favorite, Logout } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router';
import Decoration from '../Decoration/Decoration';
import { ThemeContext } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { logOut, logIn } from '../../store/userSlice';
import QuickSearch from '../QuickSearch/QuickSearch';
import styles from './Header.module.css';

const iconStyle = { color: 'white', width: 40, height: 40 };

export default function Header() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);
	const { theme, changeTheme } = useContext(ThemeContext);
	const user = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		dispatch(logIn({ login: 'qwerty123', password: 'qwerty123' }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
			<QuickSearch />
			<IconButton
				size="small"
				color="inherit"
				onClick={changeTheme}
			>
				{theme === 'light' ? <WbSunny sx={iconStyle} /> : <NightsStay sx={iconStyle} />}
			</IconButton>
			<Button
				variant="outlined"
				size='large'
				onClick={() => {
					if (user?.isLogin) {
						navigate('/favorites');
					} else {
						handleClick(0);
					}
				}
				}
			>
				Избранное
			</Button>
			{user?.isLogin ?
				<div>
					<span className={styles.user} onClick={handleOpen}>
						{user.name}
						<AccountCircle sx={iconStyle} />
					</span>
					<Menu
						MenuListProps={{ sx: { width: 200 } }}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						id="basic-menu"
						anchorEl={anchorEl}
						open={menuOpen}
						onClose={handleClose}
					>
						<MenuItem onClick={() => {
							navigate('/favorites');
							handleClose();
						}}>
							Избранное<Favorite sx={{ marginLeft: 'auto' }} />
						</MenuItem>
						<MenuItem onClick={() => {
							dispatch(logOut());
							handleClose();
						}}>Выйти<Logout sx={{ marginLeft: 'auto' }} /></MenuItem>
					</Menu>
				</div>
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