import { createContext, useContext, useState } from 'react';
import authService from '../api/Auth';
import { setAuthToken } from '../api/token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	const signIn = async (email, password) => {
		const data = await authService.login(email, password);
		setAuthToken(data.token);
		setCurrentUser(data);
	};

	const signUp = async (email, password) => {
		const data = await authService.signup(email, password);
		setAuthToken(data.token);
		setCurrentUser(data);
	};

	const logOut = () => {
		setAuthToken(null);
		setCurrentUser(null);
	};

	return (
		<AuthContext.Provider value={{ currentUser, signIn, signUp, logOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
