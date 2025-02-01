import { createContext, useEffect, useState } from 'react';
import { Theme } from '../types/types';
import { ThemeProvider, createTheme } from '@mui/material';

const ThemeContext = createContext(null);

const background = {
	dark: {
		default: "#303030",
		paper: "#303030"
	},
	light: {
		default: "#ababab",
		paper: "#ababab"
	}
}

function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState<Theme>(matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

	useEffect(() => {
		if (theme === 'dark') {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [theme])

	const materialTheme = createTheme({
		palette: {
			divider: theme === 'dark' ? '#ababab' : '#303030',
			primary: {
				main: '#DF2144',
				dark: '#C91E3D'
			},
			secondary: {
				main: '#1EB7E8',
				dark: '#1BA5D1'
			},
			common: {
				black: "#000",
				white: "#e6e6e6"
			},
			background: background[theme],
			mode: theme
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1600,
			}
		}
	});

	function changeTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			<ThemeProvider theme={materialTheme}>
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export { ThemeContext, ThemeContextProvider };