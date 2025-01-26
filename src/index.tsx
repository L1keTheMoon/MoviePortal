import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#DF2144'
		}
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1440,
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	//<React.StrictMode>
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
	//</React.StrictMode>
);