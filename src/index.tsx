import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
	palette: {
		primary: {
			main: '#DF2144',
			dark: '#C91E3D'
		},
		secondary: {
			main: '#1EB7E8',
			dark: '#1BA5D1'
		},
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
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	//<React.StrictMode>
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>
	//</React.StrictMode>
);