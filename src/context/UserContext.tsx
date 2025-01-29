import { createContext, useState } from 'react';

const UserContext = createContext(null);

function UserContextProvider({ children }) {
	const [user, setUser] = useState<{ isLogin: boolean, name: string }>(null);

	function createUser(login: string, password: string) {
		localStorage.setItem(login + '-PW', password);
		localStorage.setItem(login + '-Favorites', JSON.stringify([]));
		setUser({ isLogin: true, name: login });
		return true;
	}

	function authorize(login: string, password: string) {
		if (localStorage.getItem(login + '-PW') === password) {
			setUser({ isLogin: true, name: login });
			return true;
		}
		return false;
	}

	return (
		<UserContext.Provider value={{ user, createUser, authorize }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserContextProvider };
