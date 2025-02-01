import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeContextProvider } from './context/ThemeContext';
import { store } from './store/store.ts';
import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ThemeContextProvider>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</ThemeContextProvider >
);