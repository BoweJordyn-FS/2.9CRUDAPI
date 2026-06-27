import { createContext, useContext, useState } from 'react';
import { signin, signup } from '../api/Auth';
import { getStoredToken, setAuthToken } from '../api/token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	// token.js already restored any saved token from localStorage at load time.
	const [token, setToken] = useState(() => getStoredToken());

	// Persist (or clear) the token in state, localStorage, and the in-memory
	// holder the API layer reads from.
	const applyToken = (next) => {
		setToken(next);
		setAuthToken(next);
	};

	const signIn = async (email, password) => {
		const data = await signin(email, password);
		applyToken(data.token);
	};

	const signUp = async (email, password) => {
		const data = await signup(email, password);
		applyToken(data.token);
	};

	const signOut = () => applyToken(null);

	return (
		<AuthContext.Provider
			value={{ token, isAuthenticated: !!token, signIn, signUp, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
